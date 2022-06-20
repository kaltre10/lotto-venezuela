import './vender.css';
import {useState, useContext, useEffect } from 'react';
import { UserContex } from '../../context/DataUserContext';
import useGetUser from '../../hooks/useGetUser';
import { useNavigate } from "react-router-dom";
import api from '../../services/api';
import Card from '../card/Card';
import Menu from '../menu/Menu';
import animal from '../../helpers/dataAnimal';

const Vender = () => {

    let navigate = useNavigate();
    const [ticket, setTicket] = useState([]);
    const [modal, setModal] = useState({message : '', status: false});
    const [aciertos, setAciertos] = useState([]);
    const [precio, setPrecio] = useState(0);
    const {dataContext, setDataContext} = useContext(UserContex);
    const URL = import.meta.env.VITE_APP_URL;

    useEffect(() => {
        (async () => {
            
            if(!dataContext.user.id){
                console.log('ok')
                let user = await useGetUser();  
                if(!user.id){
                    navigate('/login');
                }
                setDataContext({ user: { id: user.id, level: user.level}});
                if(user.level == 1) {
                    navigate('/ventas');
                }
            }
            //Obtenemos los aciertos
            getAciertos();

            //Obtenemos el precio del ticket
            getprecio();
        })();
    }, []);

    const getAciertos = async () => {
        const query = await fetch(`${URL}/api/v1/premios`);
        const aciertos = await query.json();
        setAciertos(aciertos.data);
    }

    const getprecio = async () => {
        const query = await fetch(`${URL}/api/v1/precios`);
        const precio = await query.json();
        setPrecio(precio.data[0].precio);
    }

    const handleChange = (data) => {
        if(ticket.length < 5) setTicket([ 
            ...ticket, { 
                        number: animal.filter(a => a.number == data)[0].number,
                        name: animal.filter(a => a.number == data)[0].name
                    }]);
    }

    const handleDelete = (number) => {
        setTicket(ticket.filter(t => t.number != number))
    }

    const handleClick = async () => {
        const data = {
            token: localStorage.getItem('lotto').replaceAll('"', ''),
            numbers: ticket.map( t => t.number).flat()
        }
        const query = await api(`${URL}/api/v1/ventas`, {ticket:data}, 'POST')
        const response = await query.json();
        if(query.status == 200){
            setTicket([])
            setModal({message:"Ticket Guardado", status: true})
        }else{
            setModal(response.message, true)
        }
    }
    
    return ( 
    <div className='vender'>
        {modal.status &&
        <div className='modal-error'>
            <div className='container'>
                <h3>{modal.message}</h3>
                <button className='btn' onClick={() => setModal({message: "", status: false})}>Continuar</button>
            </div>
        </div>}
        <Menu />
        <h2>Mega Lotto Venezuela</h2>
        <div className='container'>
            <div className="table-selection">
                {animal.map(animal => (
                    <Card 
                        key={animal.number} 
                        data={animal} 
                        handleChange={handleChange} 
                        ticket={ticket}
                    />
                ))}
            </div>
            <div className="form-selection">
                <h2>Ticket:</h2>
                <div className='table-selected'>
                    <ul>
                    {ticket.map(ticket => (
                        <li key={ticket.number}>
                            <span>Numero: </span>
                            <span>{ticket.number}</span>
                            <span className='delete' onClick={() => handleDelete(ticket.number)}>❌</span>
                        </li>
                    ))}
                    </ul>
                </div>
                <p className='precio'>Precio del ticket: {precio} bs</p>
                <div className='aciertos'>
                    {aciertos.length > 0 && (
                        aciertos.map(acierto => (
                            <span key={acierto._id} className='acierto'>{acierto.type + 1} Aciertos: {acierto.premio}</span>
                        ))
                    )}
                </div>
                <button 
                    className={ticket.length < 5 ? 'btn-disabled' : undefined}
                    disabled = {ticket.length < 5 ? true : false}
                    onClick={() => handleClick()}
                >Guardar</button>
            </div>
        </div>
    </div> );
}
 
export default Vender;