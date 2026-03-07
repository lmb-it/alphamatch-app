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

export interface ILookupsState {
  countries: ICountry[];
  states: IState[];
  cities: ICity[];
  currencies: ICurrency[];
  careers: ICareer[];
  loading: Record<string, boolean>;
  errors: Record<string, string | null>;
}
