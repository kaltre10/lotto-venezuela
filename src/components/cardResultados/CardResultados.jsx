import './cardResultados.css';

const CardResultados = ({data}) => {
    return ( 
        <div className="card-resultados">
            <span className='number'>{data.resultado}</span>
            <p className="time">{data.time}</p>
        </div>
     );
}
 
export default CardResultados;