# React

## Generalidades

### Input controlado

Un input controlado es aquel cuyo valor se actualiza en función de los cambios en el input. Para que un input sea controlado, es necesario usar el atributo `value` junto con el evento `onChange`.:

```jsx
import React, { useState } from 'react';

function ControlledInput() {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <input type="text" value={value} onChange={handleChange} />
      <p>Valor actual: {value}</p>
    </div>
  );
}
```

## React 19

### useTransition

El hook `useTransition` permite realizar transiciones de estado en componentes de React. Se lo puede utilizar para hacer peticiones http de la siguiente forma:

```jsx
function App() {

  const [city, setCity] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async () => {
    startTransition(async () => {
      const data = await fetchAPI(city);
      console.log(data.current.temp_c);
    })
  }

  return (
    <div>
      <h1>React Version {version}</h1>
      <input 
        type="text"
        placeholder='ciudad'
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSubmit}>
        {isPending ? 'Cargando...' : 'Buscar'}
      </button>
    </div>
  )
}
```