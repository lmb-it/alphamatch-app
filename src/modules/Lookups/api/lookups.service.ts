import api from '@src/services/api';
import {URLs} from '@src/services/urls';
import type {INationalityOption, ILanguageOption} from '../models/lookups.types';

/**
 * Fetch nationalities from geo_countries — returns { label, value: iso2 }
 */
export async function fetchNationalities(): Promise<INationalityOption[]> {
  const res = await api.get(URLs.lookups.countries);
  const countries = res.data?.data ?? [];
  return countries
    .filter((c: any) => c.nationality)
    .map((c: any) => ({
      label: `${c.emoji ?? ''} ${c.nationality}`.trim(),
      value: c.iso2,
    }))
    .sort((a: INationalityOption, b: INationalityOption) => a.label.localeCompare(b.label));
}

/**
 * Fetch languages — returns { label, value: iso_2 }
 */
export async function fetchLanguages(): Promise<ILanguageOption[]> {
  const res = await api.get(URLs.lookups.languages);
  const langs = res.data?.data ?? [];
  return langs
    .map((l: any) => ({
      label: l.name,
      value: l.ref,
    }))
    .sort((a: ILanguageOption, b: ILanguageOption) => a.label.localeCompare(b.label));
}
