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
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {Text, Flex, Button, useKitsTheme} from '@lmb-it/kitsconcerto';
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

const PortfolioScreen: React.FC = () => {
  const dispatch = useDispatch();
  const {resolveToken} = useKitsTheme();
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
    if (!form.heading.trim()) next.heading = 'Title is required';
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
      'Delete Portfolio Item',
      `Are you sure you want to delete "${item.heading}"?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
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
    if (start) return `From ${start}`;
    return `Until ${end}`;
  };

  const primaryColor = resolveToken('primary');
  const textColor = resolveToken('text-primary');
  const subtleColor = resolveToken('text-subtle');
  const surfaceColor = resolveToken('surface');
  const borderColor = resolveToken('border');
  const bgColor = resolveToken('bg');
  const dangerColor = resolveToken('danger') || '#e74c3c';

  const renderItem = ({item}: {item: IPortfolioItemDetail}) => {
    const dateRange = formatDateRange(item.startedOn, item.endedOn);
    return (
      <View style={[styles.card, {backgroundColor: surfaceColor, borderColor}]}>
        <View style={styles.cardContent}>
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
        </View>
        <View style={styles.cardActions}>
          <TouchableOpacity onPress={() => openEdit(item)} hitSlop={8} style={styles.actionBtn}>
            <Edit2 size={18} color={primaryColor} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item)} hitSlop={8} style={styles.actionBtn}>
            <Trash2 size={18} color={dangerColor} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderEmpty = () => (
    <Flex flex={1} justifyContent="center" alignItems="center" px={20} py={40}>
      <FolderOpen color={subtleColor} size={48} />
      <Text fontSize={16} fontWeight="600" color="text-primary" mt={16}>
        No portfolio projects yet
      </Text>
      <Text fontSize={14} color="text-subtle" textAlign="center" mt={8}>
        Showcase your best work by adding projects to your portfolio.
      </Text>
      <Button
        label="Add Project"
        icon={<Plus size={18} color="#fff" />}
        mt={24}
        onPress={openAdd}
      />
    </Flex>
  );

  const headerRight = (
    <TouchableOpacity onPress={openAdd} hitSlop={8}>
      <Plus size={24} color={primaryColor} />
    </TouchableOpacity>
  );

  return (
    <AlphaLayout title="Portfolio" headerStyle="solid" rightActions={items.length > 0 ? headerRight : undefined}>
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
          style={[styles.modalContainer, {backgroundColor: bgColor}]}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          {/* Modal Header */}
          <View style={[styles.modalHeader, {borderBottomColor: borderColor}]}>
            <TouchableOpacity onPress={closeModal} hitSlop={8}>
              <X size={24} color={textColor} />
            </TouchableOpacity>
            <Text fontSize={17} fontWeight="700" color="text-primary">
              {editingItem ? 'Edit Project' : 'Add Project'}
            </Text>
            <View style={{width: 24}} />
          </View>

          <ScrollView style={styles.formScroll} contentContainerStyle={styles.formContent} keyboardShouldPersistTaps="handled">
            {/* Heading */}
            <View style={styles.fieldGroup}>
              <Text fontSize={14} fontWeight="600" color="text-primary" mb={6}>
                Title <Text color="danger">*</Text>
              </Text>
              <TextInput
                style={[styles.input, {color: textColor, borderColor: errors.heading ? dangerColor : borderColor, backgroundColor: surfaceColor}]}
                value={form.heading}
                onChangeText={(v) => setForm(prev => ({...prev, heading: v}))}
                placeholder="e.g. Kitchen Renovation — Bondi"
                placeholderTextColor={subtleColor}
              />
              {errors.heading && <Text fontSize={12} color="danger" mt={4}>{errors.heading}</Text>}
            </View>

            {/* Summary */}
            <View style={styles.fieldGroup}>
              <Text fontSize={14} fontWeight="600" color="text-primary" mb={6}>
                Description
              </Text>
              <TextInput
                style={[styles.input, styles.multiline, {color: textColor, borderColor, backgroundColor: surfaceColor}]}
                value={form.summary ?? ''}
                onChangeText={(v) => setForm(prev => ({...prev, summary: v || null}))}
                placeholder="Describe the project, scope, and your role"
                placeholderTextColor={subtleColor}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            {/* Start Date */}
            <View style={styles.fieldGroup}>
              <Text fontSize={14} fontWeight="600" color="text-primary" mb={6}>
                Start Date
              </Text>
              <TextInput
                style={[styles.input, {color: textColor, borderColor, backgroundColor: surfaceColor}]}
                value={form.startedOn ?? ''}
                onChangeText={(v) => setForm(prev => ({...prev, startedOn: v || null}))}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={subtleColor}
              />
            </View>

            {/* End Date */}
            <View style={styles.fieldGroup}>
              <Text fontSize={14} fontWeight="600" color="text-primary" mb={6}>
                End Date
              </Text>
              <TextInput
                style={[styles.input, {color: textColor, borderColor, backgroundColor: surfaceColor}]}
                value={form.endedOn ?? ''}
                onChangeText={(v) => setForm(prev => ({...prev, endedOn: v || null}))}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={subtleColor}
              />
            </View>

            {/* External Link */}
            <View style={styles.fieldGroup}>
              <Text fontSize={14} fontWeight="600" color="text-primary" mb={6}>
                Project Link
              </Text>
              <TextInput
                style={[styles.input, {color: textColor, borderColor, backgroundColor: surfaceColor}]}
                value={form.externalLink ?? ''}
                onChangeText={(v) => setForm(prev => ({...prev, externalLink: v || null}))}
                placeholder="https://example.com/project"
                placeholderTextColor={subtleColor}
                keyboardType="url"
                autoCapitalize="none"
              />
            </View>
          </ScrollView>

          {/* Submit */}
          <View style={[styles.modalFooter, {borderTopColor: borderColor}]}>
            <Button
              label={editingItem ? 'Update' : 'Add Project'}
              onPress={handleSubmit}
              width="100%"
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </AlphaLayout>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {flexGrow: 1},
  listContainer: {padding: 16, gap: 12},
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  cardContent: {flex: 1, marginRight: 12},
  cardActions: {flexDirection: 'row', gap: 12},
  actionBtn: {padding: 4},
  modalContainer: {flex: 1},
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  formScroll: {flex: 1},
  formContent: {padding: 16, gap: 20},
  fieldGroup: {},
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  multiline: {minHeight: 100, paddingTop: 12},
  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
  },
});

export default PortfolioScreen;
