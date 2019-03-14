import { ActionContext } from 'vuex';
import { TaskQueue } from '@vue-storefront/core/lib/sync';
import config from 'config'
import Task from '@vue-storefront/core/lib/sync/types/Task';
import RootState from '@vue-storefront/core/types/RootState'
import ApiState from "../../types/ApiState";
import { ApiCartActions } from '@vue-storefront/core/modules/cart/types/ApiCartActions';
import { RequestOptions } from '@vue-storefront/core/modules/api/types/Request';


const cart: ApiCartActions<ApiState, RootState> = {
  apiFetchCartProducts: {
    root: true,
    handler(context: ActionContext<ApiState, RootState>, {forceClientState = false, dryRun = false, callbackEvent = false}: RequestOptions): Promise<Task> {
      return TaskQueue.execute({
        url: config.cart.pull_endpoint, // sync the cart
        payload: {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
          mode: 'cors'
        },
        silent: true,
        force_client_state: forceClientState,
        dry_run: dryRun,
        callback_event: callbackEvent
      });
    }
  }
};

export default cart