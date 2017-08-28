/**
 * Created by eugenia on 01.05.17.
 *
 * @providesModule RealmInstance
 */

import Realm from 'realm';
import Category from './schemas/Category';
import WishItem from './schemas/WishItem';

export default new Realm({ schema: [Category, WishItem] });