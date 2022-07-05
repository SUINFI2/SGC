const express = require('express');
const routerApi = require('./routes/index');
const app = express();
const {longError,errorHandler,BoomErrorHandler}= require('./middlewares/error.handler');
const port = 3000;
// para poder manejar datos tipo json
app.use(express.json());
routerApi(app);

app.use(longError);
app.use(BoomErrorHandler);
app.use(errorHandler);

app.listen(port, ()=>{
  console.log('Mi port'+port);
});
