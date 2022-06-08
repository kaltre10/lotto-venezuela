import Menu from '../menu/Menu';
import './cargarResultados.css';
import CardResultados from '../cardResultados/CardResultados';

const CargarResultados = () => {

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
    ];

    const animal = [
        { number: 1, name: "name", url: "" },
        { number: 2, name: "name", url: ""  },
        { number: 3, name: "name", url: ""  },
        { number: 4, name: "name", url: ""  },
        { number: 5, name: "name", url: ""  },
        { number: 6, name: "name", url: ""  },
        { number: 7, name: "name", url: ""  },
        { number: 8, name: "name", url: ""  },
        { number: 9, name: "name", url: ""  },
        { number: 10, name: "name", url: ""  },
        { number: 11, name: "name", url: ""  },
        { number: 12, name: "name", url: ""  },
        { number: 13, name: "name", url: ""  },
        { number: 14, name: "name", url: ""  },
        { number: 15, name: "name", url: ""  },
        { number: 16, name: "name", url: ""  },
        { number: 17, name: "name", url: ""  },
        { number: 18, name: "name", url: ""  },
        { number: 19, name: "name", url: ""  },
        { number: 20, name: "name", url: ""  },
        { number: 21, name: "name", url: ""  },
        { number: 22, name: "name", url: ""  },
        { number: 23, name: "name", url: ""  },
        { number: 24, name: "name", url: ""  },
        { number: 25, name: "name", url: ""  },
        { number: 26, name: "name", url: ""  },
        { number: 27, name: "name", url: ""  },
        { number: 28, name: "name", url: ""  },
        { number: 29, name: "name", url: ""  },
        { number: 30, name: "name", url: ""  },
        { number: 31, name: "name", url: ""  },
        { number: 32, name: "name", url: ""  },
        { number: 33, name: "name", url: ""  }
    ]

    return ( 
        <div className="cargar-resultados">
            <Menu />
            <h2>Cargar Resultados</h2>
            <div>
                <select name='hour'>
                    <label>Hora:</label>
                    <option className='option' value=""> - </option>
                    {resultados.map(r =>(
                        <option key={r.number} className='option' value={r.number}>{r.time}</option>
                    ))}
                </select>
                <select name='resultado'>
                    <label>Resultado:</label>
                    <option className='option' value=""> - </option>
                    {animal.map(a => (
                        <option key={a.number} className='option' value={a.number}>{a.number} {a.name}</option>
                    ))}
                </select>
                <button>Cargar</button>
            </div>
            <div className='container'>
                {resultados.map( r => (
                    <CardResultados key={r.number} data={r}/>
                ))}
            </div>
        </div>
     );
}
 
export default CargarResultados;