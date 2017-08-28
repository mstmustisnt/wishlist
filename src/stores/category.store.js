/**
 * Created by eugenia on 27.08.17.
 *
 * @flow
 */

'use strict';

import { extendObservable } from 'mobx';
import BaseStore from 'BaseStore';
import CategoryController from 'CategoryController'

/**
 * @class CategoryStore
 */
class CategoryStore extends BaseStore{
  constructor() {
    super(CategoryController);
  }
}

export default new CategoryStore();