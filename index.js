const express = require('express');
console.log('Mi App');
const routerApi = require('./routes/index');
const cors = require('cors');
const app = express();
const {longError,errorHandler,BoomErrorHandler,ormErrorHandler}= require('./middlewares/error.handler');
const port = process.env.PORT || 3000;
// para poder manejar datos tipo json
app.use(express.json());

const whitelist = ['http://localhost:3000','http://myapp.com'];
const options = {
  origin: (origin,callback)=>{
    if(whitelist.includes(origin) || !origin){
      callback(null,true);
    }else{
      callback(new Error('acceso no permitido'));
    }
  }
}
app.use(cors(options));
//app.use(cors()); // si lo hacemos asi, habilitamos a cualquier dominio


routerApi(app);

app.use(longError);
app.use(ormErrorHandler);
app.use(BoomErrorHandler);
app.use(errorHandler);

app.listen(port, ()=>{
  console.log('Mi port'+port);
});


/*
-> Compras= {

  ** v0.1 **
  -> crear compra directa que afecte stock
  -> crear compra indirecta
  }

  ventas = {
  ** v0.1 **
  -> crear venta directa, que afecte stock

 cobros = {
  ** v0.1 **
  -> crear orden de cobro que afecte a las cuentas

 }

  pagos = {
  ** v0.1 **
  -> crear orden de pago que afecte a las cuentas

 }

 cuentas={
    ** v0.1 **
  -> poder visualizar eñ estado de cuentas
  ->
 }
 impresora = {
  ** v0.1 **
  -> elegir impresora e imprimir ventas, compras o informes

 }
*/
