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

const App = () => { //Arrow function 
  return (
    <Router>
    <Header />
    <main className="py-4">
      <Container>
      <Route path='/login' component={SignInView} />
      <Route path='/register' component={RegisterView} />
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
