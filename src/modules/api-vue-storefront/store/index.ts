import { Module } from 'vuex'
import actions from './actions'
import RootState from '@vue-storefront/core/types/RootState'
import ApiState from '../types/ApiState'

export const module: Module<ApiState, RootState> = {
  namespaced: true,
  actions
};
