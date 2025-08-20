const Joi = require('joi');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const UserDTO = require('../dto/user');
const JWTservices = require('../services/JWTservices');
const RefreshToken = require('../models/token')

const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const authController = {
    // Register Route
    async register(req,res,next){
        // validate input

        const userRegisterSchema = Joi.object({
            username: Joi.string().min(5).max(20).required(),
            email: Joi.string().email().required(),
            contact: Joi.string().required(),
            password: Joi.string().pattern(passwordPattern).required(),
            confirmPassword: Joi.ref('password'),
        })

        const {error} =  userRegisterSchema.validate(req.body)

        //   if error in validation -> return error via middleware
        if(error){
            return next(error)
        }

        // if email or username already exist -> return error

        const {username,email,contact,password} = req.body;
            try {
                const emailInUse = await User.exists({email});
                const usernameInUse = await User.exists({username});

                if(emailInUse){
                    const error = {
                        status: 409,
                        message: 'Email already registered, use another email'
                    }
                    return next(error)
                }

                if(usernameInUse){
                    const error ={
                        status: 409,
                        message: 'Username already exist, use another username!'
                    }
                    return next(error)
                }

                // Password Hashed

                const hashedPassword = await bcrypt.hash(password,10)

                // store user data in database
                let user;
                let accessToken;
                let refreshToken;
                try {
                    const userToRegister = new User({
                        username,
                        email,
                        contact,
                        password: hashedPassword,
                    });

                    user = await userToRegister.save();

                    // generate token
                    accessToken = JWTservices.signAccessToken({_id: user._id},'30m')
                    refreshToken = JWTservices.signRefreshToken({_id: user._id},'60m')

                     // store refresh token
                    await JWTservices.storeRefreshToken(refreshToken, user._id)
                   
                } catch (error) {
                    return next(error)
                }

                

                //  send token in cookie
                res.cookie('accessToken',accessToken,{
                    maxAge: 1000 * 60 * 60 * 24,
                    httpOnly: true,    
                })

                res.cookie('refreshToken',refreshToken,{
                    maxAge: 1000 * 60 * 60 * 24,
                    httpOnly: true,    
                })


                // response
                const userDTO = new UserDTO(user);
                return res.status(201).json({user: userDTO,auth : true})

            } catch (error) {
                return next(error)
            }

    },


    // Login Route

    async login (req,res,next){
        // validate users
        const userLoginSchema = Joi.object({
            username: Joi.string().min(5).max(20).required(),
            password: Joi.string().pattern(passwordPattern).required(),
        })

        const {error} = userLoginSchema.validate(req.body);
        if(error){
            return next(error)
        }

        const {username,password} = req.body;
        let user;

        try {
            user = await User.findOne({username})
            if(!user){
                const error = {
                    status: 401,
                    message: 'Invalid username or password'
                }
                return next(error)
            }

            //  match password
            const match = await bcrypt.compare(password,user.password);

            if(!match){
                const error ={
                    status: 401,
                    message: 'Invalid Password'
                }
                return next(error)
            }
            
                
        } catch (error) {
            return next(error)
        }

        let accessToken = JWTservices.signAccessToken({id: user._id}, '30m');
        let refreshToken = JWTservices.signRefreshToken({id: user._id}, '60m');

           //   update refresh token in database
           try {
            await RefreshToken.updateOne({_id: user._id},{token: refreshToken},{upsert: true})
          } catch (error) {
              return next(error)
          }
            
         // send tokens in cookie
         res.cookie('accessToken',accessToken , {
             maxAge: 1000 * 60 * 60 * 24,
             httpOnly : true
         })
         res.cookie('refreshToken',refreshToken , {
             maxAge: 1000 * 60 * 60 * 24,
             httpOnly : true
         })
        
        // response
        const userDTO = new UserDTO(user);
        return res.status(200).json({user: userDTO,auth : true})
    },

    async logout(req,res,next){
         // delete refresh token  from db
         const {refreshToken} = req.cookies;
        try {
            await RefreshToken.deleteOne({token: refreshToken})
         } catch (error) {
             return next(error)
         }

          // delete cookies
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')

        // response
        res.status(200).json({user: null, auth : false})
    },       


    async refresh(req,res,next){
        // get refresh token from cookies
        const originalRefreshtoken = req.cookies.refreshToken;
        // verify refreshToken
        let id;
        try {
            id = JWTservices.verifyRefreshToken(originalRefreshtoken)._id;
            // console.log(id);
        } catch (e) {
            const error = {
                status : 401,
                message: 'Unauthorized' 
            }   
            return next(error)
        }

        try {
           const match = RefreshToken.findOne({_id: id, token: originalRefreshtoken})
           if(!match){
            const error = {
                status : 401,
                message: 'Unauthorized' 
            }
            return next(error)
           }

        } catch (error) {
            return next(error)
        }
        // generate new tokens
        try {
            const accessToken = JWTservices.signAccessToken({_id: id}, '30m')
            const refreshToken = JWTservices.signRefreshToken({_id: id}, '60m')
            
            await RefreshToken.updateOne({_id: id}, {token: refreshToken})
            
            res.cookie('accessToken', accessToken, {
                maxAge: 1000* 60 * 60 *24,
                httpOnly: true
            })

            res.cookie('refreshToken', refreshToken, {
                maxAge: 1000* 60 * 60 *24,
                httpOnly: true
            })

        } catch (e) {
            return next(e)
        }
        // update db, return response
        const user = await User.findOne({ _id: id });
        // console.log(user);
        // const userDto = new UserDTO(user);
        
        return res.status(200).json({user, auth: true})
    },

}

module.exports = authController
