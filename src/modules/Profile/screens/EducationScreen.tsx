/**
 * EducationScreen
 * Portfolio tab — education history list with add/edit form.
 */
import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  FlatList,
  Alert,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Text, Flex, Box, HStack, Button, KitsInputText, useLanguage} from '@lmb-it/kitsconcerto';
import {GraduationCap, Plus, Trash2, Edit3, X} from 'lucide-react-native';
import {profileActions, selectEducation} from '@src/modules/Profile';
import type {IEducation, ICreateEducation} from '@src/modules/Profile';
import {selectActiveWorkspaceId} from '@src/modules/Workspace';
import AlphaLayout from '@src/layouts/AlphaLayout';
import type {IEducationFormState} from '../models/profile.form.types';

const formatDateRange = (item: IEducation): string => {
  const start = String(item.startYear);
  if (item.endYear) return `${start} - ${item.endYear}`;
  return `${start} - Present`;
};

const emptyForm: IEducationFormState = {
  country: '',
  institution: '',
  degree: '',
  startYear: '',
  endYear: '',
};

/** Extract string value from KitsConcerto onChange event */
const extractValue = (e: any): string => e?.target?.value ?? e ?? '';

const EducationScreen: React.FC = () => {
  const dispatch = useDispatch();
  const {t} = useLanguage();
  const accountRef = useSelector(selectActiveWorkspaceId);
  const {items, loading} = useSelector(selectEducation);

  const [formVisible, setFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<IEducation | null>(null);
  const [form, setForm] = useState<IEducationFormState>(emptyForm);

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
      Alert.alert(t('profile.education.validation.title'), t('profile.education.validation.institutionRequired'));
      return;
    }
    if (!form.degree.trim()) {
      Alert.alert(t('profile.education.validation.title'), t('profile.education.validation.degreeRequired'));
      return;
    }
    const startYear = parseInt(form.startYear, 10);
    if (!startYear || startYear < 1950) {
      Alert.alert(t('profile.education.validation.title'), t('profile.education.validation.startYearRequired'));
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
  }, [accountRef, form, editingItem, dispatch, closeForm, t]);

  const handleDelete = useCallback((item: IEducation) => {
    if (!accountRef) return;
    Alert.alert(
      t('profile.education.deleteConfirmTitle'),
      t('profile.education.deleteConfirmMessage'),
      [
        {text: t('profile.education.cancel'), style: 'cancel'},
        {
          text: t('profile.education.delete'),
          style: 'destructive',
          onPress: () => dispatch(profileActions.deleteEducation({
            ref: accountRef,
            itemRef: item.identifier,
          })),
        },
      ],
    );
  }, [accountRef, dispatch, t]);

  const updateField = useCallback((key: keyof IEducationFormState, value: string) => {
    setForm(prev => ({...prev, [key]: value}));
  }, []);

  const renderItem = useCallback(({item}: {item: IEducation}) => (
    <Box
      borderRadius={12}
      borderWidth={1}
      borderColor="border"
      bgColor="surface"
      p={16}>
      <HStack alignItems="flex-start">
        <Box flex={1} mr={12}>
          <Text fontSize={15} fontWeight="700" color="text-primary" numberOfLines={1}>
            {item.institution}
          </Text>
          <Text fontSize={14} color="text-secondary" mt={2} numberOfLines={1}>
            {item.degree}
          </Text>
          <Text fontSize={12} color="text-subtle" mt={4}>
            {formatDateRange(item)}
          </Text>
        </Box>
        <HStack alignItems="center" gap={16}>
          <Button
            size="sm"
            outlined
            icon={<Edit3 size={18} />}
            onPress={() => openEditForm(item)}
          />
          <Button
            size="sm"
            outlined
            severity="danger"
            icon={<Trash2 size={18} />}
            onPress={() => handleDelete(item)}
          />
        </HStack>
      </HStack>
    </Box>
  ), [openEditForm, handleDelete]);

  const renderEmpty = () => (
    <Flex flex={1} justifyContent="center" alignItems="center" px={20} py={60}>
      <GraduationCap color="#999" size={48} />
      <Text fontSize={16} fontWeight="600" color="text-primary" mt={16}>
        {t('profile.education.emptyTitle')}
      </Text>
      <Text fontSize={14} color="text-subtle" textAlign="center" mt={8}>
        {t('profile.education.emptyDescription')}
      </Text>
      <Button
        label={t('profile.education.addButton')}
        icon={<Plus size={18} color="#fff" />}
        mt={24}
        onPress={openAddForm}
      />
    </Flex>
  );

  const headerRight = items.length > 0 ? (
    <Button
      size="sm"
      outlined
      icon={<Plus size={22} />}
      onPress={openAddForm}
    />
  ) : undefined;

  return (
    <AlphaLayout title={t('profile.education.title')} headerStyle="solid" scrollEnabled={false} rightActions={headerRight}>
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
          style={styles.modalContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <HStack
            alignItems="center"
            justifyContent="space-between"
            px={16}
            py={14}
            borderBottomWidth={1}
            borderColor="border">
            <Button
              size="sm"
              outlined
              icon={<X size={22} />}
              onPress={closeForm}
            />
            <Text fontSize={16} fontWeight="700" color="text-primary">
              {editingItem ? t('profile.education.editTitle') : t('profile.education.addTitle')}
            </Text>
            <Box w={22} />
          </HStack>

          <ScrollView
            style={styles.modalBody}
            contentContainerStyle={styles.modalBodyContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <Box mb={16}>
              <KitsInputText
                id="country"
                label={t('profile.education.fields.country')}
                value={form.country}
                onChange={(e: any) => updateField('country', extractValue(e))}
                placeholder={t('profile.education.fields.countryPlaceholder')}
              />
            </Box>
            <Box mb={16}>
              <KitsInputText
                id="institution"
                label={t('profile.education.fields.institution')}
                required
                value={form.institution}
                onChange={(e: any) => updateField('institution', extractValue(e))}
                placeholder={t('profile.education.fields.institutionPlaceholder')}
              />
            </Box>
            <Box mb={16}>
              <KitsInputText
                id="degree"
                label={t('profile.education.fields.degree')}
                required
                value={form.degree}
                onChange={(e: any) => updateField('degree', extractValue(e))}
                placeholder={t('profile.education.fields.degreePlaceholder')}
              />
            </Box>

            <HStack gap={12} mb={16}>
              <Box flex={1}>
                <KitsInputText
                  id="startYear"
                  label={t('profile.education.fields.startYear')}
                  required
                  value={form.startYear}
                  onChange={(e: any) => updateField('startYear', extractValue(e))}
                  placeholder={t('profile.education.fields.startYearPlaceholder')}
                  localProps={{keyboardType: 'numeric'}}
                />
              </Box>
              <Box flex={1}>
                <KitsInputText
                  id="endYear"
                  label={t('profile.education.fields.endYear')}
                  value={form.endYear}
                  onChange={(e: any) => updateField('endYear', extractValue(e))}
                  placeholder={t('profile.education.fields.endYearPlaceholder')}
                  localProps={{keyboardType: 'numeric'}}
                />
              </Box>
            </HStack>

            <Button
              label={editingItem ? t('profile.education.updateButton') : t('profile.education.addButton')}
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
  modalContainer: {
    flex: 1,
  },
  modalBody: {
    flex: 1,
  },
  modalBodyContent: {
    padding: 16,
  },
});

export default EducationScreen;
