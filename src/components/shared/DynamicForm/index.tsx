/**
 * DynamicForm
 *
 * Shared component that transforms `IFormFieldData[]` (backend FormFieldMap output)
 * into KitsConcerto `<Form />` elements. Handles:
 *   - Formio type mapping (formioType → KitsConcerto component type)
 *   - Yup schema generation from validate object
 *   - Select/Radio/Checkbox options from data.values
 *   - File field detection + native picker integration
 *   - Prefix / suffix as left/right addons
 *
 * Used by: MissingQuestionsScreen, DocumentFormScreen, and any future screen
 * that renders dynamic backend-driven forms.
 */
import React, {useRef, useCallback, useMemo, forwardRef, useImperativeHandle} from 'react';
import {Alert} from 'react-native';
import {
  Form,
  useLanguage,
  type IUseFormReturn,
  type IFormElement,
} from '@lmb-it/kitsconcerto';
import DocumentPicker from 'react-native-document-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import * as Yup from 'yup';
import AddressField, {type IAddressValue} from './AddressField';
// ---------------------------------------------------------------------------
// Types — API response from FormFieldMap
// ---------------------------------------------------------------------------

export interface IFormFieldValidate {
  required?: boolean;
  minLength?: number | string;
  maxLength?: number | string;
  min?: number | string;
  max?: number | string;
  pattern?: string;
  custom?: string;
  minWords?: number | string;
  maxWords?: number | string;
}

export interface IFormFieldConditional {
  show?: boolean | null;
  when?: string | null;
  eq?: string | null;
  json?: string;
}

export interface IFormFieldData {
  fieldRef: string;
  fieldName: string;
  fieldOrder: number;
  dbType: string;
  formioType: string;
  fieldLabel: string;
  labelPosition?: string;
  placeholder?: string | null;
  description?: string | null;
  tooltip?: string | null;
  prefix?: string | null;
  suffix?: string | null;
  errorLabel?: string | null;
  isDisabled?: boolean;
  isMultiple?: boolean;
  defaultValue?: unknown;
  isRequired?: boolean;
  inputType?: string | null;
  inputFormat?: string | null;
  inputMask?: string | null;
  mask?: string | null;
  case?: string | null;
  showCharCount?: boolean;
  showWordCount?: boolean;
  fileMaxSize?: number | null;
  fileMinSize?: number | null;
  fileTypes?: {label: string; value: string}[] | null;
  image?: boolean;
  imageSize?: number | null;
  webcam?: boolean;
  validate?: IFormFieldValidate | null;
  conditional?: IFormFieldConditional | null;
  data?:{label: string; value: string}[] | null;
  widget?: Record<string, unknown> | null;
  datePicker?: Record<string, unknown> | null;
  timePicker?: Record<string, unknown> | null;
  components?: IFormFieldData[] | null;
}

// ---------------------------------------------------------------------------
// Formio → KitsConcerto type mapping
// ---------------------------------------------------------------------------

const FORMIO_TO_KITS: Record<string, IFormElement['type']> = {
  textfield: 'Text',
  textarea: 'Textarea',
  number: 'Number',
  select: 'Select',
  datetime: 'Date',
  file: 'File',
  email: 'Email',
  phoneNumber: 'Phone',
  password: 'Password',
  checkbox: 'Checkbox',
  radio: 'Radios',
  selectboxes: 'Checkbox',
  url: 'Text',
  currency: 'Number',
  address: 'Text',
  day: 'Date',
  time: 'Date',
  tags: 'Tags',
};

/** Resolve KitsConcerto element type from formioType + dbType fallback */
const resolveType = (field: IFormFieldData): IFormElement['type'] => {
  // formioType is the primary source
  const kitsType = FORMIO_TO_KITS[field.formioType];

  if (kitsType !== undefined) {
    // For file type: if meta.image is true, render as Image instead of File
    if (kitsType === 'File' && field.image) return 'Image';
    return kitsType;
  }

  // Fallback on dbType
  switch (field.dbType) {
    case 'textarea':
      return 'Textarea';
    case 'select':
    case 'multiselect':
      return 'Select';
    case 'checkbox':
      return 'Checkbox';
    case 'number':
    case 'decimal':
    case 'currency':
      return 'Number';
    case 'file':
      return field.image ? 'Image' : 'File';
    case 'image':
      return 'Image';
    default:
      return 'Text';
  }
};

/** Detect whether a field expects a file/image upload */
const isFileField = (field: IFormFieldData): boolean =>
  field.formioType === 'file' || field.dbType === 'file' || field.dbType === 'image';

/** Parse a size string like "1GB", "20MB", "500KB" into KB. Falls back to 0. */
const parseSizeToKB = (raw: string | number): number => {
  if (typeof raw === 'number') return raw * 1024; // assume MB if plain number
  const match = raw.trim().match(/^([\d.]+)\s*(GB|MB|KB|B)?$/i);
  if (!match) return 0;
  const num = parseFloat(match[1]);
  const unit = (match[2] || 'MB').toUpperCase();
  switch (unit) {
    case 'GB': return num * 1024 * 1024;
    case 'MB': return num * 1024;
    case 'KB': return num;
    case 'B':  return num / 1024;
    default:   return num * 1024;
  }
};

// ---------------------------------------------------------------------------
// Yup schema builder
// ---------------------------------------------------------------------------

const buildSchema = (field: IFormFieldData): Yup.Schema | undefined => {
  const type = resolveType(field);
  if (!type) return undefined;

  const v = field.validate;
  const required = field.isRequired || v?.required;

  if (type === 'Number') {
    let s = Yup.number().typeError('Must be a number');
    if (required) s = s.required(field.errorLabel || 'Required');
    if (v?.min !== undefined && v.min !== '') s = s.min(Number(v.min));
    if (v?.max !== undefined && v.max !== '') s = s.max(Number(v.max));
    return s;
  }

  // Default: string schema
  let s = Yup.string();
  if (required) s = s.required(field.errorLabel || 'Required');
  if (v?.minLength !== undefined && v.minLength !== '') s = s.min(Number(v.minLength));
  if (v?.maxLength !== undefined && v.maxLength !== '') s = s.max(Number(v.maxLength));
  if (v?.pattern) s = s.matches(new RegExp(v.pattern), field.errorLabel || 'Invalid format');
  return s;
};

// ---------------------------------------------------------------------------
// Exported types
// ---------------------------------------------------------------------------

export interface IFilePick {
  uri: string;
  type: string;
  name: string;
}

export interface DynamicFormRef {
  /** Trigger the inner form's submit handler programmatically. */
  submit: () => void;
  /** Access picked files keyed by fieldRef (only populated when `enableFilePicker` is true). */
  getFilePicks: () => Record<string, IFilePick>;
  /** Access address data keyed by fieldRef (populated for address-type fields). */
  getAddressPicks: () => Record<string, IAddressValue>;
}

export interface DynamicFormProps {
  /** Backend form fields (FormFieldMap output) to transform and render. */
  fields: IFormFieldData[];
  /** Called when the user submits the form. */
  onSubmit: (data: Record<string, any>, setIsSubmitting: (v: boolean) => void) => void;
  /**
   * Enable native file picker for file/image fields.
   * When false, file fields are rendered as regular text inputs.
   * @default false
   */
  enableFilePicker?: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const DynamicForm = forwardRef<DynamicFormRef, DynamicFormProps>(
  ({fields, onSubmit, enableFilePicker = false}, ref) => {
    const {t} = useLanguage();
    const formRef = useRef<IUseFormReturn<Record<string, any>>>(null);
    const filePicksRef = useRef<Record<string, IFilePick>>({});
    const addressPicksRef = useRef<Record<string, IAddressValue>>({});

    // Expose submit + filePicks + addressPicks to parent via ref
    useImperativeHandle(ref, () => ({
      submit: () => formRef.current?.onFormSubmit(),
      getFilePicks: () => filePicksRef.current,
      getAddressPicks: () => addressPicksRef.current,
    }));

    // File picker handler (only active when enableFilePicker is true)
    const handleFilePick = useCallback(
      async (fieldRef: string, dbType: string) => {
        if (dbType === 'image') {
          launchImageLibrary(
            {mediaType: 'photo', quality: 0.8},
            response => {
              if (response.didCancel || response.errorCode) return;
              const asset = response.assets?.[0];
              if (asset?.uri) {
                filePicksRef.current[fieldRef] = {
                  uri: asset.uri,
                  type: asset.type || 'image/jpeg',
                  name: asset.fileName || 'photo.jpg',
                };
                formRef.current?.setValue(fieldRef, asset.fileName || 'photo.jpg');
              }
            },
          );
        } else {
          try {
            const result = await DocumentPicker.pickSingle({
              type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
            });
            filePicksRef.current[fieldRef] = {
              uri: result.uri,
              type: result.type || 'application/octet-stream',
              name: result.name || 'document',
            };
            formRef.current?.setValue(fieldRef, result.name || 'document');
          } catch (err) {
            if (!DocumentPicker.isCancel(err)) {
              Alert.alert(t('error'), String(err));
            }
          }
        }
      },
      [t],
    );

    // Transform IFormFieldData[] → IFormElement[]
    const formElements: IFormElement[] = useMemo(() => {
      return fields
        .slice()
        .sort((a, b) => a.fieldOrder - b.fieldOrder)
        .reduce<IFormElement[]>((acc, field) => {
          // ── Address fields → Container with AddressField ──
          if (field.formioType === 'address') {
            const required = field.isRequired || field.validate?.required;
            // @ts-ignore
            const addressElement: IFormElement<any> = {
              id: field.fieldRef,
              type: 'Container' as IFormElement['type'],
              label: '',
              colSpan: 12,
              schema: required
                ? Yup.string().required(field.errorLabel || 'Required')
                : Yup.string(),
              children: (rhfField: any) => (
                <AddressField
                  fieldRef={field.fieldRef}
                  label={field.fieldLabel || field.fieldName}
                  isRequired={!!required}
                  value={addressPicksRef.current[field.fieldRef] || null}
                  onChange={(addressValue: IAddressValue) => {
                    addressPicksRef.current[field.fieldRef] = addressValue;
                    rhfField.onChange(addressValue.formatted_address);
                  }}
                />
              ),
            };
            acc.push(addressElement as IFormElement);
            return acc;
          }

          let type:IFormElement['type'] = resolveType(field);
          if (!type) return acc; // skip hidden/content/button etc.

          // Handle multiselect
          if (type === 'Select' && field.isMultiple) {
            type = 'Multiselect';
          }

          // For file upload fields — make them tappable text inputs that trigger native picker
          // if (enableFilePicker && isFileField(field)) {
          //   type = 'Text';
          // }

          // @ts-ignore
          const element: IFormElement<any> = {
            id: field.fieldRef,
            type,
            label: field.fieldLabel || field.fieldName,
            placeholder: field.placeholder || undefined,
            colSpan: 12,
            isDisabled: field.isDisabled || false,
            helperText: field.description || undefined,
          };

          if(element.type != 'File' && element.type != 'Image'){
            element.schema =buildSchema(field);
          }
          // Left / right addons from prefix / suffix
          if (field.prefix) element.leftAddon = field.prefix;
          if (field.suffix) element.rightAddon = field.suffix;

          // List-based fields: Select, Multiselect, Radios, Checkbox, Tags
          const values = field.data || [];


          if (element.type == 'Select' || element.type == 'Multiselect' || element.type == 'Radios' || element.type == 'Checkbox') {
            element.list = values;
          }

          if (element.type == 'Select' || element.type == 'Multiselect') {
            element.labelKey = 'label';
            element.valueKey = 'value';
          }

          if (element.type == 'Radios' || element.type == 'Checkbox') {
            element.list = values.map(
              (opt: {label: string; value: string | number}) => ({
                label: opt.label,
                value: opt.value,
              }),
            );
          }

          // File / Image props
          if (element.type === 'File' || element.type === 'Image') {
            // Formio stores sizes as strings like "1GB", "20MB" — parse to KB for KitsConcerto
            if (field.fileMaxSize) element.maxFileSize = parseSizeToKB(field.fileMaxSize);
            if (field.fileMinSize) element.minFileSize = parseSizeToKB(field.fileMinSize);
            if (field.isMultiple) element.multiple = true;

            if(element.type === 'Image'){
              element.classicUploader = false
            }
            // Map fileTypes [{label:'PNG', value:'png'}] → ['png', ...]
            if (field.fileTypes?.length && element.type === 'Image') {
              // @ts-ignore
              element.acceptedTypes = field.fileTypes.map(
                (ft: {value: string}) => ft.value.toLowerCase(),
              );
            }
          }

          // File picker override
          if (enableFilePicker && isFileField(field)) {
            element.placeholder = t('trading.docForm.tapToSelectFile');
            // element.onFocus = () => handleFilePick(field.fieldRef, field.dbType);
          }

          acc.push(element as IFormElement);
          return acc;
        }, []);
    }, [fields, enableFilePicker, t, handleFilePick]);

    console.log(formElements)

    return (
      <Form
        ref={formRef}
        elements={formElements}
        onSubmit={onSubmit}
        outputFormat="Json"
        submitButtonProps={{
          size:'md',
          w:'full',
          severity:'brand'
        }}
      />
    );
  },
);
DynamicForm.displayName = 'DynamicForm';

export default DynamicForm;
