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
class ListStore extends BaseStore {}

export default new ListStore(ListController);