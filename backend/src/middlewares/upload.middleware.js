const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const explode = file.originalname.split('.')
        const ext = explode.pop()
        const filename = new Date().getTime().toString() + '.' + ext
        cb(null, filename)
    }
})


const limits = {
    fileSize: 1 * 1024 * 1024
}
// chaining mimetypes with regex
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/
    const mimeType = fileTypes.test(file.mimetype)
    if(!mimeType){
        cb(Error('fileformat_error'))
    }
    cb(null, true)
}

const upload = multer({storage, limits, fileFilter})

const uploadMiddleware = (field) => {
    const uploadField = upload.single(field)
    return (request, response, next) => {
        uploadField(request, response, (err) => {
            if(err){
                if(err.message === 'fileformat_error'){
                    return response.status(400).json({
                        success: false,
                        message: 'file format invalid!'
                    })
                }
                return response.status(400).json({
                    success: false,
                    message: 'file too large!'
                })
            }
            return next()
        })
    }

}

module.exports = uploadMiddleware
