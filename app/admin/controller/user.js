function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');

module.exports = class extends Base {
    /**
     * 查询用户列表
     * index action
     * @return {Promise} []
     */
    indexAction() {
        var _this = this;

        return _asyncToGenerator(function* () {
            const page = _this.get('page') || 1;
            const size = _this.get('size') || 20;
            const name = _this.get('name') || '';

            const model = _this.model('user');
            const data = yield model.where({ username: ['like', `%${name}%`] }).order(['id DESC']).page(page, size).countSelect();
            return _this.success(data);
        })();
    }

    /**
     * 根据用户ID查询用户信息
     * @returns {Promise<*|boolean>}
     */
    infoAction() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            //const id = this.get('id');
            const id = 14;
            const model = _this2.model('user');
            const data = yield model.where({ id: id }).find();
            return _this2.success(data);
        })();
    }

    /**
     *
     * @returns {Promise<*>}
     */
    storeAction() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            // 修改操作只接收post请求
            if (!_this3.isPost) {
                return false;
            }

            const values = _this3.post();
            const id = _this3.post('id');

            const model = _this3.model('user');
            values.is_show = values.is_show ? 1 : 0;
            values.is_new = values.is_new ? 1 : 0;
            if (id > 0) {
                yield model.where({ id: id }).update(values);
            } else {
                delete values.id;
                yield model.add(values);
            }
            return _this3.success(values);
        })();
    }

    /**
     *
     * 删除用户操作
     * @returns {Promise<*|boolean>}
     */
    destoryAction() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            const id = _this4.post('id');
            yield _this4.model('user').where({ id: id }).limit(1).delete();
            // TODO 删除图片

            return _this4.success();
        })();
    }

    /**
     * 获取用户总数量
     */

    countAction() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            const count = yield _this5.model('user').count();
            return _this5.success(count);
        })();
    }

    /**
     * 获取今天注册的用户量
     */

    todaycountAction() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            const date = _this6.get('date');
            // const data = this.model('user').find({registe_time: eval('/^' + date + '/gi')}).count();
            const data = yield _this6.model('user').count();
            return _this6.success(data);
        })();
    }

    /**
     * 返回用户列表
     * @returns {Promise<*|boolean>}
     */
    list1Action() {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            const userList = yield _this7.model('user').select();
            return _this7.success(userList);
        })();
    }

};
//# sourceMappingURL=user.js.map