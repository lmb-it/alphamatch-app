export interface PhoneOutputObject {
    countryCode: string;
    nationalNumber: string;
    internationalFormatted: string;
    nationalFormatted: string;
    iso: string;
}
interface UsePhoneInputOptions {
    value?: any;
    onChange?: (value: any) => void;
    outputFormat?: 'string' | 'object';
    isWithCountryCode?: boolean;
    defaultCountry?: string;
    includedCountries?: string[];
    excludedCountries?: string[];
}
interface UsePhoneInputReturn {
    displayValue: string;
    e164Value: string;
    objectValue: PhoneOutputObject | null;
    countryISO: string | null;
    countryFlagUrl: string | null;
    handleChange: (raw: string) => void;
}
declare function extractDigits(str: string): string;
/**
 * Normalize ANY incoming value shape to a raw digit string.
 * Handles: E.164 strings, legacy {phone, code} objects, IPhoneObjectValue objects, plain strings.
 */
declare function normalizeIncomingValue(value: any): string;
declare function toE164(input: string): string;
export declare function usePhoneInput({ value, onChange, outputFormat, isWithCountryCode, defaultCountry, includedCountries, excludedCountries, }: UsePhoneInputOptions): UsePhoneInputReturn;
export { normalizeIncomingValue, toE164, extractDigits };
//# sourceMappingURL=usePhoneInput.d.ts.map