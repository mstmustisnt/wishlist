/**
 * Created by eugenia on 01.05.17.
 */

import Realm from 'realm';

class Category extends Realm.Object {}

Category.schema = {
  name: 'Category',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    description: 'string',
    createdAt: {
      type: 'date',
    },
    updatedAt: {
      type: 'date',
    },
  },
};

export default Category;