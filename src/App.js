import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Shared/Navbar/Navbar';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Dashboard/Dashboard';
import RequireAuth from './components/RequireAuth/RequireAuth';
import MyOrders from './components/Dashboard/MyOrders';
import AddReview from './components/Dashboard/AddReview';
import Payment from './components/Dashboard/Payment';
import MyProfile from './components/Dashboard/MyProfile';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/dashboard'
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }>
          <Route path='my-orders' element={<MyOrders />}></Route>
          <Route path='add-review' element={<AddReview />}></Route>
          <Route index element={<MyProfile />}></Route>
          <Route path='payment/:orderId' element={<Payment />}></Route>

        </Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>

      <ToastContainer />

    </div>
  );
}

export default App;
