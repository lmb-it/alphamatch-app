/**
 * Lookups module types (shared geo/reference data)
 */
export interface ICountry {
  ref: number;
  label: string;
  emoji: string;
  code: string;
}

export interface IState {
  ref: number;
  label: string;
  countryRef: number;
}

export interface ICity {
  ref: number;
  label: string;
  stateRef: number;
  countryRef: number;
}

export interface ICurrency {
  ref: string;
  code: string;
  name: string;
  symbol: string;
}

export interface ICareer {
  ref: string;
  label: string;
  categoryRef: string;
  categoryLabel: string;
}

/** Nationality option for dropdowns — { label: "🇦🇺 Australian", value: "AU" } */
export interface INationalityOption {
  label: string;
  value: string;
}

/** Language option for dropdowns — { label: "English", value: "en" } */
export interface ILanguageOption {
  label: string;
  value: string;
}

export interface ILookupsState {
  countries: ICountry[];
  states: IState[];
  cities: ICity[];
  currencies: ICurrency[];
  careers: ICareer[];
  nationalities: INationalityOption[];
  languages: ILanguageOption[];
  loading: Record<string, boolean>;
  errors: Record<string, string | null>;
}
