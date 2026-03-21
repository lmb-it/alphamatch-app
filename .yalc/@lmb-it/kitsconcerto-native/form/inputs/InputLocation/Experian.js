import axios from 'axios';

const Lookup_URL = "https://api.experianaperture.io/";
class Experian {
  constructor(API_KEY) {
    this.API_KEY = "";
    this.searchAddress = async (pSearchTerm, pCountryISO = "AUS") => {
      const mData = {
        country_iso: pCountryISO,
        max_suggestions: 5,
        // "datasets": pDataSet,
        components: {
          unspecified: [pSearchTerm]
        }
      };
      return await this.sendRequest("POST", `${Lookup_URL}address/search/v1`, mData);
    };
    this.getDataSetForCountry = async (pCountryISO = "AUS") => {
      return await this.sendRequest("GET", `${Lookup_URL}address/datasets/v1`, { country_iso: pCountryISO });
    };
    this.formatAddress = async (pGlobalAddressKey) => {
      return await this.sendRequest("GET", `${Lookup_URL}address/format/v1`, pGlobalAddressKey, { "Add-Components": true });
    };
    this.validateEmail = async (pEmail) => {
      const mData = {
        email: pEmail
      };
      return await this.sendRequest("POST", `${Lookup_URL}email/validate/v2`, mData, { "Add-Metadata": true });
    };
    this.validatePhoneNumber = async (pPhoneNumber, pCountryCode = "AUS") => {
      const mData = {
        number: pPhoneNumber,
        output_format: "NATIONAL",
        cache_value_days: 0,
        country_iso: pCountryCode,
        get_ported_date: true,
        get_disposable_number: true
      };
      return await this.sendRequest("POST", `${Lookup_URL}phone/validate/v2`, mData, { "Add-Metadata": true });
    };
    this.sendRequest = async (pRequestMethod, pRequestEndPoint, pData, pHeaders = {}) => {
      const mHeaders = {
        "Auth-Token": this.API_KEY,
        "Content-type": "application/json",
        ...pHeaders
      };
      const mOptions = {
        url: pRequestEndPoint,
        mode: "cors",
        method: pRequestMethod,
        headers: mHeaders
      };
      if (pRequestMethod === "GET") {
        if (typeof pData === "string") {
          mOptions.url += `/${pData}`;
        } else {
          mOptions.url += "?" + new URLSearchParams(pData).toString();
        }
      } else {
        mOptions.data = JSON.stringify(pData);
      }
      return axios(mOptions);
    };
    this.API_KEY = API_KEY;
  }
}

export { Experian as default };
//# sourceMappingURL=Experian.js.map
