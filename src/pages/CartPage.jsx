import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiExit } from "react-icons/bi";
import { RiShoppingCartLine } from "react-icons/ri";
import { BsInfoCircle } from "react-icons/bs";

import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "/store.png";
import CartItem from "../components/CartItem"; // Componente para exibir os itens do carrinho
import { useTransition, animated } from "react-spring";

export default function CartPage() {
  const [userName, setUserName] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [logoClicked, setLogoClicked] = useState(false);
  const [cartItems, setCartItems] = useState([]); // Itens do carrinho
  const [userImage, setUserImage] = useState("");
  const userId = localStorage.getItem("userId") || "";

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

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

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

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}itens/${userId}`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        const cartItemsData = response.data || [];
        setCartItems(cartItemsData);
        console.log(cartItemsData);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleRemoveFromCart = (itemId) => {
    // Lógica para remover item do carrinho
    console.log("Item removido do carrinho:", itemId);
  };

  return (
    <CartContainer>
      <Header>
        <h1 data-test="user-name">Shop Now</h1>
        <LogoContainer onClick={handleLogoClick} logoClicked={logoClicked}>
          <LogoImage src={Logo} alt="Logo" />
        </LogoContainer>
      </Header>

      <CartItemsContainer>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemoveFromCart={handleRemoveFromCart}
          />
        ))}
      </CartItemsContainer>

      {showOptions && <Overlay onClick={handleOutsideClick} />}

      <OptionsContainer show={showOptions}>
        <ProfileContainer style={{ marginBottom: "16px" }}>
          <ProfileImageContainer>
            <Link to="/home">
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

        <OptionIconContainer onClick={handleLogout}>
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
    </CartContainer>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;
`;

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
  overflow: auto;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.795);
    opacity: ${(props) => (props.showOptions ? 1 : 0)};
    pointer-events: ${(props) => (props.showOptions ? "auto" : "none")};
    transition: opacity 0.3s ease;
  }
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

const CartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  margin-top: 20px;
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
