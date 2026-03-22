/**
 * ExperienceScreen
 * Portfolio tab — work experience list with add/edit form.
 */
import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Text, Flex, Button, useKitsTheme} from '@lmb-it/kitsconcerto';
import {Briefcase, Plus, Trash2, Edit3, X} from 'lucide-react-native';
import {profileActions, selectExperiences} from '@src/modules/Profile';
import type {IExperience, ICreateExperience} from '@src/modules/Profile';
import {selectActiveWorkspaceId} from '@src/modules/Workspace';
import AlphaLayout from '@src/layouts/AlphaLayout';

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const formatDateRange = (item: IExperience): string => {
  const startLabel = `${MONTH_NAMES[(item.startMonth ?? 1) - 1] ?? 'Jan'} ${item.startYear}`;
  if (item.isCurrent) return `${startLabel} - Present`;
  if (item.endMonth && item.endYear) {
    return `${startLabel} - ${MONTH_NAMES[(item.endMonth ?? 1) - 1] ?? 'Jan'} ${item.endYear}`;
  }
  if (item.endYear) return `${startLabel} - ${item.endYear}`;
  return startLabel;
};

interface FormState {
  jobTitle: string;
  company: string;
  country: string;
  city: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  isCurrent: boolean;
  description: string;
}

const emptyForm: FormState = {
  jobTitle: '',
  company: '',
  country: '',
  city: '',
  startMonth: '',
  startYear: '',
  endMonth: '',
  endYear: '',
  isCurrent: false,
  description: '',
};

const ExperienceScreen: React.FC = () => {
  const dispatch = useDispatch();
  const {resolveToken} = useKitsTheme();
  const accountRef = useSelector(selectActiveWorkspaceId);
  const {items, loading} = useSelector(selectExperiences);

  const [formVisible, setFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<IExperience | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const primaryColor = resolveToken('primary');
  const textColor = resolveToken('text-primary');
  const subtleColor = resolveToken('text-subtle');
  const surfaceColor = resolveToken('surface');
  const borderColor = resolveToken('border');
  const bgColor = resolveToken('bg');
  const dangerColor = resolveToken('danger');

  useEffect(() => {
    if (accountRef) {
      dispatch(profileActions.loadExperiences(accountRef));
    }
  }, [accountRef, dispatch]);

  const openAddForm = useCallback(() => {
    setEditingItem(null);
    setForm(emptyForm);
    setFormVisible(true);
  }, []);

  const openEditForm = useCallback((item: IExperience) => {
    setEditingItem(item);
    setForm({
      jobTitle: item.jobTitle,
      company: item.company,
      country: item.countryName ?? item.countryRef ?? '',
      city: item.city ?? '',
      startMonth: String(item.startMonth),
      startYear: String(item.startYear),
      endMonth: item.endMonth ? String(item.endMonth) : '',
      endYear: item.endYear ? String(item.endYear) : '',
      isCurrent: item.isCurrent,
      description: item.description ?? '',
    });
    setFormVisible(true);
  }, []);

  const closeForm = useCallback(() => {
    setFormVisible(false);
    setEditingItem(null);
    setForm(emptyForm);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!accountRef) return;

    if (!form.jobTitle.trim()) {
      Alert.alert('Validation', 'Job title is required.');
      return;
    }
    if (!form.company.trim()) {
      Alert.alert('Validation', 'Company is required.');
      return;
    }
    const startMonth = parseInt(form.startMonth, 10);
    const startYear = parseInt(form.startYear, 10);
    if (!startMonth || startMonth < 1 || startMonth > 12) {
      Alert.alert('Validation', 'Start month must be between 1 and 12.');
      return;
    }
    if (!startYear || startYear < 1950) {
      Alert.alert('Validation', 'Start year is required.');
      return;
    }

    const data: ICreateExperience = {
      jobTitle: form.jobTitle.trim(),
      company: form.company.trim(),
      countryRef: form.country.trim() || null,
      city: form.city.trim() || null,
      startMonth,
      startYear,
      isCurrent: form.isCurrent,
      endMonth: form.isCurrent ? null : (parseInt(form.endMonth, 10) || null),
      endYear: form.isCurrent ? null : (parseInt(form.endYear, 10) || null),
      description: form.description.trim() || null,
    };

    if (editingItem) {
      dispatch(profileActions.updateExperience({
        ref: accountRef,
        itemRef: editingItem.identifier,
        data,
      }));
    } else {
      dispatch(profileActions.createExperience({ref: accountRef, data}));
    }

    closeForm();
  }, [accountRef, form, editingItem, dispatch, closeForm]);

  const handleDelete = useCallback((item: IExperience) => {
    if (!accountRef) return;
    Alert.alert(
      'Delete Experience',
      `Are you sure you want to delete "${item.jobTitle}" at ${item.company}?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => dispatch(profileActions.deleteExperience({
            ref: accountRef,
            itemRef: item.identifier,
          })),
        },
      ],
    );
  }, [accountRef, dispatch]);

  const updateField = useCallback((key: keyof FormState, value: string | boolean) => {
    setForm(prev => ({...prev, [key]: value}));
  }, []);

  const renderItem = useCallback(({item}: {item: IExperience}) => (
    <View style={[styles.card, {backgroundColor: surfaceColor, borderColor}]}>
      <View style={styles.cardContent}>
        <View style={styles.cardTextArea}>
          <Text fontSize={15} fontWeight="700" color="text-primary" numberOfLines={1}>
            {item.jobTitle}
          </Text>
          <Text fontSize={14} color="text-secondary" mt={2} numberOfLines={1}>
            {item.company}
          </Text>
          <Text fontSize={12} color="text-subtle" mt={4}>
            {formatDateRange(item)}
          </Text>
        </View>
        <View style={styles.cardActions}>
          <TouchableOpacity
            onPress={() => openEditForm(item)}
            hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
            accessible
            accessibilityLabel="Edit experience"
            accessibilityHint="Opens the edit form for this experience">
            <Edit3 size={18} color={primaryColor} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDelete(item)}
            hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
            style={styles.deleteBtn}
            accessible
            accessibilityLabel="Delete experience"
            accessibilityHint="Deletes this experience entry">
            <Trash2 size={18} color={dangerColor} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ), [surfaceColor, borderColor, primaryColor, dangerColor, openEditForm, handleDelete]);

  const renderEmpty = () => (
    <Flex flex={1} justifyContent="center" alignItems="center" px={20} py={60}>
      <Briefcase color={subtleColor} size={48} />
      <Text fontSize={16} fontWeight="600" color="text-primary" mt={16}>
        No experience added yet
      </Text>
      <Text fontSize={14} color="text-subtle" textAlign="center" mt={8}>
        Add your work history to showcase your professional background.
      </Text>
      <Button
        label="Add Experience"
        icon={<Plus size={18} color="#fff" />}
        mt={24}
        onPress={openAddForm}
      />
    </Flex>
  );

  const renderFormField = (
    label: string,
    value: string,
    key: keyof FormState,
    options?: {
      required?: boolean;
      placeholder?: string;
      keyboardType?: 'default' | 'numeric';
      multiline?: boolean;
    },
  ) => (
    <View style={styles.fieldContainer}>
      <Text fontSize={13} fontWeight="600" color="text-secondary" mb={4}>
        {label}{options?.required ? ' *' : ''}
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: bgColor,
            borderColor,
            color: textColor,
          },
          options?.multiline && styles.inputMultiline,
        ]}
        value={value}
        onChangeText={(v) => updateField(key, v)}
        placeholder={options?.placeholder}
        placeholderTextColor={subtleColor}
        keyboardType={options?.keyboardType ?? 'default'}
        multiline={options?.multiline}
        textAlignVertical={options?.multiline ? 'top' : 'center'}
      />
    </View>
  );

  const headerRight = items.length > 0 ? (
    <TouchableOpacity
      onPress={openAddForm}
      hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
      accessible
      accessibilityLabel="Add experience"
      accessibilityHint="Opens the form to add a new experience">
      <Plus size={22} color={primaryColor} />
    </TouchableOpacity>
  ) : undefined;

  return (
    <AlphaLayout title="Experience" headerStyle="solid" scrollEnabled={false} rightActions={headerRight}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.identifier}
        renderItem={renderItem}
        contentContainerStyle={items.length === 0 ? styles.emptyContainer : styles.listContent}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={formVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeForm}>
        <KeyboardAvoidingView
          style={[styles.modalContainer, {backgroundColor: bgColor}]}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={[styles.modalHeader, {borderBottomColor: borderColor}]}>
            <TouchableOpacity onPress={closeForm} hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
              <X size={22} color={textColor} />
            </TouchableOpacity>
            <Text fontSize={16} fontWeight="700" color="text-primary">
              {editingItem ? 'Edit Experience' : 'Add Experience'}
            </Text>
            <View style={{width: 22}} />
          </View>

          <ScrollView
            style={styles.modalBody}
            contentContainerStyle={styles.modalBodyContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            {renderFormField('Job Title', form.jobTitle, 'jobTitle', {required: true, placeholder: 'e.g. Senior Electrician'})}
            {renderFormField('Company', form.company, 'company', {required: true, placeholder: 'e.g. ABC Electrical'})}
            {renderFormField('Country', form.country, 'country', {placeholder: 'e.g. Australia'})}
            {renderFormField('City', form.city, 'city', {placeholder: 'e.g. Sydney'})}

            <View style={styles.row}>
              <View style={styles.halfField}>
                {renderFormField('Start Month', form.startMonth, 'startMonth', {required: true, placeholder: '1-12', keyboardType: 'numeric'})}
              </View>
              <View style={styles.halfField}>
                {renderFormField('Start Year', form.startYear, 'startYear', {required: true, placeholder: 'e.g. 2020', keyboardType: 'numeric'})}
              </View>
            </View>

            <View style={[styles.switchRow, {borderColor}]}>
              <Text fontSize={14} color="text-primary">I currently work here</Text>
              <Switch
                value={form.isCurrent}
                onValueChange={(v) => updateField('isCurrent', v)}
                trackColor={{false: borderColor, true: primaryColor}}
              />
            </View>

            {!form.isCurrent && (
              <View style={styles.row}>
                <View style={styles.halfField}>
                  {renderFormField('End Month', form.endMonth, 'endMonth', {placeholder: '1-12', keyboardType: 'numeric'})}
                </View>
                <View style={styles.halfField}>
                  {renderFormField('End Year', form.endYear, 'endYear', {placeholder: 'e.g. 2023', keyboardType: 'numeric'})}
                </View>
              </View>
            )}

            {renderFormField('Description', form.description, 'description', {placeholder: 'Describe your responsibilities...', multiline: true})}

            <Button
              label={editingItem ? 'Update Experience' : 'Add Experience'}
              onPress={handleSubmit}
              mt={12}
              mb={40}
              w="100%"
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </AlphaLayout>
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
    gap: 12,
  },
  emptyContainer: {
    flex: 1,
  },
  card: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardTextArea: {
    flex: 1,
    marginRight: 12,
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingTop: 2,
  },
  deleteBtn: {
    marginLeft: 0,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  modalBody: {
    flex: 1,
  },
  modalBodyContent: {
    padding: 16,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  inputMultiline: {
    minHeight: 100,
    paddingTop: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfField: {
    flex: 1,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default ExperienceScreen;
