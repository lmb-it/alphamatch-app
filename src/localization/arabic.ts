import general from './Ar/general';
import auth from './Ar/auth';
import navigation from './Ar/navigation';
import jobs from './Ar/jobs';
import profile from './Ar/profile';

export default {
  lang: 'ar',
  translations: {
    ...general,
    ...auth,
    ...navigation,
    ...jobs,
    ...profile,
  },
  isDefault: false,
};
