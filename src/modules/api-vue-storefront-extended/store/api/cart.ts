import RootState from '@vue-storefront/core/types/RootState'
import ApiState from "../../types/ApiState";
import { ApiCartActions } from '@vue-storefront/core/modules/cart/types/ApiCartActions';
import baseCartActions from '../../../api-vue-storefront/store/api/cart';


const cart: ApiCartActions<ApiState, RootState> = {
  ...baseCartActions // import all base cart actions
  // replace override base ones with whatever you want or add your own
};

export default cart
