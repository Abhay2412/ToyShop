import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer  from './components/Footer';
import HomeView from './views/HomeView';

const App = () => { //Arrow function 
  return (
    <>
    <Header />
    <main className="py-4">
      <Container>
      <HomeView/>
      </Container>
    </main>
    <Footer />
    </>
  );
}

export default App;
