const {Strategy}=require('passport-local');
const boom =require('@hapi/boom');
const bcrypt = require('bcrypt');

const UsuariosService = require('../../../services/usuarios.service');
const service = new UsuariosService();

const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
},async (email,password, done)=>{
  try{
    const usuario = await service.findByEmail(email);
    if(!usuario){

      done(boom.unauthorized(),false);
    }
    console.log('hola de nuevo');
    const isMatch = await bcrypt.compare(password,usuario.password);
    if(!isMatch){
      done(boom.unauthorized(),false);
    }
    delete usuario.dataValues.password;
    done(null,usuario);
  }catch(err){
    done(err, false);
  }
});
module.exports= LocalStrategy;
