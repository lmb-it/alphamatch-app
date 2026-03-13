# AlphaMatch App - Complete Architecture & Flow

> React Native + Expo | Redux + Redux Saga | React Navigation
> **Primary color:** `#20AAB0` (teal)

---

## Table of Contents

- [High-Level Architecture](#high-level-architecture)
- [Entry Points](#entry-points)
- [Navigation Flow Diagram](#navigation-flow-diagram)
- [Auth Flow](#auth-flow)
- [Workspace System](#workspace-system)
- [Module Breakdown](#module-breakdown)
  - [Auth Module](#auth-module)
  - [Profile Module](#profile-module)
  - [TradingAccount Module](#tradingaccount-module)
  - [Workspace Module](#workspace-module)
  - [Home Module](#home-module)
  - [Jobs Module](#jobs-module)
  - [Chat Module](#chat-module)
  - [Payments Module](#payments-module)
- [Screens Reference](#screens-reference)
- [Shared Components](#shared-components)
- [Services & API Endpoints](#services--api-endpoints)
- [State Management](#state-management)
- [Button Handlers & Interactions](#button-handlers--interactions)
- [Configuration](#configuration)

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         App.tsx (Entry)                         │
│              Redux Provider + Navigation Container              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   isAuthenticated?                                              │
│   ├── NO  → AuthNavigator                                      │
│   │         ├── SplashScreen                                    │
│   │         ├── LanguageSelectionScreen                         │
│   │         ├── LoginScreen                                     │
│   │         ├── RegisterScreen                                  │
│   │         ├── ForgotPasswordScreen                            │
│   │         └── VerifyOTPScreen                                 │
│   │                                                             │
│   └── YES → MainTabNavigator                                   │
│             ├── [Tab 1] HomeStack                               │
│             │   ├── HomeScreen (context-aware)                  │
│             │   ├── JobPosting (customer modal)                 │
│             │   ├── JobDetailWorker                             │
│             │   └── SubmitProposal                              │
│             ├── [Tab 2] MyJobsStack                             │
│             │   ├── MyJobsScreen (context-aware)                │
│             │   ├── JobDetailClient / JobDetailWorker           │
│             │   ├── ProposalDetail                              │
│             │   ├── PayDeposit                                  │
│             │   └── ProjectDetail                               │
│             ├── [Tab 3] MessagesStack                           │
│             │   ├── MessagesScreen                              │
│             │   └── ChatRoomScreen                              │
│             └── [Tab 4] ProfileStack                            │
│                 ├── ProfileScreen (context-aware)               │
│                 ├── MyAccount / EditProfile                     │
│                 ├── Settings / Documents / Support              │
│                 ├── Wallet / Earnings / TransactionHistory      │
│                 ├── WorkspaceSwitching                          │
│                 └── TradingAccountCreation (nested navigator)   │
│                     ├── Intro → BasicInfo → AIInput             │
│                     ├── CareerSelection → CareerConfirmation    │
│                     ├── MissingQuestions → TAConfirmation       │
│                     ├── [Pro]  TAProConfirmation → Verification │
│                     ├── [Flex] FlexSubscription                 │
│                     └── Completion                              │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                        Redux Store                              │
│  ┌──────────┐ ┌──────────┐ ┌────────────────┐ ┌─────────────┐  │
│  │   auth   │ │ profile  │ │ tradingAccount │ │  workspace  │  │
│  │(persist) │ │(persist) │ │                │ │  (persist)  │  │
│  └──────────┘ └──────────┘ └────────────────┘ └─────────────┘  │
│                    Redux Saga (side effects)                    │
├─────────────────────────────────────────────────────────────────┤
│                     API Layer (Axios)                           │
│          Base URL: Config.API_BASE_URL/api/app                 │
│          Auth: Bearer token (AsyncStorage)                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## Entry Points

| File | Purpose |
|------|---------|
| [index.js](index.js) | App registration with Expo |
| [App.tsx](App.tsx) | Root component: Redux Provider, PersistGate, NavigationContainer, 401 handler |
| [src/routes/index.tsx](src/routes/index.tsx) | **RootNavigator** — switches Auth vs Main based on `isAuthenticated` |

---

## Navigation Flow Diagram

### Auth Flow (Unauthenticated)

```
[SplashScreen] ──→ [LanguageSelectionScreen] ──→ [LoginScreen]
                                                    │
                                      ┌─────────────┼──────────────┐
                                      ▼             ▼              ▼
                              [RegisterScreen] [ForgotPassword] [Social Login]
                                      │             │         (Google/Apple)
                                      ▼             ▼              │
                              [VerifyOTPScreen] [VerifyOTPScreen]  │
                                      │             │              │
                                      └─────────────┴──────────────┘
                                                    ▼
                                            ✅ Authenticated
                                         → MainTabNavigator
```

| Navigator | File |
|-----------|------|
| AuthNavigator | [src/routes/AuthNavigator.tsx](src/routes/AuthNavigator.tsx) |

### Main App (Authenticated)

```
┌─────────────── MainTabNavigator ───────────────┐
│                                                  │
│  [Home]     [MyJobs]    [Messages]   [Profile]   │
│    │           │            │            │        │
│    ▼           ▼            ▼            ▼        │
│  HomeStack  MyJobsStack  MsgStack   ProfileStack  │
└──────────────────────────────────────────────────┘
```

| Navigator | File |
|-----------|------|
| MainTabNavigator | [src/routes/MainTabNavigator.tsx](src/routes/MainTabNavigator.tsx) |
| HomeStackNavigator | [src/routes/HomeStackNavigator.tsx](src/routes/HomeStackNavigator.tsx) |
| MyJobsStackNavigator | [src/routes/MyJobsStackNavigator.tsx](src/routes/MyJobsStackNavigator.tsx) |
| MessagesStackNavigator | [src/routes/MessagesStackNavigator.tsx](src/routes/MessagesStackNavigator.tsx) |
| ProfileStackNavigator | [src/routes/ProfileStackNavigator.tsx](src/routes/ProfileStackNavigator.tsx) |
| CustomerJobPostingNavigator | [src/routes/CustomerJobPostingNavigator.tsx](src/routes/CustomerJobPostingNavigator.tsx) |
| CustomerNavigator | [src/routes/CustomerNavigator.tsx](src/routes/CustomerNavigator.tsx) |
| WorkerNavigator | [src/routes/WorkerNavigator.tsx](src/routes/WorkerNavigator.tsx) |
| TradingAccountCreationNavigator | [src/routes/TradingAccountCreationNavigator.tsx](src/routes/TradingAccountCreationNavigator.tsx) |

### Trading Account Creation Flow

```
[IntroScreen]
     │
     ▼
[BasicInformationScreen] ──→ name, phone, location, photo
     │
     ├── AI Path ──→ [AIInputScreen] ──→ describe skills
     │                    │
     │                    ▼
     │              AI analyzes → detected career + Q&A
     │                    │
     └── Manual Path ──→ [CareerSelectionScreen] ──→ pick career
                              │
                              ▼
                    [CareerConfirmationScreen]
                              │
                              ▼
                    [MissingQuestionsScreen] ──→ answer form fields
                              │
                              ▼
                    [TAConfirmationScreen] ──→ finalize account
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
            Alpha Pro Model      Alpha Flex Model
                    │                   │
                    ▼                   ▼
        [TAProConfirmationScreen] [FlexSubscriptionScreen]
                    │                   │
                    ▼                   │
        [VerificationScreen]            │
          upload docs                   │
                    │                   │
                    └─────────┬─────────┘
                              ▼
                    [CompletionScreen] ✅
```

### Customer Job Posting Flow

```
[HomeScreen] ──→ "Let's Go" button
     │
     ▼
[JobPostingBasicInfoScreen] ──→ title, description, budget, photos
     │
     ▼
[JobPostingAIResultsScreen] ──→ AI-matched careers & workers
     │
     ▼
  Job Created ✅
```

---

## Auth Flow

### Files

| Layer | File |
|-------|------|
| Screens | [src/modules/Auth/screens/LoginScreen.tsx](src/modules/Auth/screens/LoginScreen.tsx) |
| | [src/modules/Auth/screens/RegisterScreen.tsx](src/modules/Auth/screens/RegisterScreen.tsx) |
| | [src/modules/Auth/screens/ForgotPasswordScreen.tsx](src/modules/Auth/screens/ForgotPasswordScreen.tsx) |
| | [src/modules/Auth/screens/VerifyOTPScreen.tsx](src/modules/Auth/screens/VerifyOTPScreen.tsx) |
| | [src/modules/Auth/screens/SplashScreen.tsx](src/modules/Auth/screens/SplashScreen.tsx) |
| | [src/modules/Auth/screens/LanguageSelectionScreen.tsx](src/modules/Auth/screens/LanguageSelectionScreen.tsx) |
| Redux Slice | [src/modules/Auth/store/auth.slice.ts](src/modules/Auth/store/auth.slice.ts) |
| Saga | [src/modules/Auth/store/auth.saga.ts](src/modules/Auth/store/auth.saga.ts) |
| Selectors | [src/modules/Auth/store/auth.selectors.ts](src/modules/Auth/store/auth.selectors.ts) |
| API Service | [src/modules/Auth/api/auth.service.ts](src/modules/Auth/api/auth.service.ts) |
| Types | [src/modules/Auth/models/auth.types.ts](src/modules/Auth/models/auth.types.ts) |
| Firebase Phone | [src/modules/Auth/services/firebasePhoneAuth.ts](src/modules/Auth/services/firebasePhoneAuth.ts) |
| Google Auth | [src/modules/Auth/services/googleAuth.ts](src/modules/Auth/services/googleAuth.ts) |
| Apple Auth | [src/modules/Auth/services/appleAuth.ts](src/modules/Auth/services/appleAuth.ts) |
| Layout | [src/modules/Auth/layouts/AlphaAuthLayout.tsx](src/modules/Auth/layouts/AlphaAuthLayout.tsx) |
| Form Constants | [src/modules/Auth/constants/loginFormElements.ts](src/modules/Auth/constants/loginFormElements.ts) |
| | [src/modules/Auth/constants/registerFormElements.ts](src/modules/Auth/constants/registerFormElements.ts) |
| Icons | [src/modules/Auth/components/GoogleIcon.tsx](src/modules/Auth/components/GoogleIcon.tsx) |
| | [src/modules/Auth/components/AppleIcon.tsx](src/modules/Auth/components/AppleIcon.tsx) |

### Auth Sequence

```
LoginScreen
  │
  ├── Email+Password ─→ dispatch(login({email,password}))
  │                        → auth.saga → authService.login()
  │                        → token saved to AsyncStorage
  │                        → dispatch(fetchMe()) → user loaded
  │                        → dispatch(fetchMyAccounts()) [bootstrap]
  │                        → isAuthenticated = true
  │
  ├── Phone+OTP ─────→ dispatch(sendOtp({phone}))
  │                        → firebasePhoneAuth.sendVerificationCode()
  │                        → navigate('VerifyOTP')
  │                        → user enters code
  │                        → dispatch(verifyOtp({phone, firebaseToken}))
  │                        → authService.verifyOtp() → token → success
  │
  ├── Google ────────→ dispatch(socialLogin('google'))
  │                        → googleAuth.signIn() → providerToken
  │                        → authService.socialLogin('google', token)
  │                        → success
  │
  └── Apple ─────────→ dispatch(socialLogin('apple'))
                           → appleAuth.signIn() → providerToken
                           → authService.socialLogin('apple', token)
                           → success
```

### Redux State: `auth`

```typescript
{
  user: IUser | null,           // Current user object
  token: string | null,         // JWT (also in AsyncStorage)
  isAuthenticated: boolean,     // Gates Auth vs Main navigator
  loading: boolean,             // Request in progress
  error: string | null,         // Last error message
  pendingVerification: {...},   // Email verification pending state
  resetContact: string | null,  // Password reset contact info
}
```

### Auth Actions (slice)

| Action | Trigger | Effect |
|--------|---------|--------|
| `login(payload)` | LoginScreen submit | Saga → API → token + user |
| `register(payload)` | RegisterScreen submit | Saga → API → auto-login |
| `socialLogin(provider)` | Google/Apple button | Saga → Firebase → API |
| `sendOtp(payload)` | Phone detected on login | Saga → Firebase OTP |
| `verifyOtp(payload)` | VerifyOTPScreen submit | Saga → API verify |
| `forgotPassword(payload)` | ForgotPasswordScreen | Saga → API reset request |
| `verifyResetCode(payload)` | VerifyOTPScreen (reset) | Saga → API verify code |
| `resetPassword(payload)` | After code verified | Saga → API new password |
| `fetchMe()` | After login/app rehydrate | Saga → API /auth/me |
| `logout()` | Profile confirm logout | Clear token + state |

### API Endpoints: Auth

| Method | Endpoint | Service Function |
|--------|----------|-----------------|
| POST | `/auth/login` | `login(email, password)` |
| POST | `/auth/register` | `register(email, password)` |
| POST | `/auth/logout` | `logout()` |
| POST | `/auth/me` | `me()` |
| POST | `/auth/social-login` | `socialLogin(provider, token)` |
| POST | `/auth/validate-phone` | `validatePhone(phone, context)` |
| POST | `/auth/verify-otp` | `verifyOtp(phone, firebaseToken, context)` |
| POST | `/auth/request-reset` | `forgotPassword(contactInfo)` |
| POST | `/auth/verify-reset-code` | `verifyResetCode(contactInfo, code)` |
| POST | `/auth/reset` | `resetPassword(contactInfo, token, newSecret)` |

---

## Workspace System

The app has a **dual-mode** architecture. Every context-aware screen checks the active workspace to render different content.

### Files

| Layer | File |
|-------|------|
| Redux Slice | [src/modules/Workspace/store/workspace.slice.ts](src/modules/Workspace/store/workspace.slice.ts) |
| Saga | [src/modules/Workspace/store/workspace.saga.ts](src/modules/Workspace/store/workspace.saga.ts) |
| Selectors | [src/modules/Workspace/store/workspace.selectors.ts](src/modules/Workspace/store/workspace.selectors.ts) |
| Types | [src/modules/Workspace/models/workspace.types.ts](src/modules/Workspace/models/workspace.types.ts) |
| Index | [src/modules/Workspace/index.ts](src/modules/Workspace/index.ts) |

### Workspace Modes

```
┌──────────────────────┐          ┌──────────────────────┐
│   Personal Workspace │          │  Trading Account WS  │
│   (Client Mode)      │  ←────→ │  (Worker Mode)       │
│                      │  switch  │                      │
│  • Post jobs         │          │  • Browse jobs       │
│  • Hire workers      │          │  • Submit proposals  │
│  • Manage projects   │          │  • Earn money        │
│  • Pay deposits      │          │  • Manage earnings   │
└──────────────────────┘          └──────────────────────┘
```

### Redux State: `workspace`

```typescript
{
  activeWorkspaceId: string,              // 'personal' or UUID
  activeWorkspaceType: 'personal' | 'trading_account',
  workspaceList: IWorkspaceItem[],        // All available workspaces
  lastActiveTab: WorkspaceTab,            // Persisted: 'Home'|'MyJobs'|'Messages'|'Profile'
}
```

### How Screens Check Workspace

```typescript
// In any context-aware screen:
const activeType = useSelector(selectActiveWorkspaceType);
const isTradeMode = activeType === 'trading_account';

// Then render different content:
if (isTradeMode) { /* worker view */ } else { /* client view */ }
```

### Context-Aware Screens

| Screen | Personal (Client) | Trading Account (Worker) |
|--------|-------------------|--------------------------|
| HomeScreen | Post jobs, AI input | Browse nearby jobs, active projects |
| MyJobsScreen | Posted jobs (Active/Pending/Completed/Cancelled) | Proposals (Pending/Awarded/Active/Completed/Declined) |
| MessagesScreen | Chats with workers | Chats with clients |
| ProfileScreen | My Profile, Trading Accounts, Wallet | Public Profile, Verification, Earnings, Teams |

---

## Module Breakdown

### Auth Module

**Location:** `src/modules/Auth/`

| File | Purpose |
|------|---------|
| [screens/LoginScreen.tsx](src/modules/Auth/screens/LoginScreen.tsx) | Email/phone login + social auth buttons |
| [screens/RegisterScreen.tsx](src/modules/Auth/screens/RegisterScreen.tsx) | Create new account form |
| [screens/ForgotPasswordScreen.tsx](src/modules/Auth/screens/ForgotPasswordScreen.tsx) | Enter email/phone to reset |
| [screens/VerifyOTPScreen.tsx](src/modules/Auth/screens/VerifyOTPScreen.tsx) | Firebase OTP code input |
| [screens/SplashScreen.tsx](src/modules/Auth/screens/SplashScreen.tsx) | Initial load, token check |
| [screens/LanguageSelectionScreen.tsx](src/modules/Auth/screens/LanguageSelectionScreen.tsx) | First-time language picker |
| [store/auth.slice.ts](src/modules/Auth/store/auth.slice.ts) | Redux slice: state + reducers + actions |
| [store/auth.saga.ts](src/modules/Auth/store/auth.saga.ts) | Side effects: API calls, token storage |
| [store/auth.selectors.ts](src/modules/Auth/store/auth.selectors.ts) | `selectUser`, `selectIsAuthenticated`, `selectAuthLoading`, `selectAuthError` |
| [api/auth.service.ts](src/modules/Auth/api/auth.service.ts) | Axios API calls for auth endpoints |
| [models/auth.types.ts](src/modules/Auth/models/auth.types.ts) | `IUser`, `IAuthState`, all payloads |
| [services/firebasePhoneAuth.ts](src/modules/Auth/services/firebasePhoneAuth.ts) | `sendVerificationCode()`, `confirmCode()` |
| [services/googleAuth.ts](src/modules/Auth/services/googleAuth.ts) | `signInWithGoogle()` |
| [services/appleAuth.ts](src/modules/Auth/services/appleAuth.ts) | `signInWithApple()` |
| [layouts/AlphaAuthLayout.tsx](src/modules/Auth/layouts/AlphaAuthLayout.tsx) | Auth screens wrapper layout |
| [constants/loginFormElements.ts](src/modules/Auth/constants/loginFormElements.ts) | Form field definitions for login |
| [constants/registerFormElements.ts](src/modules/Auth/constants/registerFormElements.ts) | Form field definitions for register |
| [components/GoogleIcon.tsx](src/modules/Auth/components/GoogleIcon.tsx) | Google button icon |
| [components/AppleIcon.tsx](src/modules/Auth/components/AppleIcon.tsx) | Apple button icon |

---

### Profile Module

**Location:** `src/modules/Profile/`

| File | Purpose |
|------|---------|
| [screens/ProfileScreen.tsx](src/modules/Profile/screens/ProfileScreen.tsx) | Main profile menu (context-aware) |
| [screens/MyAccountScreen.tsx](src/modules/Profile/screens/MyAccountScreen.tsx) | View profile details |
| [screens/EditProfileScreen.tsx](src/modules/Profile/screens/EditProfileScreen.tsx) | Edit name, phone, bio, avatar |
| [screens/SettingsScreen.tsx](src/modules/Profile/screens/SettingsScreen.tsx) | App settings |
| [screens/DocumentsScreen.tsx](src/modules/Profile/screens/DocumentsScreen.tsx) | Verification documents list |
| [screens/SupportScreen.tsx](src/modules/Profile/screens/SupportScreen.tsx) | Help & support |
| [screens/InviteFriendsScreen.tsx](src/modules/Profile/screens/InviteFriendsScreen.tsx) | Referral / share |
| [screens/TermsAndConditionsScreen.tsx](src/modules/Profile/screens/TermsAndConditionsScreen.tsx) | Legal text |
| [screens/LanguageSettingsScreen.tsx](src/modules/Profile/screens/LanguageSettingsScreen.tsx) | Change app language |
| [screens/WorkspaceSwitchingScreen.tsx](src/modules/Profile/screens/WorkspaceSwitchingScreen.tsx) | Transition animation between workspaces |
| [store/profile.slice.ts](src/modules/Profile/store/profile.slice.ts) | Redux slice: profile data + activeWorkspace |
| [store/profile.saga.ts](src/modules/Profile/store/profile.saga.ts) | Side effects: fetch/update profile, switch workspace |
| [store/profile.selectors.ts](src/modules/Profile/store/profile.selectors.ts) | `selectProfile`, `selectProfileLoading` |
| [api/profile.service.ts](src/modules/Profile/api/profile.service.ts) | API: `fetchProfileApi`, `updateProfileApi`, `uploadAvatarApi`, `uploadCoverApi`, `switchWorkspaceApi` |
| [models/profile.types.ts](src/modules/Profile/models/profile.types.ts) | `IProfile`, `IProfileData`, `ITradingAccountSummary` |
| [components/ProfileHeader.tsx](src/modules/Profile/components/ProfileHeader.tsx) | Profile header with avatar & name |
| [components/MenuItem.tsx](src/modules/Profile/components/MenuItem.tsx) | Menu row item |
| [components/TradingAccountCard.tsx](src/modules/Profile/components/TradingAccountCard.tsx) | TA card in profile |
| [components/WorkspaceSwitcher.tsx](src/modules/Profile/components/WorkspaceSwitcher.tsx) | Workspace switch UI component |

### Profile Actions

| Action | Trigger | Effect |
|--------|---------|--------|
| `fetchProfile()` | App load / profile screen | Saga → API `/profile/me` |
| `switchWorkspace(ref)` | WorkspaceSwitcherSheet | Saga → API → update active workspace |
| `clearProfile()` | Logout | Reset profile state |

### API Endpoints: Profile

| Method | Endpoint | Service Function |
|--------|----------|-----------------|
| GET | `/profile/me` | `fetchProfileApi()` |
| PATCH | `/profile/me` | `updateProfileApi(payload)` |
| POST | `/profile/avatar` | `uploadAvatarApi(imageUri)` |
| POST | `/profile/cover` | `uploadCoverApi(imageUri)` |
| POST | `/profile/switch-workspace` | `switchWorkspaceApi(workspaceRef)` |

---

### TradingAccount Module

**Location:** `src/modules/TradingAccount/`

| File | Purpose |
|------|---------|
| [screens/IntroScreen.tsx](src/modules/TradingAccount/screens/IntroScreen.tsx) | Welcome / explain trading accounts |
| [screens/BasicInformationScreen.tsx](src/modules/TradingAccount/screens/BasicInformationScreen.tsx) | Step 1: name, phone, location, photo |
| [screens/AIInputScreen.tsx](src/modules/TradingAccount/screens/AIInputScreen.tsx) | Step 2: describe skills for AI analysis |
| [screens/CareerSelectionScreen.tsx](src/modules/TradingAccount/screens/CareerSelectionScreen.tsx) | Manual career picker (search + list) |
| [screens/CareerConfirmationScreen.tsx](src/modules/TradingAccount/screens/CareerConfirmationScreen.tsx) | Confirm selected career |
| [screens/MissingQuestionsScreen.tsx](src/modules/TradingAccount/screens/MissingQuestionsScreen.tsx) | Answer required form fields |
| [screens/TAConfirmationScreen.tsx](src/modules/TradingAccount/screens/TAConfirmationScreen.tsx) | Loading → finalize → route by model |
| [screens/TAProConfirmationScreen.tsx](src/modules/TradingAccount/screens/TAProConfirmationScreen.tsx) | Pro model: verification required |
| [screens/VerificationScreen.tsx](src/modules/TradingAccount/screens/VerificationScreen.tsx) | Upload required documents (Pro) |
| [screens/FlexSubscriptionScreen.tsx](src/modules/TradingAccount/screens/FlexSubscriptionScreen.tsx) | Flex model: choose plan + pay |
| [screens/SubscriptionScreen.tsx](src/modules/TradingAccount/screens/SubscriptionScreen.tsx) | Subscription management |
| [screens/AccountDetailsScreen.tsx](src/modules/TradingAccount/screens/AccountDetailsScreen.tsx) | View trading account details |
| [screens/CompletionScreen.tsx](src/modules/TradingAccount/screens/CompletionScreen.tsx) | Success page |
| [store/tradingAccount.slice.ts](src/modules/TradingAccount/store/tradingAccount.slice.ts) | Redux slice: creation wizard state |
| [store/tradingAccount.saga.ts](src/modules/TradingAccount/store/tradingAccount.saga.ts) | Side effects: AI analysis, creation, Stripe |
| [store/tradingAccount.selectors.ts](src/modules/TradingAccount/store/tradingAccount.selectors.ts) | All TA selectors |
| [api/tradingAccount.service.ts](src/modules/TradingAccount/api/tradingAccount.service.ts) | API calls for TA endpoints |
| [models/tradingAccount.types.ts](src/modules/TradingAccount/models/tradingAccount.types.ts) | All TA types and payloads |

### TradingAccount Redux State

```typescript
{
  basicInfo: IBasicInfo | null,              // Step 1 data
  aiResult: IAIAnalysisResult | null,        // AI analysis output
  analyzing: boolean,                         // AI in progress
  careers: ICareerOption[],                   // Manual career list
  careersLoading: boolean,
  selectedCareerRef: string | null,           // Chosen career
  createdAccount: ITradingAccountDetail | null, // Account being created
  myAccounts: ITradingAccountDetail[],        // User's existing accounts
  plans: ISubscriptionPlan[],                 // Available plans
  formFields: IUnansweredQuestion[],          // Manual flow questions
  requiredDocuments: IDocumentRequirement[],  // Verification docs
  documentsChecked: boolean,
  stripeClientSecret: string | null,          // Payment setup
  stripeEphemeralKey: string | null,
  stripeCustomerId: string | null,
  loading: boolean,
  error: string | null,
}
```

### TradingAccount Actions

| Action | Trigger | Effect |
|--------|---------|--------|
| `setBasicInfo(info)` | BasicInformationScreen next | Save step 1 locally |
| `fetchMyAccounts()` | Post-login bootstrap | Saga → API list accounts |
| `aiAnalyze(description)` | AIInputScreen submit | Saga → API AI analysis |
| `fetchCareers()` | CareerSelectionScreen load | Saga → API career list |
| `selectCareer(ref)` | Career item press | Set selected career |
| `createAccount(payload)` | CareerConfirmation next | Saga → API create |
| `submitFormAnswers(payload)` | MissingQuestions submit | Saga → API form answers |
| `finalizeAccount(payload)` | TAConfirmation | Saga → API finalize |
| `fetchPlans(careerRef)` | FlexSubscription load | Saga → API plans |
| `fetchFormFields(ref)` | MissingQuestions load | Saga → API form fields |
| `fetchDocuments(ref)` | Verification load | Saga → API required docs |
| `fetchSetupIntent()` | Payment flow | Saga → Stripe setup |
| `subscribe(payload)` | FlexSubscription pay | Saga → API subscribe |
| `resetCreationFlow()` | Completion / cancel | Clear wizard state (keep myAccounts) |

### API Endpoints: TradingAccount

| Method | Endpoint | Service Function |
|--------|----------|-----------------|
| GET | `/trading-accounts` | `listTradingAccountsApi()` |
| POST | `/trading-accounts/ai-analyze` | `aiAnalyzeApi(description, formTypeRef, countryId?)` |
| GET | `/trading-accounts/careers` | `fetchCareersApi(search?)` |
| POST | `/trading-accounts/create` | `createTradingAccountApi(payload)` |
| PATCH | `/trading-accounts/:ref/form-answers` | `submitFormAnswersApi(payload)` |
| PATCH | `/trading-accounts/:ref/finalize` | `finalizeTradingAccountApi(payload)` |
| GET | `/trading-accounts/:ref/form-fields` | `fetchFormFieldsApi(ref)` |
| GET | `/trading-accounts/:ref/required-documents` | `fetchRequiredDocumentsApi(ref)` |
| GET | `/trading-accounts/:ref` | `fetchTradingAccountApi(ref)` |

---

### Workspace Module

**Location:** `src/modules/Workspace/`

| File | Purpose |
|------|---------|
| [store/workspace.slice.ts](src/modules/Workspace/store/workspace.slice.ts) | Redux slice: active workspace, list, last tab |
| [store/workspace.saga.ts](src/modules/Workspace/store/workspace.saga.ts) | Side effects for workspace switching |
| [store/workspace.selectors.ts](src/modules/Workspace/store/workspace.selectors.ts) | `selectActiveWorkspaceId`, `selectActiveWorkspaceType`, `selectWorkspaceList`, `selectLastActiveTab` |
| [models/workspace.types.ts](src/modules/Workspace/models/workspace.types.ts) | `IWorkspaceItem`, `IWorkspaceState`, `WorkspaceTab` |

### Workspace Actions

| Action | Effect |
|--------|--------|
| `setActiveWorkspace({id, type})` | Switch to workspace |
| `setWorkspaceList(items)` | Update available workspaces |
| `setLastActiveTab(tab)` | Persist last active tab |
| `switchToPersonal()` | Shortcut to personal mode |
| `resetWorkspace()` | On logout |

---

### Home Module

**Location:** `src/modules/Home/`

| File | Purpose |
|------|---------|
| [screens/HomeScreen.tsx](src/modules/Home/screens/HomeScreen.tsx) | **Main home screen** (context-aware wrapper) |

**Additional Home screens by workspace:**

| File | Purpose |
|------|---------|
| [src/screens/Customer/CustomerHomeScreen.tsx](src/screens/Customer/CustomerHomeScreen.tsx) | Customer home: AI job input, suggestions |
| [src/screens/Worker/WorkerHomeScreen.tsx](src/screens/Worker/WorkerHomeScreen.tsx) | Worker home: nearby jobs, active projects |
| [src/screens/HomeScreen.tsx](src/screens/HomeScreen.tsx) | Root home screen (delegates to Customer/Worker) |
| [src/screens/Customer/components/AIJobInputComponent.tsx](src/screens/Customer/components/AIJobInputComponent.tsx) | AI-powered job description input component |

---

### Jobs Module

**Location:** `src/modules/Jobs/`

| File | Purpose |
|------|---------|
| [screens/MyJobsScreen.tsx](src/modules/Jobs/screens/MyJobsScreen.tsx) | Job list with filters (context-aware) |
| [screens/JobDetailClientScreen.tsx](src/modules/Jobs/screens/JobDetailClientScreen.tsx) | Client views own posted job |
| [screens/JobDetailWorkerScreen.tsx](src/modules/Jobs/screens/JobDetailWorkerScreen.tsx) | Worker views available job |
| [screens/SubmitProposalScreen.tsx](src/modules/Jobs/screens/SubmitProposalScreen.tsx) | Worker submits bid/proposal |
| [screens/ProposalDetailScreen.tsx](src/modules/Jobs/screens/ProposalDetailScreen.tsx) | View proposal details |
| [screens/ProjectDetailScreen.tsx](src/modules/Jobs/screens/ProjectDetailScreen.tsx) | Active project details |
| [screens/PayDepositScreen.tsx](src/modules/Jobs/screens/PayDepositScreen.tsx) | Client pays deposit |
| [models/jobs.types.ts](src/modules/Jobs/models/jobs.types.ts) | `IJob`, `ICreateJobPayload` |

**Additional Jobs screens:**

| File | Purpose |
|------|---------|
| [src/screens/Jobs/MyJobsScreen.tsx](src/screens/Jobs/MyJobsScreen.tsx) | Alternative MyJobs screen |
| [src/screens/Customer/JobPosting/JobPostingBasicInfoScreen.tsx](src/screens/Customer/JobPosting/JobPostingBasicInfoScreen.tsx) | Job creation form |
| [src/screens/Customer/JobPosting/JobPostingAIResultsScreen.tsx](src/screens/Customer/JobPosting/JobPostingAIResultsScreen.tsx) | AI-matched results for job |

### API Endpoints: Jobs

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/jobs` | List available jobs |
| GET | `/jobs/:ref` | Get job details |
| POST | `/jobs` | Create new job |
| PATCH | `/jobs/:ref` | Update job |
| DELETE | `/jobs/:ref` | Delete job |
| GET | `/jobs/my` | List user's own jobs |

### API Endpoints: Bids

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/jobs/:jobRef/bids` | Submit bid on job |
| GET | `/bids/my` | List user's bids |
| GET | `/bids/:ref` | Get bid details |
| POST | `/bids/:ref/accept` | Accept a bid |
| POST | `/bids/:ref/reject` | Reject a bid |

---

### Chat Module

**Location:** `src/modules/Chat/`

| File | Purpose |
|------|---------|
| [screens/MessagesScreen.tsx](src/modules/Chat/screens/MessagesScreen.tsx) | Chat room list |
| [screens/ChatRoomScreen.tsx](src/modules/Chat/screens/ChatRoomScreen.tsx) | Individual conversation |
| [models/chat.types.ts](src/modules/Chat/models/chat.types.ts) | `IChatRoom`, `IChatMessage`, `IChatState` |

### API Endpoints: Chat

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/chat/rooms` | List chat rooms |
| GET | `/chat/rooms/:ref` | Get room details |
| GET | `/chat/rooms/:ref/messages` | Get messages |
| POST | `/chat/rooms/:ref/messages` | Send message |

---

### Payments Module

**Location:** `src/modules/Payments/`

| File | Purpose |
|------|---------|
| [screens/WalletScreen.tsx](src/modules/Payments/screens/WalletScreen.tsx) | Wallet balance & payment methods |
| [screens/EarningsScreen.tsx](src/modules/Payments/screens/EarningsScreen.tsx) | Worker earnings overview |
| [screens/TransactionHistoryScreen.tsx](src/modules/Payments/screens/TransactionHistoryScreen.tsx) | Transaction list |
| [models/payments.types.ts](src/modules/Payments/models/payments.types.ts) | Payment types |

### API Endpoints: Payments & Subscriptions

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/payments/methods` | Payment methods |
| POST | `/payments/deposit` | Make deposit |
| GET | `/payments/earnings` | Get earnings |
| GET | `/payments/transactions` | Transaction history |
| GET | `/subscriptions/plans` | Available plans |
| POST | `/subscriptions/setup-intent` | Stripe setup intent |
| POST | `/subscriptions/subscribe` | Subscribe to plan |
| GET | `/subscriptions/my` | My subscriptions |
| POST | `/subscriptions/:ref/cancel` | Cancel subscription |

---

## Screens Reference

### All Screens (Alphabetical)

| Screen | File | Workspace |
|--------|------|-----------|
| AIInputScreen | [src/modules/TradingAccount/screens/AIInputScreen.tsx](src/modules/TradingAccount/screens/AIInputScreen.tsx) | — |
| AccountDetailsScreen | [src/modules/TradingAccount/screens/AccountDetailsScreen.tsx](src/modules/TradingAccount/screens/AccountDetailsScreen.tsx) | — |
| BasicInformationScreen | [src/modules/TradingAccount/screens/BasicInformationScreen.tsx](src/modules/TradingAccount/screens/BasicInformationScreen.tsx) | — |
| CareerConfirmationScreen | [src/modules/TradingAccount/screens/CareerConfirmationScreen.tsx](src/modules/TradingAccount/screens/CareerConfirmationScreen.tsx) | — |
| CareerSelectionScreen | [src/modules/TradingAccount/screens/CareerSelectionScreen.tsx](src/modules/TradingAccount/screens/CareerSelectionScreen.tsx) | — |
| ChatRoomScreen | [src/modules/Chat/screens/ChatRoomScreen.tsx](src/modules/Chat/screens/ChatRoomScreen.tsx) | Both |
| CompletionScreen | [src/modules/TradingAccount/screens/CompletionScreen.tsx](src/modules/TradingAccount/screens/CompletionScreen.tsx) | — |
| CustomerHomeScreen | [src/screens/Customer/CustomerHomeScreen.tsx](src/screens/Customer/CustomerHomeScreen.tsx) | Personal |
| DocumentsScreen | [src/modules/Profile/screens/DocumentsScreen.tsx](src/modules/Profile/screens/DocumentsScreen.tsx) | Both |
| EarningsScreen | [src/modules/Payments/screens/EarningsScreen.tsx](src/modules/Payments/screens/EarningsScreen.tsx) | Trading |
| EditProfileScreen | [src/modules/Profile/screens/EditProfileScreen.tsx](src/modules/Profile/screens/EditProfileScreen.tsx) | Both |
| FlexSubscriptionScreen | [src/modules/TradingAccount/screens/FlexSubscriptionScreen.tsx](src/modules/TradingAccount/screens/FlexSubscriptionScreen.tsx) | — |
| ForgotPasswordScreen | [src/modules/Auth/screens/ForgotPasswordScreen.tsx](src/modules/Auth/screens/ForgotPasswordScreen.tsx) | Auth |
| HomeScreen | [src/modules/Home/screens/HomeScreen.tsx](src/modules/Home/screens/HomeScreen.tsx) | Both |
| InviteFriendsScreen | [src/modules/Profile/screens/InviteFriendsScreen.tsx](src/modules/Profile/screens/InviteFriendsScreen.tsx) | Both |
| JobDetailClientScreen | [src/modules/Jobs/screens/JobDetailClientScreen.tsx](src/modules/Jobs/screens/JobDetailClientScreen.tsx) | Personal |
| JobDetailWorkerScreen | [src/modules/Jobs/screens/JobDetailWorkerScreen.tsx](src/modules/Jobs/screens/JobDetailWorkerScreen.tsx) | Trading |
| JobPostingAIResultsScreen | [src/screens/Customer/JobPosting/JobPostingAIResultsScreen.tsx](src/screens/Customer/JobPosting/JobPostingAIResultsScreen.tsx) | Personal |
| JobPostingBasicInfoScreen | [src/screens/Customer/JobPosting/JobPostingBasicInfoScreen.tsx](src/screens/Customer/JobPosting/JobPostingBasicInfoScreen.tsx) | Personal |
| LanguageSelectionScreen | [src/modules/Auth/screens/LanguageSelectionScreen.tsx](src/modules/Auth/screens/LanguageSelectionScreen.tsx) | Auth |
| LanguageSettingsScreen | [src/modules/Profile/screens/LanguageSettingsScreen.tsx](src/modules/Profile/screens/LanguageSettingsScreen.tsx) | Both |
| LoginScreen | [src/modules/Auth/screens/LoginScreen.tsx](src/modules/Auth/screens/LoginScreen.tsx) | Auth |
| MessagesScreen | [src/modules/Chat/screens/MessagesScreen.tsx](src/modules/Chat/screens/MessagesScreen.tsx) | Both |
| MissingQuestionsScreen | [src/modules/TradingAccount/screens/MissingQuestionsScreen.tsx](src/modules/TradingAccount/screens/MissingQuestionsScreen.tsx) | — |
| MyAccountScreen | [src/modules/Profile/screens/MyAccountScreen.tsx](src/modules/Profile/screens/MyAccountScreen.tsx) | Both |
| MyJobsScreen | [src/modules/Jobs/screens/MyJobsScreen.tsx](src/modules/Jobs/screens/MyJobsScreen.tsx) | Both |
| PayDepositScreen | [src/modules/Jobs/screens/PayDepositScreen.tsx](src/modules/Jobs/screens/PayDepositScreen.tsx) | Personal |
| ProfileScreen | [src/modules/Profile/screens/ProfileScreen.tsx](src/modules/Profile/screens/ProfileScreen.tsx) | Both |
| ProjectDetailScreen | [src/modules/Jobs/screens/ProjectDetailScreen.tsx](src/modules/Jobs/screens/ProjectDetailScreen.tsx) | Both |
| ProposalDetailScreen | [src/modules/Jobs/screens/ProposalDetailScreen.tsx](src/modules/Jobs/screens/ProposalDetailScreen.tsx) | Trading |
| RegisterScreen | [src/modules/Auth/screens/RegisterScreen.tsx](src/modules/Auth/screens/RegisterScreen.tsx) | Auth |
| SettingsScreen | [src/modules/Profile/screens/SettingsScreen.tsx](src/modules/Profile/screens/SettingsScreen.tsx) | Both |
| SplashScreen | [src/modules/Auth/screens/SplashScreen.tsx](src/modules/Auth/screens/SplashScreen.tsx) | Auth |
| SubmitProposalScreen | [src/modules/Jobs/screens/SubmitProposalScreen.tsx](src/modules/Jobs/screens/SubmitProposalScreen.tsx) | Trading |
| SubscriptionScreen | [src/modules/TradingAccount/screens/SubscriptionScreen.tsx](src/modules/TradingAccount/screens/SubscriptionScreen.tsx) | — |
| SupportScreen | [src/modules/Profile/screens/SupportScreen.tsx](src/modules/Profile/screens/SupportScreen.tsx) | Both |
| TAConfirmationScreen | [src/modules/TradingAccount/screens/TAConfirmationScreen.tsx](src/modules/TradingAccount/screens/TAConfirmationScreen.tsx) | — |
| TAProConfirmationScreen | [src/modules/TradingAccount/screens/TAProConfirmationScreen.tsx](src/modules/TradingAccount/screens/TAProConfirmationScreen.tsx) | — |
| TermsAndConditionsScreen | [src/modules/Profile/screens/TermsAndConditionsScreen.tsx](src/modules/Profile/screens/TermsAndConditionsScreen.tsx) | Both |
| TransactionHistoryScreen | [src/modules/Payments/screens/TransactionHistoryScreen.tsx](src/modules/Payments/screens/TransactionHistoryScreen.tsx) | Trading |
| VerificationScreen | [src/modules/TradingAccount/screens/VerificationScreen.tsx](src/modules/TradingAccount/screens/VerificationScreen.tsx) | — |
| VerifyOTPScreen | [src/modules/Auth/screens/VerifyOTPScreen.tsx](src/modules/Auth/screens/VerifyOTPScreen.tsx) | Auth |
| WalletScreen | [src/modules/Payments/screens/WalletScreen.tsx](src/modules/Payments/screens/WalletScreen.tsx) | Personal |
| WorkerHomeScreen | [src/screens/Worker/WorkerHomeScreen.tsx](src/screens/Worker/WorkerHomeScreen.tsx) | Trading |
| WorkspaceSwitchingScreen | [src/modules/Profile/screens/WorkspaceSwitchingScreen.tsx](src/modules/Profile/screens/WorkspaceSwitchingScreen.tsx) | Both |

---

## Shared Components

**Location:** `src/components/shared/`

| Component | File | Purpose |
|-----------|------|---------|
| JobCard | [src/components/shared/JobCard/index.tsx](src/components/shared/JobCard/index.tsx) | Job/project summary card |
| ProposalCard | [src/components/shared/ProposalCard/index.tsx](src/components/shared/ProposalCard/index.tsx) | Proposal/bid summary card |
| ChatListItem | [src/components/shared/ChatListItem/index.tsx](src/components/shared/ChatListItem/index.tsx) | Chat room row in messages list |
| WalletHeader | [src/components/shared/WalletHeader/index.tsx](src/components/shared/WalletHeader/index.tsx) | Balance display header |
| WorkspaceBadge | [src/components/shared/WorkspaceBadge/index.tsx](src/components/shared/WorkspaceBadge/index.tsx) | Current workspace indicator |
| WorkspaceSwitcherSheet | [src/components/shared/WorkspaceSwitcherSheet/index.tsx](src/components/shared/WorkspaceSwitcherSheet/index.tsx) | Bottom sheet: switch workspace |
| SectionMenuRow | [src/components/shared/SectionMenuRow/index.tsx](src/components/shared/SectionMenuRow/index.tsx) | Menu item with icon + label |
| StatusBadge | [src/components/shared/StatusBadge/index.tsx](src/components/shared/StatusBadge/index.tsx) | Status indicator (active/pending/etc) |
| DocumentCard | [src/components/shared/DocumentCard/index.tsx](src/components/shared/DocumentCard/index.tsx) | Document upload card |
| ConfirmSheet | [src/components/shared/ConfirmSheet/index.tsx](src/components/shared/ConfirmSheet/index.tsx) | Confirmation dialog |
| LockOverlay | [src/components/shared/LockOverlay/index.tsx](src/components/shared/LockOverlay/index.tsx) | Locked chat overlay |
| ToggleRow | [src/components/shared/ToggleRow/index.tsx](src/components/shared/ToggleRow/index.tsx) | Checkbox/toggle row |
| VerificationRow | [src/components/shared/VerificationRow/index.tsx](src/components/shared/VerificationRow/index.tsx) | Verification status row |
| MyJobCard | [src/components/MyJobCard.tsx](src/components/MyJobCard.tsx) | Job card variant for MyJobs |
| AIJobInputComponent | [src/screens/Customer/components/AIJobInputComponent.tsx](src/screens/Customer/components/AIJobInputComponent.tsx) | AI-powered job description input |

**Profile Components:**

| Component | File | Purpose |
|-----------|------|---------|
| ProfileHeader | [src/modules/Profile/components/ProfileHeader.tsx](src/modules/Profile/components/ProfileHeader.tsx) | Avatar + name header |
| MenuItem | [src/modules/Profile/components/MenuItem.tsx](src/modules/Profile/components/MenuItem.tsx) | Profile menu item |
| TradingAccountCard | [src/modules/Profile/components/TradingAccountCard.tsx](src/modules/Profile/components/TradingAccountCard.tsx) | TA card in profile |
| WorkspaceSwitcher | [src/modules/Profile/components/WorkspaceSwitcher.tsx](src/modules/Profile/components/WorkspaceSwitcher.tsx) | Workspace switch component |

---

## Services & API Endpoints

### API Infrastructure

| File | Purpose |
|------|---------|
| [src/services/api.ts](src/services/api.ts) | Axios instance with interceptors (Bearer token, 401 handler) |
| [src/services/apiError.ts](src/services/apiError.ts) | Error handling utilities |
| [src/services/urls.ts](src/services/urls.ts) | All API URL constants |
| [src/services/index.ts](src/services/index.ts) | Service exports |
| [src/config/api.config.ts](src/config/api.config.ts) | Base URL, timeout (30s), headers |

### All API Endpoints Summary

```
AUTH
  POST  /auth/login                      → login
  POST  /auth/register                   → register
  POST  /auth/logout                     → logout
  POST  /auth/me                         → fetch current user
  POST  /auth/social-login               → Google/Apple login
  POST  /auth/validate-phone             → validate phone number
  POST  /auth/verify-otp                 → verify Firebase OTP
  POST  /auth/request-reset              → forgot password
  POST  /auth/verify-reset-code          → verify reset code
  POST  /auth/reset                      → set new password

PROFILE
  GET   /profile/me                      → get profile
  PATCH /profile/me                      → update profile
  POST  /profile/avatar                  → upload avatar
  POST  /profile/cover                   → upload cover photo
  GET   /profile/:ref                    → get other user profile
  GET   /profile/portfolio               → get portfolio
  POST  /profile/switch-workspace        → switch workspace

TRADING ACCOUNTS
  GET   /trading-accounts                → list my accounts
  POST  /trading-accounts/ai-analyze     → AI career analysis
  GET   /trading-accounts/careers        → list careers
  POST  /trading-accounts/create         → create account
  PATCH /trading-accounts/:ref/form-answers  → submit answers
  PATCH /trading-accounts/:ref/finalize  → finalize account
  GET   /trading-accounts/:ref/form-fields   → get form fields
  GET   /trading-accounts/:ref/required-documents → get docs needed
  GET   /trading-accounts/:ref           → get account details

JOBS
  GET   /jobs                            → list available jobs
  GET   /jobs/:ref                       → get job details
  POST  /jobs                            → create job
  PATCH /jobs/:ref                       → update job
  DELETE /jobs/:ref                      → delete job
  GET   /jobs/my                         → my posted jobs

BIDS
  POST  /jobs/:jobRef/bids               → submit bid
  GET   /bids/my                         → my bids
  GET   /bids/:ref                       → bid details
  POST  /bids/:ref/accept                → accept bid
  POST  /bids/:ref/reject                → reject bid

CHAT
  GET   /chat/rooms                      → list chat rooms
  GET   /chat/rooms/:ref                 → room details
  GET   /chat/rooms/:ref/messages        → get messages
  POST  /chat/rooms/:ref/messages        → send message

PAYMENTS
  GET   /payments/methods                → payment methods
  POST  /payments/deposit                → make deposit
  GET   /payments/earnings               → earnings summary
  GET   /payments/transactions           → transaction history

SUBSCRIPTIONS
  GET   /subscriptions/plans             → available plans
  POST  /subscriptions/setup-intent      → Stripe setup
  POST  /subscriptions/subscribe         → subscribe
  GET   /subscriptions/my                → my subscriptions
  POST  /subscriptions/:ref/cancel       → cancel

NOTIFICATIONS
  GET   /notifications                   → list notifications
  POST  /notifications/:ref/read         → mark read
  POST  /notifications/read-all          → mark all read
  POST  /notifications/device            → register device

GEO/LOOKUPS
  GET   /geo/countries                   → countries
  GET   /geo/states/:countryRef          → states
  GET   /geo/cities                      → cities
  GET   /geo/currencies                  → currencies
  GET   /options/careers                 → career options

TEAMS
  GET   /teams                           → list teams
  GET   /teams/:ref                      → team details
  GET   /teams/:ref/members              → team members
  POST  /teams/:ref/invite               → invite to team
```

---

## State Management

### Store Setup

| File | Purpose |
|------|---------|
| [src/redux/store.ts](src/redux/store.ts) | Configure store: saga middleware, persist, logger |
| [src/redux/rootReducer.ts](src/redux/rootReducer.ts) | Combine: auth + profile + tradingAccount + workspace |
| [src/redux/rootSaga.ts](src/redux/rootSaga.ts) | Fork all module sagas |
| [src/redux/index.ts](src/redux/index.ts) | Store exports |

### Data Flow

```
Screen (dispatch action)
  │
  ▼
Redux Slice (reducer updates state immediately OR saga picks up)
  │
  ▼
Saga (watcher → worker)
  │
  ▼
API Service (axios call)
  │
  ▼
Saga (dispatch success/failure action)
  │
  ▼
Redux Slice (reducer updates state)
  │
  ▼
Screen (useSelector re-renders)
```

### Persistence

| What | Where | Cleared On |
|------|-------|------------|
| JWT Token | AsyncStorage (`auth_token`) | Logout |
| Auth state | Redux Persist | Logout (transient fields on rehydrate) |
| Profile state | Redux Persist | Logout (transient fields on rehydrate) |
| Workspace state | Redux Persist | Logout (`resetWorkspace`) |
| Last active tab | Workspace slice (persisted) | Logout |

---

## Button Handlers & Interactions

### HomeScreen (Customer)

| UI Element | Handler | Action |
|------------|---------|--------|
| "Let's Go" button | `handleSubmit(formRef)` | Navigate to `JobPosting` |
| Workspace badge | `setShowSwitcher(true)` | Open `WorkspaceSwitcherSheet` |
| Suggestion pill | `setJobDescription(suggestion)` | Pre-fill AI input |
| Image upload button | `launchImageLibrary` | Pick photos (max 5) |

### HomeScreen (Worker)

| UI Element | Handler | Action |
|------------|---------|--------|
| JobCard press | `onPress` | Navigate to `JobDetailWorker` |
| Workspace badge | `setShowSwitcher(true)` | Open `WorkspaceSwitcherSheet` |

### MyJobsScreen

| UI Element | Handler | Action |
|------------|---------|--------|
| Filter tabs | `setClientFilter` / `setWorkerFilter` | Switch filter |
| JobCard press | `onPress` | Navigate to job detail |
| Pull-to-refresh | `onRefresh` | Reload data |

### ProfileScreen

| UI Element | Handler | Action |
|------------|---------|--------|
| Mode card "Switch" | `setShowSwitcher(true)` | Open workspace switcher |
| Menu items | `navigation.navigate(screen)` | Go to sub-screen |
| "Switch to User Mode" | `dispatch(switchToPersonal())` | Reset to personal workspace |
| Logout | `setShowLogout(true)` | Show `ConfirmSheet` |
| Confirm logout | `handleLogout()` | `dispatch(logout())` + `dispatch(resetWorkspace())` |

### WorkspaceSwitcherSheet

| UI Element | Handler | Action |
|------------|---------|--------|
| Workspace item | `dispatch(setActiveWorkspace({id, type}))` | Switch workspace |
| "Create Trading Account" | `onCreateTradingAccount()` | Navigate to TA creation |

### LoginScreen

| UI Element | Handler | Action |
|------------|---------|--------|
| Sign In button | `handleSubmit` | `dispatch(login())` or `dispatch(sendOtp())` |
| Google button | `handleGoogleLogin` | `dispatch(socialLogin('google'))` |
| Apple button | `handleAppleLogin` | `dispatch(socialLogin('apple'))` |
| "Forgot Password?" | `navigate('ForgotPassword')` | Go to reset |
| "Sign Up" link | `navigate('Register')` | Go to register |

### Trading Account Creation

| Screen | Button | Handler | Action |
|--------|--------|---------|--------|
| IntroScreen | "Get Started" | `onNext` | Navigate to BasicInfo |
| BasicInformationScreen | "Next" | `onNext` | `dispatch(setBasicInfo())` → navigate |
| AIInputScreen | "Analyze" | `onSubmit` | `dispatch(aiAnalyze(description))` |
| CareerSelectionScreen | Career item | `onSelect` | `dispatch(selectCareer(ref))` |
| CareerConfirmationScreen | "Confirm" | `onConfirm` | `dispatch(createAccount())` |
| MissingQuestionsScreen | "Submit" | `onSubmit` | `dispatch(submitFormAnswers())` |
| TAConfirmationScreen | auto | `onLoad` | `dispatch(finalizeAccount())` |
| FlexSubscriptionScreen | "Subscribe" | `onSubscribe` | `dispatch(subscribe())` |
| VerificationScreen | "Upload" | `onUpload` | Upload documents |
| CompletionScreen | "Done" | `onDone` | `dispatch(resetCreationFlow())` → Home |

---

## Configuration

| File | Purpose |
|------|---------|
| [src/config/api.config.ts](src/config/api.config.ts) | API base URL, timeout (30s), content-type headers |
| [src/config/theme.ts](src/config/theme.ts) | Brand colors (#20AAB0), semantic tokens, component defaults |
| [src/config/languages.ts](src/config/languages.ts) | i18next setup: EN, AR, ES, FR, DE, HI, BN |
| [src/config/firebase.config.ts](src/config/firebase.config.ts) | Firebase init for phone auth, Google/Apple sign-in |
| [src/config/demo-ui-images.ts](src/config/demo-ui-images.ts) | Demo/placeholder images |
| [src/types/env.d.ts](src/types/env.d.ts) | Environment variable types |

### Localization

| File | Language |
|------|----------|
| [src/localization/index.ts](src/localization/index.ts) | i18next initialization |
| [src/localization/En/](src/localization/En/) | English (auth, general, jobs, navigation, profile, trading) |
| [src/localization/Ar/](src/localization/Ar/) | Arabic (auth, general, jobs, navigation, profile) |
| [src/localization/english.ts](src/localization/english.ts) | Legacy English |
| [src/localization/arabic.ts](src/localization/arabic.ts) | Legacy Arabic |
| [src/localization/spanish.ts](src/localization/spanish.ts) | Spanish |
| [src/localization/french.ts](src/localization/french.ts) | French |
| [src/localization/german.ts](src/localization/german.ts) | German |
| [src/localization/hindi.ts](src/localization/hindi.ts) | Hindi |
| [src/localization/bengali.ts](src/localization/bengali.ts) | Bengali |

### Hooks

| File | Purpose |
|------|---------|
| [src/hooks/useErrorToast.ts](src/hooks/useErrorToast.ts) | Show toast on auth errors |

### Layouts

| File | Purpose |
|------|---------|
| [src/layouts/AlphaLayout.tsx](src/layouts/AlphaLayout.tsx) | Base layout wrapper (safe area, background) |
| [src/modules/Auth/layouts/AlphaAuthLayout.tsx](src/modules/Auth/layouts/AlphaAuthLayout.tsx) | Auth-specific layout |

---

## Quick Reference: "Where do I change X?"

| I want to... | Look at... |
|---------------|-----------|
| Change login flow | [src/modules/Auth/screens/LoginScreen.tsx](src/modules/Auth/screens/LoginScreen.tsx), [auth.saga.ts](src/modules/Auth/store/auth.saga.ts) |
| Add a new auth method | [auth.service.ts](src/modules/Auth/api/auth.service.ts), [auth.slice.ts](src/modules/Auth/store/auth.slice.ts), [auth.saga.ts](src/modules/Auth/store/auth.saga.ts) |
| Modify home screen | [CustomerHomeScreen.tsx](src/screens/Customer/CustomerHomeScreen.tsx) or [WorkerHomeScreen.tsx](src/screens/Worker/WorkerHomeScreen.tsx) |
| Add a new screen | Create screen → add to relevant StackNavigator → add navigation |
| Change job posting | [JobPostingBasicInfoScreen.tsx](src/screens/Customer/JobPosting/JobPostingBasicInfoScreen.tsx), [JobPostingAIResultsScreen.tsx](src/screens/Customer/JobPosting/JobPostingAIResultsScreen.tsx) |
| Modify trading account creation | [TradingAccountCreationNavigator.tsx](src/routes/TradingAccountCreationNavigator.tsx) + screens in [TradingAccount/screens/](src/modules/TradingAccount/screens/) |
| Change API endpoints | [src/services/urls.ts](src/services/urls.ts) |
| Modify API call behavior | Service file in the module's `api/` folder |
| Change theme/colors | [src/config/theme.ts](src/config/theme.ts) |
| Add a new language | [src/config/languages.ts](src/config/languages.ts) + new translation files in `src/localization/` |
| Change tab navigation | [MainTabNavigator.tsx](src/routes/MainTabNavigator.tsx) |
| Add profile menu items | [ProfileScreen.tsx](src/modules/Profile/screens/ProfileScreen.tsx) |
| Modify workspace switching | [workspace.slice.ts](src/modules/Workspace/store/workspace.slice.ts), [WorkspaceSwitcherSheet](src/components/shared/WorkspaceSwitcherSheet/index.tsx) |
| Change payment/Stripe | [tradingAccount.saga.ts](src/modules/TradingAccount/store/tradingAccount.saga.ts) (setupIntent, subscribe) |
| Debug Redux state | Enable Redux Logger in [store.ts](src/redux/store.ts) |
