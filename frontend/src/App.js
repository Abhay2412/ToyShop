import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer  from './components/Footer';
import HomeView from './views/HomeView';
import ProductDetailedView from './views/ProductDetailedView';
import CartView from './views/CartView';
import SignInView from './views/SignInView';
import RegisterView from './views/RegisterView';
import ProfileView from './views/ProfileView';
import ShippingView from './views/ShippingView';
import PayView from './views/PayView';
import PlaceOrderView from './views/PlaceOrderView';
import OrderView from './views/OrderView';
// import UserDetailListView from './views/UserDetailListView';
import UserEditView from './views/UserEditView';
import ProductListView from './views/ProductListView';
import ProductEditView from './views/ProductEditView';
import OrderListView from './views/OrderListView';

const App = () => { //Arrow function 
  return (
    <Router>
    <Header />
    <main className="py-4">
      <Container>
      <Route path='/order/:id' component={OrderView} />
      <Route path='/shipping' component={ShippingView} />
      <Route path='/payment' component={PayView} />
      <Route path='/placeorder' component={PlaceOrderView} />
      <Route path='/login' component={SignInView} />
      <Route path='/register' component={RegisterView} />
      <Route path='/profile' component={ProfileView} />
      <Route path='/product/:id' component={ProductDetailedView} />
      <Route path='/cart/:id?' component={CartView} />
      {/* <Route path='/admin/userlist' component={UserDetailListView} /> */}
      <Route path='/admin/user/:id/edit' component={UserEditView} />
      <Route path='/admin/productlist' component={ProductListView} />
      <Route path='/admin/product/:id/edit' component={ProductEditView} />
      <Route path='/admin/orderlist' component={OrderListView} />
      <Route path='/search/:keyword' component={HomeView} />
      <Route path='/' component={HomeView} exact />
      </Container>
    </main>
    <Footer />
    </Router>

  );
}

export default App;
