import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiExit } from "react-icons/bi";
import { RiShoppingCartLine } from "react-icons/ri";
import { BsPersonFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "/store.png";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const [showOptions, setShowOptions] = useState(false);

  const handleLogoClick = () => {
    setShowOptions(!showOptions);
  };

  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 29.99,
      image: Logo,
      description: "Lorem ipsum dolor sit amet...",
    },
    {
      id: 2,
      name: "Product 2",
      price: 19.99,
      image: Logo,
      description: "Lorem ipsum dolor sit amet...",
    },
    {
      id: 3,
      name: "Product 3",
      price: 39.99,
      image: Logo,
      description: "Lorem ipsum dolor sit amet...",
    },
    {
      id: 4,
      name: "Product 4",
      price: 24.99,
      image: Logo,
      description: "Lorem ipsum dolor sit amet...",
    },
    {
      id: 5,
      name: "Product 5",
      price: 14.99,
      image: Logo,
      description: "Lorem ipsum dolor sit amet...",
    },
    {
      id: 6,
      name: "Product 6",
      price: 49.99,
      image: Logo,
      description: "Lorem ipsum dolor sit amet...",
    },
    // Adicione mais produtos aqui
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);
  
  const handleCartClick = () => {
    navigate("/carrinho");
  };

  const handleLogout = async () => {
    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
  
      await axios.post(
        `${import.meta.env.VITE_API_URL}logout`,
        { token: localStorage.getItem("token") },
        config
      );
  
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };
  
  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Shop Now</h1>
        <LogoContainer onClick={handleLogoClick}>
          <LogoImage src={Logo} alt="Logo" />
        </LogoContainer>
      </Header>

      <ProductContainer>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductContainer>

      <OptionsContainer show={showOptions}>
        <OptionItem onClick={handleCartClick}>
          <OptionIcon>
            <RiShoppingCartLine />
          </OptionIcon>
          Carrinho
        </OptionItem>
        <OptionItem>
          <OptionIcon>
            <BsPersonFill />
          </OptionIcon>
          Perfil
        </OptionItem>
        <OptionItem onClick={handleLogout}>
          <OptionIcon>
            <BiExit />
          </OptionIcon>
          Logout
        </OptionItem>
      </OptionsContainer>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
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

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-around;
`;

const LogoContainer = styled.div`
  cursor: pointer;
`;

const LogoImage = styled.img`
  width: 80px;
  height: 80px;
`;

const OptionsContainer = styled.div`
  position: fixed;
  top: 0;
  left: ${(props) => (props.show ? "0" : "-100%")};
  height: 100vh;
  width: 200px;
  background-color: #7a6bbc;
  border-radius: 0 4px 4px 0;
  padding: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease;
  z-index: 1;
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  cursor: pointer;
`;

const OptionIcon = styled.span`
  margin-right: 8px;
  color: white;
  font-size: 16px;
`;
