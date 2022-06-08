import {useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import { UserContex } from "../../context/DataUserContext";
import './login.css';

const Login = () => {

    let navigate = useNavigate();

    const { setDataContext } = useContext(UserContex); 

    const [data, setData] = useState({
        name: '',
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
        const query = await fetch('http://localhost:5000/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)
        });
    
        const response = await query.json();
        if(query.status == 200){
            setDataContext({user: {id: response.data.id, level: response.data.level }})
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
                    <input className='input' type="text" onChange={e => handleChange(e)} name="name" autoComplete='off' required/>
                    <label>Contraseña:</label>
                    <input className='input' type="password" onChange={e => handleChange(e)} name="pass" autoComplete='off' required/>
                    <button>Entrar</button>
                </form>
            </div>
        </div>
     );
}
 
export default Login;