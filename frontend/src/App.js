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

const App = () => { //Arrow function 
  return (
    <Router>
    <Header />
    <main className="py-4">
      <Container>
      <Route path='/shipping' component={ShippingView} />
      <Route path='/payment' component={PayView} />
      <Route path='/placeorder' component={PlaceOrderView} />
      <Route path='/login' component={SignInView} />
      <Route path='/register' component={RegisterView} />
      <Route path='/profile' component={ProfileView} />
      <Route path='/product/:id' component={ProductDetailedView} />
      <Route path='/cart/:id?' component={CartView} />
      <Route path='/' component={HomeView} exact />
      </Container>
    </main>
    <Footer />
    </Router>

  );
}

export default App;
