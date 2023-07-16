import React from "react";
import styled from "styled-components";
import  {trashOutline}  from 'ionicons/icons';
import  {IonIcon} from '@ionic/react';


const CartItem = ({item}) => {
    return (
        <HomeContainer>
            <ProductContainer>
                <ProductImage src="https://imgs.extra.com.br/55014765/1xg.jpg" alt="foto" />
                <ProductInfo>
                    <ProductName>Samsung galaxy s20</ProductName>
                    <Price>$200</Price>
                </ProductInfo>

                <QuantityContainer>
                    <QuantityButton>-</QuantityButton>
                    <span>2</span>
                    <QuantityButton>+</QuantityButton>
                </QuantityContainer>

                <DeleteButton>
                    <IonIcon icon={trashOutline} />
                </DeleteButton>
            </ProductContainer>

        </HomeContainer >
    )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
  height: 80px;
  background-color: white;
  border-radius: 4px;
  align-items: center;
  position: relative;
  min-width: 200px;
  flex-shrink: 0; 
`;

const ProductImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 4px;
  margin-right: 10px;
  position: absolute;

`;

const ProductInfo = styled.div`
  max-width: 135px;
  position: absolute;
  right: 35%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ProductName = styled.h3`
  margin: 2.5px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const ProductDescription = styled.p`
  margin: 5px 0;
  font-size: 10px;
  color: #555;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right:10%;
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

const Price = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  width: 10%;
  border: none;
  color: #cc0000;
  cursor: pointer;
  font-size: 20px;
  position: absolute;
  right: 3%;
  
`;
export default CartItem;