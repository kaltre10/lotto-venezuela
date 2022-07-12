import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Portal from '../portal/Portal';
import Loader from '../loader/Loader';
import Menu from '../menu/Menu';
import './jugadas.css';

const Jugadas = () => {

    const navigate = useNavigate();
    const URL = import.meta.env.VITE_APP_URL;
    const day = new Date();
    const [ date, setDay ] = useState(`${String(day.getFullYear())}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`);
    const [load, setLoad] = useState(true);
    const [ jugadas, setJugadas] = useState([]);

    useEffect(() => {
        getJugadas();
    }, []);

    const getJugadas = async () => {
        setLoad(true);
        const query = await fetch(`${URL}/api/v1/ventas/${date}`);
        const data = await query.json();
        console.log(data)
        setLoad(false);
        setJugadas(data.data);
    }

    const getTime = (date) => {
        let time = new Date(date);
        return time.getHours() + ':' + time.getMinutes();
    }
   
    return ( 
        <div className='jugadas'>
            {load && <Portal><Loader /></Portal>}
            <Menu />
            <h2>Jugadas</h2>
            <div className='premios'>
                <h3>1 Lugar Gana 300 bs</h3>
                <h3>2 Lugar Gana 100 bs</h3>
            </div>
            <div><input className='form-control' type="date" value={date} onChange={e => setDay(e.target.value)} />
            <button className='form-control' onClick={() => getJugadas()}>Consultar</button></div>
            <div className='jugada'>
                <div className='jugada-head'>
                    <div className='jugada-head-item'>HORA</div>
                    <div className='jugada-head-item'>USUARIO</div>
                    <div className='jugada-head-item'>COMBINACION JUGADA</div>
                    <div className='jugada-head-item'>ACIERTOS</div>
                </div>
                {jugadas.length > 0 && (
                    jugadas.map( j => (
                        <div key={j._id} className='jugada-item'>
                            <div className='hora'>HORA: </div><div className='jugada-head-item hora-item'>{getTime(j.date)}</div>
                            <div className='user'>USUARIO: </div><div className='jugada-head-item user-item'>{j.user.user}</div>
                            <div className='jugada-i'>JUGADAS: </div><div className='jugada-head-item jugada-it'>{j.numbers.map( n => (`${n.number} `))}</div>
                            <div className='aciertos'>ACIERTOS: </div><div className='jugada-head-item aciertos-item'>{j.aciertos}</div>
                        </div>        
                    ))
                )}
            </div>
        </div>
    );
}
 
export default Jugadas;