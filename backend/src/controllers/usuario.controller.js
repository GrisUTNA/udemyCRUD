import { UserModel } from "../models/usuario.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import message from "../utils/messages.js";
const {messageGeneral} = message;
//Creamos un objeto llamado userCtrl y lo iniciamos vacío.
const userCtrl={}

//creamos la primera función o método de ese objeto llamado register.
userCtrl.register=async(req,res)=>{
  try {
    //creamos la constante donde se almacenará lo que llega del cliente.
    const data=req.body;
    //verificar que el correo no existe
    const resp=await UserModel.findOne({correo:data.correo});
    //se pone el return para que se salga si encuentra el correo
    //y no usar el else
    if (resp) {
      return messageGeneral(res,400,false,"","El correo ya existe");
    }
    //encriptar contraseña
    data.password = await bcrypt.hash(data.password,10);
    //crear token al id el nuevo usuario y se agrega una palabra secreta para desencriptar
    //en este caso agregamos la palabra secreta.
    const newUser=await UserModel.create(data);
    const token = jwt.sign({_id:newUser._id},"secreta");
    //si se imprime solo ...newUser trae mucha inf. innecesaria, solo queremos ver el _doc
    //por ello se le agrega
    messageGeneral(res,201,true,{...newUser._doc,password:null,token},"El usuario se creó correctamente");
  } catch (error) {
    messageGeneral(res,500,false,"",error.message);
  }
}

userCtrl.login = async(req,res) =>{
  try {
    const data=req.body;
    const resp = await UserModel.findOne({correo:data.correo});
    if (!resp){
      return messageGeneral(res,400,false,"","El correo no existe");
    }

    //reconvertir la contraseña encriptada para compararla
    const match = await bcrypt.compare(data.password, resp.password);
    if (match){
      //crear token
      const token = jwt.sign({_id:resp._id},"secreta");
      //imprime la respuesta, y oculta el pw para que no lo vean 
      return messageGeneral(res,201,true,{...resp._doc,password:null,token},"Bienvenido!!!");
    }
    messageGeneral(res,400,false,"","La contraseña es incorrecta!!!");
  } catch (error) {
    messageGeneral(res,500,false,"",error.message);
  }
}

export default userCtrl;