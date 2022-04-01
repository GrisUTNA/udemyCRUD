import React, { useState, useEffect} from 'react';
import Swal from "sweetalert2";
import axios from 'axios';
import ModalActionsRentas from './ModalActionsRentas';

const Rentas = () => {
  const [rentas, setRentas] = useState([]);

  const getRentas= async()=>{
    try {
      const { data } = await axios.get("http://localhost:4000/api/renta");
        //console.log(data);
        setRentas(data.data);
    } catch (error) {
      if(!error.response.data.ok){
        return Swal.fire({
           icon: 'error',
           title: error.response.data.message,
           showConfirmButton: false,
           timer: 1500
         });
       }
       console.log('error en la función getRentas ',error.message);
    }
  };

  const deleteRenta = async (id) => {
    Swal.fire({
      title: "¿Está seguro?",
      text: "Esta acción no es reversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.delete("/renta/delete/" + id);
        getRentas();
        Swal.fire({
          icon: "success",
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      };
    });
  };

  //manejar modal
  const [renta,setRenta] = useState(false);
  const [edit,setEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const onOpenModal = (edit,renta) => {
    setOpen(true);
    setEdit(edit);
    setRenta(renta);
  }
  const onCloseModal = () => setOpen(false);

  useEffect(()=>{
    getRentas();
  },[]);

  return (
    <div>
      <nav className='navbar py-4'>
        <div className='container'>
          <div className='col-md-3'>
            <button className='btn btn-primary'
              onClick={()=>onOpenModal(false,{})}>
              <i className='fas fa-plus'>Agregar Renta</i>
            </button>
          </div>{/*col-md-3 */}
          <div className='col-md-6 ml-auto'>
            <div className='input-group'>
              <input
                className='form-control'
                type="search"
                placeholder='Buscar renta...'
                aria-label="Search"
                required
              />
            </div>{/*input-group */}
          </div>{/*col-md-6 ml-auto */}
        </div>{/*container */}
      </nav>
      <section>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='card'>
                <div className='card-header'>
                  <h4>Rentas</h4>
                </div>
                <div className='table-responsive-lg'>
                  <table className='table table-striped'>
                    <thead className='table-dark'>
                      <tr>
                        <th>#</th>
                        <th>Cliente</th>
                        <th>Descripción</th>
                        <th>Monto</th>
                        <th>Saldo</th>
                        <th>Estado</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                      <tbody>
                        {
                          rentas.map((item,i)=>(
                            <tr key={item._id}>
                              <td>{i+1}</td>
                              <td>{item.nombreCliente}</td>
                              <td>{item.descripcion}</td>
                              <td>{item.montoRenta}</td>
                              <td>{item.saldoPendiente}</td>
                              <td>{item.estadoRenta}</td>
                              <td>
                                <button className='btn btn-danger me-1'
                                  onClick={()=>deleteRenta(item._id)}>
                                  <i className='fas fa-trash'></i>
                                </button>
                                <button className='btn btn-warning'
                                  onClick={()=>onOpenModal(true,item)}>
                                  <i className='fas fa-edit'></i>
                                </button>
                              </td>
                            </tr>
                          ))
                          }
                      </tbody>
                  </table>
                </div>{/*table-responsive-lg*/}
              </div>{/*card*/}
            </div>{/*col-md-12*/}
          </div>{/*row*/}
        </div> {/*container*/}
      </section>
      <ModalActionsRentas
        open={open} 
        onCloseModal={onCloseModal}
        getRentas={getRentas}
        edit={edit}
        renta={renta}
      />
    </div>
  )
}

export default Rentas;