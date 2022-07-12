import { useState, useEffect } from 'react';
import Menu from "../menu/Menu";
import useGetUser from '../../hooks/useGetUser';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Portal from '../portal/Portal';
import './premios.css';

const Premios = () => {

    const navigate = useNavigate();
    const URL = import.meta.env.VITE_APP_URL;
    const [premios, setPremios] = useState([]);
    const [modal, setModal ] = useState(false);
    const [modalPrecio, setModalPrecio ] = useState(false);
    const [input, setInput ] = useState(0);
    const [inputPrecio, setInputPrecio ] = useState(0);
    const [typePremio, setTypePremio ] = useState(0);
    const [precio, setPrecio ] = useState(0);

    useEffect(() => {
        ( async() => {
            const checkUser = await useGetUser();
            if(!checkUser.id){
                navigate('/login');
            }
            getPremios();
            getPrecio();
        })();
    }, []);

 
    const getPremios = async () => {
        const query = await fetch(`${URL}/api/v1/premios`);
        const dataPremios =  await query.json();
        setPremios(dataPremios.data);
    }

    const getPrecio = async () => {
        const query = await fetch(`${URL}/api/v1/precios`);
        const dataPrecio =  await query.json();
        setPrecio(dataPrecio.data[0].precio);
    }

    const handleInput = (type) => {
        setTypePremio(type)
        setModal(true);
    }

    const handleSubmit = async () => {
        const token = localStorage.getItem('lotto').replaceAll('"', '');
        await api(`${URL}/api/v1/premios`, { token, type: typePremio, premio: input }, "PUT");
        setModal(false);
        setInput(0);
        setTypePremio(0);
        //Obtenemos los premios para actualizar le estado
        getPremios();
    }

    const handleSubmitPrecio = async () => {
        const token = localStorage.getItem('lotto').replaceAll('"', '');
        await api(`${URL}/api/v1/precios`, { token, precio: inputPrecio }, "PUT");
        setModalPrecio(false);
        setInputPrecio(0);
        //Obtenemos el precio para actualizar le estado
        getPrecio();
    }

    const descriptionPremios = {
        1: "4to Lugar con 3 Aciertos ",
        2: "3er Lugar con 4 Aciertos",
        3: "2do Lugar con 5 Aciertos",
        4: "1er Lugar con 6 Aciertos"
    }

    return ( 
        <div className="premios">
            {modal &&
                <Portal>
                    <div className="modal-card">
                        <h2>Desea Modificar?</h2>
                        <input className='form-control' type="number" onChange={(e) => setInput(e.target.value)} value={input}/>
                        <div>
                        <button className='modal-btn' onClick={() => handleSubmit(input)}>Cargar</button>
                        <button className='modal-btn' onClick={() => setModal(false)}>Cerrar</button>
                        </div>
                    </div>
                </Portal>
            }
            {modalPrecio &&
                <Portal>
                    <div className="modal-card">
                        <h2>Desea Modificar?</h2>
                        <input className='form-control' type="number" onChange={(e) => setInputPrecio(e.target.value)} value={inputPrecio}/>
                        <div>
                        <button className='modal-btn' onClick={() => handleSubmitPrecio()}>Cargar</button>
                        <button className='modal-btn' onClick={() => setModalPrecio(false)}>Cerrar</button>
                        </div>
                    </div>
                </Portal>
            }
            <Menu />
            <h2>Premios</h2>
            <div className='card-container'>
                {premios.length > 0 && 
                premios.map(premio => (
                    <div className='card' key={premio._id}>
                        <h5>{descriptionPremios[premio.type]}</h5>
                        <p>Premio: {premio.premio}</p>
                        <button 
                            onClick={() => handleInput(premio.type)}>Actualizar</button>
                    </div>
                ))}
            </div>
            <h2>Precio</h2>
            <div className='card-container'>
                <div className='card'>
                    <p>Precio actual del ticket: {precio}</p>
                    <button onClick={() => setModalPrecio(true)}>Actualizar</button>
                </div>
            </div>
        </div>
     );
}
 
export default Premios;