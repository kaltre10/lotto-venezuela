import {useState} from 'react';
import api from '../../services/api';
import Portal from '../portal/Portal';
import Loader from '../loader/Loader';
import logo from '../../img/logo-polla.png';
import banner from '../../img/banner.png';
import { useNavigate } from "react-router-dom";
import './login.css';

const Login = () => {

    let navigate = useNavigate();
    const URL = import.meta.env.VITE_APP_URL;

    const [data, setData] = useState({
        user: '',
        pass: ''
    });

    const [modal, setModal] = useState(false);
    const [error, setError] = useState({ message: '', status: false });

    const handleChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setModal(true);
        const query = await api(`${URL}/api/v1/auth/login`, data, 'POST');
        const response = await query.json();
      
        if(query.status == 200){
            localStorage.setItem('lotto', JSON.stringify(response.data.token));
            navigate('/vender');
        }else{
            setError({ message: response.message, status: true });
        }

    }

    const handleModal = () => {
        setModal(false);
        setError({ message: '', status: false });
    }

    return ( 
        <div className='login'>
            {modal && (
                <Portal>
                    {error.status 
                        ?   <div className='modal'>
                                <div className='container'>
                                    <h3>{error.message}</h3>
                                    <button className='btn' onClick={() => handleModal()}>Cerrar</button>
                                </div>
                            </div>
                        : <Loader/>
                    }
                </Portal>
            )}

            <div className='container-login'>
                <div className='container-img'>
                    <img className='banner-img' src={banner} />
                </div>
                <div className='container'>
                    <form className='form' onSubmit={e => handleSubmit(e)}>
                        <h2><img className='picture-img' src={logo} alt='Login Polla Millonaria' /></h2>
                        <label>Nombre:</label>
                        <input className='input' type="text" onChange={e => handleChange(e)} name="user" autoComplete='off' required/>
                        <label>Contraseña:</label>
                        <input className='input' type="password" onChange={e => handleChange(e)} name="pass" autoComplete='off' required/>
                        <button className='btn'>ENTRAR</button>
                    </form>
                </div>  
            </div>
        </div>
     );
}
 
export default Login;