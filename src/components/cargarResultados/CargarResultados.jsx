import {useState, useEffect} from 'react';
import Menu from '../menu/Menu';
import './cargarResultados.css';
import CardResultados from '../cardResultados/CardResultados';
import Portal from '../portal/Portal';
import useGetUser from '../../hooks/useGetUser';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import animal from '../../helpers/dataAnimal';

const CargarResultados = () => {

    const navigate = useNavigate();
    const date = new Date();
    const [modal, setModal] = useState(false);
    const [resultado, setResultado] = useState({
        number: '',
        resultado: '',
        date: `${String(date.getFullYear())}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    });
    const URL = import.meta.env.VITE_APP_URL;

    const handleInput = e => {
        setResultado({
            ...resultado,
            [e.target.name]: e.target.value
        })
    }

    const [resultados, setResultados] = useState([
        {number: 9, time: "9:00 am", resultado: "--"},
        {number: 10, time: "10:00 am", resultado: "--"},
        {number: 11, time: "11:00 am", resultado: "--"},
        {number: 12, time: "12:00 pm", resultado: "--"},
        {number: 13, time: "1:00 pm", resultado: "--"},
        {number: 14, time: "2:00 pm", resultado: "--"},
        {number: 15, time: "3:00 pm", resultado: "--"},
        {number: 16, time: "4:00 pm", resultado: "--"},
        {number: 17, time: "5:00 pm", resultado: "--"},
        {number: 18, time: "6:00 pm", resultado: "--"},
        {number: 19, time: "7:00 pm", resultado: "--"}
    ]);

    useEffect(() => {
        ( async() => {
            const checkUser = await useGetUser();
            if(!checkUser.id) navigate('/');
            if(checkUser.level !== 1) navigate('/');
            getResultados();
        })();
    }, []);

    const getResultados = async () => {
        const token = localStorage.getItem('lotto').replaceAll('"', '');
        const query = await api(`${URL}/api/v1/resultados/`, { token, date: resultado.date }, 'POST');
        const data = await query.json();

        const dataDb = Object.values(data).flat();

        const newResult = resultados.map((r, index) => { 
            r.resultado = "--";
            dataDb.forEach( d => {
                if(r.number === d.number){             
                    r.resultado = d.sorteo;
                }
            })
            return r;
        })
        setResultados(newResult);
    }

    const handleSave = async () => {
        if(resultado.number && resultado.resultado){
            await api(`${URL}/api/v1/resultados/save-resultado`, resultado, 'POST');
            setResultado({ number: '', resultado: '', date: `${String(date.getFullYear())}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`});
            getResultados();
            setModal(false)
        }
    }

    const handleModal = () => {
        if(!resultado.number || !resultado.resultado) return;
        setModal(true);
    }

    return ( 
        <div className="cargar-resultados">
            {modal &&
                <Portal>
                    <div className="modal-card">
                        <h2>Desea cargar este resultado?</h2>
                        <div>
                        <button className='modal-btn' onClick={() => handleSave()}>Cargar</button>
                        <button className='modal-btn' onClick={() => setModal(false)}>Cerrar</button>
                        </div>
                    </div>
                </Portal>
            }
            <Menu />
            <h2>Cargar Resultados</h2>
            <div>
                <label>Hora:</label>
                <select name='number' onClick={e => handleInput(e)}>
                    <option className='option' value=""> - seleccione - </option>
                    {resultados.map(r =>(
                        <>
                            {(r.resultado == '--') &&
                            <option key={r.number} className='option' value={r.number}>{r.time}</option>}
                        </>
                    ))}
                </select>
                <label>Resultado:</label>
                <select name='resultado' onClick={e => handleInput(e)}> 
                    <option className='option' value=""> - seleccione - </option>
                    {animal.map(a => (
                        <option key={a.number} className='option' value={a.number}>{a.number} {a.name}</option>
                    ))}
                </select>
                <button onClick={() => handleModal()}>Cargar</button>
            </div>
            <div className='container'>
                {resultados.map( r => (
                    <CardResultados key={r.number} data={r}/>
                ))}
            </div>
        </div>
     );
}
 
export default CargarResultados;