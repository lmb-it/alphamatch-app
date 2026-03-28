/**
 * QualificationsScreen
 * Portfolio tab — certifications and awards list with add/edit form.
 */
import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {Text, Flex, Box, HStack, Button, KitsInputText, KitsInputTextarea, useLanguage} from '@lmb-it/kitsconcerto';
import {Award, Plus, X, Edit2, Trash2} from 'lucide-react-native';
import {useDispatch, useSelector} from 'react-redux';
import AlphaLayout from '@src/layouts/AlphaLayout';
import {profileActions} from '../store/profile.slice';
import {selectQualifications} from '../store/profile.selectors';
import {selectActiveWorkspaceId} from '@src/modules/Workspace/store/workspace.selectors';
import type {IQualification, ICreateQualification} from '../models/profile.types';

const EMPTY_FORM: ICreateQualification = {
  title: '',
  organisation: '',
  summary: null,
  year: new Date().getFullYear(),
};

/** Extract string value from KitsConcerto onChange event */
const extractValue = (e: any): string => e?.target?.value ?? e ?? '';

const QualificationsScreen: React.FC = () => {
  const dispatch = useDispatch();
  const {t} = useLanguage();
  const accountRef = useSelector(selectActiveWorkspaceId);
  const {items, loading} = useSelector(selectQualifications);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<IQualification | null>(null);
  const [form, setForm] = useState<ICreateQualification>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (accountRef) {
      dispatch(profileActions.loadQualifications(accountRef));
    }
  }, [accountRef, dispatch]);

  const openAdd = useCallback(() => {
    setEditingItem(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setModalVisible(true);
  }, []);

  const openEdit = useCallback((item: IQualification) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      organisation: item.organisation,
      summary: item.summary ?? null,
      year: item.year,
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
    if (!form.title.trim()) next.title = t('profile.qualifications.validation.titleRequired');
    if (!form.organisation.trim()) next.organisation = t('profile.qualifications.validation.organisationRequired');
    if (!form.year || isNaN(Number(form.year))) next.year = t('profile.qualifications.validation.yearRequired');
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (!validate() || !accountRef) return;
    const payload: ICreateQualification = {
      title: form.title.trim(),
      organisation: form.organisation.trim(),
      summary: form.summary?.trim() || null,
      year: Number(form.year),
    };
    if (editingItem) {
      dispatch(profileActions.updateQualification({ref: accountRef, itemRef: editingItem.identifier, data: payload}));
    } else {
      dispatch(profileActions.createQualification({ref: accountRef, data: payload}));
    }
    closeModal();
  };

  const handleDelete = (item: IQualification) => {
    Alert.alert(
      t('profile.qualifications.deleteConfirmTitle'),
      t('profile.qualifications.deleteConfirmMessage'),
      [
        {text: t('profile.qualifications.cancel'), style: 'cancel'},
        {
          text: t('profile.qualifications.delete'),
          style: 'destructive',
          onPress: () => {
            if (accountRef) {
              dispatch(profileActions.deleteQualification({ref: accountRef, itemRef: item.identifier}));
            }
          },
        },
      ],
    );
  };

  const renderItem = ({item}: {item: IQualification}) => (
    <Box
      flexDirection="row"
      alignItems="center"
      p={16}
      borderRadius={12}
      borderWidth={1}
      bgColor="surface"
      borderColor="border">
      <Box flex={1} mr={12}>
        <Text fontSize={16} fontWeight="700" color="text-primary" numberOfLines={1}>
          {item.title}
        </Text>
        <Text fontSize={14} color="text-subtle" mt={2}>
          {item.organisation}
        </Text>
        <Text fontSize={13} color="text-subtle" mt={2}>
          {item.year}
        </Text>
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
      <Award color="#999" size={48} />
      <Text fontSize={16} fontWeight="600" color="text-primary" mt={16}>
        {t('profile.qualifications.emptyTitle')}
      </Text>
      <Text fontSize={14} color="text-subtle" textAlign="center" mt={8}>
        {t('profile.qualifications.emptyDescription')}
      </Text>
      <Button
        label={t('profile.qualifications.addButton')}
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

  return (
    <AlphaLayout title={t('profile.qualifications.title')} headerStyle="solid" rightActions={items.length > 0 ? headerRight : undefined}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.identifier}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={items.length === 0 ? styles.emptyContainer : styles.listContainer}
        refreshing={loading}
        onRefresh={() => accountRef && dispatch(profileActions.loadQualifications(accountRef))}
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
              {editingItem ? t('profile.qualifications.editTitle') : t('profile.qualifications.addTitle')}
            </Text>
            <Box w={24} />
          </HStack>

          <ScrollView style={styles.formScroll} contentContainerStyle={styles.formContent}>
            {/* Title */}
            <Box mb={20}>
              <KitsInputText
                id="title"
                label={t('profile.qualifications.fields.certificateName')}
                required
                value={form.title}
                onChange={(e: any) => setForm(prev => ({...prev, title: extractValue(e)}))}
                placeholder={t('profile.qualifications.fields.certificateNamePlaceholder')}
                errors={errors.title}
              />
            </Box>

            {/* Organisation */}
            <Box mb={20}>
              <KitsInputText
                id="organisation"
                label={t('profile.qualifications.fields.organisation')}
                required
                value={form.organisation}
                onChange={(e: any) => setForm(prev => ({...prev, organisation: extractValue(e)}))}
                placeholder={t('profile.qualifications.fields.organisationPlaceholder')}
                errors={errors.organisation}
              />
            </Box>

            {/* Summary */}
            <Box mb={20}>
              <KitsInputTextarea
                id="summary"
                label={t('profile.qualifications.fields.summary')}
                value={form.summary ?? ''}
                onChange={(e: any) => {
                  const v = extractValue(e);
                  setForm(prev => ({...prev, summary: v || null}));
                }}
                placeholder={t('profile.qualifications.fields.summaryPlaceholder')}
              />
            </Box>

            {/* Year */}
            <Box mb={20}>
              <KitsInputText
                id="year"
                label={t('profile.qualifications.fields.year')}
                required
                value={String(form.year ?? '')}
                onChange={(e: any) => setForm(prev => ({...prev, year: Number(extractValue(e).replace(/[^0-9]/g, '')) || 0}))}
                placeholder={t('profile.qualifications.fields.yearPlaceholder')}
                localProps={{keyboardType: 'number-pad'}}
                errors={errors.year}
              />
            </Box>
          </ScrollView>

          {/* Submit */}
          <Box p={16} borderTopWidth={1} borderColor="border">
            <Button
              label={editingItem ? t('profile.qualifications.updateButton') : t('profile.qualifications.addButton')}
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
  modalContainer: {flex: 1},
  formScroll: {flex: 1},
  formContent: {padding: 16},
});

export default QualificationsScreen;
