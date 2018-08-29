const model = require('think-model');
const cache = require('think-cache');

module.exports = [
  model(think.app),//提供模型功能的扩展，添加之后会添加方法think.Model、think.model、ctx.model、controller.model、service.model
  cache
];
