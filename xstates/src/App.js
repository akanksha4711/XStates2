import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react'

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');
  const [states, setStates] = useState([]);
  const [state, setState] = useState('');
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState('');

  const fetchCountries = async () => {
    try{
      const res = await fetch('https://crio-location-selector.onrender.com/countries');
      const data = await res.json();
      setCountries(data);
      setStates([]);
      setState("");
      setCities([]);
      setCity("");
    } catch (err) {
      console.log(err);
    }
  }

  const fetchStates = async () => {
    try{
      const res = await fetch(`https://crio-location-selector.onrender.com/country=${country}/states`);
      const data = await res.json();
      setStates(data);
      setCities([]);
      setCity("");
    } catch (err) {
      console.log(err);
    }
  }

  const fetchCities = async () => {
    try{
      const res = await fetch(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`);
      const data = await res.json();
      setCities(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    fetchStates();
  }, [country]);

  useEffect(() => {
    fetchCities();
  }, [state]);

  return (
    <div className="App">
      <h1>Select Location</h1>
      <select value={country} style={{marginRight: "10px"}} onChange={(e) => {
        setCountry(e.target.value);
      }}>
        <option value="">Select Country</option>
        {countries.map(cn => <option>{cn}</option>)}
      </select>
      <select  disabled={states.length===0 ? true : false} style={{marginRight: "10px"}} value={state} onChange={(e) => {
        setState(e.target.value);
      }}>
        <option value="">Select State</option>
        {states.map(st => <option>{st}</option>)}
      </select>
      <select disabled={cities.length===0 ? true : false} value={city} onChange={(e) => {
        setCity(e.target.value);
      }}>
        <option value="">Select City</option>
        {cities.map(ct => <option>{ct}</option>)}
      </select>
      {city.length!==0 && <div>
        {`You Selected ${city}, ${state}, ${country}`}
      </div>}
    </div>
  );
}

export default App;
