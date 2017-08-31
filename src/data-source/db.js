/**
 * Created by eugenia on 01.05.17.
 *
 * @providesModule RealmInstance
 */

import Realm from 'realm';
import List from './schemas/List';
import WishItem from './schemas/WishItem';

export default new Realm({ schema: [List, WishItem], schemaVersion: 1 });