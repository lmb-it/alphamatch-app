/**
 * PortfolioScreen
 * Portfolio tab — project portfolio list with add/edit form.
 */
import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {Text, Flex, Box, HStack, Button, KitsInputText, KitsInputTextarea, useLanguage} from '@lmb-it/kitsconcerto';
import {FolderOpen, Plus, X, Edit2, Trash2} from 'lucide-react-native';
import {useDispatch, useSelector} from 'react-redux';
import AlphaLayout from '@src/layouts/AlphaLayout';
import {profileActions} from '../store/profile.slice';
import {selectPortfolioItems} from '../store/profile.selectors';
import {selectActiveWorkspaceId} from '@src/modules/Workspace/store/workspace.selectors';
import type {IPortfolioItemDetail, ICreatePortfolioItem} from '../models/profile.types';

const EMPTY_FORM: ICreatePortfolioItem = {
  heading: '',
  summary: null,
  startedOn: null,
  endedOn: null,
  externalLink: null,
};

/** Extract string value from KitsConcerto onChange event */
const extractValue = (e: any): string => e?.target?.value ?? e ?? '';

const PortfolioScreen: React.FC = () => {
  const dispatch = useDispatch();
  const {t} = useLanguage();
  const accountRef = useSelector(selectActiveWorkspaceId);
  const {items, loading} = useSelector(selectPortfolioItems);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<IPortfolioItemDetail | null>(null);
  const [form, setForm] = useState<ICreatePortfolioItem>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (accountRef) {
      dispatch(profileActions.loadPortfolioItems(accountRef));
    }
  }, [accountRef, dispatch]);

  const openAdd = useCallback(() => {
    setEditingItem(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setModalVisible(true);
  }, []);

  const openEdit = useCallback((item: IPortfolioItemDetail) => {
    setEditingItem(item);
    setForm({
      heading: item.heading,
      summary: item.summary ?? null,
      startedOn: item.startedOn ?? null,
      endedOn: item.endedOn ?? null,
      externalLink: item.externalLink ?? null,
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
    if (!form.heading.trim()) next.heading = t('profile.portfolio.validation.titleRequired');
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (!validate() || !accountRef) return;
    const payload: ICreatePortfolioItem = {
      heading: form.heading.trim(),
      summary: form.summary?.trim() || null,
      startedOn: form.startedOn?.trim() || null,
      endedOn: form.endedOn?.trim() || null,
      externalLink: form.externalLink?.trim() || null,
    };
    if (editingItem) {
      dispatch(profileActions.updatePortfolioItem({ref: accountRef, itemRef: editingItem.identifier, data: payload}));
    } else {
      dispatch(profileActions.createPortfolioItem({ref: accountRef, data: payload}));
    }
    closeModal();
  };

  const handleDelete = (item: IPortfolioItemDetail) => {
    Alert.alert(
      t('profile.portfolio.deleteConfirmTitle'),
      t('profile.portfolio.deleteConfirmMessage'),
      [
        {text: t('profile.portfolio.cancel'), style: 'cancel'},
        {
          text: t('profile.portfolio.delete'),
          style: 'destructive',
          onPress: () => {
            if (accountRef) {
              dispatch(profileActions.deletePortfolioItem({ref: accountRef, itemRef: item.identifier}));
            }
          },
        },
      ],
    );
  };

  const formatDateRange = (start: string | null, end: string | null): string | null => {
    if (!start && !end) return null;
    if (start && end) return `${start} - ${end}`;
    if (start) return `${t('profile.portfolio.dateFrom')} ${start}`;
    return `${t('profile.portfolio.dateUntil')} ${end}`;
  };

  const renderItem = ({item}: {item: IPortfolioItemDetail}) => {
    const dateRange = formatDateRange(item.startedOn, item.endedOn);
    return (
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
            {item.heading}
          </Text>
          {item.summary && (
            <Text fontSize={14} color="text-subtle" mt={2} numberOfLines={2}>
              {item.summary}
            </Text>
          )}
          {dateRange && (
            <Text fontSize={13} color="text-subtle" mt={2}>
              {dateRange}
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
  };

  const renderEmpty = () => (
    <Flex flex={1} justifyContent="center" alignItems="center" px={20} py={40}>
      <FolderOpen color="#999" size={48} />
      <Text fontSize={16} fontWeight="600" color="text-primary" mt={16}>
        {t('profile.portfolio.emptyTitle')}
      </Text>
      <Text fontSize={14} color="text-subtle" textAlign="center" mt={8}>
        {t('profile.portfolio.emptyDescription')}
      </Text>
      <Button
        label={t('profile.portfolio.addButton')}
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
    <AlphaLayout title={t('profile.portfolio.title')} headerStyle="solid" rightActions={items.length > 0 ? headerRight : undefined}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.identifier}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={items.length === 0 ? styles.emptyContainer : styles.listContainer}
        refreshing={loading}
        onRefresh={() => accountRef && dispatch(profileActions.loadPortfolioItems(accountRef))}
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
              {editingItem ? t('profile.portfolio.editTitle') : t('profile.portfolio.addTitle')}
            </Text>
            <Box w={24} />
          </HStack>

          <ScrollView style={styles.formScroll} contentContainerStyle={styles.formContent} keyboardShouldPersistTaps="handled">
            {/* Heading */}
            <Box mb={20}>
              <KitsInputText
                id="heading"
                label={t('profile.portfolio.fields.title')}
                required
                value={form.heading}
                onChange={(e: any) => setForm(prev => ({...prev, heading: extractValue(e)}))}
                placeholder={t('profile.portfolio.fields.titlePlaceholder')}
                errors={errors.heading}
              />
            </Box>

            {/* Summary */}
            <Box mb={20}>
              <KitsInputTextarea
                id="summary"
                label={t('profile.portfolio.fields.description')}
                value={form.summary ?? ''}
                onChange={(e: any) => {
                  const v = extractValue(e);
                  setForm(prev => ({...prev, summary: v || null}));
                }}
                placeholder={t('profile.portfolio.fields.descriptionPlaceholder')}
              />
            </Box>

            {/* Start Date */}
            <Box mb={20}>
              <KitsInputText
                id="startedOn"
                label={t('profile.portfolio.fields.startDate')}
                value={form.startedOn ?? ''}
                onChange={(e: any) => {
                  const v = extractValue(e);
                  setForm(prev => ({...prev, startedOn: v || null}));
                }}
                placeholder="YYYY-MM-DD"
              />
            </Box>

            {/* End Date */}
            <Box mb={20}>
              <KitsInputText
                id="endedOn"
                label={t('profile.portfolio.fields.endDate')}
                value={form.endedOn ?? ''}
                onChange={(e: any) => {
                  const v = extractValue(e);
                  setForm(prev => ({...prev, endedOn: v || null}));
                }}
                placeholder="YYYY-MM-DD"
              />
            </Box>

            {/* External Link */}
            <Box mb={20}>
              <KitsInputText
                id="externalLink"
                label={t('profile.portfolio.fields.projectLink')}
                value={form.externalLink ?? ''}
                onChange={(e: any) => {
                  const v = extractValue(e);
                  setForm(prev => ({...prev, externalLink: v || null}));
                }}
                placeholder="https://example.com/project"
                localProps={{keyboardType: 'url' as any, autoCapitalize: 'none'}}
              />
            </Box>
          </ScrollView>

          {/* Submit */}
          <Box p={16} borderTopWidth={1} borderColor="border">
            <Button
              label={editingItem ? t('profile.portfolio.updateButton') : t('profile.portfolio.addButton')}
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

export default PortfolioScreen;
