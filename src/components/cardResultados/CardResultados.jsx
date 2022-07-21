import { useState } from 'react';
import Portal from '../portal/Portal';
import api from '../../services/api';
import './cardResultados.css';

const CardResultados = ({ data, getResultados, userId }) => {

    const [ modal, setModal ] = useState(false);
    const [ modalError, setModalError ] = useState({
        status: false,
        message: ""
    });
    const URL = import.meta.env.VITE_APP_URL;

    const handleSubmit = async () => {
        setModal(false);
        if(data.resultado == '--') {
            setModalError({
                message: "Sorteo no cargado",
                status: true
            });
            return;
        }

        const dataApi = {
            number: data.resultado,
            resultado: data.number
        }

        const query = await api(`${URL}/api/v1/resultados/anular-resultado`, dataApi, 'POST');
        const response = await query.json();
        setModalError({
                message: response.data,
                status: true
            });
        
        //render resultados
        getResultados()
    }
    
    return (<>
        {  modal && (
                <Portal>
                    <div className="modal-card">
                        <h2>Seguro desea Anular este Resultado?</h2>
                        <div>
                        <button className='modal-btn' onClick={() => handleSubmit()}>Anular</button>
                        <button className='modal-btn' onClick={() => setModal(false)}>Cerrar</button>
                        </div>
                    </div>
                </Portal>
            )
        }
        {
            modalError.status && (
                <Portal>
                    <div className="modal-card">
                        <h2>{modalError.message}</h2>
                        <div>
                        <button className='modal-btn' onClick={() => setModalError({
                            ...modalError,
                            status: false
                        })}>Cerrar</button>
                        </div>
                    </div>
                </Portal>
            )
        }
        <div className="card-resultados">
            <span className='number'>{data.resultado}</span>
            <p className="time">{data.time}</p>
            {(userId == 1) && 
                <span className='anular' onClick={() => setModal(true)}>⛏️</span>
            }
        </div>
    </>);
}
 
export default CardResultados;