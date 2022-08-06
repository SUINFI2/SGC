const {Strategy}=require('passport-local');
const boom =require('@hapi/boom');
const bcrypt = require('bcrypt');

const AuthService = require('../../../services/auth.services');
const service = new AuthService();

const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
},async (email,password, done)=>{
  try{
    const usuario = await service.getUser(email,password);
    done(null,usuario);
  }catch(err){
    done(err, false);
  }
});
module.exports= LocalStrategy;
