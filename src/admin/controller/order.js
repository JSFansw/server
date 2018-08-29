const Base = require('./base.js');

module.exports = class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        const page = this.get('page') || 1;
        const size = this.get('size') || 10;
        const orderSn = this.get('orderSn') || '';
        const consignee = this.get('consignee') || '';
        
        const model = this.model('order');
        const data = await model.where({
            order_sn: ['like', `%${orderSn}%`],
            consignee: ['like', `%${consignee}%`]
        }).order(['id DESC']).page(page, size).countSelect();
        const newList = [];
        for (const item of data.data) {
            item.order_status_text = await this.model('order').getOrderStatusText(item.id);
            newList.push(item);
        }
        data.data = newList;
        return this.success(data);
    }
    
    async infoAction() {
        const id = this.get('id');
        const model = this.model('order');
        const data = await model.where({id: id}).find();
        
        return this.success(data);
    }
    
    async storeAction() {
        if (!this.isPost) {
            return false;
        }
        
        const values = this.post();
        const id = this.post('id');
        
        const model = this.model('order');
        values.is_show = values.is_show ? 1 : 0;
        values.is_new = values.is_new ? 1 : 0;
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
        await this.model('order').where({id: id}).limit(1).delete();
        
        // 删除订单商品
        await this.model('order_goods').where({order_id: id}).delete();
        
        // TODO 事务，验证订单是否可删除（只有失效的订单才可以删除）
        
        return this.success();
    }
    
    /**
     *
     * @returns {Promise<*|boolean>}
     */
    async countAction() {
        const count = await this.model('order').count();
        return this.success(count);
    }
    
    async listAction(){
        const list = await this.model('order').select();
        return this.success(list);
    }
    
    /**
     * 获取今日订单数
     * @returns {Promise<*|boolean>}
     */
    async todaycountAction() {
        const date = this.get('date');
        // const data = this.model('user').find({registe_time: eval('/^' + date + '/gi')}).count();
        const data = await this.model('order').count();
        return this.success(data);
    }
    
    /**
     * 今日订单总额
     * @returns {Promise<*|boolean>}
     */
    async moneyAction() {
        const date = this.get('date');
        // const data = await this.model('user').find({registe_time: eval('/^' + date + '/gi')}).count();
        const data = await this.model('order').count();
        return this.success(data);
    }
    
    /**
     * 历史订单总额
     * @returns {Promise<*|boolean>}
     */
    async allmoneyAction() {
        const count = await this.model('order').count();
        return this.success(count);
    }
    
    async allMoneyAction(){
        const count = await this.model('order').count();
        return this.success(count);
    }
};
