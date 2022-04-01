import {Router} from 'express';
import rentaCtrl from '../controllers/renta.controller.js';
import { verificarToken } from '../middlewares/Auth.js';

const route = Router();

route.post('/',rentaCtrl.createRenta);
route.get('/',rentaCtrl.listAllRentas);
route.get('/listid/:id',rentaCtrl.listById);
route.delete('/delete/:id',rentaCtrl.deleteRenta);
route.put('/update/:id',rentaCtrl.updateRenta);
route.get('/rentasemployee/:id',verificarToken,rentaCtrl.listRentasEmployee);
route.get('/search/:id/:nombreCliente',rentaCtrl.searchRenta);

export default route;

