import { useState, useEffect } from 'react';
import Menu from '../menu/Menu';
import useGetUser from '../../hooks/useGetUser';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Portal from '../portal/Portal';
import animal from '../../helpers/dataAnimal';
import './pagar.css';

const Pagar = () => {

    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const [select, setSelect] = useState('');
    const [ticket, setTicket] = useState('');
    const [modal, setModal] = useState(false);
    const URL = import.meta.env.VITE_APP_URL;

    useEffect(() => {
        ( async() => {
            const checkUser = await useGetUser();
            if(!checkUser.id){
                navigate('/login');
            }
        })();
    }, []);

    const handleQuery = async () => {
        if(!input) return;
        const query = await api(`${URL}/api/v1/ventas/ticket-query`, {count:input}, 'POST');
        const ticketQuery = await query.json();

        if(!ticketQuery){
            setTicket('Ticket no Existe');
        }else{
            setTicket(ticketQuery);
        }
    }

    const handleUpdate = async () => {
        const token = localStorage.getItem('lotto').replaceAll('"', '');
        const query = await api(`${URL}/api/v1/ventas/ticket-pagar`, {
            token,
            id: input,
            status: select
        }, 'PUT');
        const ticket = await query.json();
        setModal(false);
        setInput('');
        setSelect('');
        setTicket('');
    }

    const handleChange = e => {
        setInput(e.target.value);
    }

    const status = {
        0: "Proceso",
        1: "Anulado",
        2: "Pagado",
        3: "Ganador"
    }

    const handleModal = () => {
        if(!select) return;
        setModal(true);
    }

    return ( 
        <div className="pagar">
             {modal &&
                <Portal>
                    <div className="modal-card">
                        <h2>Desea Modificar?</h2>
                        <div>
                        <button className='modal-btn' onClick={() => handleUpdate()}>Cargar</button>
                        <button className='modal-btn' onClick={() => setModal(false)}>Cerrar</button>
                        </div>
                    </div>
                </Portal>
            }
            <Menu />
            <h2>Pagar/Anular Ticket:</h2>
            <label>Ticket:</label>
            <input type='number' name='ticket' value={input} onChange={e => handleChange(e)} required/>

            <button onClick={() => handleQuery()}>Consultar</button>
            {ticket == '' && <p>Consulte el Ticket</p>}
            {ticket != '' && ticket.data.length == 0 && <p>Ticket no Existe</p>}
            {ticket != '' && ticket.data.length > 0 && (
                <div className="ticket">
                    <span>#{ticket.data[0].count}</span>
                    <span>Fecha: <br />{ticket.data[0].date}</span>
                    <span>{status[ticket.data[0].status]}</span>
                    <span>Paga: <br />{ticket.data[0].premio}</span>
                    <div>
                        {ticket.data[0].numbers.map((d, index) => (
                            <>
                            {console.log(animal)}
                            <div key={index}>Numero: {d} | {animal.map(a => a.number == d ? a.name : null)}</div>
                            </>
                        ))}
                    </div>
                    <div>
                    <select onChange={(e) => setSelect(e.target.value)} required>
                        <option value=''>-seleccione-</option>
                        <option value='1'>Anular</option>
                        <option value='2'>Pagar</option>
                    </select> 
                    <button onClick={() => handleModal()}>Aceptar</button>
                    </div>
                </div>
            )}
        </div>
     );
}
 
export default Pagar;