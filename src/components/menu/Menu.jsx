import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; 
import { UserContex } from '../../context/DataUserContext';
import bolsa from '../../img/bolsa.png';
import './menu.css';


const Menu = () => {

    const {dataContext, setDataContext} = useContext(UserContex);

    let navigate = useNavigate();

    const handleClose = () => {
        setDataContext({ user: {id: null, level: 0, saldo: 0}})
        localStorage.removeItem('lotto')
        navigate('/login');
    }

    return ( 
       
        dataContext.user.level == 1
        ?(
            <nav className='menu'>
                <ul>
                    <li><NavLink to='/ventas'>Ventas</NavLink></li>
                    <li><NavLink to='/crear'>Crear Vendedor</NavLink></li>
                    <li><NavLink to='/resultados-crear'>Resultados</NavLink></li>
                    <li><NavLink to='/pagar'>Pagar/Anular</NavLink></li>
                    <li><NavLink to='/premios'>Premios/Precio</NavLink></li>
                    <li><a href='#' onClick={() => handleClose()}>Cerrar</a></li>
                </ul>
            </nav> 
        )
        :(
            <nav className='menu'>
                <ul>
                    <li><NavLink to='/vender'>Vender</NavLink></li>
                    <li><NavLink to='/resultados'>Resultados</NavLink></li>
                    <li><NavLink to='/reportes'>Reportes</NavLink></li>
                    <li className='container-saldo'>
                        <span className='saldo'>
                            <img className='img' src={bolsa}/> {dataContext.user.saldo} Bs
                        </span>
                        <a href='#' onClick={() => handleClose()}>Cerrar</a>
                    </li>
                </ul>
            </nav> 
        )

        );
}
 
export default Menu;