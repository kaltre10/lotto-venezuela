import './vender.css';
import {useState, useContext, useEffect, useRef } from 'react';
import { UserContex } from '../../context/DataUserContext';
import useGetUser from '../../hooks/useGetUser';
import { useNavigate } from "react-router-dom";
import api from '../../services/api';
import Card from '../card/Card';
import Menu from '../menu/Menu';
import animal from '../../helpers/dataAnimal';
import Loader from '../loader/Loader';
import Portal from '../portal/Portal';
import borrar from '../../img/delete.png';


const Vender = () => {

    let navigate = useNavigate();

    const selectInputRef = useRef();

    const [ticket, setTicket] = useState([]);
    const [modal, setModal] = useState({message : '', status: false});
    const [modalError, setModalError] = useState({message : '', status: false});
    const [aciertos, setAciertos] = useState([]);
    const [precio, setPrecio] = useState(0);
    const [pago, setPago] = useState(0);
    const [load, setLoad] = useState(true);
    const [options, setOptions] = useState( [
        { value: 0, name: 'Efectivo' },
        { value: 1, name: 'saldo' },
    ]);
    const [lastTicket, setLastTicket] = useState({
        count: 0,
        numbers: [],
        hora: null,
        date: null
    });
    const {dataContext, setDataContext} = useContext(UserContex);
    const URL = import.meta.env.VITE_APP_URL;

    useEffect(() => {
        (async () => {

            checkDataUser();

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
        setLoad(false);
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
        setLoad(true);
        const data = {
            token: localStorage.getItem('lotto').replaceAll('"', ''),
            numbers: ticket.map( t => t.number).flat(),
            pago
        }
        const query = await api(`${URL}/api/v1/ventas`, {ticket:data}, 'POST')
        const response = await query.json();
        if(query.status == 200){
            setTicket([])
            setModal({message:"Ticket Guardado", status: true});

            //ajustar fecha para mostrar en el ticket
            let date = new Date(response.data.createdAt);
            let hora = `${date.getHours()}:${date.getMinutes()}`;
            let d = String(date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0'));
            setLastTicket({
                count: response.data.count,
                numbers: response.data.numbers,
                hora,
                date: d
            });

            //reinicar options
            selectInputRef.current[0].selected = true;

            //check saldo 
            checkSaldo();
            setLoad(false);

        }else{
            setModalError({message: JSON.stringify(response), status: true});
        }
    }

    const checkDataUser = async () => {
        if(!dataContext.user.id){
            let user = await useGetUser();  
            if(!user.id){
                navigate('/login');
            }
            setDataContext({ user: { id: user.id, level: user.level, saldo: user.saldo}});
            if(user.level == 1) {
                navigate('/ventas');
            }
        }
    }

    const checkSaldo = async () => {
        let user = await useGetUser();  
        setDataContext({ user: { id: user.id, level: user.level, saldo: user.saldo}});
    }

    const handleSave = () => {
        setModal({message: "", status: false});
        setLastTicket({
            count: 0,
            numbers: [],
            hora: null,
            date: null
        });
    }
    
    return ( 
    <div className='vender'>
        {load && <Portal><Loader /></Portal>}

        {modal.status &&
        <div className='modal-error'>
            <div className='container'>
                <h3>{modal.message}</h3>
                <div className='ticket'>
                    {/* <h4>Mega Lotto Venezuela</h4>
                    <p># 211 | Hora: 10:27 am</p>
                    <p>Fecha: 21/06/2022</p>
                    <b>Números:</b> */}
                    <ul className='ul'> 
                        <li className='li'><b>Mega Lotto Venezuela</b></li>
                        <li className='li'># {lastTicket.count} | Hora: {lastTicket.hora}</li>
                        <li className='li'>Fecha: {lastTicket.date}</li>
                        <li className='li'><b>Números:</b></li>
                        <li className='li'># {lastTicket.numbers[0]} | {animal.filter( a => a.number == lastTicket.numbers[0])[0].name}</li>
                        <li className='li'># {lastTicket.numbers[1]} | {animal.filter( a => a.number == lastTicket.numbers[1])[0].name}</li>
                        <li className='li'># {lastTicket.numbers[2]} | {animal.filter( a => a.number == lastTicket.numbers[2])[0].name}</li>
                        <li className='li'># {lastTicket.numbers[3]} | {animal.filter( a => a.number == lastTicket.numbers[3])[0].name}</li>
                        <li className='li'># {lastTicket.numbers[4]} | {animal.filter( a => a.number == lastTicket.numbers[4])[0].name}</li>
                    </ul>
                </div>
                <button className='btn' onClick={() => handleSave()}>Continuar</button>
            </div>
        </div>}

        {modalError.status &&
        <div className='modal-error'>
            <div className='container'>
                <h3>{modalError.message}</h3>
                <button className='btn' onClick={() => setModalError(false)}>Cerrar</button>
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
                            <span className='delete' onClick={() => handleDelete(ticket.number)}><img className='img-borrar' src={borrar}/></span>
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
                <div className='pago'>
                    <label>Forma de Pago: </label>
                    <select className='form-control' onChange={(e) => setPago(e.target.value)} ref={selectInputRef}>
                        {options.map(element => (  
                            <option key={element.value} value={element.value}>{element.name}</option>
                        ))}
                    </select>            
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