import { mountMixinWithStore } from '@vue-storefront/unit-tests/utils';

import { MicrocartButton } from '../../../components/MicrocartButton'

const eventMap = {};

document.addEventListener = jest.fn((event, cb) => {
  eventMap[event] = cb;
});

describe('MicrocartButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.keys(eventMap).forEach((key) => { delete eventMap[key]; });
  });

  it('runs cart/load action whenever the state of component goes from hidden to visible', () => {
    const storeMock = {
      modules: {
        cart: {
          actions: {
            load: jest.fn()
          },
          namespaced: true
        }
      }
    };

    mountMixinWithStore(MicrocartButton, storeMock);

    expect(eventMap).toHaveProperty('visibilitychange');
    eventMap['visibilitychange']()
    expect(storeMock.modules.cart.actions.load).toBeCalled();
  });

  it('quantity returns total quantity of products in cart', () => {
    const storeMock = {
      modules: {
        cart: {
          getters: {
            getItemsTotalQuantity: () => 123
          },
          namespaced: true
        }
      }
    };

    const wrapper = mountMixinWithStore(MicrocartButton, storeMock);

    expect((wrapper.vm as any).quantity).toEqual(storeMock.modules.cart.getters.getItemsTotalQuantity());
  });

  it('toggleMicrocart dispatches toggleMicrocart to change its state', () => {
    const storeMock = {
      modules: {
        cart: {
          actions: {
            toggleMicrocart: jest.fn()
          },
          namespaced: true
        }
      }
    };

    const wrapper = mountMixinWithStore(MicrocartButton, storeMock);

    (wrapper.vm as any).toggleMicrocart();

    expect(storeMock.modules.cart.actions.toggleMicrocart).toBeCalled();
  });
});
