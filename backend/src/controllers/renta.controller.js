import { RentaModel } from "../models/renta.model.js";
import message from "../utils/messages.js";
const {messageGeneral} = message;
const rentaCtrl={};

rentaCtrl.createRenta = async(req,res)=>{
  try {
    const data = req.body;
    const resp = await RentaModel.create(data);
    messageGeneral(res,201,true,resp,"Renta creada!!!");
  } catch (error) {
    messageGeneral(res,500,false,"",error.message);
  }
};

rentaCtrl.listAllRentas=async(req,res)=>{
  try {
    //hace el inner join con el usuario y que no muestre el password.
    const resp= await RentaModel.find().populate({ 
      path: "empleado",
      select: "-usuario",
    });
    messageGeneral(res,200,true,resp,"Lista de rentas");
  } catch (error) {
    messageGeneral(res,500,false,"",error.message);
  }
};

rentaCtrl.listById = async(req,res) =>{
  try {
    const { id } = req.params;
    const resp = await RentaModel.findById(id);
    if(!resp){
      return messageGeneral(res,404,false,"","Renta no encontrada");
    }
    messageGeneral(res,200,true,resp,"");
  } catch (error) {
    messageGeneral(res,500,false,"",error.message);
  }
};

rentaCtrl.deleteRenta = async(req,res) =>{
  try {
    const { id } = req.params;
    const resp = await RentaModel.findById(id);
    if(!resp){
      return messageGeneral(res,404,false,"","Renta no encontrada");
    }
    await resp.deleteOne();
    messageGeneral(res,200,true,"","Renta eliminada!!!");
  } catch (error) {
    messageGeneral(res,500,false,"",error.message);
  }
};

rentaCtrl.updateRenta = async(req,res) =>{
  try {
    const { id } = req.params;
    const resp = await RentaModel.findById(id);
    if(!resp){
      return messageGeneral(res,404,false,"","Renta no encontrada");
    }
    await resp.updateOne(req.body);
    messageGeneral(res,200,true,"","Renta actualizada!!!");
  } catch (error) {
    messageGeneral(res,500,false,"",error.message);
  }
};

rentaCtrl.listRentasEmployee = async(req,res) =>{
  try {
    //const { id } = req.params;
    //const resp = await RentaModel.find({ empleado:id })
    const resp = await RentaModel.find({ empleado:req.empleadoid }).populate({ 
      path: "empleado",
      select: "-id"});
    messageGeneral(res,200,true,resp,"");
  } catch (error) {
    messageGeneral(res,500,false,"",error.message);
  }
};

rentaCtrl.searchRenta = async(req,res) =>{
  try {
    //buscar por nombres
    const { id, nombreCliente } = req.params;
    //busca los empleados con la expresión que indica que busca los nombres
    //que inicien o contengan la cadena de la expresión.
    const resp = await EmpleadoModel.find({
      nombreCliente:{$regex: ".*" + nombreCliente + ".*"},
      empleado: id,
    });
    messageGeneral(res,200,true,resp,"");
  } catch (error) {
    messageGeneral(res,500,false,"",error.message);
  }
};

export default rentaCtrl;