import general from './Ar/general';
import auth from './Ar/auth';
import navigation from './Ar/navigation';
import jobs from './Ar/jobs';
import profile from './Ar/profile';
import trading from './Ar/trading';

export default {
  lang: 'ar',
  translations: {
    ...general,
    ...auth,
    ...navigation,
    ...jobs,
    ...profile,
    ...trading,
  },
  isDefault: false,
};
