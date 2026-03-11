import general from './En/general';
import auth from './En/auth';
import navigation from './En/navigation';
import jobs from './En/jobs';
import profile from './En/profile';
import trading from './En/trading';

export default {
  lang: 'en',
  translations: {
    ...general,
    ...auth,
    ...navigation,
    ...jobs,
    ...profile,
    ...trading,
  },
  isDefault: true,
};
