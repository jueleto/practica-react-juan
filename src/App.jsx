import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';


function App() {

  const paisPosicionMinima = 0;
  const paisPosicionMaxima = 249;

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      // Selecciona un índice aleatorio entre 0 y i
      const j = Math.floor(Math.random() * (i + 1));

      // Intercambia los elementos en los índices i y j
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }



  const [arrayPaises, setArrayPaises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [puntaje, setPuntaje] = useState(0);



  // Pais de la bandera que se muestra
  const [paisSeleccionadoJuego, setPaisSeleccionadoJuego] = useState(undefined);

  // Opciones de posibles respuestas
  // {name: "Paraguay"}
  const [posiblesRespuestasJuego, setPosiblesRespuestasJuego] = useState([]);

  // lugar donde se guarda la respuesta
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState();

  const verificarRespuestaCorrecta = (item) => {
    setLoading(true);

    setRespuestaSeleccionada(item);

    // console.log("nombrePais seleccionado como respuesta: " + nombrePais);
    if (item.name === paisSeleccionadoJuego.translations.spa.common) {
      // alert("CORRECTO");
      setPuntaje(puntaje + 5);
      setTimeout(() => {
        setLoading(false);
        requestPaises();
      }, 2000);

    } else {
      // alert("INCORRECTO");
      setPuntaje(puntaje - 3 );
      setTimeout(() => {
        setLoading(false);
        setRespuestaSeleccionada(undefined);
      }, 1000);
    }

  }

  //https://restcountries.com/
  const requestPaises = () => {

    setRespuestaSeleccionada(undefined);

    axios.get('https://restcountries.com/v3.1/all')
      .then((response) => {
        // handle success
        //console.log(response);

        console.log("cantidad de registros", response.data.length);
        const posicionPaisSeleccionado = Math.floor(Math.random() * (paisPosicionMaxima + 1));
        const paisSeleccionado = response.data[posicionPaisSeleccionado];
        console.log("posicionPaisSeleccionado", posicionPaisSeleccionado);
        console.log("paisSeleccionado", paisSeleccionado);
        setPaisSeleccionadoJuego(paisSeleccionado);

        let posiblesRespuestas = [];
        posiblesRespuestas.push({ name: paisSeleccionado.translations.spa.common });


        for (let i = 0; i < 3; i++) {
          const posicionPosibleRespuesta = Math.floor(Math.random() * (paisPosicionMaxima + 1));
          const paisPosibleRespuesta = response.data[posicionPosibleRespuesta];
          posiblesRespuestas.push({ name: paisPosibleRespuesta.translations.spa.common });
        }

        posiblesRespuestas = shuffleArray(posiblesRespuestas);

        setPosiblesRespuestasJuego(posiblesRespuestas);






        // console.log("data", response.data);




        // setArrayPaises(response.data);

        // for(let i=0; i< response.data.length; i++){
        //     const dataActual=response.data[i];
        //     console.log(i+" ", dataActual);
        //     console.log("name ", dataActual.translations.spa.common);
        //     console.log("flags ", dataActual.flags.png);
        // }


      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });

  }


  const retornarClaseBotonOpcion = (item) => {

    if (respuestaSeleccionada) {
      if (respuestaSeleccionada.name === paisSeleccionadoJuego.translations.spa.common) {
        if (item.name === respuestaSeleccionada.name) {
          return "btn-success";
        }
      } else {
        return "btn-danger";
      }
    }
    return "btn-outline-secondary";
    // + respuestaSeleccionada === undefined ? " btn-outline-secondary" :
    // (respuestaSeleccionada.name === paisSeleccionadoJuego.translations.spa.common ? " btn-success" : " btn-danger")
  }

  return (
    <>

      <div className="px-2 py-1 my-2 text-center">
        {/* <img className="d-block mx-auto mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"> */}
        <h1 className="display-6 fw-bold text-body-emphasis">Juego de Banderas</h1>
        <div className="col-lg-6 mx-auto">
          <p className=" mb-2">Elije a que país corresponde la bandera mostrada</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button type="button" className="btn btn-success px-1 gap-3"
              onClick={requestPaises}
            >Jugar </button>
            <h3>Puntos: {puntaje}</h3>

          </div>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            {paisSeleccionadoJuego !== undefined ?
              <div className='py-2'>
                {/* <h1>{paisSeleccionadoJuego.translations.spa.common}</h1> */}
                <img style={{
                  maxHeight: 200
                }}
                  src={paisSeleccionadoJuego.flags.png} />
              </div>
              :
              <h5 className='p-3'>Juego no iniciado</h5>
            }
          </div>

          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">

            {posiblesRespuestasJuego.map((item, index) =>
              <button key={"id-" + index}
                type="button"
                className={
                  "btn px-1 "
                  + retornarClaseBotonOpcion(item)
                }
                onClick={() => {
                  verificarRespuestaCorrecta(item);
                }}

                disabled={loading}

              >
                {item.name}
              </button>
            )
            }
          </div>

          {/* {JSON.stringify(posiblesRespuestasJuego)} */}
        </div>
      </div>

    </>
  )
}

export default App
