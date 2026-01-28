
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//layout
import ResponsiveAppBar from './layouts/ResponsiveAppBar';
import { CssBaseline, Box } from "@mui/material";
import AccountSideBar from './layouts/AccountSideBar';
//components
import FormProduct from './components/pages/admin/FormProduct';
import FormEditProduct from './components/pages/admin/FormEditProduct';

import ManageUser from './components/pages/admin/ManageUser';
import Dashboard from './layouts/dashboard/Dashboard';
import Homepage from './components/pages/Homepage';
//Pages
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/register';
import ProductPage from './components/pages/ProductPage';
import AllProduct from './components/pages/AllProduct';
import Cart from './components/pages/Cart';
//Admin
import HomepageAdmin from './components/pages/admin/HomepageAdmin';
import UpdateOrder from './components/pages/admin/UpdateOrder';
import UserSelect from './components/pages/admin/UserSelect';

//User
import Checkout from './components/pages/user/Checkout';
import UserWishlist from './components/pages/user/UserWishlist';
import UserAccount from './components/pages/user/UserAccount';
import UserHistory from './components/pages/user/UserHistory';
//Routes
import AdminRoute from './routes/AdminRoute';
import UserRoute from './routes/UserRoute';
import Notfound404 from './components/pages/Notfound404';

//function
import { currentUser } from './functions/auth';

import { useDispatch } from 'react-redux';

import { login } from './store/user-slide';
import { ToastContainer } from 'react-toastify';
import DrawerCart from './components/cards/DrawerCart';
import OrderView from './components/pages/admin/OrderView';


function App() {
  const idToken = localStorage.getItem('token')


  const dispatch = useDispatch()

  currentUser(idToken).then(res => {
    console.log(res);
    dispatch(login({
      id:res.data._id,
      name: res.data.name,
      role: res.data.role,
      token: idToken,
    }))
  }).catch(err => console.log(err))


  return (
    <BrowserRouter>
      <>
        <CssBaseline />
        <DrawerCart/>
        <ToastContainer/>
        {/* Publish */}
        <Routes>
          <Route path='/*' element={<Notfound404 text="The page you’re looking for doesn’t exist." />} />
          <Route path='/product/:id' element={    <> < ResponsiveAppBar /> <ProductPage /> </>} />
          <Route path='/shop' element={    <> < ResponsiveAppBar /><AllProduct/> </>} />
          <Route path='/cart' element={<> <ResponsiveAppBar/> <Cart/> </> } />
          <Route path='/' element={  <>      < ResponsiveAppBar /> <Homepage /></> } />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

          {/*User */}
          <Route path='/checkout' element={ <UserRoute>   <Checkout />  </UserRoute> } />
          
          <Route path='/user/account/:id' element={ <UserRoute>  <AccountSideBar>   <UserAccount />   </AccountSideBar>   </UserRoute> } />
          <Route path='/user/wishlist' element={ <UserRoute>  <AccountSideBar>   <UserWishlist />   </AccountSideBar>   </UserRoute> } />
          <Route path='/user/history' element={ <UserRoute>  <AccountSideBar>   <UserHistory />   </AccountSideBar>   </UserRoute> } />


          {/* Admin */}

          <Route path='/admin/index' element={<AdminRoute>  <HomepageAdmin /> </AdminRoute>} />
          <Route path='/admin/viewdata' element={<AdminRoute>  <FormProduct /> </AdminRoute>} />
          <Route path='/edit/:id' element={<AdminRoute>  <FormEditProduct /> </AdminRoute>} />
          <Route path="admin/manage" element={<AdminRoute> <ManageUser /> </AdminRoute>} />
          <Route path="admin/orders" element={<AdminRoute> <UpdateOrder /> </AdminRoute>} />
          <Route path="admin/orders/view/:id" element={<AdminRoute> <OrderView /> </AdminRoute>} />
          {<Route path="/admin" element={ <AdminRoute> <Dashboard /></AdminRoute>} />

      /*    <Route path="" element={<ViewData />} /> */}
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
