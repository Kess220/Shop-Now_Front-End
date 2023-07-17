import React from "react";
import styled from "styled-components";
import { trashOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

const CartItem = ({ item }) => {
  console.log("item:", item);

  return (
    <HomeContainer>
      <ProductContainer>
        <ProductImage src={item.imgs} alt="foto" />
        <ProductInfo>
          <ProductName>{item.modelo}</ProductName>
          <PriceContainer>
            <Price>${item.preco}</Price>
          </PriceContainer>
        </ProductInfo>
        <QuantityContainer>
          <QuantityButton>-</QuantityButton>
          <span>{item.quantidade}</span>
          <QuantityButton>+</QuantityButton>
        </QuantityContainer>
        <DeleteButton>
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
