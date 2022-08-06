const jwt = require('jsonwebtoken');

// el secret debe ir como varaible de entorno
const secret = 'mycat';
// el payload es la info que debe tener el token
const payload = {
  // forma en la que vamos a indentificar al usuario
  sub: 1,
  role: 'admin',
};

function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);
console.log(token);
