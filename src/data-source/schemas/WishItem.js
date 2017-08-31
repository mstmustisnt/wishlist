/**
 * Created by eugenia on 01.05.17.
 */


import Realm from 'realm';

class WishItem extends Realm.Object {}

WishItem.schema = {
  name: 'WishItem',
  primaryKey: 'id',
  properties: {
    id: 'int',
    title: 'string',
    description: 'string',
    list: 'List',
    createdAt: {
      type: 'date',
    },
    updatedAt: {
      type: 'date',
    },
  },
};

export default WishItem;