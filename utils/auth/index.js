const passport = require('passport');
const LocalStrategy = require('./strategies/local.strategy');
console.log('pase por aqui');
passport.use(LocalStrategy);
