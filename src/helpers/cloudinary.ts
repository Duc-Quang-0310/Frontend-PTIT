import { v2 } from 'cloudinary';

class Cloudinary {
  private bucket = v2;

  constructor() {
    this.initBucket();
  }

  private initBucket() {
    this.bucket.config({
      cloud_name: 'dsykf3mo9',
      api_key: '274161838196584',
      api_secret: 'mRT3ltkNCdtS-B5wffPGvcAjfL4'
    });
  }

  async uploadAvatar(image: string, fileName: string) {
    const newAvatar = await this.bucket.uploader.upload(image, {
      folder: 'PtitAvatar',
      public_id: fileName
    });
    return newAvatar.url;
  }
}

export default new Cloudinary();
