/**
 * TradingAccount form types — extracted from BasicInformationScreen and AccountDetailsScreen
 */

export interface IBasicInfoForm {
  profileImage?: Record<string, unknown>;
  firstName: string;
  lastName: string;
  businessName?: string;
  shortBio?: string;
  contactPhone?: string;
  contactEmail?: string;
  fullAddress: string;
}

export interface IAccountDetailsForm {
  accountName: string;
  shortBio: string;
  contactPhone: string;
  fullAddress: string;
  zipCode: string;
}
