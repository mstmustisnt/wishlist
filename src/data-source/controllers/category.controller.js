/*
* @providesModule CategoryController
* */
import Controller from '../services/Controller';

class CategoryController extends Controller {
  constructor() {
    super({name: 'Category'});
  }

  create(data) {
    const defaults = {
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    data = Object.assign(data, defaults);

    super.create(data);
  }

  update(data) {
    const defaults = {
      updatedAt: new Date(),
    };

    data = Object.assign(data, defaults);

    super.update(data);
  }
}
export default new CategoryController();