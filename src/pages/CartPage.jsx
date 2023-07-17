import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Logo from "/store.png";
import CartItem from "../components/CartItem";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}itens/${userId}`
      );
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}itens/${userId}`);
      console.log("Carrinho esvaziado com sucesso!");
      setCartItems([]); // Limpa os itens do carrinho no estado
    } catch (err) {
      console.error("Erro ao esvaziar o carrinho:", err);
    }
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = cartItems.filter((item) => item.id_item !== itemId);
    setCartItems(updatedItems);
  };

  const getTotalPrice = () => {
    const total = cartItems.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
    return total.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };
  

  return (
    <PageContainer>
      <Header>
        <h1>Shop Now</h1>
        <LogoImage src={Logo} alt="Logo" />
      </Header>
      <CartItenContainer>
        {cartItems.map((item) => (
          <CartItem
            key={item._id}
            item={item}
            onRemove={() => handleRemoveItem(item.id_item)}
          />
        ))}
      </CartItenContainer>
      <CartSummary>
        <CleanCartButton onClick={clearCart}>Esvaziar carrinho</CleanCartButton>
        <TotalPrice>Total: ${getTotalPrice()}</TotalPrice>
        <CheckoutButton>Finalizar Compra</CheckoutButton>
      </CartSummary>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
  justify-content: space-between;
  overflow: auto;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`;

const LogoImage = styled.img`
  width: 80px;
  height: 80px;
`;

const CartItenContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  border-radius: 4px;
`;

const CleanCartButton = styled.button`
  color: #cc0000;
  background-color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
`;

const CartSummary = styled.div`
  display: flex;
  flex-direction: column;
  margin: calc(10px + 5px) 10px 10px;
  background-color: white;
  border-radius: 10px;
  align-items: center;
  justify-content: space-between;
`;

const TotalPrice = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const CheckoutButton = styled.button`
  background-color: #614e93;
  border-radius: 0 0 4px 4px;
  margin-top: 15px;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;
