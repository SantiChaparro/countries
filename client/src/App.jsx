import { useState } from 'react'
import { Route ,Routes, useLocation} from 'react-router-dom';
import Landing  from './views/Landing/Landing';
import Home from './views/Home/Home';
import Detail from './views/Detail/Detail';
import Form from './views/Form/Form';
import NavBar from './components/NavBar/NavBar';
import NotFound from './components/NotFound/NotFound';
 





function App() {
  
  const location = useLocation();
  
  return (
   <div>
      {location.pathname !== "/" && <NavBar/>}
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/detail/:id' element={<Detail/>}/>
      <Route path='/create' element={<Form/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    
    
   </div>
  )
}

export default App
