const Base = require('./base.js');

module.exports = class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        const model = this.model('category');
        const data = await model.where({is_show: 1}).order(['sort_order ASC']).select();
        const topCategory = data.filter((item) => {
            return item.parent_id === 0;
        });
        const categoryList = [];
        topCategory.map((item) => {
            item.level = 1;
            categoryList.push(item);
            data.map((child) => {
                if (child.parent_id === item.id) {
                    child.level = 2;
                    categoryList.push(child);
                }
            });
        });
        return this.success(categoryList);
    }
    
    /**
     *  获取第一层分类
     * @returns {Promise<*|boolean>}
     */
    async topCategoryAction() {
        const model = this.model('category');
        const data = await model.where({parent_id: 0}).order(['id ASC']).select();
        
        return this.success(data);
    }
    
    
    async infoAction() {
        const id = this.get('id');
        const model = this.model('category');
        const data = await model.where({id: id}).find();
        
        return this.success(data);
    }
    
    /**
     *  新增或者更新一个分类信息
     * @returns {Promise<*>}
     */
    async storeAction() {
        if (!this.isPost) {
            return false;
        }
        
        const values = this.post();
        const id = this.post('id');
        
        const model = this.model('category');
        values.is_show = values.is_show ? 1 : 0;
        if (id > 0) {
            await model.where({id: id}).update(values);
        } else {
            delete values.id;
            await model.add(values);
        }
        return this.success(values);
    }
    
    /**
     * 删除一个分类信息
     * @returns {Promise<*|boolean>}
     */
    async destoryAction() {
        const id = this.post('id');
        await this.model('category').where({id: id}).limit(1).delete();
        // TODO 删除图片
        
        return this.success();
    }
    
    /**
     *  获取子分类的个数及列表
     * @returns {Promise<void>}
     */
    async listAction() {
        const id = this.get('id');
        const model = this.model('category');
        const count = await model.where({parent_id: id}).count();
        const data = await model.where({parent_id:id}).select();
        return this.success({count:count,data:data});
    }
    
    /**
     *  获取子分类数目
     */
    async count(){
        const id = this.get('id');
        const model = this.model('category');
        const count = model.where({parent_id:id}).count();
        return this.success(count);
    }
    // async
};
