import {Action, ActionTree} from "vuex";

export interface ApiCartActions<S, R> extends ActionTree<S, R> {
  apiFetchCartProducts: Action<S, R>,
  [key: string]: Action<S, R>;
}