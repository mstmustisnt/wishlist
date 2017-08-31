/*
* @providesModule ListController
* */
import Controller from '../services/Controller';

class ListController extends Controller {
  constructor() {
    super({name: 'List'});
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
export default new ListController();