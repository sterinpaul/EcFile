
import multer from 'multer';
import {CloudinaryStorage } from 'multer-storage-cloudinary';
import {v2 as cloudinary} from 'cloudinary';
          

const profileOptions = {
    cloudinary:cloudinary,
    params:{
        folder: 'ecFileProfilePics',
        allowed_formats : ['jpg', 'jpeg', 'png'],
        transformation: [{ width: 500, height: 500, crop: 'limit' },{ quality: '60' }],
        public_id:(req,file) => {
            const originalname = file.originalname.split('.')
            return `image-${Date.now()}-${originalname[0]}`
        }
    }
}
const profilePicStorage = new CloudinaryStorage(profileOptions)
export const uploadProfilePic = multer({storage:profilePicStorage }).single('profilePic')

