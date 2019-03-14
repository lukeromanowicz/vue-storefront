import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { module } from './store'

const KEY = 'api-other-backend';

const moduleConfig: VueStorefrontModuleConfig = {
  store: { modules: [{ key: KEY, module }] },
  key: KEY
};

export const ApiOtherBackend = new VueStorefrontModule(moduleConfig);