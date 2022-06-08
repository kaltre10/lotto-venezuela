import Menu from '../menu/Menu';
import './ventas.css';

const Ventas = () => {
    return ( 
        <div className='ventas'>
            <Menu />
            <h2>Ventas</h2>
            <div className='container'>
                <div className='vendedor'>
                    <div>Vendedor</div>
                    <div>Ventas</div>
                    <div>Premios</div>
                    <div>Total Queda</div>
                </div>
                <div className='vendedor'>
                    <div className='vendedor-vendedor'>Vendedor 1</div>
                    <div className='vendedor-ventas'>500</div>
                    <div className='vendedor-premios'>200</div>
                    <div className='vendedor-queda'>300</div>
                </div>
                <div className='vendedor'>
                    <div className='vendedor-vendedor'>Vendedor 2</div>
                    <div className='vendedor-ventas'>500</div>
                    <div className='vendedor-premios'>200</div>
                    <div className='vendedor-queda'>300</div>
                </div>
                <div className='vendedor'>
                    <div className='total-premios'><span>Premios Total:</span>600</div>
                    <div className='total'><span>Total Queda:</span>400</div>
                </div>
               
            </div>
        </div>
     );
}
 
export default Ventas;