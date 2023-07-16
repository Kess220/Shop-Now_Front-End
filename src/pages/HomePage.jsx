import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiExit } from "react-icons/bi";
import { RiShoppingCartLine } from "react-icons/ri";
import { BsInfoCircle } from "react-icons/bs";

import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "/store.png";
import ProductCard from "../components/ProductCard";
import { useTransition, animated } from "react-spring";

export default function HomePage() {
  const [userName, setUserName] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [logoClicked, setLogoClicked] = useState(false);
  const [products, setProducts] = useState([]);

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
  const profileImageUrl =
    "https://ogimg.infoglobo.com.br/in/25339584-79f-886/FT1086A/laika-labradora-praia.jpg";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/nome`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        const { nome } = response.data;
        setUserName(nome);
      } catch (error) {
        console.error("Erro ao obter o nome do usuário:", error);
      }
    };

    fetchUserName();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}produtos`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        const productsData = response.data || [];
        setProducts(productsData);
      } catch (error) {
        console.error("Erro ao obter os produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Shop Now</h1>
        <LogoContainer onClick={handleLogoClick} logoClicked={logoClicked}>
          <LogoImage src={Logo} alt="Logo" />
        </LogoContainer>
      </Header>

      <ProductContainer>
        {products.map((product) => (
          <ProductCard key={product._id.$oid} product={product} />
        ))}
      </ProductContainer>

      {showOptions && <Overlay onClick={handleOutsideClick} />}

      <OptionsContainer show={showOptions}>
        <ProfileContainer style={{ marginBottom: "16px" }}>
          <ProfileImageContainer>
            <ProfileImage src={profileImageUrl} alt="Profile" />
          </ProfileImageContainer>
        </ProfileContainer>
        <OptionIconContainer>
          <OptionIcon>
            <RiShoppingCartLine />
          </OptionIcon>
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
    </HomeContainer>
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

const HomeContainer = styled.div`
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

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-around;
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
