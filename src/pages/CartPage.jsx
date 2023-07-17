import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Logo from "/store.png";
import CartItem from "../components/CartItem";
import PurchaseSuccessAnimation from "../components/PurchaseSuccessAnimation";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const userId = localStorage.getItem("userId");
  const userEmail = localStorage.getItem("userEmail");

  const quantity = cartItems.length;
  const [isCheckoutComplete, setIsCheckoutComplete] = useState(false);

  const userName = localStorage.getItem("userName");
  useEffect(() => {
    fetchData();
  }, []);

  const SendEmail = async (userEmail, userName, quantity, selectedProduct) => {
    // Acesso aos dados dos produtos
    const purchaseData = JSON.parse(localStorage.getItem("purchaseData"));
    const purchasedItems = purchaseData.purchasedItems;

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}send-email`, {
        cliente: userName,
        produtos: purchasedItems.map((item) => ({
          modelo: item.modelo,
          preco: item.preco,
          quantidade: item.quantidade,
        })),
        total: purchaseData.totalPrice,
        destinatario: userEmail,
      });
      console.log("E-mail enviado com sucesso para", userEmail, userName);
      console.log(item.modelo, item.preco, item.quantidade, purchaseData.total);
    } catch (error) {
      console.error("Erro ao enviar o e-mail:", error);
    }
  };

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
      setCartItems([]);
      updateTotalPrice();
    } catch (err) {
      console.error("Erro ao esvaziar o carrinho:", err);
    }
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = cartItems.filter((item) => item.id_item !== itemId);
    setCartItems(updatedItems);
    updateTotalPrice();
  };

  const getTotalPrice = () => {
    const total = cartItems.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
    return total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const updateTotalPrice = () => {
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
    setTotalPrice(totalPrice);
  };

  const handleCheckout = () => {
    setShowConfirmation(true);
  };

  const handleConfirmCheckout = () => {
    // Lógica para confirmar a compra
    console.log("Compra confirmada!");

    // Salvar dados dos produtos e preço total no localStorage
    const purchasedItems = [...cartItems];
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
    const selectedProduct = purchasedItems[0]; // Aqui estou considerando apenas o primeiro item do carrinho

    const purchaseData = {
      purchasedItems,
      totalPrice,
    };

    localStorage.setItem("purchaseData", JSON.stringify(purchaseData));
    console.log("Dados da compra salvos no localStorage:", purchaseData);
    
    // Restaurar o estado inicial e redirecionar para a página de sucesso
    setCartItems([]);
    setTotalPrice(0);
    setShowConfirmation(false);
    setIsCheckoutComplete(true);
    SendEmail(userEmail, userName, quantity, selectedProduct);
    clearCart();
  };

  const handleCancelCheckout = () => {
    setShowConfirmation(false);
  };

  const [totalPrice, setTotalPrice] = useState(0);

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
            onUpdateTotal={updateTotalPrice}
          />
        ))}
      </CartItenContainer>
      {!isCheckoutComplete && (
        <CartSummary>
          <CleanCartButton onClick={clearCart}>
            Esvaziar carrinho
          </CleanCartButton>
          <TotalPrice>Total: {getTotalPrice()}</TotalPrice>
          <CheckoutButton onClick={handleCheckout}>
            Finalizar Compra
          </CheckoutButton>
        </CartSummary>
      )}
      {showConfirmation && (
        <ConfirmationOverlay>
          <ConfirmationDialog>
            <ConfirmationMessage>
              Deseja confirmar a compra?
            </ConfirmationMessage>
            <ConfirmationButtons>
              <ConfirmationButton onClick={handleConfirmCheckout}>
                Confirmar
              </ConfirmationButton>
              <ConfirmationButton onClick={handleCancelCheckout}>
                Cancelar
              </ConfirmationButton>
            </ConfirmationButtons>
          </ConfirmationDialog>
        </ConfirmationOverlay>
      )}
      {isCheckoutComplete && (
        <PurchaseSuccessContainer>
          <PurchaseSuccessAnimation />
        </PurchaseSuccessContainer>
      )}
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

const ConfirmationOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ConfirmationDialog = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
`;

const ConfirmationMessage = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

const ConfirmationButtons = styled.div`
  display: flex;
  justify-content: center;
`;

const ConfirmationButton = styled.button`
  background-color: #614e93;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 16px;
  cursor: pointer;
`;

const PurchaseSuccessContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
