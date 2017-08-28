/**
 * Created by eugenia on 15.05.17.
 *
 * @flow
 */

'use strict';

import { extendObservable } from 'mobx';

/**
 * @class UiStore
 */
class UiStore {
  constructor() {
    const state = { notification: null };
    extendObservable(this, {}, state);
  }
}

export default new UiStore();