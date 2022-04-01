import mongoose from 'mongoose';
const { Schema, model } = mongoose;
// con la instrucción usuario:{ type: Schema.ObjectId, ref: "usuario"},
// Se hace la relación con el id del modelo usuario. de tipo object id
//para poder hacer el populate después.

const employeeSchema = new Schema(
  {
    nombres:{ type:String, required: true },
    apellidos:{ type:String, required: true },
    id:{ type:String, required: true },
    tcontrato:{ type:String, required: true },
    usuario:{ type:Schema.ObjectId, ref: "usuario" },
  },
  { timestamps:true }
);

export const EmpleadoModel = model('empleado',employeeSchema);