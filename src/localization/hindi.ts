import general from './En/general';
import auth from './En/auth';
import navigation from './En/navigation';
import jobs from './En/jobs';

export default {
  lang: 'hi',
  translations: {
    ...general,
    ...auth,
    ...navigation,
    ...jobs,
  },
  isDefault: false,
};
