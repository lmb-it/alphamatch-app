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
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {Text, Flex, Button, useKitsTheme} from '@lmb-it/kitsconcerto';
import {Users, Plus, X, Edit2, Trash2, Check} from 'lucide-react-native';
import {useDispatch, useSelector} from 'react-redux';
import AlphaLayout from '@src/layouts/AlphaLayout';
import {profileActions} from '../store/profile.slice';
import {selectReferences} from '../store/profile.selectors';
import {selectActiveWorkspaceId} from '@src/modules/Workspace/store/workspace.selectors';
import type {IReference, ICreateReference} from '../models/profile.types';

type Relationship = ICreateReference['relationship'];

const RELATIONSHIP_OPTIONS: {value: Relationship; label: string}[] = [
  {value: 'manager', label: 'Manager'},
  {value: 'colleague', label: 'Colleague'},
  {value: 'client', label: 'Client'},
  {value: 'friend', label: 'Friend'},
  {value: 'other', label: 'Other'},
];

const WORK_RELATIONSHIPS: Relationship[] = ['manager', 'colleague', 'client'];

const EMPTY_FORM: ICreateReference = {
  fullName: '',
  relationship: 'colleague',
  email: null,
  phone: null,
  company: null,
  jobTitle: null,
  knownSince: null,
};

const ReferencesScreen: React.FC = () => {
  const dispatch = useDispatch();
  const {resolveToken} = useKitsTheme();
  const accountRef = useSelector(selectActiveWorkspaceId);
  const {items, loading} = useSelector(selectReferences);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<IReference | null>(null);
  const [form, setForm] = useState<ICreateReference>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    if (!form.fullName.trim()) next.fullName = 'Full name is required';
    if (!form.relationship) next.relationship = 'Relationship is required';

    const hasEmail = !!form.email?.trim();
    const hasPhone = !!form.phone?.trim();
    if (!hasEmail && !hasPhone) {
      next.email = 'Email or phone is required';
      next.phone = 'Email or phone is required';
    }

    if (isWorkRelationship) {
      if (!form.company?.trim()) next.company = 'Company is required for this relationship';
      if (!form.jobTitle?.trim()) next.jobTitle = 'Job title is required for this relationship';
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
      'Delete Reference',
      `Are you sure you want to delete "${item.fullName}"?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
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

  const primaryColor = resolveToken('primary');
  const textColor = resolveToken('text-primary');
  const subtleColor = resolveToken('text-subtle');
  const surfaceColor = resolveToken('surface');
  const borderColor = resolveToken('border');
  const bgColor = resolveToken('bg');
  const dangerColor = resolveToken('danger') || '#e74c3c';

  const getRelationshipLabel = (value: Relationship) =>
    RELATIONSHIP_OPTIONS.find(o => o.value === value)?.label ?? value;

  const renderItem = ({item}: {item: IReference}) => (
    <View style={[styles.card, {backgroundColor: surfaceColor, borderColor}]}>
      <View style={styles.cardContent}>
        <View style={styles.cardTitleRow}>
          <Text fontSize={16} fontWeight="700" color="text-primary" numberOfLines={1} style={styles.cardName}>
            {item.fullName}
          </Text>
          <View style={[styles.badge, {backgroundColor: primaryColor + '1A'}]}>
            <Text fontSize={11} fontWeight="600" color="primary">
              {getRelationshipLabel(item.relationship)}
            </Text>
          </View>
        </View>
        {item.company && (
          <Text fontSize={14} color="text-subtle" mt={2}>
            {item.company}
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

  const renderEmpty = () => (
    <Flex flex={1} justifyContent="center" alignItems="center" px={20} py={40}>
      <Users color={subtleColor} size={48} />
      <Text fontSize={16} fontWeight="600" color="text-primary" mt={16}>
        No references added yet
      </Text>
      <Text fontSize={14} color="text-subtle" textAlign="center" mt={8}>
        Add professional references to build trust with potential clients.
      </Text>
      <Button
        label="Add Reference"
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

  const renderRelationshipPicker = () => (
    <View style={styles.fieldGroup}>
      <Text fontSize={14} fontWeight="600" color="text-primary" mb={6}>
        Relationship <Text color="danger">*</Text>
      </Text>
      <View style={styles.relationshipRow}>
        {RELATIONSHIP_OPTIONS.map(option => {
          const isSelected = form.relationship === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              onPress={() => setForm(prev => ({...prev, relationship: option.value}))}
              style={[
                styles.relationshipChip,
                {
                  borderColor: isSelected ? primaryColor : borderColor,
                  backgroundColor: isSelected ? primaryColor + '1A' : surfaceColor,
                },
              ]}>
              {isSelected && <Check size={14} color={primaryColor} style={{marginRight: 4}} />}
              <Text fontSize={13} fontWeight={isSelected ? '600' : '400'} color={isSelected ? 'primary' : 'text-primary'}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {errors.relationship && <Text fontSize={12} color="danger" mt={4}>{errors.relationship}</Text>}
    </View>
  );

  return (
    <AlphaLayout title="References" headerStyle="solid" rightActions={items.length > 0 ? headerRight : undefined}>
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
          style={[styles.modalContainer, {backgroundColor: bgColor}]}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          {/* Modal Header */}
          <View style={[styles.modalHeader, {borderBottomColor: borderColor}]}>
            <TouchableOpacity onPress={closeModal} hitSlop={8}>
              <X size={24} color={textColor} />
            </TouchableOpacity>
            <Text fontSize={17} fontWeight="700" color="text-primary">
              {editingItem ? 'Edit Reference' : 'Add Reference'}
            </Text>
            <View style={{width: 24}} />
          </View>

          <ScrollView style={styles.formScroll} contentContainerStyle={styles.formContent} keyboardShouldPersistTaps="handled">
            {/* Full Name */}
            <View style={styles.fieldGroup}>
              <Text fontSize={14} fontWeight="600" color="text-primary" mb={6}>
                Full Name <Text color="danger">*</Text>
              </Text>
              <TextInput
                style={[styles.input, {color: textColor, borderColor: errors.fullName ? dangerColor : borderColor, backgroundColor: surfaceColor}]}
                value={form.fullName}
                onChangeText={(v) => setForm(prev => ({...prev, fullName: v}))}
                placeholder="e.g. John Smith"
                placeholderTextColor={subtleColor}
              />
              {errors.fullName && <Text fontSize={12} color="danger" mt={4}>{errors.fullName}</Text>}
            </View>

            {/* Relationship Picker */}
            {renderRelationshipPicker()}

            {/* Email */}
            <View style={styles.fieldGroup}>
              <Text fontSize={14} fontWeight="600" color="text-primary" mb={6}>
                Email {!form.phone?.trim() ? <Text color="danger">*</Text> : null}
              </Text>
              <TextInput
                style={[styles.input, {color: textColor, borderColor: errors.email ? dangerColor : borderColor, backgroundColor: surfaceColor}]}
                value={form.email ?? ''}
                onChangeText={(v) => setForm(prev => ({...prev, email: v || null}))}
                placeholder="john@example.com"
                placeholderTextColor={subtleColor}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && <Text fontSize={12} color="danger" mt={4}>{errors.email}</Text>}
            </View>

            {/* Phone */}
            <View style={styles.fieldGroup}>
              <Text fontSize={14} fontWeight="600" color="text-primary" mb={6}>
                Phone {!form.email?.trim() ? <Text color="danger">*</Text> : null}
              </Text>
              <TextInput
                style={[styles.input, {color: textColor, borderColor: errors.phone ? dangerColor : borderColor, backgroundColor: surfaceColor}]}
                value={form.phone ?? ''}
                onChangeText={(v) => setForm(prev => ({...prev, phone: v || null}))}
                placeholder="+61 400 000 000"
                placeholderTextColor={subtleColor}
                keyboardType="phone-pad"
              />
              {errors.phone && <Text fontSize={12} color="danger" mt={4}>{errors.phone}</Text>}
            </View>

            {/* Company */}
            <View style={styles.fieldGroup}>
              <Text fontSize={14} fontWeight="600" color="text-primary" mb={6}>
                Company {isWorkRelationship ? <Text color="danger">* Required</Text> : null}
              </Text>
              <TextInput
                style={[styles.input, {color: textColor, borderColor: errors.company ? dangerColor : borderColor, backgroundColor: surfaceColor}]}
                value={form.company ?? ''}
                onChangeText={(v) => setForm(prev => ({...prev, company: v || null}))}
                placeholder="e.g. Acme Corp"
                placeholderTextColor={subtleColor}
              />
              {errors.company && <Text fontSize={12} color="danger" mt={4}>{errors.company}</Text>}
            </View>

            {/* Job Title */}
            <View style={styles.fieldGroup}>
              <Text fontSize={14} fontWeight="600" color="text-primary" mb={6}>
                Job Title {isWorkRelationship ? <Text color="danger">* Required</Text> : null}
              </Text>
              <TextInput
                style={[styles.input, {color: textColor, borderColor: errors.jobTitle ? dangerColor : borderColor, backgroundColor: surfaceColor}]}
                value={form.jobTitle ?? ''}
                onChangeText={(v) => setForm(prev => ({...prev, jobTitle: v || null}))}
                placeholder="e.g. Senior Developer"
                placeholderTextColor={subtleColor}
              />
              {errors.jobTitle && <Text fontSize={12} color="danger" mt={4}>{errors.jobTitle}</Text>}
            </View>

            {/* Known Since */}
            <View style={styles.fieldGroup}>
              <Text fontSize={14} fontWeight="600" color="text-primary" mb={6}>
                Known Since
              </Text>
              <TextInput
                style={[styles.input, {color: textColor, borderColor, backgroundColor: surfaceColor}]}
                value={form.knownSince ?? ''}
                onChangeText={(v) => setForm(prev => ({...prev, knownSince: v || null}))}
                placeholder="e.g. Since 2019"
                placeholderTextColor={subtleColor}
              />
            </View>
          </ScrollView>

          {/* Submit */}
          <View style={[styles.modalFooter, {borderTopColor: borderColor}]}>
            <Button
              label={editingItem ? 'Update' : 'Add Reference'}
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
  cardTitleRow: {flexDirection: 'row', alignItems: 'center', gap: 8},
  cardName: {flexShrink: 1},
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
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
  relationshipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  relationshipChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
  },
});

export default ReferencesScreen;
