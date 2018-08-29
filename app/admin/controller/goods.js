function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');

module.exports = class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const page = _this.get('currentPage') || 1;
      const size = _this.get('limit') || 10;
      const name = _this.get('name') || '';

      const model = _this.model('goods');
      const data = yield model.where({ name: ['like', `%${name}%`] }).page(page, size).countSelect();

      return _this.success(data);
    })();
  }

  /**
   * 返回所有数据
   * @returns {Promise<void>}
   */
  listAction() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const model = _this2.model('goods');
      const data = yield model.select();
      return _this2.success(data);
    })();
  }

  /**
   * 获取产品格式
   * @returns {Promise<*|boolean>}
   */
  countAction() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const data = yield _this3.model('goods').count();
      return _this3.success(data);
    })();
  }
  /**
   *
   * @returns {Promise<*|boolean>}
   */
  infoAction() {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const id = _this4.get('id');
      const model = _this4.model('goods');
      const data = yield model.where({ id: id }).find();

      return _this4.success(data);
    })();
  }

  storeAction() {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      if (!_this5.isPost) {
        return false;
      }

      const values = _this5.post();
      const id = _this5.post('id');

      const model = _this5.model('goods');
      values.is_on_sale = values.is_on_sale ? 1 : 0;
      values.is_new = values.is_new ? 1 : 0;
      values.is_hot = values.is_hot ? 1 : 0;
      if (id > 0) {
        yield model.where({ id: id }).update(values);
      } else {
        delete values.id;
        yield model.add(values);
      }
      return _this5.success(values);
    })();
  }

  destoryAction() {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      const id = _this6.post('id');
      yield _this6.model('goods').where({ id: id }).limit(1).delete();
      // TODO 删除图片

      return _this6.success();
    })();
  }
};
//# sourceMappingURL=goods.js.map