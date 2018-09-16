const Base = require('./base.js');
const fs = require('fs');

module.exports = class extends Base {
  async brandPicAction() {
    const brandFile = this.file('brand_pic');
    if (think.isEmpty(brandFile)) {
      return this.fail('保存失败');
    }
    const that = this;
    const filename = '/static/upload/brand/' + think.uuid(32) + '.jpg';
    const is = fs.createReadStream(brandFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    return that.success({
      name: 'brand_pic',
      fileUrl: 'http://127.0.0.1:8360' + filename
    });
  }

  async brandNewPicAction() {
    const brandFile = this.file('brand_new_pic');
    if (think.isEmpty(brandFile)) {
      return this.fail('保存失败');
    }
    const that = this;
    const filename = '/static/upload/brand/' + think.uuid(32) + '.jpg';

    const is = fs.createReadStream(brandFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    return that.success({
      name: 'brand_new_pic',
      fileUrl: 'http://127.0.0.1:8360' + filename
    });
  }

  async categoryWapBannerPicAction() {
    const imageFile = this.file('wap_banner_pic');
    if (think.isEmpty(imageFile)) {
      return this.fail('保存失败');
    }
    const that = this;
    const filename = '/static/upload/category/' + think.uuid(32) + '.jpg';

    const is = fs.createReadStream(imageFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    return that.success({
      name: 'wap_banner_url',
      fileUrl: 'http://127.0.0.1:8360' + filename
    });
  }
    
async topicThumbAction() {
    const imageFile = this.file('scene_pic_url');
    if (think.isEmpty(imageFile)) {
        return this.fail('保存失败');
    }
    const that = this;
    const filename = '/upload/topic/' + think.uuid(32) + '.jpg';
    
    const is = fs.createReadStream(imageFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www/static' + filename);
    is.pipe(os);
    //os.write()
    
    return that.success({
        name: 'scene_pic_url',
        fileUrl: 'http://127.0.0.1:8360' + filename
    });
}
    
    /**
     * 保存广告图片
     * @returns {Promise<*>}
     */
  async adAction(){
      const imageFile = this.file('file');
      if (think.isEmpty(imageFile)) {
          return this.fail('图片上传失败');
      }
      const that = this;
      const filename = 'upload/ad/' + think.uuid(32) + '.jpg';
      console.log(filename);
      console.log(imageFile.path);
      const is = fs.createReadStream(imageFile.path);
      const os = fs.createWriteStream(think.ROOT_PATH + '/www/static/' + filename);
      is.pipe(os);
      return that.success({
          image_url: filename
      });
  }
    async getPathAction(req) {
        return new Promise((resolve, reject) => {
            const form = formidable.IncomingForm();
            //form.uploadDir = './public/img';
            form.parse(req, async (err, fields, files) => {
                
                
                const fullName =path.extname(files.file.name);
                
                
                const repath = './public/img/' + fullName;
                try {
                    await fs.rename(files.file.path, repath);
                    gm(repath)
                        .resize(200, 200, "!")
                        .write(repath, async (err) => {
                            // if(err){
                            // 	console.log('裁切图片失败');
                            // 	reject('裁切图片失败');
                            // 	return
                            // }
                            resolve(fullName)
                        })
                } catch (err) {
                    console.log('保存图片失败', err);
                    fs.unlink(files.file.path)
                    reject('保存图片失败')
                }
            });
        })
    }
    
    async uploadImgAction(req, res, next) {
      
        try {
            //const image_path = await this.qiniu(req, type);
            const image_path = await this.getPath(req);
            res.send({
                status: 1,
                image_path,
            })
        } catch (err) {
            console.log('上传图片失败', err);
            res.send({
                status: 0,
                type: 'ERROR_UPLOAD_IMG',
                message: '上传图片失败'
            })
        }
        
    }
    

};
