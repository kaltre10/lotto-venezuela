import { useState, useEffect } from 'react';
import Menu from '../menu/Menu';
import CardResultados from '../cardResultados/CardResultados';
import useGetUser from '../../hooks/useGetUser';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './resultados.css';
const Resultados = () => {

    const navigate = useNavigate();
    const URL = import.meta.env.VITE_APP_URL;
    const date = new Date();
    const [ day, setDay ] = useState(`${String(date.getFullYear())}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`);
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
    ])

    useEffect(() => {
        ( async() => {
            const checkUser = await useGetUser();
            if(!checkUser.id){
                navigate('/login');
            }
            getResultados();
        })();
    }, []);

    
    const getResultados = async () => {
        const token = localStorage.getItem('lotto').replaceAll('"', '');
        const query = await api(`${URL}/api/v1/resultados/`, { token, date: day }, 'POST');
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

    return ( 
        <div className='resultados'>
            <Menu />
            <h2>Resultados:</h2>
            <div><input type="date" value={day} onChange={e => setDay(e.target.value)} />
            <button onClick={() => getResultados()}>Consultar</button></div>
            <div className='container'>
                {resultados.map( r => (
                    <CardResultados key={r.number} data={r}/>
                ))}
            </div>
        </div> 
    );
}
 
export default Resultados;