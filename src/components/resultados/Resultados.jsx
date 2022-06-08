import Menu from '../menu/Menu';
import CardResultados from '../cardResultados/CardResultados';
import './resultados.css';
const Resultados = () => {
    const resultados = [
        {number: 1, time: "9:00 am", resultado: "--"},
        {number: 2, time: "10:00 am", resultado: "--"},
        {number: 3, time: "11:00 am", resultado: "--"},
        {number: 4, time: "12:00 pm", resultado: "--"},
        {number: 5, time: "1:00 pm", resultado: "--"},
        {number: 6, time: "2:00 pm", resultado: "--"},
        {number: 7, time: "3:00 pm", resultado: "--"},
        {number: 8, time: "4:00 pm", resultado: "--"},
        {number: 9, time: "5:00 pm", resultado: "--"},
        {number: 10, time: "6:00 pm", resultado: "--"},
        {number: 11, time: "7:00 pm", resultado: "--"}
    ]
    const date = new Date();
    const toDay = String(date.getFullYear() + '-' + String(date.getDate()).padStart(2, '0')) + '-' + String(date.getMonth() + 1).padStart(2, '0');
    // console.log(date.toJSON().slice(0,10))
    return ( 
        <div className='resultados'>
            <Menu />
            <h2>Resultados:</h2>
            <div><input type="date" value={toDay}/><button>Consultar</button></div>
            <div className='container'>
                {resultados.map( r => (
                    <CardResultados key={r.number} data={r}/>
                ))}
            </div>
        </div> 
    );
}
 
export default Resultados;