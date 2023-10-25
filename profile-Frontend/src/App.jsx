 
import Navbar from './components/Navbar'

import Footer from './components/Footer'
import {BrowserRouter as Router} from 'react-router-dom'
import AllRoutes from './AllRoutes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function App() {
  

  return (
   
      <div>
        <Router>
          <Navbar/>
          <AllRoutes/>
          <Footer/>
          <ToastContainer/>
        </Router>
      </div>
   

  )
}

export default App
