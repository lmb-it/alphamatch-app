import type { IAddressFormatResults, IAddressSearchResults, ICountrySearchResults, IEmailSearchResults, IPhoneValidationResults } from '@lmb/kitsconcerto-types';
declare class Experian {
    API_KEY: string;
    constructor(API_KEY: string);
    searchAddress: IAddressSearchResults;
    getDataSetForCountry: ICountrySearchResults;
    formatAddress: IAddressFormatResults;
    validateEmail: IEmailSearchResults;
    validatePhoneNumber: IPhoneValidationResults;
    sendRequest: (pRequestMethod: "POST" | "GET", pRequestEndPoint: any, pData: any, pHeaders?: {}) => Promise<import("axios").AxiosResponse<any, any, {}>>;
}
export default Experian;
//# sourceMappingURL=Experian.d.ts.map