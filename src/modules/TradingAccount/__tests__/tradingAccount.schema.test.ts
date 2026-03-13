import {
  TradingAccountDetailSchema,
  AIAnalysisResultSchema,
  CareerOptionSchema,
  SubscriptionPlanSchema,
  DocumentRequirementSchema,
  UnansweredQuestionSchema,
  SetupIntentSchema,
  FinalizeResultSchema,
} from '../schemas';

describe('Zod schemas', () => {
  describe('TradingAccountDetailSchema', () => {
    it('parses a valid trading account', () => {
      const data = {
        identifier: 'TA-001',
        accountName: 'Test',
        shortBio: null,
        careerName: 'Plumber',
        careerModel: 'pro',
        avatar: null,
        isActive: true,
        isVerified: false,
        setupStatus: 'active',
        contactPhone: null,
        locationType: null,
        fullAddress: '123 St',
        zipCode: '2000',
        countryName: 'Australia',
        stateName: 'NSW',
        cityName: 'Sydney',
        createdAt: '2026-01-01T00:00:00Z',
      };
      const result = TradingAccountDetailSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('rejects missing required fields', () => {
      const result = TradingAccountDetailSchema.safeParse({identifier: 'TA-001'});
      expect(result.success).toBe(false);
    });
  });

  describe('AIAnalysisResultSchema', () => {
    it('parses a valid AI result', () => {
      const data = {
        detectedCareer: {
          identifier: 'CAR-1',
          name: 'Plumber',
          categoryName: 'Trade',
          model: 'pro',
          confidence: 0.95,
          availableInLocation: true,
        },
        alternativeCareers: [{identifier: 'CAR-2', name: 'Electrician', confidence: 0.6}],
        answeredQuestions: [],
        unansweredQuestions: [],
        unmatchedContent: ['some extra text'],
      };
      const result = AIAnalysisResultSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('rejects invalid career model', () => {
      const data = {
        detectedCareer: {
          identifier: 'CAR-1',
          name: 'Plumber',
          categoryName: 'Trade',
          model: 'invalid',
          confidence: 0.95,
          availableInLocation: true,
        },
        alternativeCareers: [],
        answeredQuestions: [],
        unansweredQuestions: [],
        unmatchedContent: [],
      };
      const result = AIAnalysisResultSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('CareerOptionSchema', () => {
    it('parses valid career options', () => {
      const data = {
        identifier: 'CAR-1',
        title: 'Plumber',
        summary: 'Fix pipes',
        categoryName: 'Trade',
        businessModel: 'pro',
      };
      const result = CareerOptionSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('allows null for optional fields', () => {
      const data = {
        identifier: 'CAR-1',
        title: 'Test',
        summary: null,
        categoryName: null,
        businessModel: null,
      };
      const result = CareerOptionSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('SubscriptionPlanSchema', () => {
    it('parses a valid plan', () => {
      const data = {
        identifier: 'PLN-1',
        title: 'Basic',
        summary: null,
        cost: 29.99,
        cycle: 'monthly',
        trialDays: 14,
        perks: ['Feature A', 'Feature B'],
        stripePriceId: 'price_xxx',
      };
      const result = SubscriptionPlanSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('DocumentRequirementSchema', () => {
    it('parses valid document requirement', () => {
      const data = {
        identifier: 'DOC-1',
        documentName: "Driver's License",
        isMandatory: true,
        uploadStatus: 'pending',
      };
      const result = DocumentRequirementSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('UnansweredQuestionSchema', () => {
    it('parses a question with options', () => {
      const data = {
        fieldRef: 'FLD-1',
        fieldLabel: 'License Type',
        fieldName: 'license_type',
        fieldType: 'Select',
        dbType: 'select',
        isRequired: true,
        placeholder: 'Choose one',
        helpText: null,
        order: 1,
        options: [{label: 'A', value: 'a'}, {label: 'B', value: 'b'}],
        isMulti: false,
      };
      const result = UnansweredQuestionSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('parses a question without options', () => {
      const data = {
        fieldRef: 'FLD-2',
        fieldLabel: 'Name',
        fieldName: 'name',
        fieldType: 'Text',
        dbType: 'text',
        isRequired: false,
        placeholder: null,
        helpText: null,
        order: 2,
      };
      const result = UnansweredQuestionSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('SetupIntentSchema', () => {
    it('parses valid Stripe setup intent', () => {
      const data = {
        clientSecret: 'seti_xxx_secret_xxx',
        ephemeralKey: 'ek_xxx',
        customerId: 'cus_xxx',
        publishableKey: 'pk_test_xxx',
      };
      const result = SetupIntentSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe('FinalizeResultSchema', () => {
    it('parses valid finalize response', () => {
      const data = {
        tradingAccount: {
          identifier: 'TA-001',
          accountName: 'Test',
          shortBio: null,
          careerName: 'Plumber',
          careerModel: 'pro',
          avatar: null,
          isActive: false,
          isVerified: false,
          setupStatus: 'pending_verification',
          contactPhone: null,
          locationType: null,
          fullAddress: null,
          zipCode: null,
          countryName: null,
          stateName: null,
          cityName: null,
          createdAt: '2026-01-01T00:00:00Z',
        },
        nextStep: 'verification',
      };
      const result = FinalizeResultSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });
});
