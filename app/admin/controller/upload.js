function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');
const fs = require('fs');

module.exports = class extends Base {
    brandPicAction() {
        var _this = this;

        return _asyncToGenerator(function* () {
            const brandFile = _this.file('brand_pic');
            if (think.isEmpty(brandFile)) {
                return _this.fail('保存失败');
            }
            const that = _this;
            const filename = '/static/upload/brand/' + think.uuid(32) + '.jpg';
            const is = fs.createReadStream(brandFile.path);
            const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
            is.pipe(os);

            return that.success({
                name: 'brand_pic',
                fileUrl: 'http://127.0.0.1:8360' + filename
            });
        })();
    }

    brandNewPicAction() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            const brandFile = _this2.file('brand_new_pic');
            if (think.isEmpty(brandFile)) {
                return _this2.fail('保存失败');
            }
            const that = _this2;
            const filename = '/static/upload/brand/' + think.uuid(32) + '.jpg';

            const is = fs.createReadStream(brandFile.path);
            const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
            is.pipe(os);

            return that.success({
                name: 'brand_new_pic',
                fileUrl: 'http://127.0.0.1:8360' + filename
            });
        })();
    }

    categoryWapBannerPicAction() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            const imageFile = _this3.file('wap_banner_pic');
            if (think.isEmpty(imageFile)) {
                return _this3.fail('保存失败');
            }
            const that = _this3;
            const filename = '/static/upload/category/' + think.uuid(32) + '.jpg';

            const is = fs.createReadStream(imageFile.path);
            const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
            is.pipe(os);

            return that.success({
                name: 'wap_banner_url',
                fileUrl: 'http://127.0.0.1:8360' + filename
            });
        })();
    }

    topicThumbAction() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            const imageFile = _this4.file('scene_pic_url');
            if (think.isEmpty(imageFile)) {
                return _this4.fail('保存失败');
            }
            const that = _this4;
            const filename = '/static/upload/topic/' + think.uuid(32) + '.jpg';

            const is = fs.createReadStream(imageFile.path);
            const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
            is.pipe(os);
            //os.write()

            return that.success({
                name: 'scene_pic_url',
                fileUrl: 'http://127.0.0.1:8360' + filename
            });
        })();
    }

    /**
     *
     * @returns {Promise<*>}
     */
    adAction() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            const imageFile = _this5.file('file');
            if (think.isEmpty(imageFile)) {
                return _this5.fail('图片上传失败');
            }
            const that = _this5;
            const filename = '/static/upload/ad/' + think.uuid(32) + '.jpg';
            console.log(filename);
            console.log(imageFile.path);
            const is = fs.createReadStream(imageFile.path);
            const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
            is.pipe(os);

            return that.success({
                image_url: 'http://127.0.0.1:8360' + filename
            });
        })();
    }
    getPathAction(req) {
        return _asyncToGenerator(function* () {
            return new Promise(function (resolve, reject) {
                const form = formidable.IncomingForm();
                //form.uploadDir = './public/img';
                form.parse(req, (() => {
                    var _ref = _asyncToGenerator(function* (err, fields, files) {

                        const fullName = path.extname(files.file.name);

                        const repath = './public/img/' + fullName;
                        try {
                            yield fs.rename(files.file.path, repath);
                            gm(repath).resize(200, 200, "!").write(repath, (() => {
                                var _ref2 = _asyncToGenerator(function* (err) {
                                    // if(err){
                                    // 	console.log('裁切图片失败');
                                    // 	reject('裁切图片失败');
                                    // 	return
                                    // }
                                    resolve(fullName);
                                });

                                return function (_x4) {
                                    return _ref2.apply(this, arguments);
                                };
                            })());
                        } catch (err) {
                            console.log('保存图片失败', err);
                            fs.unlink(files.file.path);
                            reject('保存图片失败');
                        }
                    });

                    return function (_x, _x2, _x3) {
                        return _ref.apply(this, arguments);
                    };
                })());
            });
        })();
    }

    uploadImgAction(req, res, next) {
        var _this6 = this;

        return _asyncToGenerator(function* () {

            try {
                //const image_path = await this.qiniu(req, type);
                const image_path = yield _this6.getPath(req);
                res.send({
                    status: 1,
                    image_path
                });
            } catch (err) {
                console.log('上传图片失败', err);
                res.send({
                    status: 0,
                    type: 'ERROR_UPLOAD_IMG',
                    message: '上传图片失败'
                });
            }
        })();
    }

};
//# sourceMappingURL=upload.js.map