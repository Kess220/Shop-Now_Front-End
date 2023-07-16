import React, { useState } from 'react';
import styled from 'styled-components';

const CheckoutForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para processar o formulário e fazer o checkout
    console.log('Formulário submetido!');
    // Reiniciar os campos do formulário
    setName('');
    setEmail('');
    setAddress('');
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
  };

  return (
    <CenteredContainer>
      <FormWrapper onSubmit={handleSubmit}>
        <InputLabel>
          Nome completo:
          <InputField
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputLabel>

        <InputLabel>
          Email:
          <InputField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputLabel>

        <InputLabel>
          Endereço:
          <InputField
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </InputLabel>

        <InputLabel>
          Número do cartão:
          <InputField
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </InputLabel>

        <InputLabel>
          Data de validade:
          <InputField
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </InputLabel>

        <InputLabel>
          CVV:
          <InputField
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
        </InputLabel>

        <SubmitButton type="submit">Finalizar compra</SubmitButton>
      </FormWrapper>
    </CenteredContainer>
  );
};

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  font-size: 14px;
  color: #333;
`;

const InputField = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  margin-top: 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export default CheckoutForm;
