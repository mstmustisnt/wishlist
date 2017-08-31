/**
 * Created by eugenia on 15.05.17.
 *
 * @flow
 * @providesModule BaseStore
 */

'use strict';

import { extendObservable } from 'mobx';

/**
 * @class BaseStore
 */
class BaseStore {
  constructor(Controller) {
    const state = {
      Controller,
      items: []
    };
    extendObservable(this, {}, state);
  }

  findOne(query) {
    return this.Controller.findOne(query);
  }

  find(query) {
    return this.Controller.find(query);
  }

  create(data) {
    return this.Controller.create(data);
  }

  update(data) {
    return this.Controller.update(data);
  }

  remove(id) {
    return this.Controller.remove(id);
  }
}

export default BaseStore;