/**
 * Created by eugenia on 27.08.17.
 *
 * @flow
 */

'use strict';

import { extendObservable } from 'mobx';
import BaseStore from 'BaseStore';
import WishItemController from 'WishItemController'

/**
 * @class ListStore
 */
class WishItemStore extends BaseStore {}

export default new WishItemStore(WishItemController);