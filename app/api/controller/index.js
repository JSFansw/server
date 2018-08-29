function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    var _this = this;

    return _asyncToGenerator(function* () {
      //首页滚动条广告，ad_posiotion_id=1的banner是放在首页轮播的
      const banner = yield _this.model('ad').where({enabled: 1 }).select();
      //频道
      const channel = yield _this.model('channel').order({ sort_order: 'asc' }).select();
      //新鲜首发
      const newGoods = yield _this.model('goods').field(['id', 'name', 'list_pic_url', 'retail_price']).where({ is_new: 1 }).limit(4).select();
      //热气推荐
      const hotGoods = yield _this.model('goods').field(['id', 'name', 'list_pic_url', 'retail_price', 'goods_brief']).where({ is_hot: 1 }).limit(3).select();
      //品牌制造商直供，选择有新商品的前4项
      const brandList = yield _this.model('brand').where({ is_new: 1 }).order({ new_sort_order: 'asc' }).limit(4).select();
      //专题精选
      const topicList = yield _this.model('topic').limit(3).select();
      //商品分类
      const categoryList = yield _this.model('category').where({ parent_id: 0, name: ['<>', '推荐'] }).select();
      const newCategoryList = [];
      for (const categoryItem of categoryList) {
        const childCategoryIds = yield _this.model('category').where({ parent_id: categoryItem.id }).getField('id', 100);
        const categoryGoods = yield _this.model('goods').field(['id', 'name', 'list_pic_url', 'retail_price']).where({ category_id: ['IN', childCategoryIds] }).limit(7).select();
        newCategoryList.push({
          id: categoryItem.id,
          name: categoryItem.name,
          goodsList: categoryGoods
        });
      }

      return _this.success({
        banner: banner,
        channel: channel,
        newGoodsList: newGoods,
        hotGoodsList: hotGoods,
        brandList: brandList,
        topicList: topicList,
        categoryList: newCategoryList
      });
    })();
  }

  getImgAction() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const img = 'http://yanxuan.nosdn.127.net/65091eebc48899298171c2eb6696fe27.jpg';
      return _this2.success(img);
    })();
  }
};
//# sourceMappingURL=index.js.map