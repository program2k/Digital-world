import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Public from './pages/public/Public';
import DetailProduct from './pages/public/DetailProduct';
import FAQs from './pages/public/FAQs';
import Blogs from './pages/public/Blogs';
import Sevices from './pages/public/Sevices';
import Products from './pages/public/Products';
import path from './utils/path';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from './store/asyncAction';
import { getBrands } from './store/asyncBrandAction';
import FinalRegister from './pages/public/FinalRegister';
import ResetPassword from './pages/public/ResetPassword';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import Modal from '../src/components/Common/Modal';
import AdminLayout from './pages/admin/AdminLayout';
import ManageOrder from './pages/admin/ManageOrder';
import ManageProduct from './pages/admin/ManageProduct';
import ManageUser from './pages/admin/ManageUser';
import CreatProduct from './pages/admin/CreatProduct';
import MemberLayout from './pages/members/MemberLayout';
import PersonalLayout from './pages/members/PersonalLayout';
import MyCart from './pages/members/MyCart';
import WishList from './pages/members/WishList';
import ShoppingHistory from './pages/members/ShoppingHistory';
import Dashboard from './pages/admin/Dashboard';
import Cart from './components/Product/Cart';
import DetailCart from './pages/public/DetailCart';
import CheckOut from './pages/members/CheckOut';
import LoginSuccess from './pages/public/LoginSuccess';

function App() {
  const dispatch = useDispatch();
  const { isShowModal, modalChildren, isShowCart } = useSelector(state => state.appReducer);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, []);
  return (
    <div className="min-h-screen font-main flex justify-items-center relative">
      {isShowCart && (
        <div className='absolute inset-0 bg-overlay z-50 flex justify-end'>
          <Cart />
        </div>
      )}
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        <Route path={path.CHECKOUT} element={<CheckOut />} />
        <Route path={path.LOGIN_SUCCESS} element={<LoginSuccess />} />
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />} />
          <Route path={path.FAQs} element={<FAQs />} />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route path={path.OUR_SERVICES} element={<Sevices />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.DETAIL_CART} element={<DetailCart />} />
          <Route path={path.ALL} element={<Login />} />
        </Route>
        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.MANAGE_ORDER} element={<ManageOrder />} />
          <Route path={path.MANAGE_PRODUCTS} element={<ManageProduct />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.CREATE_PRODUCT} element={<CreatProduct />} />
        </Route>
        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<PersonalLayout />} />
          <Route path={path.MY_CART} element={<MyCart />} />
          <Route path={path.WISHLIST} element={<WishList />} />
          <Route path={path.SHOPPING_HISTORY} element={<ShoppingHistory />} />
        </Route>
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
        <Route path={path.LOGIN} element={<Login />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
