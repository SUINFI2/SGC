const express = require('express');
const routerApi = require('./routes/index');
const cors = require('cors');
const app = express();
const {longError,errorHandler,BoomErrorHandler}= require('./middlewares/error.handler');
const port = 3000;
// para poder manejar datos tipo json
app.use(express.json());

const whitelist = ['http://localhost:3000','http://myapp.com'];
const options = {
  origin: (origin,callback)=>{
    if(whitelist.includes(origin)){
      callback(null,true);
    }else{
      callback(new Error('acceso no permitido'));
    }
  }
}
//app.use(cors(options));
app.use(cors()); // si lo hacemos asi, habilitamos a cualquier dominio


routerApi(app);

app.use(longError);
app.use(BoomErrorHandler);
app.use(errorHandler);

app.listen(port, ()=>{
  console.log('Mi port'+port);
});


/*
-> Compras= {

  ** v0.1 **
  -> realizar una {nota de pedido} enviada a un {prveedor} y un {encargado de compras} para
     luego confirmarla el {encargado de deposito} de esta manera modificando el {deposito} y
     genenrando una {orden de pago} recibida por un {encargado de tesoreria} y asi modificar {cuentas}.
          // la nota de pedido puede ser de materia prima y/o mercaderia.
          // el encargado de compras puede ser de produccion y/o mercaderia.
          // el deposito puede almacenar materia prima, produccion y/o mercaderia.

  **
}


 ventas = {

  ** v0.1 **
  -> realizar una {venta_directa} por un {cajero}, para un{cliente}
     modificando el {deposito},genenrando una {orden de cobro} recibida por un
     {encargado de tesoreria} y asi modificar {cuentas}.

  ** v0.2 **
  -> -> realizar un {pedido_venta} para ser manipulado por {encargado deposito} y despues ser entregado
     a {encargado reparto}, este luego debera entregarlo a {cliente} para finalizar la entrega y modificar {deposito}


 }
*/
