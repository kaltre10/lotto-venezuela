import { useState, useEffect, useContext } from 'react';
import Menu from '../menu/Menu';
import Ticket from '../ticket/Ticket';
import { UserContex } from '../../context/DataUserContext';
import useGetUser from '../../hooks/useGetUser';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './reportes.css';

const Reportes = () => {

    const [tickets, setTickets] = useState([]);
    const {dataContext} = useContext(UserContex);
    const URL = import.meta.env.VITE_APP_URL;
    const navigate = useNavigate();
    const date = new Date();
    const [ day, setDay ] = useState(`${String(date.getFullYear())}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`);

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
        const token = localStorage.getItem('lotto').replaceAll('"', '');
        const query = await api(`${URL}/api/v1/ventas/ticket-user`, { token, date: day }, "POST");
        const data = await query.json();
        setTickets([data]);
    }

    return ( 
        <div className='reportes'>
            <Menu />
            <h2>Reportes</h2>
            <div className='container'>
                <div>
                    <select>
                        <option value="1">Todos</option>
                        <option value="2">Anulados</option>
                        <option value="3">Perdedores</option>
                        <option value="3">Ganadores</option>
                        <option value="3">Pagados</option>
                    </select>
                    <input type="date" value={day} onChange={e => setDay(e.target.value)} />
                    <button onClick={() => getReporte()}>Consultar</button>
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