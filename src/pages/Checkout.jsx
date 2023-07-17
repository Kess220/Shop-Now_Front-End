import React, { useState } from 'react';
import styled from 'styled-components';
import gifAnimation from '../assets/W0zfpCnqF0.gif';
import { useLocation } from 'react-router-dom';
import { IonIcon } from "@ionic/react";
import { addOutline, removeOutline } from "ionicons/icons";

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
  const [quantity, setQuantity] = useState(0);
  const location = useLocation();
  const selectedProduct = location.state?.product;
  console.log(selectedProduct);

  const handleCheckout = () => {
    if (validateInputs()) {
      setIsCheckoutComplete(true);
      sendEmail(name, address, city, zip, quantity);
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  };

  const sendEmail = (name, address, city, zip) => {
    console.log('Enviando email:', name, address, city, zip);
  };

  const validateInputs = () => {
    return name !== '' && address !== '' && city !== '' && zip !== '';
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
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
          <CompletedSubtitle>Confirme no seu Email</CompletedSubtitle>
        </CompletedContainer>
      ) : (
        <>
          <Title>Checkout</Title>
          {selectedProduct && (
            <>
              <HomeContainer>
                <ProductContainer>
                  <ProductImage src={selectedProduct.imgs[0]} alt="foto" />
                  <ProductInfo>
                    <ProductName>{selectedProduct.modelo}</ProductName>
                    <PriceContainer>
                      <Price>${selectedProduct.preco}</Price>
                    </PriceContainer>
                  </ProductInfo>
                  <QuantityContainer>
                    <QuantityButton onClick={handleDecreaseQuantity}>
                      <IonIcon icon={removeOutline} />
                    </QuantityButton>
                    <span>{quantity}</span>
                    <QuantityButton onClick={handleIncreaseQuantity}>
                      <IonIcon icon={addOutline} />
                    </QuantityButton>
                  </QuantityContainer>
                </ProductContainer>
              </HomeContainer>
            </>
          )}
          <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
          <Input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
          <Input type="text" placeholder="Zip" value={zip} onChange={(e) => setZip(e.target.value)} required />
          <Button onClick={handleCheckout}>Finalizar a Compra</Button>
        </>
      )}
    </Container>
  );
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

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

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  width: 24px;
  height: 24px;
  background-color: #ccc;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  margin: 0 5px;
`;

export default Checkout;
