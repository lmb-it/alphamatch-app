import general from './En/general';
import auth from './En/auth';
import navigation from './En/navigation';
import jobs from './En/jobs';
import profile from './En/profile';

export default {
  lang: 'es',
  translations: {
    ...general,
    ...auth,
    ...navigation,
    ...jobs,
    ...profile,
  },
  isDefault: false,
};
