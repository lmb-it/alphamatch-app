/**
 * ReferencesScreen
 * Portfolio tab — professional references list with add/edit form.
 *
 * Conditional validation:
 * - Email required if phone is empty (and vice versa)
 * - Company + Job title required if relationship is manager/colleague/client
 */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {Text, Flex, Box, HStack, Button, KitsInputText, useLanguage} from '@lmb-it/kitsconcerto';
import {Users, Plus, X, Edit2, Trash2, Check} from 'lucide-react-native';
import {useDispatch, useSelector} from 'react-redux';
import AlphaLayout from '@src/layouts/AlphaLayout';
import {profileActions} from '../store/profile.slice';
import {selectReferences} from '../store/profile.selectors';
import {selectActiveWorkspaceId} from '@src/modules/Workspace/store/workspace.selectors';
import type {IReference, ICreateReference} from '../models/profile.types';
import {getRelationshipOptions, WORK_RELATIONSHIPS} from '../constants/relationships';

type Relationship = ICreateReference['relationship'];

const EMPTY_FORM: ICreateReference = {
  fullName: '',
  relationship: 'colleague',
  email: null,
  phone: null,
  company: null,
  jobTitle: null,
  knownSince: null,
};

/** Extract string value from KitsConcerto onChange event */
const extractValue = (e: any): string => e?.target?.value ?? e ?? '';

const ReferencesScreen: React.FC = () => {
  const dispatch = useDispatch();
  const {t} = useLanguage();
  const accountRef = useSelector(selectActiveWorkspaceId);
  const {items, loading} = useSelector(selectReferences);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<IReference | null>(null);
  const [form, setForm] = useState<ICreateReference>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const relationshipOptions = useMemo(() => getRelationshipOptions(t), [t]);

  useEffect(() => {
    if (accountRef) {
      dispatch(profileActions.loadReferences(accountRef));
    }
  }, [accountRef, dispatch]);

  const isWorkRelationship = useMemo(
    () => WORK_RELATIONSHIPS.includes(form.relationship),
    [form.relationship],
  );

  const openAdd = useCallback(() => {
    setEditingItem(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setModalVisible(true);
  }, []);

  const openEdit = useCallback((item: IReference) => {
    setEditingItem(item);
    setForm({
      fullName: item.fullName,
      relationship: item.relationship,
      email: item.email ?? null,
      phone: item.phone ?? null,
      company: item.company ?? null,
      jobTitle: item.jobTitle ?? null,
      knownSince: item.knownSince ?? null,
    });
    setErrors({});
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setEditingItem(null);
  }, []);

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!form.fullName.trim()) next.fullName = t('profile.references.validation.fullNameRequired');
    if (!form.relationship) next.relationship = t('profile.references.validation.relationshipRequired');

    const hasEmail = !!form.email?.trim();
    const hasPhone = !!form.phone?.trim();
    if (!hasEmail && !hasPhone) {
      next.email = t('profile.references.validation.contactRequired');
      next.phone = t('profile.references.validation.contactRequired');
    }

    if (isWorkRelationship) {
      if (!form.company?.trim()) next.company = t('profile.references.validation.companyRequired');
      if (!form.jobTitle?.trim()) next.jobTitle = t('profile.references.validation.jobTitleRequired');
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (!validate() || !accountRef) return;
    const payload: ICreateReference = {
      fullName: form.fullName.trim(),
      relationship: form.relationship,
      email: form.email?.trim() || null,
      phone: form.phone?.trim() || null,
      company: form.company?.trim() || null,
      jobTitle: form.jobTitle?.trim() || null,
      knownSince: form.knownSince?.trim() || null,
    };
    if (editingItem) {
      dispatch(profileActions.updateReference({ref: accountRef, itemRef: editingItem.identifier, data: payload}));
    } else {
      dispatch(profileActions.createReference({ref: accountRef, data: payload}));
    }
    closeModal();
  };

  const handleDelete = (item: IReference) => {
    Alert.alert(
      t('profile.references.deleteConfirmTitle'),
      t('profile.references.deleteConfirmMessage'),
      [
        {text: t('profile.references.cancel'), style: 'cancel'},
        {
          text: t('profile.references.delete'),
          style: 'destructive',
          onPress: () => {
            if (accountRef) {
              dispatch(profileActions.deleteReference({ref: accountRef, itemRef: item.identifier}));
            }
          },
        },
      ],
    );
  };

  const getRelationshipLabel = (value: Relationship) =>
    relationshipOptions.find(o => o.value === value)?.label ?? value;

  const renderItem = ({item}: {item: IReference}) => (
    <Box
      flexDirection="row"
      alignItems="center"
      p={16}
      borderRadius={12}
      borderWidth={1}
      bgColor="surface"
      borderColor="border">
      <Box flex={1} mr={12}>
        <HStack alignItems="center" gap={8}>
          <Text fontSize={16} fontWeight="700" color="text-primary" numberOfLines={1} style={styles.cardName}>
            {item.fullName}
          </Text>
          <Box px={8} py={2} borderRadius={6} bgColor="primary" opacity={0.1}>
            <Text fontSize={11} fontWeight="600" color="primary">
              {getRelationshipLabel(item.relationship)}
            </Text>
          </Box>
        </HStack>
        {item.company && (
          <Text fontSize={14} color="text-subtle" mt={2}>
            {item.company}
          </Text>
        )}
      </Box>
      <HStack gap={12}>
        <Button
          size="sm"
          outlined
          icon={<Edit2 size={18} />}
          onPress={() => openEdit(item)}
        />
        <Button
          size="sm"
          outlined
          severity="danger"
          icon={<Trash2 size={18} />}
          onPress={() => handleDelete(item)}
        />
      </HStack>
    </Box>
  );

  const renderEmpty = () => (
    <Flex flex={1} justifyContent="center" alignItems="center" px={20} py={40}>
      <Users color="#999" size={48} />
      <Text fontSize={16} fontWeight="600" color="text-primary" mt={16}>
        {t('profile.references.emptyTitle')}
      </Text>
      <Text fontSize={14} color="text-subtle" textAlign="center" mt={8}>
        {t('profile.references.emptyDescription')}
      </Text>
      <Button
        label={t('profile.references.addButton')}
        icon={<Plus size={18} color="#fff" />}
        mt={24}
        onPress={openAdd}
      />
    </Flex>
  );

  const headerRight = (
    <Button
      size="sm"
      outlined
      icon={<Plus size={24} />}
      onPress={openAdd}
    />
  );

  const renderRelationshipPicker = () => (
    <Box mb={20}>
      <Text fontSize={14} fontWeight="600" color="text-primary" mb={6}>
        {t('profile.references.fields.relationship')} <Text color="danger">*</Text>
      </Text>
      <HStack flexWrap="wrap" gap={8}>
        {relationshipOptions.map(option => {
          const isSelected = form.relationship === option.value;
          return (
            <Button
              key={option.value}
              outlined={!isSelected}
              size="sm"
              label={option.label}
              icon={isSelected ? <Check size={14} /> : undefined}
              onPress={() => setForm(prev => ({...prev, relationship: option.value}))}
            />
          );
        })}
      </HStack>
      {errors.relationship && <Text fontSize={12} color="danger" mt={4}>{errors.relationship}</Text>}
    </Box>
  );

  return (
    <AlphaLayout title={t('profile.references.title')} headerStyle="solid" rightActions={items.length > 0 ? headerRight : undefined}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.identifier}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={items.length === 0 ? styles.emptyContainer : styles.listContainer}
        refreshing={loading}
        onRefresh={() => accountRef && dispatch(profileActions.loadReferences(accountRef))}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeModal}>
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          {/* Modal Header */}
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
              icon={<X size={24} />}
              onPress={closeModal}
            />
            <Text fontSize={17} fontWeight="700" color="text-primary">
              {editingItem ? t('profile.references.editTitle') : t('profile.references.addTitle')}
            </Text>
            <Box w={24} />
          </HStack>

          <ScrollView style={styles.formScroll} contentContainerStyle={styles.formContent} keyboardShouldPersistTaps="handled">
            {/* Full Name */}
            <Box mb={20}>
              <KitsInputText
                id="fullName"
                label={t('profile.references.fields.fullName')}
                required
                value={form.fullName}
                onChange={(e: any) => setForm(prev => ({...prev, fullName: extractValue(e)}))}
                placeholder={t('profile.references.fields.fullNamePlaceholder')}
                errors={errors.fullName}
              />
            </Box>

            {/* Relationship Picker */}
            {renderRelationshipPicker()}

            {/* Email */}
            <Box mb={20}>
              <KitsInputText
                id="email"
                label={`${t('profile.references.fields.email')}${!form.phone?.trim() ? ' *' : ''}`}
                value={form.email ?? ''}
                onChange={(e: any) => {
                  const v = extractValue(e);
                  setForm(prev => ({...prev, email: v || null}));
                }}
                placeholder={t('profile.references.fields.emailPlaceholder')}
                localProps={{keyboardType: 'email-address', autoCapitalize: 'none'}}
                errors={errors.email}
              />
            </Box>

            {/* Phone */}
            <Box mb={20}>
              <KitsInputText
                id="phone"
                label={`${t('profile.references.fields.phone')}${!form.email?.trim() ? ' *' : ''}`}
                value={form.phone ?? ''}
                onChange={(e: any) => {
                  const v = extractValue(e);
                  setForm(prev => ({...prev, phone: v || null}));
                }}
                placeholder={t('profile.references.fields.phonePlaceholder')}
                localProps={{keyboardType: 'phone-pad'}}
                errors={errors.phone}
              />
            </Box>

            {/* Company */}
            <Box mb={20}>
              <KitsInputText
                id="company"
                label={`${t('profile.references.fields.company')}${isWorkRelationship ? ' *' : ''}`}
                value={form.company ?? ''}
                onChange={(e: any) => {
                  const v = extractValue(e);
                  setForm(prev => ({...prev, company: v || null}));
                }}
                placeholder={t('profile.references.fields.companyPlaceholder')}
                errors={errors.company}
              />
            </Box>

            {/* Job Title */}
            <Box mb={20}>
              <KitsInputText
                id="jobTitle"
                label={`${t('profile.references.fields.jobTitle')}${isWorkRelationship ? ' *' : ''}`}
                value={form.jobTitle ?? ''}
                onChange={(e: any) => {
                  const v = extractValue(e);
                  setForm(prev => ({...prev, jobTitle: v || null}));
                }}
                placeholder={t('profile.references.fields.jobTitlePlaceholder')}
                errors={errors.jobTitle}
              />
            </Box>

            {/* Known Since */}
            <Box mb={20}>
              <KitsInputText
                id="knownSince"
                label={t('profile.references.fields.knownSince')}
                value={form.knownSince ?? ''}
                onChange={(e: any) => {
                  const v = extractValue(e);
                  setForm(prev => ({...prev, knownSince: v || null}));
                }}
                placeholder={t('profile.references.fields.knownSincePlaceholder')}
              />
            </Box>
          </ScrollView>

          {/* Submit */}
          <Box p={16} borderTopWidth={1} borderColor="border">
            <Button
              label={editingItem ? t('profile.references.updateButton') : t('profile.references.addButton')}
              onPress={handleSubmit}
              w="100%"
            />
          </Box>
        </KeyboardAvoidingView>
      </Modal>
    </AlphaLayout>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {flexGrow: 1},
  listContainer: {padding: 16, gap: 12},
  cardName: {flexShrink: 1},
  modalContainer: {flex: 1},
  formScroll: {flex: 1},
  formContent: {padding: 16},
});

export default ReferencesScreen;
