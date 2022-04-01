import {Router} from 'express';
import empleadoCtrl from '../controllers/empleado.controller.js';
import { verificarToken } from '../middlewares/Auth.js';

const route = Router();

route.get('/',empleadoCtrl.listAllEmployees);
//antes de crear el emñpleado verifica el token de acceso.
route.post('/',verificarToken,empleadoCtrl.createEmployee);
route.get('/listid/:id',verificarToken,empleadoCtrl.listById);
//get employees by boss
route.get("/geb",verificarToken,empleadoCtrl.listEmployeeBoss);
route.delete('/delete/:id',verificarToken,empleadoCtrl.deleteEmployee);
route.put('/update/:id',verificarToken,empleadoCtrl.updateEmployee);
route.get('/search/:nombres',verificarToken,empleadoCtrl.searchEmployee);

export default route;