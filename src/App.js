import React, { useState , useEffect} from 'react';
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import * as nakamasAddress from "./data/nakamas-address.json";


function App() {
  const [viewPort, setViewPort] = useState({
    latitude:  -36.7178708,
    longitude: -73.1140449,
    zoom: 15,
    width: '100vw',
    height: '100vh'
  })
  const [nakamaSelected, setNakamaSelected] = useState(null)
  useEffect(() =>{
    const listener = e =>{
      if( e.key === "Escape"){
        setNakamaSelected(null)
      }
    }
    window.addEventListener("keydown", listener)
    return () =>{
      window.removeEventListener("keydown", listener)
    }
  }, [])


  return (
    <div className="App">
        <ReactMapGL {...viewPort} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} 
        mapStyle='mapbox://styles/kendito/ckff7kjki0zn119mkbyzh84n0'
        onViewportChange={ viewport =>{
          setViewPort(viewport)
          console.log(viewport)
        }}
        >
          
          {nakamasAddress.features.map((nakama)=>(
            <Marker key={nakama.properties.PARK_ID} latitude={nakama.geometry.coordinates[0]} longitude={nakama.geometry.coordinates[1]}>
              <button className="marker-btn" onClick={(e) =>{
                if(nakamaSelected === nakama && nakamaSelected){
                  setNakamaSelected(null)
                }else{
                  e.preventDefault()
                  setNakamaSelected(nakama)
                }

                
              }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Strawhat_crew_jolly_roger.svg/1024px-Strawhat_crew_jolly_roger.svg.png" alt="nakama house" />
              </button>
            </Marker>
          ))}

          {nakamaSelected ? (
            <Popup latitude={nakamaSelected.geometry.coordinates[0]} longitude={nakamaSelected.geometry.coordinates[1]} onClose={() =>{
              setNakamaSelected(null)
            }}>
              <div>
                <h2>{nakamaSelected.properties.NAME}</h2>
                <p>{nakamaSelected.properties.ADDRESS}</p>
                <p>{nakamaSelected.properties.DESCRIPTIO}</p>
              </div>
            </Popup>
          ) : null}

        </ReactMapGL>
    </div>
  );
}

export default App;
