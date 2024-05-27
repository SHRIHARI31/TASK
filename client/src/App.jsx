
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import DashBoard from './components/DashBoard'
import AddStudent from './pages/AddStudent'
import EditStudent from './pages/EditStudent'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<DashBoard />}></Route>
          <Route path='/add-students' element={<AddStudent />}></Route>
          <Route path='/edit-students' element={<EditStudent />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
