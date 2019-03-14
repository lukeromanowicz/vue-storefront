import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { module } from './store'

const KEY = 'api-vue-storefront';

const moduleConfig: VueStorefrontModuleConfig = {
  store: { modules: [{ key: KEY, module }] },
  key: KEY
};

export const ApiVueStorefront = new VueStorefrontModule(moduleConfig);