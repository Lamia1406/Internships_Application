import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './Pages/home';
import Product from './Pages/product';
import Login from './Pages/login';
import Internships from './Pages/internships';
import { Routes, Route, useLocation,Navigate } from 'react-router-dom';
import NavBar from './partials/navbar';
import YourApplication from './Pages/yourApp';
import ApplyForExistingInternship from './Pages/applyForExistingInternship';
import Footer from './partials/footer';
import DepartmentResponsibles from './Pages/responsibles';
import Requests from './Pages/requests';
import Signup from './Pages/sign_up';
import Supervisors from './Pages/supervisors';
import Notifications from './Pages/notifications';
import { ToastContainer} from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.min.css';
import UserProfil from './Pages/userProfil';
import PrivateRoute from './features/PrivateRoute';
import ApplyForInternship from './Pages/applyForInternship';
import Database from './Pages/database';
import StudentProgress from './Pages/studentProgress';
import Students from './Pages/students';
import Presence from './Pages/studentPresence';
import Evaluation from './Pages/studentEvaluation';
import StudentCertificate from './Pages/studentCertificate';
function App() {
  const location = useLocation(); // Get the current location
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';
  axios.defaults.withCredentials = true
  return (
    <>
     <ToastContainer/>
      {(!isLoginPage && !isSignupPage) && <NavBar />}
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      <Route element={<PrivateRoute />}>
        <Route path='/' element={<Home />} />
        <Route path='/product' element={<Product/>}/>
      </Route>
            <Route path='/departments' element={<DepartmentResponsibles/>}/> 
            <Route path='/supervisors' element={<Supervisors/>}/> 
            <Route path='/database' element={<Database/>}/> 
            <Route path='/applyForExistingInternship' element={<ApplyForExistingInternship/>}/> 
            <Route path='/applyForInternship' element={<ApplyForInternship/>}/> 
            <Route path='/yourApp' element={<YourApplication/>}/> 
            <Route path='/internships' element={<Internships/>}/> 
            <Route path='/notifications' element={<Notifications/>}/>  
            <Route path='/userProfil' element={<UserProfil />} />
            <Route path='/requests' element={<Requests />} />
            <Route path='/studentProgress' element={<StudentProgress/>}/>
            <Route path='/students' element={<Students/>}/>
            <Route path='/presence' element={<Presence/>}/>
            <Route path='/evaluation' element={<Evaluation/>}/>
            <Route path='/certificate' element={<StudentCertificate/>}/>
      </Routes>
      {(!isLoginPage && !isSignupPage) && <Footer />}
    </>
  );
}

export default App;
