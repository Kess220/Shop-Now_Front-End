import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { trashOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import axios from "axios";

const CartItem = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  onUpdateTotal,
}) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}itens/${userId}`
      );
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    setCartItems([item]);
  }, [item]);

  const handleIncrease = async () => {
    try {
      const userId = localStorage.getItem("userId");
      await axios.put(
        `${import.meta.env.VITE_API_URL}itens/${
          item.id_item
        }/aumentar-quantidade`,
        { userId }
      );

      item.quantidade++;
      onUpdateTotal();
      fetchData();
    } catch (error) {
      console.error("Erro ao aumentar a quantidade:", error);
    }
  };

  const handleDecrease = async () => {
    if (item.quantidade > 1) {
      try {
        const userId = localStorage.getItem("userId");
        await axios.put(
          `${import.meta.env.VITE_API_URL}itens/${
            item.id_item
          }/diminuir-quantidade`,
          { userId }
        );

        item.quantidade--;
        onUpdateTotal();
        fetchData();
      } catch (error) {
        console.error("Erro ao diminuir a quantidade:", error);
      }
    }
  };

  const handleRemove = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const itemId = item.id_item;
      await axios.delete(`${import.meta.env.VITE_API_URL}itens`, {
        data: { userId, itemId },
      });

      onRemove(item.id_item);
      onUpdateTotal();
    } catch (error) {
      console.error("Erro ao remover o item:", error);
    }
  };

  return (
    <HomeContainer>
      <ProductContainer>
        <ProductImage src={item.imgs[0]} alt="foto" />
        <ProductInfo>
          <ProductName>{item.modelo}</ProductName>
          <PriceContainer>
            <Price>${item.preco}</Price>
          </PriceContainer>
        </ProductInfo>
        <QuantityContainer>
          <QuantityButton onClick={handleDecrease}>-</QuantityButton>
          <span>{item.quantidade}</span>
          <QuantityButton onClick={handleIncrease}>+</QuantityButton>
        </QuantityContainer>
        <DeleteButton onClick={handleRemove}>
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
