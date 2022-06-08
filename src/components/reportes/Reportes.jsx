import { useState, useEffect, useContext } from 'react';
import Menu from '../menu/Menu';
import Ticket from '../ticket/Ticket';
import { UserContex } from '../../context/DataUserContext';
import './reportes.css';

const Reportes = () => {

    const [tickets, setTickets] = useState([]);
    const {dataContext} = useContext(UserContex);
    const date = new Date();
    const toDay = String(date.getFullYear() + '-' + String(date.getDate()).padStart(2, '0')) + '-' + String(date.getMonth() + 1).padStart(2, '0');

    useEffect(() => {
        ( async () => {
            const query = await fetch(`http://localhost:5000/api/v1/ventas/${dataContext.user.id}`);
            const data = await query.json();
            setTickets([...tickets, data]);
        })();
    }, []);

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
                    <input type="date" value={toDay}/><button>Consultar</button>
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