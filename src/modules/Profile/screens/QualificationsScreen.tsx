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
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {Text, Flex, Button, useKitsTheme} from '@lmb-it/kitsconcerto';
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

const QualificationsScreen: React.FC = () => {
  const dispatch = useDispatch();
  const {resolveToken} = useKitsTheme();
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
    if (!form.title.trim()) next.title = 'Certificate/award name is required';
    if (!form.organisation.trim()) next.organisation = 'Organisation is required';
    if (!form.year || isNaN(Number(form.year))) next.year = 'Year is required';
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
      'Delete Qualification',
      `Are you sure you want to delete "${item.title}"?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
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

  const primaryColor = resolveToken('primary');
  const textColor = resolveToken('text-primary');
  const subtleColor = resolveToken('text-subtle');
  const surfaceColor = resolveToken('surface');
  const borderColor = resolveToken('border');
  const bgColor = resolveToken('bg');
  const dangerColor = resolveToken('danger') || '#e74c3c';

  const renderItem = ({item}: {item: IQualification}) => (
    <View style={[styles.card, {backgroundColor: surfaceColor, borderColor}]}>
      <View style={styles.cardContent}>
        <Text fontSize={16} fontWeight="700" color="text-primary" numberOfLines={1}>
          {item.title}
        </Text>
        <Text fontSize={14} color="text-subtle" mt={2}>
          {item.organisation}
        </Text>
        <Text fontSize={13} color="text-subtle" mt={2}>
          {item.year}
        </Text>
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

  const renderEmpty = () => (
    <Flex flex={1} justifyContent="center" alignItems="center" px={20} py={40}>
      <Award color={subtleColor} size={48} />
      <Text fontSize={16} fontWeight="600" color="text-primary" mt={16}>
        No qualifications added yet
      </Text>
      <Text fontSize={14} color="text-subtle" textAlign="center" mt={8}>
        Add certifications and awards to highlight your expertise.
      </Text>
      <Button
        label="Add Qualification"
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
    <AlphaLayout title="Qualifications" headerStyle="solid" rightActions={items.length > 0 ? headerRight : undefined}>
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
          style={[styles.modalContainer, {backgroundColor: bgColor}]}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          {/* Modal Header */}
          <View style={[styles.modalHeader, {borderBottomColor: borderColor}]}>
            <TouchableOpacity onPress={closeModal} hitSlop={8}>
              <X size={24} color={textColor} />
            </TouchableOpacity>
            <Text fontSize={17} fontWeight="700" color="text-primary">
              {editingItem ? 'Edit Qualification' : 'Add Qualification'}
            </Text>
            <View style={{width: 24}} />
          </View>

          <ScrollView style={styles.formScroll} contentContainerStyle={styles.formContent}>
            {/* Title */}
            <View style={styles.fieldGroup}>
              <Text fontSize={14} fontWeight="600" color="text-primary" mb={6}>
                Certificate/Award Name <Text color="danger">*</Text>
              </Text>
              <TextInput
                style={[styles.input, {color: textColor, borderColor: errors.title ? dangerColor : borderColor, backgroundColor: surfaceColor}]}
                value={form.title}
                onChangeText={(v) => setForm(prev => ({...prev, title: v}))}
                placeholder="e.g. AWS Certified Solutions Architect"
                placeholderTextColor={subtleColor}
              />
              {errors.title && <Text fontSize={12} color="danger" mt={4}>{errors.title}</Text>}
            </View>

            {/* Organisation */}
            <View style={styles.fieldGroup}>
              <Text fontSize={14} fontWeight="600" color="text-primary" mb={6}>
                Conferring Organisation <Text color="danger">*</Text>
              </Text>
              <TextInput
                style={[styles.input, {color: textColor, borderColor: errors.organisation ? dangerColor : borderColor, backgroundColor: surfaceColor}]}
                value={form.organisation}
                onChangeText={(v) => setForm(prev => ({...prev, organisation: v}))}
                placeholder="e.g. Amazon Web Services"
                placeholderTextColor={subtleColor}
              />
              {errors.organisation && <Text fontSize={12} color="danger" mt={4}>{errors.organisation}</Text>}
            </View>

            {/* Summary */}
            <View style={styles.fieldGroup}>
              <Text fontSize={14} fontWeight="600" color="text-primary" mb={6}>
                Summary
              </Text>
              <TextInput
                style={[styles.input, styles.multiline, {color: textColor, borderColor, backgroundColor: surfaceColor}]}
                value={form.summary ?? ''}
                onChangeText={(v) => setForm(prev => ({...prev, summary: v || null}))}
                placeholder="Brief description of the qualification"
                placeholderTextColor={subtleColor}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>

            {/* Year */}
            <View style={styles.fieldGroup}>
              <Text fontSize={14} fontWeight="600" color="text-primary" mb={6}>
                Year <Text color="danger">*</Text>
              </Text>
              <TextInput
                style={[styles.input, {color: textColor, borderColor: errors.year ? dangerColor : borderColor, backgroundColor: surfaceColor}]}
                value={String(form.year ?? '')}
                onChangeText={(v) => setForm(prev => ({...prev, year: Number(v.replace(/[^0-9]/g, '')) || 0}))}
                placeholder="e.g. 2023"
                placeholderTextColor={subtleColor}
                keyboardType="number-pad"
                maxLength={4}
              />
              {errors.year && <Text fontSize={12} color="danger" mt={4}>{errors.year}</Text>}
            </View>
          </ScrollView>

          {/* Submit */}
          <View style={[styles.modalFooter, {borderTopColor: borderColor}]}>
            <Button
              label={editingItem ? 'Update' : 'Add Qualification'}
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
  multiline: {minHeight: 80, paddingTop: 12},
  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
  },
});

export default QualificationsScreen;
