import { useState } from 'react'
import { Route ,Routes, useLocation} from 'react-router-dom';
import Landing  from './views/Landing/Landing';
import Home from './views/Home/Home';
import Detail from './views/Detail/Detail';
import Form from './views/Form/Form';
import NavBar from './components/NavBar/NavBar';
 





function App() {
  
  const location = useLocation();
  console.log(location)

  return (
   <div>
      {location.pathname !== "/" && <NavBar/>}
    <Routes>
      <Route exact path='/' element={<Landing/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/detail/:id' element={<Detail/>}/>
      <Route path='/create' element={<Form/>}/>
    </Routes>
    
    
   </div>
  )
}

export default App
