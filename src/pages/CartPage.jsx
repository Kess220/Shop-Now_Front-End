
import React from "react";
import styled from "styled-components";
import CartItem from "../components/CartItem";
import Logo from "/store.png";
import axios from "axios";
import { func } from "prop-types";

export default function CartPage() {

  // adicionar item no carrinho

  // const addItemToCart = async () => {
  //   try {
  //     const item = {
  //       modelo: product.modelo,
  //       marca: product.marca,
  //       preco: product.preco,
  //       imgs: product.imgs,
  //       itemId: product._id,
  //       quantidade: 1,
  //     };
  //     await axios.post('/itens', item);
  //     console.log('Item adicionado ao carrinho com sucesso!');
  //   } catch (err) {
  //     console.error('Erro ao adicionar item ao carrinho:', err);
  //   }
  // };

  // onClick = { addItemToCart }



 





  //limpar carrinho
  const clearCart = async () => {
    try {
      await axios.delete('/itens')
      console.log('Carrinho esvaziado com sucesso!');
    } catch (err) {
      console.error('Erro ao esvaziar o carrinho:', err);
    }
  }

  return (
    <PageContainer>
      <Header>
        <h1>Shop Now</h1>
        <LogoImage src={Logo} alt="Logo" />
      </Header>
      <CartItenContainer>
        <CartItem />
      </CartItenContainer>
      <CartSummary>
        <CleanCartButton onClick={clearCart}>Esvaziar carrinho</CleanCartButton>
        <TotalPrice>Total: $500</TotalPrice>
        <CheckoutButton >Finalizar Compra</CheckoutButton>
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
  border-radius: 0 0 4px 4px ;
  margin-top: 15px;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;