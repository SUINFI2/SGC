const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const { config } = require('../config/config');
const boom = require('@hapi/boom');
const UsuariosService = require('./usuarios.service');
const service = new UsuariosService();

class AuthService {
  async getUser(email, password) {
    const usuario = await service.findByEmail(email);
    if (!usuario) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete usuario.dataValues.password;
    return usuario;
  }
  signToken(usuario) {
    const payload = {
      sub: usuario.id,
      tenant: usuario.negocioId,
      role: usuario.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      usuario,
      token,
    };
  }
  async sendPassword(email) {
    const usuario = await service.findByEmail(email);
    if (!usuario) {
      throw boom.unauthorized();
    }
    const payload = { sub: usuario.id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
    const link = `http://myfrontend.com/recovery?token=${token}`;
    await usuario.update({ recoveryToken: token });

    const mail = {
      from: `${config.mailerEmail}`,
      to: `${usuario.email}`,
      subject: 'Email de recuperación de contraseña',
      html: `<b>Ingrsa a este link => ${link} </b>`,
    };
   // const rta = await this.sendMail(mail);
    return usuario;
  }
  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: config.mailerEmail,
        pass: config.mailerPassword,
      },
    });
    await transporter.sendMail(infoMail);
    return { message: 'Mail enviado!' };
  }
  async changePassword(token, newPassword) {
    try {
      console.log(token);
      const payload = jwt.verify(token, config.jwtSecret);
      const usuario = await service.findOne(payload.tenant, payload.sub);

      if (token !== usuario.recoveryToken) {
        throw boom.unauthorized('2');
      }
      const hashPass = await bcrypt.hash(newPassword, 5);
      await usuario.update({
        recoveryToken: null,
        password: hashPass,
      });
      return { message: 'Password Changed!' };
    } catch (err) {
      throw boom.unauthorized('3');
    }
  }
}
module.exports = AuthService;
