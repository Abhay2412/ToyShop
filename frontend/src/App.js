import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer  from './components/Footer';
import HomeView from './views/HomeView';
import ProductDetailedView from './views/ProductDetailedView';

const App = () => { //Arrow function 
  return (
    <Router>
    <Header />
    <main className="py-4">
      <Container>
      <Route path='/' component={HomeView} exact />
      <Route path='/product/:id' component={ProductDetailedView} />
      </Container>
    </main>
    <Footer />
    </Router>

  );
}

export default App;
