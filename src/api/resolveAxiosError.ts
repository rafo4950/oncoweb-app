import axios from 'axios';

export default function resolveAxiosError(err: any) {
  if (axios.isAxiosError(err) && err.response) {
    return err.response.data;
  }
  return {
    success: false,
    message: '',
    name: '',
    data: {},
  };
}
