import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const rentaSchema = new Schema({
    fechaApartado:{ type: Date, default: Date.now },
    nombreCliente:{ type:String, required: true },
    descripcion:{ type:String, required: true },
    fechaEntrega:{ type: Date, default: Date.now },
    fechaDevolucion:{ type: Date, default: Date.now },
    montoRenta:{ type: Number, required: true },
    anticipo:{ type: Number, required: true },
    pago:{ type: Number, required: true },
    saldoPendiente:{ type: Number, required: true },
    pagoTotal:{ type: Number, required: true },
    estadoRenta:{ type: String, required: true },
    empleado:{type:Schema.ObjectId, ref: "empleado"},
    }, { timestamps:true }
  );

export const RentaModel = model('rentas',rentaSchema);