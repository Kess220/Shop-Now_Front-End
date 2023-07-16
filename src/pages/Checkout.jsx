import React, { useState } from 'react';
import styled from 'styled-components';
import gifAnimation from '../assets/W0zfpCnqF0.gif';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 16px;
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
`;

const Button = styled.button`
  width: 300px;
  height: 40px;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
`;


const Checkout = () => {
  const [isCheckoutComplete, setIsCheckoutComplete] = useState(false);

  const handleCheckout = () => {
    
    setIsCheckoutComplete(true);
  };

  return (
    <Container>
      {isCheckoutComplete ? (
        <div style={{ width: '200px', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: '8px' }}>
        <img src={gifAnimation} style={{ width: '30%', height: '30%' }} alt="Animation" />
        <h1 style={{ color: 'green', textAlign: 'center' }}>Compra Realizada</h1>
        <h2 style={{ color: 'gray', textAlign: 'center' }}>Confirme no seu email</h2>
      </div>
      
      ) : (
        <>
          <Title>Checkout</Title>
          <Input type="text" placeholder="Name" />
          <Input type="text" placeholder="Address" />
          <Input type="text" placeholder="City" />
          <Input type="text" placeholder="Zip" />
          <Button onClick={handleCheckout}>Checkout</Button>
        </>
      )}
    </Container>
  );
};

export default Checkout;
