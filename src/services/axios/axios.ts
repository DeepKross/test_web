import Axios from 'axios';

import { AppConfig } from '../../config';

export const axios = Axios.create({
  baseURL: AppConfig.API_URL,
});
