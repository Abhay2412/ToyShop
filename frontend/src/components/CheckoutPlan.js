import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutPlan = ({ plan1, plan2, plan3, plan4 }) => {
  return (
<Nav className = 'justify-content-center mb-4'>
      <Nav.Item>
          {plan1 ? (
              <LinkContainer to='/login'>
                  <Nav.Link>Login In</Nav.Link>
              </LinkContainer>
          ): <Nav.Link disabled>Login In</Nav.Link>}
        </Nav.Item>
        <Nav.Item>
          {plan2 ? (
              <LinkContainer to='/shipping'>
                  <Nav.Link>Shipping</Nav.Link>
              </LinkContainer>
          ): <Nav.Link disabled>Shipping</Nav.Link>}
        </Nav.Item>
        <Nav.Item>
          {plan3 ? (
              <LinkContainer to='/payment'>
                  <Nav.Link>Payment</Nav.Link>
              </LinkContainer>
          ): <Nav.Link disabled>Payment</Nav.Link>}
        </Nav.Item>
        <Nav.Item>
          {plan4 ? (
              <LinkContainer to='/placeorder'>
                  <Nav.Link>Place Order</Nav.Link>
              </LinkContainer>
          ): <Nav.Link disabled>Place Order</Nav.Link>}
        </Nav.Item>
    </Nav>
        )
};

export default CheckoutPlan;
