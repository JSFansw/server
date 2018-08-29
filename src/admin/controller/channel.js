const Base = require('./base.js');

module.exports = class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
      const page = this.get('currentPage') || 1;
      const size = this.get('limit') || 10;
      const name = this.get('name') || '';
    
      const model = this.model('channel');
      const data = await model.where({name: ['like', `%${name}%`]}).page(page, size).countSelect();
    
      return this.success(data);
  }

  async infoAction() {
    const id = this.get('id');
    const model = this.model('channel');
    const data = await model.where({id: id}).find();

    return this.success(data);
  }
    
    /**
     *  更新数据
     * @returns {Promise<*>}
     */
  async storeAction() {
    if (!this.isPost) {
      return false;
    }

    const values = this.post();
    const id = this.post('id');

    const model = this.model('channel');
    if (id > 0) {
      await model.where({id: id}).update(values);
    } else {
      delete values.id;
      await model.add(values);
    }
    return this.success(values);
  }

  async destoryAction() {
    const id = this.post('id');
    await this.model('channel').where({id: id}).limit(1).delete();
    // TODO 删除图片

    return this.success();
  }
};
