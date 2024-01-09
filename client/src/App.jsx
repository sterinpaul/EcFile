import { BrowserRouter,Routes,Route} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Home from './pages/user/Home'
import SignUpOrLogin from './pages/user/SignUpOrLogin'
import AdminDashBoard from './pages/admin/AdminDashBoard'
import AdminLogin from './pages/admin/AdminLogin'

const App = ()=>{
  const token = useSelector(store=>store.user.token)
  const adminToken = useSelector(store=>store.admin.adminToken)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Home/> : <SignUpOrLogin/>}/>
        <Route path="/admin" element={adminToken ? <AdminDashBoard/> : <AdminLogin/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
