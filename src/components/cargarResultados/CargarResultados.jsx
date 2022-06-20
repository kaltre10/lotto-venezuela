import {useState, useEffect} from 'react';
import Menu from '../menu/Menu';
import './cargarResultados.css';
import CardResultados from '../cardResultados/CardResultados';
import Portal from '../portal/Portal';
import useGetUser from '../../hooks/useGetUser';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

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

    const [animal, setAnimal] = useState([
        { number: "0", name: "Delfin", url: "" },
        { number: "00", name: "Ballena", url: ""  },
        { number: "01", name: "Carnero", url: ""  },
        { number: "02", name: "Toro", url: ""  },
        { number: "03", name: "cienpiés", url: ""  },
        { number: "04", name: "Alacrán", url: ""  },
        { number: "05", name: "Leon", url: ""  },
        { number: "06", name: "Rana", url: ""  },
        { number: "07", name: "Perico", url: ""  },
        { number: "08", name: "Raton", url: ""  },
        { number: "09", name: "Aguila", url: ""  },
        { number: "10", name: "Tigre", url: ""  },
        { number: "11", name: "Gato", url: ""  },
        { number: "12", name: "Caballo", url: ""  },
        { number: "13", name: "Mono", url: ""  },
        { number: "14", name: "Paloma", url: ""  },
        { number: "15", name: "Zorro", url: ""  },
        { number: "16", name: "Oso", url: ""  },
        { number: "17", name: "Pavo", url: ""  },
        { number: "18", name: "Burro", url: ""  },
        { number: "19", name: "Chivo", url: ""  },
        { number: "20", name: "Cochino", url: ""  },
        { number: "21", name: "Gallo", url: ""  },
        { number: "22", name: "Camello", url: ""  },
        { number: "23", name: "cebra", url: ""  },
        { number: "24", name: "Iguana", url: ""  },
        { number: "25", name: "Gallina", url: ""  },
        { number: "26", name: "Vaca", url: ""  },
        { number: "27", name: "Perro", url: ""  },
        { number: "28", name: "Zamuro", url: ""  },
        { number: "29", name: "Elefante", url: ""  },
        { number: "30", name: "Caimán", url: ""  },
        { number: "31", name: "Lapa", url: ""  },
        { number: "32", name: "Ardilla", url: ""  },
        { number: "33", name: "Pescado", url: ""  },
        { number: "34", name: "Venado", url: ""  },
        { number: "35", name: "Jirafa", url: ""  },
        { number: "36", name: "Culebra", url: ""  }
    ]);


    useEffect(() => {
        ( async() => {
            const checkUser = await useGetUser();
            if(!checkUser.id) navigate('/login');
            if(checkUser.level !== 1) navigate('/login');
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
                    r.resultado = d.number;
                }
            })
            return r;
        })
        setResultados(newResult);
    }

    const handleSave = async () => {
        if(resultado.number && resultado.resultado){
            await api('http://localhost:5000/api/v1/resultados/save-resultado', resultado, 'POST');
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