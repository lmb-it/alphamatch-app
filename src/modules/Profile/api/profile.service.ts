import api from '@src/services/api';
import {URLs, resolveUrl} from '@src/services/urls';
import type {
  IProfileData, ISwitchWorkspacePayload, IUpdateProfilePayload,
  IExperience, IEducation, IQualification, IReference, IPortfolioItemDetail,
  ICreateExperience, ICreateEducation, ICreateQualification, ICreateReference, ICreatePortfolioItem,
  IAddress, ICreateAddress,
} from '../models/profile.types';

export async function fetchProfileApi(): Promise<IProfileData> {
  const response = await api.get(URLs.profile.me);
  return response.data.data;
}

export async function updateProfileApi(payload: IUpdateProfilePayload): Promise<IProfileData> {
  const response = await api.patch(URLs.profile.update, payload);
  return response.data.data.user;
}

export async function uploadAvatarApi(imageUri: string): Promise<void> {
  const formData = new FormData();
  formData.append('image', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'avatar.jpg',
  } as any);
  // Content-Type must be undefined to clear the default 'application/json' header.
  // React Native's transport layer sets 'multipart/form-data; boundary=...' automatically.
  await api.post(URLs.profile.avatar, formData, {
    headers: {'Content-Type': undefined},
  });
}

export async function uploadCoverApi(imageUri: string): Promise<void> {
  const formData = new FormData();
  formData.append('image', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'cover.jpg',
  } as any);
  await api.post(URLs.profile.cover, formData, {
    headers: {'Content-Type': undefined},
  });
}

export async function switchWorkspaceApi(payload: ISwitchWorkspacePayload): Promise<string | null> {
  const response = await api.post(URLs.profile.switchWorkspace, payload);
  return response.data.data.activeWorkspace;
}

// ══ ADDRESSES ══════════════════════════════════════════════════════════════

export async function getAddressesApi(): Promise<IAddress[]> {
  const res = await api.get(URLs.profile.addresses);
  return res.data.data.addresses;
}

export async function createAddressApi(data: ICreateAddress): Promise<any> {
  const res = await api.post(URLs.profile.addresses, data);
  return res.data;
}

export async function updateAddressApi(ref: string, data: Partial<ICreateAddress>): Promise<any> {
  const res = await api.put(resolveUrl(URLs.profile.addressItem, {ref}), data);
  return res.data;
}

export async function deleteAddressApi(ref: string): Promise<any> {
  const res = await api.delete(resolveUrl(URLs.profile.addressItem, {ref}));
  return res.data;
}

// ══ EXPERIENCE ══════════════════════════════════════════════════════════════

export async function getExperiencesApi(ref: string): Promise<IExperience[]> {
  const res = await api.get(resolveUrl(URLs.tradingAccounts.experience, {ref}));
  return res.data.data;
}

export async function createExperienceApi(ref: string, data: ICreateExperience): Promise<any> {
  const res = await api.post(resolveUrl(URLs.tradingAccounts.experience, {ref}), data);
  return res.data;
}

export async function updateExperienceApi(ref: string, itemRef: string, data: ICreateExperience): Promise<any> {
  const res = await api.put(resolveUrl(URLs.tradingAccounts.experienceItem, {ref, itemRef}), data);
  return res.data;
}

export async function deleteExperienceApi(ref: string, itemRef: string): Promise<any> {
  const res = await api.delete(resolveUrl(URLs.tradingAccounts.experienceItem, {ref, itemRef}));
  return res.data;
}

// ══ EDUCATION ═══════════════════════════════════════════════════════════════

export async function getEducationApi(ref: string): Promise<IEducation[]> {
  const res = await api.get(resolveUrl(URLs.tradingAccounts.education, {ref}));
  return res.data.data;
}

export async function createEducationApi(ref: string, data: ICreateEducation): Promise<any> {
  const res = await api.post(resolveUrl(URLs.tradingAccounts.education, {ref}), data);
  return res.data;
}

export async function updateEducationApi(ref: string, itemRef: string, data: ICreateEducation): Promise<any> {
  const res = await api.put(resolveUrl(URLs.tradingAccounts.educationItem, {ref, itemRef}), data);
  return res.data;
}

export async function deleteEducationApi(ref: string, itemRef: string): Promise<any> {
  const res = await api.delete(resolveUrl(URLs.tradingAccounts.educationItem, {ref, itemRef}));
  return res.data;
}

// ══ QUALIFICATIONS ══════════════════════════════════════════════════════════

export async function getQualificationsApi(ref: string): Promise<IQualification[]> {
  const res = await api.get(resolveUrl(URLs.tradingAccounts.qualifications, {ref}));
  return res.data.data;
}

export async function createQualificationApi(ref: string, data: ICreateQualification): Promise<any> {
  const res = await api.post(resolveUrl(URLs.tradingAccounts.qualifications, {ref}), data);
  return res.data;
}

export async function updateQualificationApi(ref: string, itemRef: string, data: ICreateQualification): Promise<any> {
  const res = await api.put(resolveUrl(URLs.tradingAccounts.qualificationItem, {ref, itemRef}), data);
  return res.data;
}

export async function deleteQualificationApi(ref: string, itemRef: string): Promise<any> {
  const res = await api.delete(resolveUrl(URLs.tradingAccounts.qualificationItem, {ref, itemRef}));
  return res.data;
}

// ══ REFERENCES ══════════════════════════════════════════════════════════════

export async function getReferencesApi(ref: string): Promise<IReference[]> {
  const res = await api.get(resolveUrl(URLs.tradingAccounts.references, {ref}));
  return res.data.data;
}

export async function createReferenceApi(ref: string, data: ICreateReference): Promise<any> {
  const res = await api.post(resolveUrl(URLs.tradingAccounts.references, {ref}), data);
  return res.data;
}

export async function updateReferenceApi(ref: string, itemRef: string, data: ICreateReference): Promise<any> {
  const res = await api.put(resolveUrl(URLs.tradingAccounts.referenceItem, {ref, itemRef}), data);
  return res.data;
}

export async function deleteReferenceApi(ref: string, itemRef: string): Promise<any> {
  const res = await api.delete(resolveUrl(URLs.tradingAccounts.referenceItem, {ref, itemRef}));
  return res.data;
}

// ══ PORTFOLIO ITEMS ═════════════════════════════════════════════════════════

export async function getPortfolioItemsApi(ref: string): Promise<IPortfolioItemDetail[]> {
  const res = await api.get(resolveUrl(URLs.tradingAccounts.portfolio, {ref}));
  return res.data.data;
}

export async function createPortfolioItemApi(ref: string, data: ICreatePortfolioItem): Promise<any> {
  const res = await api.post(resolveUrl(URLs.tradingAccounts.portfolio, {ref}), data);
  return res.data;
}

export async function updatePortfolioItemApi(ref: string, itemRef: string, data: ICreatePortfolioItem): Promise<any> {
  const res = await api.put(resolveUrl(URLs.tradingAccounts.portfolioItem, {ref, itemRef}), data);
  return res.data;
}

export async function deletePortfolioItemApi(ref: string, itemRef: string): Promise<any> {
  const res = await api.delete(resolveUrl(URLs.tradingAccounts.portfolioItem, {ref, itemRef}));
  return res.data;
}

/**
 * Fetch countries list for nationality dropdown.
 * Returns array of { label: nationality name, value: iso2 code }
 */
export async function fetchNationalitiesApi(): Promise<Array<{label: string; value: string}>> {
  const res = await api.get(URLs.lookups.countries);
  const countries = res.data?.data ?? [];
  return countries
    .filter((c: any) => c.nationality)
    .map((c: any) => ({
      label: `${c.emoji ?? ''} ${c.nationality}`.trim(),
      value: c.iso2,
    }))
    .sort((a: any, b: any) => a.label.localeCompare(b.label));
}

/**
 * Fetch all active languages for the language selector.
 * Returns { label: "English", value: "en" } format.
 */
export async function fetchLanguagesApi(): Promise<Array<{label: string; value: string}>> {
  const res = await api.get(URLs.lookups.languages);
  const langs = res.data?.data ?? [];
  return langs
    .map((l: any) => ({
      label: l.name,
      value: l.ref, // iso_2 code
    }))
    .sort((a: any, b: any) => a.label.localeCompare(b.label));
}
