import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer  from './components/Footer';
import HomeView from './views/HomeView';

const App = () => { //Arrow function 
  return (
    <Router>
    <Header />
    <main className="py-4">
      <Container>
      <Route path='/' component={HomeView} exact/>
      </Container>
    </main>
    <Footer />
    </Router>

  );
}

export default App;
