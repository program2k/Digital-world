const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: 'dkg6dz9jf',
    api_key: '922286553826918',
    api_secret: 'iThwhX-13qrgQ0hqlfKzm51WpRQ'
});

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png'],
    params: {
        folder: 'shopcongdeptrai'
    }
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
