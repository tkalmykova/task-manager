import routes from 'routes';
import FetchHelper from 'utils/fetchHelper';

export default {
  create(email) {
    const path = routes.apiV1PasswordResetPath();
    return FetchHelper.post(path, { email });
  },
};
