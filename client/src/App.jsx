import { BrowserRouter,Routes,Route} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Home from './pages/user/Home'
import SignUpOrLogin from './pages/user/SignUpOrLogin'


const App = ()=>{
  const token = useSelector(store=>store.user.token)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Home/> : <SignUpOrLogin/>}/>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
