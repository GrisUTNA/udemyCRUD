import {Router} from 'express';
//se importa el controlador para poder acceder a la función register.
import userCtrl from '../controllers/usuario.controller.js';
const route = Router();

//ruta a la accederá el controlador
route.post('/register',userCtrl.register);
route.post('/login',userCtrl.login);
export default route;