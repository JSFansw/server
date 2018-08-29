const Base = require('./base.js');

module.exports = class extends Base {
    /**
     * 查询用户列表
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        const page = this.get('page') || 1;
        const size = this.get('size') || 20;
        const name = this.get('name') || '';
        
        const model = this.model('user');
        const data = await model.where({username: ['like', `%${name}%`]}).order(['id DESC']).page(page, size).countSelect();
        return this.success(data);
    }
    
    /**
     * 根据用户ID查询用户信息
     * @returns {Promise<*|boolean>}
     */
    async infoAction() {
        //const id = this.get('id');
        const id = 14;
        const model = this.model('user');
        const data = await model.where({id: id}).find();
        return this.success(data);
    }
    
    /**
     *
     * @returns {Promise<*>}
     */
    async storeAction() {
        // 修改操作只接收post请求
        if (!this.isPost) {
            return false;
        }
        
        const values = this.post();
        const id = this.post('id');
        
        const model = this.model('user');
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
    
    /**
     *
     * 删除用户操作
     * @returns {Promise<*|boolean>}
     */
    async destoryAction() {
        const id = this.post('id');
        await this.model('user').where({id: id}).limit(1).delete();
        // TODO 删除图片
        
        return this.success();
    }
    
    /**
     * 获取用户总数量
     */
    
    async countAction() {
        const count = await this.model('user').count();
        return this.success(count);
    }
    
    /**
     * 获取今天注册的用户量
     */
    
    async todaycountAction() {
        const date = this.get('date');
        // const data = this.model('user').find({registe_time: eval('/^' + date + '/gi')}).count();
        const data = await this.model('user').count();
        return this.success(data);
    }
    
    /**
     * 返回用户列表
     * @returns {Promise<*|boolean>}
     */
    async list1Action() {
        const userList = await this.model('user').select();
        return this.success(userList);
    }
    
};
