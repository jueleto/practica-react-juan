import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

function App() {


  const [valorHola, setValorHola] = useState("Hola");
  const [valorCantidad, setValorCantidad] = useState(0);


  const [arrayPaises, setArrayPaises] = useState([]);

  //https://restcountries.com/
  const requestPaises = () => {
    axios.get('https://restcountries.com/v3.1/all')
      .then((response) => {
        // handle success
        //console.log(response);
        
        //console.log("data", );

        setArrayPaises(response.data);

        for(let i=0; i< response.data.length; i++){
            const dataActual=response.data[i];
            console.log(i+" ", dataActual);
            console.log("name ", dataActual.name.common);
            console.log("flags ", dataActual.flags.png);
        }


      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });

  }



  return (
    <>
      <div>
      </div>
      <h1>Mi primera app react</h1>
      <h2>Mi primer cambio</h2>
      <h3>{"valorHola: " + valorHola + " "+valorCantidad}</h3>
      <button onClick={requestPaises}> Obtener todos los paises</button>
      <button
        onClick={() => {
          setValorHola("Hola kp");
          setValorCantidad(valorCantidad+1);
        }
        }
      > Setear Valor Hola</button>

      {/* <p>{JSON.stringify(arrayPaises)}</p> */}

      {arrayPaises.map((item, index)=>{

        return(
          <div key={"k-"+index}>
          <h6>{item.name.common}</h6>
          <img src={item.flags.png}/>
          </div>
        )
      })

      }

    </>
  )
}

export default App
