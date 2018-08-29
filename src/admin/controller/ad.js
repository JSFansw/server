const Base = require('./base.js');

module.exports = class extends Base{
    /**
     *  获取ad列表
     * @returns {Promise<*|boolean>}
     */
    async listAction(){
        const adList =await this.model('ad').select();
        return this.success(adList);
    }
    
    /**
     *  获取单个ad信息
     * @returns {Promise<*|boolean>}
     */
    async infoAction(){
        const adId = this.get('id');
        const detail = await this.model('ad').where({id : adId}).find();
        return this.success(detail);
    }
    
    /**
     * 存储广告信息，可以用来新增和修改
     * @returns {Promise<void>}
     */
    async storeAction(){
        if (!this.isPost) {
            return this.fail(1001,'请使用post请求提交数据');
        }
    
        const values = this.post();
        const id = this.post('id');
    
        const model = this.model('ad');
        //values.is_show = values.is_show ? 1 : 0;
        //values.is_new = values.is_new ? 1 : 0;
        //如果id存在，则为更新，id不存在则增加
        if (id > 0) {
            await model.where({id: id}).update(values);
        } else {
            delete values.id;
            await model.add(values);
        }
        return this.success(values);
        
    }
    
    /**
     * 获取广告条数
     * @returns {Promise<*|boolean>}
     */
    async countAction(){
        const count = await this.model('ad').count();
        return this.success(count);
    }
    
    /**
     * 删除某一条广告
     * @returns {Promise<*|boolean>}
     */
    async deleteAction(){
        if (!this.isPost) {
            // 10001 请求类型出错
            return this.fail(1001,'请使用post提交数据');
        }
        const adId = this.post('ad_id');
        const result = await this.model('ad').where({id: adId}).limit(1).delete();
        //TODO 删除广告对应的本地图片
        
        return this.success(result);
    }
    
};