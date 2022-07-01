import {useState, useEffect} from 'react';
import api from '../../services/api';
import Menu from '../menu/Menu';
import Portal from '../portal/Portal';
import useGetUser from '../../hooks/useGetUser';
import { useNavigate } from 'react-router-dom';
import bolsa from '../../img/bolsa.png';
import borrar from '../../img/delete.png';
import './crear.css';

const Crear = () => {

    const navigate = useNavigate();
    const URL = import.meta.env.VITE_APP_URL;

    const [modal, setModal] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [selectedDelete, setSectedDelete] = useState(0);
    const [selectedUpdate, setSelecteUpdate] = useState(0);
    const [saldoUpdate, setSaldoUpdate] = useState(0);
    const [form, setForm] = useState({
        user: '',
        name: '',
        pass: ''
    });

    const [vendedores, setVendedores] = useState([]);

    useEffect(() => {
        ( async() => {
            const checkUser = await useGetUser();
            if(!checkUser.id) navigate('/login');
            if(checkUser.level !== 1) navigate('/login');
            getUsers();
        })();
    }, []);

    const handleInput = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const addUser = async () => {
        const token = localStorage.getItem('lotto').replaceAll('"', '');
        await api(`${URL}/api/v1/auth`, {
            user: form.user,
            name: form.name,
            pass: form.pass,
            token
        }, 'POST');
        setForm({user: '',name: '',pass: ''});
        getUsers();
    }

    const updateUser = async () => {
        const token = localStorage.getItem('lotto').replaceAll('"', '');
        await api(`${URL}/api/v1/auth/users-saldo`, {
            token,
            saldo: saldoUpdate,
            userId: selectedUpdate
        }, 'POST');
        getUsers();
        setModalUpdate(false);
        setSaldoUpdate(0);
    }

    const handleDelete = async (id) => {
        setModal(true);
        setSectedDelete(id)
    }

    const handleUpdate = async (idUser) => {
        setModalUpdate(true);
        setSelecteUpdate(idUser);
    }

    const getUsers = async () => {
        const token = localStorage.getItem('lotto').replaceAll('"', '');
        const query = await api(`${URL}/api/v1/auth/users`, {token}, 'POST');
        const users = await query.json();
        setVendedores(users.data);
    }

    const deleteUser = async (id) => {
        const token = localStorage.getItem('lotto').replaceAll('"', '');
        await api(`${URL}/api/v1/auth/user-delete`, {id, token}, 'DELETE');
        getUsers();
        setModal(false);

    }

    return ( 
        <div className="crear">
            {modal &&
                <Portal>
                    <div className="modal-card">
                        <h2>Seguro desea Eliminar el Usuario?</h2>
                        <div>
                        <button className='modal-btn' onClick={() => deleteUser(selectedDelete)}>Eliminar</button>
                        <button className='modal-btn' onClick={() => setModal(false)}>Cerrar</button>
                        </div>
                    </div>
                </Portal>
            }
            {modalUpdate &&
                <Portal>
                    <div className="modal-card">
                        <h2>Modificar Saldo del Usuario:</h2>
                        <div>
                            <input className='form-control' type="number" min={0} onChange={(e) => setSaldoUpdate(e.target.value)} value={saldoUpdate}/>
                            <button className='modal-btn' onClick={() => updateUser()}>Guardar</button>
                            <button className='modal-btn' onClick={() => setModalUpdate(false)}>Cerrar</button>
                        </div>
                    </div>
                </Portal>
            }
            <Menu />
            <h2>Crear Vendedor</h2>
            <div className='container'>
                <div className='form'>
                    <h4>Crear Vendedor:</h4>
                    <input className='input' type="text" name='name' onChange={e => handleInput(e)} value={form.name} placeholder='nombre del vendedor' autoComplete='off' required/>
                    <input className='input' type="text" name='user' onChange={e => handleInput(e)} value={form.user} placeholder='usuario' autoComplete='off' required/>
                    <input className='input' type="text" name='pass' onChange={e => handleInput(e)} value={form.pass} placeholder='clave' required/>
                    <button className='btn' onClick={() => addUser()}>Crear</button>
                </div>
                <div className='list'>
                    <h4>Lista de Vendedores:</h4>
                    {vendedores.map(v => (
                        <div key={v._id} className='list-item'>
                            <div>
                                <div><span>Nombre: {v.name}</span></div>
                                <div><span>usuario: {v.user} | Clave: {v.pass} | Saldo: {v.saldo}</span></div>
                            </div>
                            <div className='delete' title='Eliminar' onClick={()=>handleDelete(v._id)}><img className='img-borrar' src={borrar}/></div>
                            <div className='update' title='Modificar Saldo' onClick={()=>handleUpdate(v._id)}><img className='img-update' src={bolsa}/></div>
                        </div>
                    ))}
                    
                </div>
            </div>
        </div>
     );
}
 
export default Crear;