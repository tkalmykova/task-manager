import routes from 'routes';
import FetchHelper from 'utils/fetchHelper';

export default {
  update(token, params) {
    const path = routes.apiV1PasswordUpdatePath();
    return FetchHelper.put(path, { token, passwordUpdateForm: params });
  },
};
