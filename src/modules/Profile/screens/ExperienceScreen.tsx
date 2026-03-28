/**
 * ExperienceScreen
 * Portfolio tab — work experience list with add/edit form.
 */
import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  FlatList,
  Alert,
  Modal,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Text, Flex, Box, HStack, Button, KitsInputText, KitsInputTextarea, useLanguage} from '@lmb-it/kitsconcerto';
import {Briefcase, Plus, Trash2, Edit3, X} from 'lucide-react-native';
import {profileActions, selectExperiences} from '@src/modules/Profile';
import type {IExperience, ICreateExperience} from '@src/modules/Profile';
import {selectActiveWorkspaceId} from '@src/modules/Workspace';
import AlphaLayout from '@src/layouts/AlphaLayout';
import type {IExperienceFormState} from '../models/profile.form.types';

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

const emptyForm: IExperienceFormState = {
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

/** Extract string value from KitsConcerto onChange event */
const extractValue = (e: any): string => e?.target?.value ?? e ?? '';

const ExperienceScreen: React.FC = () => {
  const dispatch = useDispatch();
  const {t} = useLanguage();
  const accountRef = useSelector(selectActiveWorkspaceId);
  const {items, loading} = useSelector(selectExperiences);

  const [formVisible, setFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<IExperience | null>(null);
  const [form, setForm] = useState<IExperienceFormState>(emptyForm);

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
      Alert.alert(t('profile.experience.validation.title'), t('profile.experience.validation.jobTitleRequired'));
      return;
    }
    if (!form.company.trim()) {
      Alert.alert(t('profile.experience.validation.title'), t('profile.experience.validation.companyRequired'));
      return;
    }
    const startMonth = parseInt(form.startMonth, 10);
    const startYear = parseInt(form.startYear, 10);
    if (!startMonth || startMonth < 1 || startMonth > 12) {
      Alert.alert(t('profile.experience.validation.title'), t('profile.experience.validation.startMonthInvalid'));
      return;
    }
    if (!startYear || startYear < 1950) {
      Alert.alert(t('profile.experience.validation.title'), t('profile.experience.validation.startYearRequired'));
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
  }, [accountRef, form, editingItem, dispatch, closeForm, t]);

  const handleDelete = useCallback((item: IExperience) => {
    if (!accountRef) return;
    Alert.alert(
      t('profile.experience.deleteConfirmTitle'),
      t('profile.experience.deleteConfirmMessage'),
      [
        {text: t('profile.experience.cancel'), style: 'cancel'},
        {
          text: t('profile.experience.delete'),
          style: 'destructive',
          onPress: () => dispatch(profileActions.deleteExperience({
            ref: accountRef,
            itemRef: item.identifier,
          })),
        },
      ],
    );
  }, [accountRef, dispatch, t]);

  const updateField = useCallback((key: keyof IExperienceFormState, value: string | boolean) => {
    setForm(prev => ({...prev, [key]: value}));
  }, []);

  const renderItem = useCallback(({item}: {item: IExperience}) => (
    <Box
      borderRadius={12}
      borderWidth={1}
      borderColor="border"
      bgColor="surface"
      p={16}>
      <HStack alignItems="flex-start">
        <Box flex={1} mr={12}>
          <Text fontSize={15} fontWeight="700" color="text-primary" numberOfLines={1}>
            {item.jobTitle}
          </Text>
          <Text fontSize={14} color="text-secondary" mt={2} numberOfLines={1}>
            {item.company}
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
      <Briefcase color="#999" size={48} />
      <Text fontSize={16} fontWeight="600" color="text-primary" mt={16}>
        {t('profile.experience.emptyTitle')}
      </Text>
      <Text fontSize={14} color="text-subtle" textAlign="center" mt={8}>
        {t('profile.experience.emptyDescription')}
      </Text>
      <Button
        label={t('profile.experience.addButton')}
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
    <AlphaLayout title={t('profile.experience.title')} headerStyle="solid" scrollEnabled={false} rightActions={headerRight}>
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
              {editingItem ? t('profile.experience.editTitle') : t('profile.experience.addTitle')}
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
                id="jobTitle"
                label={t('profile.experience.fields.jobTitle')}
                required
                value={form.jobTitle}
                onChange={(e: any) => updateField('jobTitle', extractValue(e))}
                placeholder={t('profile.experience.fields.jobTitlePlaceholder')}
              />
            </Box>
            <Box mb={16}>
              <KitsInputText
                id="company"
                label={t('profile.experience.fields.company')}
                required
                value={form.company}
                onChange={(e: any) => updateField('company', extractValue(e))}
                placeholder={t('profile.experience.fields.companyPlaceholder')}
              />
            </Box>
            <Box mb={16}>
              <KitsInputText
                id="country"
                label={t('profile.experience.fields.country')}
                value={form.country}
                onChange={(e: any) => updateField('country', extractValue(e))}
                placeholder={t('profile.experience.fields.countryPlaceholder')}
              />
            </Box>
            <Box mb={16}>
              <KitsInputText
                id="city"
                label={t('profile.experience.fields.city')}
                value={form.city}
                onChange={(e: any) => updateField('city', extractValue(e))}
                placeholder={t('profile.experience.fields.cityPlaceholder')}
              />
            </Box>

            <HStack gap={12} mb={16}>
              <Box flex={1}>
                <KitsInputText
                  id="startMonth"
                  label={t('profile.experience.fields.startMonth')}
                  required
                  value={form.startMonth}
                  onChange={(e: any) => updateField('startMonth', extractValue(e))}
                  placeholder={t('profile.experience.fields.monthPlaceholder')}
                  localProps={{keyboardType: 'numeric'}}
                />
              </Box>
              <Box flex={1}>
                <KitsInputText
                  id="startYear"
                  label={t('profile.experience.fields.startYear')}
                  required
                  value={form.startYear}
                  onChange={(e: any) => updateField('startYear', extractValue(e))}
                  placeholder={t('profile.experience.fields.yearPlaceholder')}
                  localProps={{keyboardType: 'numeric'}}
                />
              </Box>
            </HStack>

            <HStack
              alignItems="center"
              justifyContent="space-between"
              py={12}
              mb={16}
              borderBottomWidth={1}
              borderColor="border">
              <Text fontSize={14} color="text-primary">{t('profile.experience.fields.currentlyWorkHere')}</Text>
              <Switch
                value={form.isCurrent}
                onValueChange={(v) => updateField('isCurrent', v)}
              />
            </HStack>

            {!form.isCurrent && (
              <HStack gap={12} mb={16}>
                <Box flex={1}>
                  <KitsInputText
                    id="endMonth"
                    label={t('profile.experience.fields.endMonth')}
                    value={form.endMonth}
                    onChange={(e: any) => updateField('endMonth', extractValue(e))}
                    placeholder={t('profile.experience.fields.monthPlaceholder')}
                    localProps={{keyboardType: 'numeric'}}
                  />
                </Box>
                <Box flex={1}>
                  <KitsInputText
                    id="endYear"
                    label={t('profile.experience.fields.endYear')}
                    value={form.endYear}
                    onChange={(e: any) => updateField('endYear', extractValue(e))}
                    placeholder={t('profile.experience.fields.yearPlaceholder')}
                    localProps={{keyboardType: 'numeric'}}
                  />
                </Box>
              </HStack>
            )}

            <Box mb={16}>
              <KitsInputTextarea
                id="description"
                label={t('profile.experience.fields.description')}
                value={form.description}
                onChange={(e: any) => updateField('description', extractValue(e))}
                placeholder={t('profile.experience.fields.descriptionPlaceholder')}
              />
            </Box>

            <Button
              label={editingItem ? t('profile.experience.updateButton') : t('profile.experience.addButton')}
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

export default ExperienceScreen;
