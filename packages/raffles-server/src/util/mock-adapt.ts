import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '../cybavo';

export default new MockAdapter(axiosInstance, { onNoMatch: 'throwException' });
