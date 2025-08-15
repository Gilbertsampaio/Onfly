import { createPinia } from 'pinia';
import type { Router } from 'vue-router';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    readonly router: Router;
  }
}

export default createPinia;