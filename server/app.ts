import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import * as sio from 'socket.io';

const app = express();
const httpServer = http.createServer(app);
const io = sio.listen(httpServer, {
  // below are engine.IO options
  pingInterval: 1000,
  pingTimeout: 5000,
});

app.set('ip', (process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'));
app.set('port', (process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000));
app.set('views', path.join(__dirname, '/assets/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


httpServer.listen(app.get('port'), app.get('ip'), () => {
  const msgStr = 'Angular Full Stack listening on port ' + app.get('port');
  console.log(msgStr);
});


/*----- START: Node Process events for get exceptions -----*/
process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'UNHANDLED REJECTION AT PROMISE', p);
  })
  .on('rejectionHandled', (p) => {
    console.error('REJECTION UNHANDLED', p);
  })
  .on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION : ', err);
  })
  .on('warning', (warning) => {
    console.error('WARNING : ', warning);
  });
/*----- END: Node Process events for get exceptions -----*/

export {app};
