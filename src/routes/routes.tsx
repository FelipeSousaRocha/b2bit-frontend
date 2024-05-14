import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Form from '../components/Form/form'
import Profile from '../components/Profile/Profile';
import PrivateRoute from '../routes/privateRoute'

function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Form />}></Route>
        <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default MainRoutes;