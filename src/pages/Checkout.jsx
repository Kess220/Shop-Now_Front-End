import React, { useState } from 'react';
import styled from 'styled-components';
import gifAnimation from '../assets/W0zfpCnqF0.gif';
import { useLocation } from 'react-router-dom';

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
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const location = useLocation();
  const selectedProduct = location.state?.product;

  const handleCheckout = () => {
    setIsCheckoutComplete(true);
    sendEmail(name, address, city, zip);
  };

  const sendEmail = (name, address, city, zip) => {
    // Aqui você pode implementar a lógica para enviar o email com os dados do checkout
    console.log('Enviando email:', name, address, city, zip);
  };

  const CompletedContainer = styled.div`
    width: 200px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 8px;
  `;

  const CompletedImage = styled.img`
    width: 30%;
    height: 30%;
  `;

  const CompletedTitle = styled.h1`
    color: green;
    text-align: center;
  `;

  const CompletedSubtitle = styled.h2`
    color: gray;
    text-align: center;
  `;

  return (
    <Container>
      {isCheckoutComplete ? (
        <CompletedContainer>
          <CompletedImage src={gifAnimation} alt="Animation" />
          <CompletedTitle>Compra Realizada</CompletedTitle>
          <CompletedSubtitle>Confirme no seu email</CompletedSubtitle>
        </CompletedContainer>
      ) : (
        <>
          <Title>Checkout</Title>
          {selectedProduct && (
            <>
              <ProductContainer>
                <ProductImage src={selectedProduct.imgs[0]} alt="foto" />
                <ProductInfo>
                  <ProductName>{selectedProduct.modelo}</ProductName>
                  <PriceContainer>
                    <Price>${selectedProduct.preco}</Price>
                  </PriceContainer>
                </ProductInfo>
              </ProductContainer>
            </>
          )}
          <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
          <Input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
          <Input type="text" placeholder="Zip" value={zip} onChange={(e) => setZip(e.target.value)} />
          <Button onClick={handleCheckout}>Checkout</Button>
        </>
      )}
    </Container>
  );
};

const ProductContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  background-color: white;
  border-radius: 4px;
  min-width: 200px;
  flex-shrink: 0;
`;

const ProductImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 4px;
  margin-right: 10px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ProductName = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Price = styled.span`
  font-size: 16px;
  color: #555;
  margin-right: 5px;
`;

export default Checkout;
