import React, { useState, useEffect } from "react";

import styled from "styled-components";
import CartItem from "../components/CartItem";
import axios from "axios";
import Logo from "/store.png";
import { BiExit } from "react-icons/bi";
import { RiShoppingCartLine } from "react-icons/ri";
import { BsInfoCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [showOptions, setShowOptions] = useState(false);
  const [logoClicked, setLogoClicked] = useState(false);
  const [userImage, setUserImage] = useState("");
  const userId = localStorage.getItem("userId") || "";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}profile/${userId}`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        const { image } = response.data;
        setUserImage(image);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleLogoClick = () => {
    setShowOptions(!showOptions);
    setLogoClicked(!logoClicked);
  };

  const handleOutsideClick = () => {
    if (showOptions) {
      setShowOptions(false);
      setLogoClicked(false);
    }
  };

  return (
    <PageContainer>
      <Header>
        <h1>Shop Now</h1>
        <LogoContainer onClick={handleLogoClick} logoClicked={logoClicked}>
          <LogoImage src={Logo} alt="Logo" />
        </LogoContainer>
      </Header>
      <CartItenContainer>
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
      </CartItenContainer>
      <CartSummary>
        <CleanCartButton>Esvaziar carrinho</CleanCartButton>
        <TotalPrice>Total: $500</TotalPrice>
        <CheckoutButton>Finalizar Compra</CheckoutButton>
      </CartSummary>

      {showOptions && <Overlay onClick={handleOutsideClick} />}

      <OptionsContainer show={showOptions}>
        <ProfileContainer style={{ marginBottom: "16px" }}>
          <ProfileImageContainer>
            <Link to="/profile">
              <ProfileImage src={userImage} alt="Profile" />
            </Link>
          </ProfileImageContainer>
        </ProfileContainer>
        <OptionIconContainer>
          <Link to="/cart">
            <OptionIcon>
              <RiShoppingCartLine />
            </OptionIcon>
          </Link>
        </OptionIconContainer>
        <OptionIconContainer>
          <OptionIcon>
            <BiExit />
          </OptionIcon>
        </OptionIconContainer>
        <OptionIconContainer>
          <OptionIcon>
            <BsInfoCircle />
          </OptionIcon>
        </OptionIconContainer>
      </OptionsContainer>
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

const LogoContainer = styled.div`
  cursor: pointer;
  transform: ${(props) => (props.logoClicked ? "scale(1.1)" : "none")};
  transition: transform 0.3s ease;

  &:active {
    transform: scale(1.2);
  }
`;

const LogoImage = styled.img`
  width: 80px;
  height: 80px;
  &:hover {
    transform: scale(1.1);
  }
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

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;
`;

const OptionsContainer = styled.div`
  position: fixed;
  top: 0;
  left: ${(props) => (props.show ? "0" : "-100%")};
  height: 100vh;
  width: 60px;
  background-color: #432682;
  border-radius: 0 4px 4px 0;
  padding: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease, background-color 0.3s ease;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OptionIconContainer = styled.div`
  margin-bottom: 26px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const OptionIcon = styled.span`
  color: white;
  font-size: 24px;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
`;

const ProfileImageContainer = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
