import {useState} from 'react';
import api from '../../services/api';
import Menu from '../menu/Menu';
import './crear.css';

const Crear = () => {

    const [form, setForm] = useState({
        name: '',
        user: '',
        pass: ''
    });

    const vendedores = [
        { id: 1, name: "Nombre del Vendedor", user: "vendedor 1", pass: "1234"},
        { id: 2, name: "Nombre del Vendedor", user: "vendedor 2", pass: "1234"},
        { id: 3, name: "Nombre del Vendedor", user: "vendedor 3", pass: "1234"}
    ];

    const handleInput = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const addUser = async (data) => {
        const dataApi = await api(data, 'POST');
        
    }

    return ( 
        <div className="crear">
            <Menu />
            <h2>Crear Vendedor</h2>
            <div className='container'>
                <div className='form'>
                    <h4>Crear Vendedor:</h4>
                    <input className='input' type="text" name='name' placeholder='nombre del vendedor' autoComplete='off' required/>
                    <input className='input' type="text" name='user' placeholder='usuario' autoComplete='off' required/>
                    <input className='input' type="text" name='pass' placeholder='clave' required/>
                    <button>Crear</button>
                </div>
                <div className='list'>
                    <h4>Lista de Vendedores:</h4>
                    {vendedores.map(v => (
                        <>
                            <div key={v.id} className='list-item'>
                                <div>
                                    <div><span>Nombre: {v.name}</span></div>
                                    <div><span>usuario: {v.user} | Clave: {v.pass}</span></div>
                                </div>
                                <div className='delete' title='Eliminar'>❌</div>
                            </div>
                        </>
                    ))}
                    
                </div>
            </div>
        </div>
     );
}
 
export default Crear;