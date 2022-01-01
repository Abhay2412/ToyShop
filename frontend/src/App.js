import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer  from './components/Footer';

const App = () => { //Arrow function 
  return (
    <>
    <Header />
    <main>
      <Container>
      <h1>Welcome to Toys Shop</h1>
      </Container>
    </main>
    <Footer />
    </>
  );
}

export default App;
