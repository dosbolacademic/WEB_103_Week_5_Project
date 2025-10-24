import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewCars from './pages/ViewCars'
import EditCar from './pages/EditCar'
import CreateCar from './pages/CreateCar'
import CarDetails from './pages/CarDetails'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <CreateCar title='BOLT BUCKET | Customize' />
    },
    {
      path:'/customcars',
      element: <ViewCars title='BOLT BUCKET | Custom Cars' />
    },
    {
      path: '/customcars/:id',
      element: <CarDetails title='BOLT BUCKET | View' />
    },
    {
      path: '/edit/:id',
      element: <EditCar title='BOLT BUCKET | Edit' />
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App


// In App.js
import { Routes, Route } from 'react-router-dom';
import ItemsList from './pages/ItemsList';
// ... other imports

<Routes>
  <Route path="/" element={<ItemsList />} />
  <Route path="/create" element={<CreateItem />} />
  <Route path="/items" element={<ItemsList />} />
  <Route path="/item/:id" element={<ItemDetail />} />
  <Route path="/edit/:id" element={<EditItem />} />
</Routes>