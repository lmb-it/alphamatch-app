/**
 * i18n language definitions for AlphaMatch Mobile
 */
import type {ILanguage} from '@lmb/kitsconcerto';

export const languages: ILanguage[] = [
  {
    lang: 'en',
    translations: {
      // General
      'app.name': 'Alpha Match',
      'app.tagline': 'Find the right professional',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      back: 'Back',
      next: 'Next',
      submit: 'Submit',
      loading: 'Loading...',
      error: 'Something went wrong',
      retry: 'Retry',

      // Auth
      'auth.login': 'Log In',
      'auth.register': 'Sign Up',
      'auth.logout': 'Log Out',
      'auth.forgotPassword': 'Forgot Password?',
      'auth.email': 'Email',
      'auth.password': 'Password',
      'auth.confirmPassword': 'Confirm Password',
      'auth.firstName': 'First Name',
      'auth.lastName': 'Last Name',
      'auth.phone': 'Phone Number',

      // Navigation
      'nav.browse': 'Browse',
      'nav.myJobs': 'My Jobs',
      'nav.postJob': 'Post Job',
      'nav.chat': 'Chat',
      'nav.profile': 'Profile',
      'nav.jobs': 'Jobs',
      'nav.myBids': 'My Bids',
      'nav.teams': 'Teams',

      // Jobs
      'jobs.feed': 'Job Feed',
      'jobs.detail': 'Job Details',
      'jobs.postNew': 'Post a Job',
      'jobs.maxBudget': 'Max Budget',
      'jobs.viewDetails': 'View Details',
      'jobs.placeBid': 'Place Bid',

      // Bids
      'bids.myBids': 'My Bids',
      'bids.submitBid': 'Submit Bid',
      'bids.bidAmount': 'Bid Amount',
      'bids.proposal': 'Proposal Message',

      // Chat
      'chat.rooms': 'Messages',
      'chat.send': 'Send',
      'chat.typeMessage': 'Type a message...',

      // Profile
      'profile.myProfile': 'My Profile',
      'profile.editProfile': 'Edit Profile',
      'profile.portfolio': 'Portfolio',

      // Payments
      'payments.methods': 'Payment Methods',
      'payments.deposit': 'Pay Deposit',
      'payments.earnings': 'Earnings',
      'payments.history': 'Transaction History',
    },
  },
  {
    lang: 'ar',
    translations: {
      // General
      'app.name': 'ألفا ماتش',
      'app.tagline': 'ابحث عن المحترف المناسب',
      save: 'حفظ',
      cancel: 'إلغاء',
      delete: 'حذف',
      edit: 'تعديل',
      back: 'رجوع',
      next: 'التالي',
      submit: 'إرسال',
      loading: '...جاري التحميل',
      error: 'حدث خطأ',
      retry: 'إعادة المحاولة',

      // Auth
      'auth.login': 'تسجيل الدخول',
      'auth.register': 'إنشاء حساب',
      'auth.logout': 'تسجيل الخروج',
      'auth.forgotPassword': 'نسيت كلمة المرور؟',
      'auth.email': 'البريد الإلكتروني',
      'auth.password': 'كلمة المرور',
      'auth.confirmPassword': 'تأكيد كلمة المرور',
      'auth.firstName': 'الاسم الأول',
      'auth.lastName': 'اسم العائلة',
      'auth.phone': 'رقم الهاتف',

      // Navigation
      'nav.browse': 'تصفح',
      'nav.myJobs': 'وظائفي',
      'nav.postJob': 'إضافة وظيفة',
      'nav.chat': 'المحادثات',
      'nav.profile': 'الملف الشخصي',
      'nav.jobs': 'الوظائف',
      'nav.myBids': 'عروضي',
      'nav.teams': 'الفرق',

      // Jobs
      'jobs.feed': 'الوظائف المتاحة',
      'jobs.detail': 'تفاصيل الوظيفة',
      'jobs.postNew': 'نشر وظيفة',
      'jobs.maxBudget': 'الميزانية القصوى',
      'jobs.viewDetails': 'عرض التفاصيل',
      'jobs.placeBid': 'تقديم عرض',
    },
  },
];
