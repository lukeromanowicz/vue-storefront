import { ActionTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import ClaimsState from '../types/ApiState'
import cart from './api/cart';

const actions: ActionTree<ClaimsState, RootState> = {
  ...cart
};

export default actions
