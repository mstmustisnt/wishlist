/**
 * Created by eugenia on 27.08.17.
 *
 * @flow
 */

'use strict';

import { extendObservable } from 'mobx';
import BaseStore from 'BaseStore';
import ListController from 'ListController'

/**
 * @class ListStore
 */
class ListStore extends BaseStore {
  constructor(options) {
    super(options);
    const state = {
      currentList: null,
    };

    extendObservable(this, state);
  }
}

export default new ListStore(ListController);