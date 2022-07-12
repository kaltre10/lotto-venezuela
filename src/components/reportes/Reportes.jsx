import { useState, useEffect, useContext } from 'react';
import Ticket from '../ticket/Ticket';
import { UserContex } from '../../context/DataUserContext';
import useGetUser from '../../hooks/useGetUser';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Loader from '../loader/Loader';
import Portal from '../portal/Portal';
import Menu from '../menu/Menu';
import './reportes.css';

const Reportes = () => {

    const [tickets, setTickets] = useState([]);
    const {dataContext} = useContext(UserContex);
    const URL = import.meta.env.VITE_APP_URL;
    const navigate = useNavigate();
    const date = new Date();
    const [ day, setDay ] = useState(`${String(date.getFullYear())}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`);
    const [status, setStatus] = useState(0);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        ( async () => {
            const checkUser = await useGetUser();
            if(!checkUser.id){
                navigate('/login');
            }
            getReporte();
        })();
    }, []);

    const getReporte = async () => {
        setLoad(true);
        const token = localStorage.getItem('lotto').replaceAll('"', '');
        const query = await api(`${URL}/api/v1/ventas/ticket-user`, { token, date: day, status }, "POST");
        const data = await query.json();
        setTickets([data]);
        setLoad(false);
    }

    return ( 
        <div className='reportes'>
            {load && <Portal><Loader /></Portal>}
            <Menu />
            <h2>Reportes</h2>
            <div className='container'>
                <div>
                    <select className='form-control' onChange={e => setStatus(e.target.value)}>
                        <option value="0">Todos</option>
                        <option value="1">Anulados</option>
                        <option value="2">Pagados</option>
                        <option value="3">Ganadores</option>
                    </select>
                    <input className='form-control' type="date" value={day} onChange={e => setDay(e.target.value)} />
                    <button className='form-control' onClick={() => getReporte()}>Consultar</button>
                </div>
                <div className='table'>
                    <div className='ticket-container'>
                        {tickets[0] &&
                            tickets[0].data.map( t => (
                                <Ticket key={t._id} data={t} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>  
    );
}
 
export default Reportes;