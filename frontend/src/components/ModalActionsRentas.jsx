import { Modal } from 'react-responsive-modal';
import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import axios from 'axios';

const ModalActionsRentas = ({open, onCloseModal, getRentas, edit, renta}) => {

  const initialState = {
    nombreCliente: "",
    descripcion: "",
    montoRenta: 0,
    anticipo: 0,
    pago:0,
    saldoPendiente:0,
    pagoTotal:0,
    estadoRenta:"Apartado"
  };

  const [dataRenta, setDataRenta] = useState(initialState);
  const testadoRenta = ["Apartado", "Entregado", "Devuelto"];

  useEffect(() => {
    edit ? setDataRenta(renta) : setDataRenta(initialState);
    //eslint-disable-next-line
  }, [edit, renta]);

  const handleChange = (e) => {
    setDataRenta({ ...dataRenta, [e.target.name]: e.target.value });
  };

  const saveRenta= async()=>{
    try {
      //e.preventDefault();
      const { data } = await axios.post("/renta",dataRenta);
      Swal.fire({
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500
      });
      onCloseModal();
      getRentas();
    } catch (error) {
      if(!error.response.data.ok){
        return Swal.fire({
           icon: 'error',
           title: error.response.data.message,
           showConfirmButton: false,
           timer: 1500
         });
       }
       console.log('error en la función saveRenta',error.message);
    }
  };

  const updateRenta= async()=>{
    try {
      //e.preventDefault();
      const { data } = await axios.put(`/renta/update/${renta._id}`,dataRenta);
      Swal.fire({
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500
      });
      onCloseModal();
      getRentas();
    } catch (error) {
      if(!error.response.data.ok){
        return Swal.fire({
           icon: 'error',
           title: error.response.data.message,
           showConfirmButton: false,
           timer: 1500
         });
       }
       console.log('error en la función updateRenta',error.message);
    }
  };
  
  const actions=(e)=>{
    e.preventDefault();
    edit ? updateRenta() : saveRenta();
  }

  return (
    <div>
      <Modal open={open} onClose={onCloseModal} center>
    	  <div className='card'>
          <div className='card-header'>
            <h5>{edit ? 'Update Renta':'Add Renta'}</h5>
          </div>{/*card-header*/}
          <div className='card-body'>
            <form onSubmit={actions}>
              <div className='mb-3'>
                <label className='form-label'>Nombre cliente:</label>
                <input type="text" className='form-control'
                  name="nombreCliente" required autoFocus
                  onChange={(e) => handleChange(e)}
                  value={dataRenta.nombreCliente}
                />
              </div>{/*mb-3*/}
              <div className='mb-3'>
                <label className='form-label'>Descripción:</label>
                <input type="text" className='form-control' name="descripcion" 
                  required onChange={(e) => handleChange(e)}
                  value={dataRenta.descripcion}
                />
              </div>{/*mb-3*/}
              <div className='mb-3'>
                <label className='form-label'>Monto Renta:</label>
                <input type="text" className='form-control'
                  name="montoRenta" required onChange={(e) => handleChange(e)}
                  value={dataRenta.montoRenta}
                />
              </div>{/*mb-3*/}
              <div className='mb-3'>
                <label className='form-label'>Saldo pendiente:</label>
                <input type="text" className='form-control'
                  name="saldoPendiente" required onChange={(e) => handleChange(e)}
                  value={dataRenta.saldoPendiente}
                />
              </div>{/*mb-3*/}
              <div className='mb-3'>
                <label className='form-label'>Estado de la renta:</label>
                <select name="estadoRenta" className='form-select'
                  onChange={(e) => handleChange(e)}
                  value={dataRenta.estadoRenta} >
                  {
                    testadoRenta.map((item)=>(
                      <option key={item}>{item}</option>
                    ))
                  }
                </select>
              </div>{/*mb-3*/}
              <div className='mb-3'>
                <button type="submit" className='btn btn-primary form-control'>
                  {edit ? 'Actualizar':'Guardar'}
                </button>
              </div>{/*mb-3*/}
            </form>
          </div>{/*card-body */}
        </div>{/*card*/}
  	</Modal>
    </div>
  )
}

export default ModalActionsRentas;