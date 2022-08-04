const jt = require('jsonwebtoken');

// el secret debe ir como varaible de entorno
const secret = 'mycat';
const token = 'asdasdad';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(payload, secret);
console.log(payload);
