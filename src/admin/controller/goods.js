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

    const model = this.model('goods');
    const data = await model.where({name: ['like', `%${name}%`]}).page(page, size).countSelect();

    return this.success(data);
  }
    
    /**
     * 返回所有数据
     * @returns {Promise<void>}
     */
  async listAction(){
    const model= this.model('goods');
    const data = await model.select();
    return this.success(data);
  }
    
    /**
     * 获取产品格式
     * @returns {Promise<*|boolean>}
     */
  async countAction(){
    const data = await this.model('goods').count();
    return this.success(data);
  }
    /**
     *
     * @returns {Promise<*|boolean>}
     */
  async infoAction() {
    const id = this.get('id');
    const model = this.model('goods');
    const data = await model.where({id: id}).find();

    return this.success(data);
  }

  async storeAction() {
    if (!this.isPost) {
      return false;
    }

    const values = this.post();
    const id = this.post('id');

    const model = this.model('goods');
    values.is_on_sale = values.is_on_sale ? 1 : 0;
    values.is_new = values.is_new ? 1 : 0;
    values.is_hot = values.is_hot ? 1 : 0;
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
    await this.model('goods').where({id: id}).limit(1).delete();
    // TODO 删除图片

    return this.success();
  }
};
