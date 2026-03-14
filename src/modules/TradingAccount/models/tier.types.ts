/**
 * Tier-based verification types
 *
 * Mirrors the response shapes from the backend mobile API:
 * - GET /api/app/trading-accounts/{ref}/tier-status
 * - GET /api/app/trading-accounts/{ref}/required-documents
 */

export interface IVerificationTier {
  ref: string;
  name: string;
  level: number;
  badgeLabel: string;
  badgeColor: string;
}

export interface ITierConditionInfo {
  condition_type: 'document' | 'electronic_verification' | 'points_threshold';
  description: string;
}

export interface IRequiredDocumentWithStatus {
  ref: string;
  name: string;
  isMandatory: boolean;
  status:
    | 'not_submitted'
    | 'pending'
    | 'approved'
    | 'rejected'
    | 'expiring_soon'
    | 'expired';
}

export interface IPointsSystem {
  enabled: boolean;
  currentPoints: number;
  requiredPoints: number | null;
}

export interface IRequiredTierInfo {
  ref: string;
  name: string;
  level: number;
  enforcement: string;
}

export interface IRequiredDocumentsResponse {
  currentTier: IVerificationTier | null;
  requiredTier: IRequiredTierInfo | null;
  tierConditions: ITierConditionInfo[];
  documents: IRequiredDocumentWithStatus[];
  pointsSystem: IPointsSystem;
}

export interface ITierStatusPoints {
  enabled: boolean;
  current: number;
  required: number | null;
}

export interface INextTierInfo {
  ref: string;
  name: string;
  level: number;
}

export interface ITierStatus {
  currentTier: IVerificationTier | null;
  achievedAt: string | null;
  calculationMethod: string | null;
  points: ITierStatusPoints;
  nextTier: INextTierInfo | null;
}

export interface ITierHistory {
  id: number;
  fromTier: IVerificationTier | null;
  toTier: IVerificationTier;
  changeType: 'upgrade' | 'downgrade' | 'initial' | 'manual_override';
  changeReason: string | null;
  createdAt: string;
}
