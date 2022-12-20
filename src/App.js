import './App.css';
import Map from './components/Map'
import React, { useState} from 'react';

function App() {
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const [data, setData] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const getData = () => {
    if(endDate === 0 || startDate === 0) return;
    setIsDisabled(true)
    fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?starttime=${startDate}%2000%3A00%3A00&endtime=${endDate}%2023%3A59%3A59&minmagnitude=2.5&orderby=time`)
    .then(res => res.json())
    .then(data => {
      setData( data.features.map(c => c.geometry.coordinates.slice(0,2)) )
      setIsDisabled(false)
    })
    .catch(err => { 
      alert('Result excceding 2000 cant fetch')
      setData([])
      setIsDisabled(false)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        *Assemsment by Danish <small>results may exceed 2000 quickly , keep date range short </small>
      </header>
      <div className='container'>
        <div>
          Get earthquake Data
        </div>
        <div className='input'>
          <div>
            From:
        <input type="date" onChange={(event) => setStartDate(event.target.value)}/>
          </div>
          <div>
            To:
          <input type="date" onChange={(event) => setEndDate(event.target.value)}/>
          </div>
        <button onClick={()=> getData()} disabled = {isDisabled} >Submit</button>
        </div>
      </div>
      <Map data={data}/>
    </div>
  );
}

export default App;
