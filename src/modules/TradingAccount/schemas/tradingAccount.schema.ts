/**
 * Zod schemas for runtime validation of TradingAccount API responses.
 *
 * These schemas validate data coming from the backend before it enters Redux.
 * They mirror the TypeScript interfaces in ../models/tradingAccount.types.ts.
 */
import {z} from 'zod';

// ─── Atomic schemas ─────────────────────────────────────────────────────────

export const DetectedCareerSchema = z.object({
  identifier: z.string(),
  name: z.string(),
  categoryName: z.string(),
  model: z.enum(['flex', 'pro']),
  confidence: z.number(),
  availableInLocation: z.boolean(),
});

export const AnsweredQuestionSchema = z.object({
  fieldRef: z.string(),
  fieldLabel: z.string(),
  fieldType: z.string(),
  extractedValue: z.string(),
});

export const UnansweredQuestionSchema = z.object({
  fieldRef: z.string(),
  fieldLabel: z.string(),
  fieldName: z.string(),
  fieldType: z.string(),
  dbType: z.string(),
  isRequired: z.boolean(),
  placeholder: z.string().nullable(),
  helpText: z.string().nullable(),
  order: z.number(),
  options: z.array(z.object({label: z.string(), value: z.string()})).optional(),
  isMulti: z.boolean().optional(),
  validation: z.record(z.string(), z.unknown()).optional(),
});

export const AIAnalysisResultSchema = z.object({
  detectedCareer: DetectedCareerSchema,
  alternativeCareers: z.array(
    z.object({
      identifier: z.string(),
      name: z.string(),
      confidence: z.number(),
    }),
  ),
  answeredQuestions: z.array(AnsweredQuestionSchema),
  unansweredQuestions: z.array(UnansweredQuestionSchema),
  unmatchedContent: z.array(z.string()),
});

export const CareerOptionSchema = z.object({
  identifier: z.string(),
  title: z.string(),
  summary: z.string().nullable(),
  categoryName: z.string().nullable(),
  businessModel: z.string().nullable(),
});

export const SubscriptionPlanSchema = z.object({
  identifier: z.string(),
  title: z.string(),
  summary: z.string().nullable(),
  cost: z.number(),
  cycle: z.string(),
  trialDays: z.number(),
  perks: z.array(z.string()),
  stripePriceId: z.string().nullable(),
});

export const DocumentFormFieldSchema = z.object({
  fieldRef: z.string(),
  fieldLabel: z.string(),
  fieldName: z.string(),
  fieldType: z.string(),
  placeholder: z.string().nullable(),
  options: z.unknown().nullable(),
  validation: z.record(z.string(), z.unknown()).nullable(),
  order: z.number(),
});

export const DocumentFormSchema = z.object({
  identifier: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  fields: z.array(DocumentFormFieldSchema),
});

export const DocumentExpiryRulesSchema = z.object({
  hasExpiry: z.boolean(),
  expirySource: z.string().nullable(),
  validityPeriodDays: z.number().nullable(),
  reminderSchedule: z.unknown().nullable(),
  actionOnExpiry: z.string().nullable(),
  gracePeriodDays: z.number().nullable(),
});

export const DocumentRequirementSchema = z.object({
  id: z.number(),
  uuid: z.string(),
  identifier: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  category: z.string().nullable(),
  reviewRequired: z.boolean(),
  expiryRules: DocumentExpiryRulesSchema.nullable(),
  form: DocumentFormSchema.nullable(),
});

export const TradingAccountDetailSchema = z.object({
  identifier: z.string(),
  accountName: z.string().nullable(),
  shortBio: z.string().nullable(),
  careerRef: z.string().nullable(),
  careerName: z.string().nullable(),
  careerModel: z.string().nullable(),
  avatar: z.string().nullable(),
  isActive: z.boolean(),
  isVerified: z.boolean(),
  setupStatus: z.string(),
  contactPhone: z.string().nullable(),
  locationType: z.string().nullable(),
  fullAddress: z.string().nullable(),
  zipCode: z.string().nullable(),
  countryName: z.string().nullable(),
  stateName: z.string().nullable(),
  cityName: z.string().nullable(),
  createdAt: z.string(),
});

export const FinalizeResultSchema = z.object({
  tradingAccount: TradingAccountDetailSchema,
  nextStep: z.string(),
});

export const SetupIntentSchema = z.object({
  clientSecret: z.string(),
  ephemeralKey: z.string(),
  customerId: z.string(),
  publishableKey: z.string(),
});

// ─── Tier schemas ───────────────────────────────────────────────────────────

export const VerificationTierSchema = z.object({
  ref: z.string(),
  name: z.string(),
  level: z.number(),
  badgeLabel: z.string(),
  badgeColor: z.string(),
});

export const TierConditionInfoSchema = z.object({
  condition_type: z.enum(['document', 'electronic_verification', 'points_threshold']),
  description: z.string(),
});

export const RequiredDocumentWithStatusSchema = z.object({
  ref: z.string(),
  name: z.string(),
  isMandatory: z.boolean(),
  status: z.enum([
    'not_submitted',
    'pending',
    'approved',
    'rejected',
    'expiring_soon',
    'expired',
  ]),
});

export const RequiredDocumentsResponseSchema = z.object({
  currentTier: VerificationTierSchema.nullable(),
  requiredTier: z
    .object({
      ref: z.string(),
      name: z.string(),
      level: z.number(),
      enforcement: z.string(),
    })
    .nullable(),
  tierConditions: z.array(TierConditionInfoSchema),
  documents: z.array(RequiredDocumentWithStatusSchema),
  pointsSystem: z.object({
    enabled: z.boolean(),
    currentPoints: z.number(),
    requiredPoints: z.number().nullable(),
  }),
});

export const TierStatusSchema = z.object({
  currentTier: VerificationTierSchema.nullable(),
  achievedAt: z.string().nullable(),
  calculationMethod: z.string().nullable(),
  points: z.object({
    enabled: z.boolean(),
    current: z.number(),
    required: z.number().nullable(),
  }),
  nextTier: z
    .object({
      ref: z.string(),
      name: z.string(),
      level: z.number(),
    })
    .nullable(),
});
