import {useState} from 'react';
import api from '../../services/api';
import { useNavigate } from "react-router-dom";
import './login.css';

const Login = () => {

    let navigate = useNavigate();
    const URL = import.meta.env.VITE_APP_URL;

    const [data, setData] = useState({
        user: '',
        pass: ''
    })
    const [invalid, setInvalid] = useState(false);

    const handleChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const query = await api(`${URL}/api/v1/auth/login`, data, 'POST');
        const response = await query.json();
      
        if(query.status == 200){
            localStorage.setItem('lotto', JSON.stringify(response.data.token));
            navigate('/vender');
        }else{
            setInvalid(response.message)
        }
        setTimeout(() => setInvalid(false), 3000);
    }
    return ( 
        <div className='login'>
            <h2>Lotto Venezuela</h2>
            {invalid && <p className='invalid'>Datos Invalidos</p>}
            <div className='container'>
                <form className='form' onSubmit={e => handleSubmit(e)}>
                    <label>Name:</label>
                    <input className='input' type="text" onChange={e => handleChange(e)} name="user" autoComplete='off' required/>
                    <label>Contraseña:</label>
                    <input className='input' type="password" onChange={e => handleChange(e)} name="pass" autoComplete='off' required/>
                    <button>Entrar</button>
                </form>
            </div>
        </div>
     );
}
 
export default Login;