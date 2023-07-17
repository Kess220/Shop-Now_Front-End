import React from "react";
import styled from "styled-components";
import { trashOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

const CartItem = ({ product}) => {

  //aumentar 1 na quantidade
  const increaseQuantity = async () => {
    try {
      await axios.put(`/itens/${item._id}/aumentar-quantidade`);
      console.log('Quantidade do item aumentada com sucesso!');
    } catch (err) {
      console.error('Erro ao aumentar a quantidade do item:', err);
    }
  };

  //diminuir 1 na quantidade
  const decreaseQuantity = async () => {
    try {
      await axios.put(`/itens/${item._id}/diminuir-quantidade`);
      console.log('Quantidade do item diminuída com sucesso!');
    } catch (err) {
      console.error('Erro ao diminuir a quantidade do item:', err);
    }
  };

  //remover item
  const removeItem = async () => {
    try {
      await axios.delete(`/itens/${item._id}`); 
      console.log('Item removido com sucesso!');
    } catch (error) {
      console.error('Erro ao remover o item:', error);
    }
  };

  return (

    <HomeContainer>
      <ProductContainer>
        <ProductImage src={product.image[0]} alt={product.modelo} />
        <ProductInfo>
          <ProductName>{product.modelo}</ProductName>
          <PriceContainer>
            <Price>R$ {product.preco}</Price>
          </PriceContainer>
        </ProductInfo>
        <QuantityContainer>
          <QuantityButton onClick={decreaseQuantity}>-</QuantityButton>
          <span>{product.quantidade}</span>
          <QuantityButton onClick={increaseQuantity}>+</QuantityButton>
        </QuantityContainer>
        <DeleteButton onClick={removeItem}>
          <IonIcon icon={trashOutline} />
        </DeleteButton>
      </ProductContainer>
    </HomeContainer>
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

const DeleteButton = styled.button`
  background-color: transparent;
  width: 10%;
  border: none;
  color: #cc0000;
  cursor: pointer;
  font-size: 20px;
`;

export default CartItem;
