function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');

module.exports = class extends Base {
    /**
     *  获取ad列表
     * @returns {Promise<*|boolean>}
     */
    listAction() {
        var _this = this;

        return _asyncToGenerator(function* () {
            const adList = yield _this.model('ad').select();
            return _this.success(adList);
        })();
    }

    /**
     *  获取单个ad信息
     * @returns {Promise<*|boolean>}
     */
    infoAction() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            const adId = _this2.get('id');
            const detail = yield _this2.model('ad').where({ id: adId }).find();
            return _this2.success(detail);
        })();
    }

    /**
     * 存储广告信息，可以用来新增和修改
     * @returns {Promise<void>}
     */
    storeAction() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            if (!_this3.isPost) {
                return _this3.fail(1001, '请使用post请求提交数据');
            }

            const values = _this3.post();
            const id = _this3.post('id');
            const model = _this3.model('ad');
            //如果id存在，则为更新，id不存在则增加
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
     * 获取广告条数
     * @returns {Promise<*|boolean>}
     */
    countAction() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            const count = yield _this4.model('ad').count();
            return _this4.success(count);
        })();
    }

    /**
     * 删除某一条广告
     * @returns {Promise<*|boolean>}
     */
    deleteAction() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            if (!_this5.isPost) {
                // 10001 请求类型出错
                return _this5.fail(1001, '请使用post提交数据');
            }
            const adId = _this5.post('ad_id');
            const result = yield _this5.model('ad').where({ id: adId }).limit(1).delete();
            //TODO 删除广告对应的本地图片

            return _this5.success(result);
        })();
    }

};
//# sourceMappingURL=ad.js.map