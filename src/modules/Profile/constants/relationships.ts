import type {ICreateReference} from '../models/profile.types';

type Relationship = ICreateReference['relationship'];

/**
 * Relationship options for references form.
 * Uses translation function to support i18n.
 */
export const getRelationshipOptions = (t: (key: string) => string): {value: Relationship; label: string}[] => [
  {value: 'manager', label: t('profile.references.relationship.manager')},
  {value: 'colleague', label: t('profile.references.relationship.colleague')},
  {value: 'client', label: t('profile.references.relationship.client')},
  {value: 'friend', label: t('profile.references.relationship.friend')},
  {value: 'other', label: t('profile.references.relationship.other')},
];

/** Relationships that require company + job title fields */
export const WORK_RELATIONSHIPS: Relationship[] = ['manager', 'colleague', 'client'];
