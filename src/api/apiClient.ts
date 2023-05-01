import axios from 'axios';
import set from 'lodash/set';
import { getAuth } from 'firebase/auth';
import { apiConfig } from 'src/config';


const getAuthorization = async () => {
  const isBrowser = typeof window !== 'undefined';
  const auth = getAuth();
  if (isBrowser && auth.currentUser) {
    try {
      return await auth.currentUser.getIdToken(false);
    } catch (_) {
      return;
    }
  }
};

const apiClient = axios.create({
  baseURL: apiConfig.url,
  headers: {
    'Content-type': 'application/json',
  },
});

// Add a request interceptor
apiClient.interceptors.request.use(async function (config) {
  // Do something before request is sent
  const authorization = await getAuthorization();
  if (authorization) {
    set(config, 'headers.Authorization', authorization);
  }
  return config;
});

export default apiClient;
