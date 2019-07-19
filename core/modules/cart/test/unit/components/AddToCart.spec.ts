import { mountMixinWithStore } from '@vue-storefront/unit-tests/utils';

import Product from '@vue-storefront/core/modules/catalog/types/Product';

import { AddToCart } from '../../../components/AddToCart'
jest.mock('@vue-storefront/core/helpers', () => ({
  once: jest.fn()
}));
jest.mock('@vue-storefront/i18n', () => ({loadLanguageAsync: jest.fn()}))
jest.mock('@vue-storefront/core/app', () => ({ createApp: jest.fn() }))

describe('AddToCart', () => {
  describe('addToCart', () => {
    it('dispatches addItem action successfully and notifies the user about results', async () => {
      const product = {} as any as Product
      const mountOptions = {
        propsData: {
          product: {}
        },
        methods: {
          notifyUser: jest.fn()
        },
        mocks: {
          $t: t => t
        }
      }
      const storeMock = {
        modules: {
          cart: {
            actions: {
              addItem: jest.fn(() => null)
            },
            namespaced: true
          }
        }
      };

      const wrapper = mountMixinWithStore(AddToCart, storeMock, mountOptions);

      await (wrapper.vm as any).addToCart(product);

      expect(storeMock.modules.cart.actions.addItem).toBeCalledWith(expect.anything(), { productToAdd: product }, undefined);
      expect(mountOptions.methods.notifyUser).toBeCalledWith(
        expect.objectContaining({
          type: 'success'
        })
      );
    })

    it('dispatches addItem action successfully and notifies the user about custom client notifications', async () => {
      const product = {} as any as Product
      const mountOptions = {
        propsData: {
          product: {}
        },
        methods: {
          notifyUser: jest.fn()
        },
        mocks: {
          $t: t => t
        }
      }
      const storeMock = {
        modules: {
          cart: {
            actions: {
              addItem: jest.fn(() => ({
                clientNotifications: [
                  {
                    type: 'success',
                    message: 'Product x has been added to the cart!',
                    action1: { label: 'OK' }
                  },
                  {
                    type: 'warning',
                    message: 'Product y is out of stock!',
                    action1: { label: 'OK' }
                  }
                ]
              }))
            },
            namespaced: true
          }
        }
      };

      const wrapper = mountMixinWithStore(AddToCart, storeMock, mountOptions);

      await (wrapper.vm as any).addToCart(product);

      expect(storeMock.modules.cart.actions.addItem).toBeCalledWith(expect.anything(), { productToAdd: product }, undefined);
      expect(mountOptions.methods.notifyUser).nthCalledWith(1,
        expect.objectContaining({
          type: 'success'
        })
      );
      expect(mountOptions.methods.notifyUser).nthCalledWith(2,
        expect.objectContaining({
          type: 'warning'
        })
      );
    })

    it('handles exceptions in adding addItem action by showing error notification', async () => {
      const product = {} as any as Product
      const mountOptions = {
        propsData: {
          product: {}
        },
        methods: {
          notifyUser: jest.fn()
        },
        mocks: {
          $t: t => t
        }
      }
      const storeMock = {
        modules: {
          cart: {
            actions: {
              addItem: jest.fn(() => { throw new Error('An error occured') })
            },
            namespaced: true
          }
        }
      };

      const wrapper = mountMixinWithStore(AddToCart, storeMock, mountOptions);

      await (wrapper.vm as any).addToCart(product);

      expect(storeMock.modules.cart.actions.addItem).toBeCalledWith(expect.anything(), { productToAdd: product }, undefined);
      expect(mountOptions.methods.notifyUser).toBeCalledWith(
        expect.objectContaining({
          type: 'error'
        })
      );
    })
  })
});
