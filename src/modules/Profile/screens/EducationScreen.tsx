/**
 * EducationScreen
 * Portfolio tab — education history list with add/edit form.
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
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Text, Flex, Button, useKitsTheme} from '@lmb-it/kitsconcerto';
import {GraduationCap, Plus, Trash2, Edit3, X} from 'lucide-react-native';
import {profileActions, selectEducation} from '@src/modules/Profile';
import type {IEducation, ICreateEducation} from '@src/modules/Profile';
import {selectActiveWorkspaceId} from '@src/modules/Workspace';
import AlphaLayout from '@src/layouts/AlphaLayout';

const formatDateRange = (item: IEducation): string => {
  const start = String(item.startYear);
  if (item.endYear) return `${start} - ${item.endYear}`;
  return `${start} - Present`;
};

interface FormState {
  country: string;
  institution: string;
  degree: string;
  startYear: string;
  endYear: string;
}

const emptyForm: FormState = {
  country: '',
  institution: '',
  degree: '',
  startYear: '',
  endYear: '',
};

const EducationScreen: React.FC = () => {
  const dispatch = useDispatch();
  const {resolveToken} = useKitsTheme();
  const accountRef = useSelector(selectActiveWorkspaceId);
  const {items, loading} = useSelector(selectEducation);

  const [formVisible, setFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<IEducation | null>(null);
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
      dispatch(profileActions.loadEducation(accountRef));
    }
  }, [accountRef, dispatch]);

  const openAddForm = useCallback(() => {
    setEditingItem(null);
    setForm(emptyForm);
    setFormVisible(true);
  }, []);

  const openEditForm = useCallback((item: IEducation) => {
    setEditingItem(item);
    setForm({
      country: item.countryName ?? item.countryRef ?? '',
      institution: item.institution,
      degree: item.degree,
      startYear: String(item.startYear),
      endYear: item.endYear ? String(item.endYear) : '',
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

    if (!form.institution.trim()) {
      Alert.alert('Validation', 'Institution is required.');
      return;
    }
    if (!form.degree.trim()) {
      Alert.alert('Validation', 'Degree is required.');
      return;
    }
    const startYear = parseInt(form.startYear, 10);
    if (!startYear || startYear < 1950) {
      Alert.alert('Validation', 'Start year is required.');
      return;
    }

    const data: ICreateEducation = {
      institution: form.institution.trim(),
      degree: form.degree.trim(),
      countryRef: form.country.trim() || null,
      startYear,
      endYear: parseInt(form.endYear, 10) || null,
    };

    if (editingItem) {
      dispatch(profileActions.updateEducation({
        ref: accountRef,
        itemRef: editingItem.identifier,
        data,
      }));
    } else {
      dispatch(profileActions.createEducation({ref: accountRef, data}));
    }

    closeForm();
  }, [accountRef, form, editingItem, dispatch, closeForm]);

  const handleDelete = useCallback((item: IEducation) => {
    if (!accountRef) return;
    Alert.alert(
      'Delete Education',
      `Are you sure you want to delete "${item.institution}"?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => dispatch(profileActions.deleteEducation({
            ref: accountRef,
            itemRef: item.identifier,
          })),
        },
      ],
    );
  }, [accountRef, dispatch]);

  const updateField = useCallback((key: keyof FormState, value: string) => {
    setForm(prev => ({...prev, [key]: value}));
  }, []);

  const renderItem = useCallback(({item}: {item: IEducation}) => (
    <View style={[styles.card, {backgroundColor: surfaceColor, borderColor}]}>
      <View style={styles.cardContent}>
        <View style={styles.cardTextArea}>
          <Text fontSize={15} fontWeight="700" color="text-primary" numberOfLines={1}>
            {item.institution}
          </Text>
          <Text fontSize={14} color="text-secondary" mt={2} numberOfLines={1}>
            {item.degree}
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
            accessibilityLabel="Edit education"
            accessibilityHint="Opens the edit form for this education entry">
            <Edit3 size={18} color={primaryColor} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDelete(item)}
            hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
            style={styles.deleteBtn}
            accessible
            accessibilityLabel="Delete education"
            accessibilityHint="Deletes this education entry">
            <Trash2 size={18} color={dangerColor} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ), [surfaceColor, borderColor, primaryColor, dangerColor, openEditForm, handleDelete]);

  const renderEmpty = () => (
    <Flex flex={1} justifyContent="center" alignItems="center" px={20} py={60}>
      <GraduationCap color={subtleColor} size={48} />
      <Text fontSize={16} fontWeight="600" color="text-primary" mt={16}>
        No education added yet
      </Text>
      <Text fontSize={14} color="text-subtle" textAlign="center" mt={8}>
        Add your educational background to strengthen your profile.
      </Text>
      <Button
        label="Add Education"
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
        ]}
        value={value}
        onChangeText={(v) => updateField(key, v)}
        placeholder={options?.placeholder}
        placeholderTextColor={subtleColor}
        keyboardType={options?.keyboardType ?? 'default'}
      />
    </View>
  );

  const headerRight = items.length > 0 ? (
    <TouchableOpacity
      onPress={openAddForm}
      hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
      accessible
      accessibilityLabel="Add education"
      accessibilityHint="Opens the form to add a new education entry">
      <Plus size={22} color={primaryColor} />
    </TouchableOpacity>
  ) : undefined;

  return (
    <AlphaLayout title="Education" headerStyle="solid" scrollEnabled={false} rightActions={headerRight}>
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
              {editingItem ? 'Edit Education' : 'Add Education'}
            </Text>
            <View style={{width: 22}} />
          </View>

          <ScrollView
            style={styles.modalBody}
            contentContainerStyle={styles.modalBodyContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            {renderFormField('Country', form.country, 'country', {placeholder: 'e.g. Australia'})}
            {renderFormField('Institution', form.institution, 'institution', {required: true, placeholder: 'e.g. University of Sydney'})}
            {renderFormField('Degree', form.degree, 'degree', {required: true, placeholder: 'e.g. Bachelor of Engineering'})}

            <View style={styles.row}>
              <View style={styles.halfField}>
                {renderFormField('Start Year', form.startYear, 'startYear', {required: true, placeholder: 'e.g. 2018', keyboardType: 'numeric'})}
              </View>
              <View style={styles.halfField}>
                {renderFormField('End Year', form.endYear, 'endYear', {placeholder: 'e.g. 2022', keyboardType: 'numeric'})}
              </View>
            </View>

            <Button
              label={editingItem ? 'Update Education' : 'Add Education'}
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
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfField: {
    flex: 1,
  },
});

export default EducationScreen;
