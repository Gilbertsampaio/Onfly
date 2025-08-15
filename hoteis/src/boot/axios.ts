import axios, { type AxiosInstance } from 'axios';
import type { BootFileParams } from '@quasar/app-vite';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Altere a baseURL para o endereço e porta da sua API local
// Se sua API estiver rodando na porta 3000, por exemplo:
const api = axios.create({ baseURL: 'http://localhost:3000' });

export default ({ app }: BootFileParams) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
};

export { api };