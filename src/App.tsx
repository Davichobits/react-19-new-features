import { useState, version, useTransition } from 'react'
import './App.css'

const fetchAPI = async (city: string) => {
  
  const BASE_URL = 'http://api.weatherapi.com/v1/current.json';
  const API_KEY = import.meta.env.VITE_API_KEY;

  try {
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${city}&aqi=no`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

function App() {

  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState(0);
  const [isSearched, setIsSearched] = useState(false);

  const [isPending, startTransition] = useTransition()

  const handleSubmit = async () => {
    startTransition(async () => {
      const data = await fetchAPI(city);
      setTemperature(data.current.temp_c);
      setIsSearched(true);
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearched(false);
    setCity(event.target.value);
  }

  return (
    <div>
      <h1>React Version {version}</h1>
      <input 
        type="text"
        placeholder='ciudad'
        value={city}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>
        {isPending ? 'Cargando...' : 'Buscar'}
      </button>
      {isSearched && <p>La temperatura de {city} es {temperature} °C</p>}
      
    </div>
  )
}

export default App
