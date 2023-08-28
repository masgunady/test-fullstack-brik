const {User} = require('../models')
const argon = require('argon2')
const jwt = require('jsonwebtoken')
const errorHandler = require('../helpers/errorHandler.helper')
const {APP_SECRET} = process.env
module.exports = {
    userRegister: async (req, res) => {
        try {
            const {firstName, lastName, email} = req.body

            const checkDuplicate = await User.findOne({
                where: {
                    email
                }
            })

            if(checkDuplicate){
                throw Error('duplicate_email')
            }

            const password = await argon.hash(req.body.password)
            const userData = {
                firstName,
                lastName,
                email,
                password
            }
            const data = await User.create(userData)
            const token = jwt.sign({
                id:data.id
            }, APP_SECRET)
            res.json({
                success: true,
                message: 'User Created',
                results: {token}
            })
        } catch (error) {
            return errorHandler(res, error)
        }
    },
    userLogin: async (req, res) => {
        try {
            const {email, password} = req.body
            const findUser = await User.findOne({
                where: {
                    email
                }
            })
            if(!findUser){
                throw Error('wrong_credentials')
            }

            const verify = await argon.verify(findUser.password, password)
            if(!verify){
                throw Error('wrong_credentials')
            }

            const token = jwt.sign({
                id:findUser.id
            }, APP_SECRET)

            return res.json({
                success: true,
                message: 'Login Success',
                results: {token}
            })
        } catch (error) {
            return errorHandler(res, error)
        }
    }
}