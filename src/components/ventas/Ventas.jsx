import { useState, useEffect } from 'react'; 
import useGetUser from '../../hooks/useGetUser';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Menu from '../menu/Menu';
import './ventas.css';

const Ventas = () => {

    const navigate = useNavigate();
    const URL = import.meta.env.VITE_APP_URL;

    const date = new Date();
    const toDay = `${String(date.getFullYear())}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const [ desde, setDesde ] = useState(toDay);
    const [ hasta, setHasta ] = useState(toDay);
    const [ allVentas, setAllVentas ] = useState([]);
    const [ users, setUsers ] = useState([]);
    const [ premios, setPremios ] = useState([]);
    const [sumaPremio, setSumaPremio ] = useState(0);

    
    let sumaVentas = 0;

    useEffect(() => {
        ( async() => {
            const checkUser = await useGetUser();
            if(!checkUser.id){
                navigate('/login');
            }
            getVentas();
            getPremios();
            
        })();
    }, []);

    const getPremios = async () => {
        // const token = localStorage.getItem('lotto').replaceAll('"', '');
        const query = await fetch(`${URL}/api/v1/premios`);
        const dataPremios =  await query.json();
        let suma = 0;
        dataPremios.data.forEach( (p) => {
            suma += p.premio;
            setSumaPremio( suma );
        })
        // console.log(sumaPremio);
        // setPremios([ ...premios, dataPremios.data[0]]);
    }
   
    const getVentas = async () => {
        const token = localStorage.getItem('lotto').replaceAll('"', '');
        const query = await api(`${URL}/api/v1/ventas/all`, { token, desde, hasta }, "POST");
        const dataVentas =  await query.json();
        setAllVentas(dataVentas.data);
    }

    //obtener array de usuarios
    allVentas.map(v => { 
            if(!v.user) v.user = { name: 'default' }
            if(users.filter(u => u.user == v.user.name).length == 0){
                setUsers([...users, {user: v.user.name, ventas: 0, premio: 0}])
            } 
        
    });

   
    let ventasUser = [];
    allVentas.forEach((ventas, index) => {
        if(ventas.status != 1){ //no tomar los anulados "status: 1"
            if(ventasUser.length == 0){
                ventasUser.push({ user: ventas.user.name, ventas: 0, premio: 0 });
            }
    
            if(ventasUser.filter(v => v.user == ventas.user.name).length == 0){
                ventasUser.push({ user: ventas.user.name, ventas: 0, premio: 0 })
            } 
            
            ventasUser.map((d, i) => {
                if(d.user == ventas.user.name){
                    ventasUser[i].ventas = ventasUser[i].ventas + ventas.precio;
                    ventasUser[i].premio = ventasUser[i].premio + ventas.premio;
                }
            })
            sumaVentas = sumaVentas + ventas.precio;
            // sumaPremio = sumaPremio + ventas.premio;
        }

    });

    return ( 
        <div className='ventas'>
            <Menu />
            <h2>Ventas</h2>
            <div>
                <label>Desde:</label>
                <input type='date' name='desde' value={desde} onChange={e => setDesde(e.target.value)}/>
                <label>Hasta:</label>
                <input type='date' name='hasta' value={hasta} onChange={e => setHasta(e.target.value)}/>
                <button onClick={() => getVentas()}>Consultar</button>
            </div>
            <div className='container'>
                <div className='vendedor'>
                    <div><h3>Vendedor</h3></div>
                    <div><h3>Ventas</h3></div>
                    <div><h3>Premios</h3></div>
                    <div><h3>Total Queda</h3></div>
                </div>
                {users.length > 0 && (
                    users.map(u => (
                        <div className='vendedor'>
                        <div className='vendedor-, endedor'>{u.user}</div>
                       {console.log(ventasUser.filter( v => v.user == u.user)[0] || 0)}
                        <div className='vendedor-ventas'>{ventasUser.filter( v => v.user == u.user)[0] ? (ventasUser.filter( v => {if(v.user == u.user) return v})[0].ventas).toFixed(2) : 0}</div>
                        <div className='vendedor-premios'>{ventasUser.filter( v => v.user == u.user)[0] ? (ventasUser.filter( v => {if(v.user == u.user) return v})[0].premio).toFixed(2) : 0}</div>
                        <div className='vendedor-queda'>
                        {
                            ventasUser.filter( v => v.user == u.user)[0] 
                            ?
                            (ventasUser.filter( v => {if(v.user == u.user) return v})[0].ventas -
                            ventasUser.filter( v => {if(v.user == u.user) return v})[0].premio).toFixed(2)
                            : 0
                        }</div>
                    </div>
                    ))
                    
                )}
                
                <div className='vendedor'>
                    <div className='total-ventas'><span></span></div>
                    <div className='total-ventas'><span>Ventas Total:</span> {(sumaVentas).toFixed(2)} Bs</div>
                    <div className='total-premios'><span>Premios Total:</span>  {(sumaPremio).toFixed(2)} Bs</div>
                    <div className='total'><span>Total Queda:</span> { (sumaVentas - sumaPremio).toFixed(2)} Bs</div>
                </div>
               
            </div>
        </div>
     );
}
 
export default Ventas;