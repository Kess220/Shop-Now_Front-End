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
  const [userName, setUserName] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [logoClicked, setLogoClicked] = useState(false);

  const handleLogoClick = () => {
    setShowOptions(!showOptions);
    setLogoClicked(!logoClicked);
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
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/transacoes`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        const transactionsData = response.data || [];
        setTransactions(transactionsData);

        let saldo = 0;
        transactionsData.forEach((transaction) => {
          if (transaction.tipo === "entrada") {
            saldo += parseFloat(
              transaction.valor.replace(/\./g, "").replace(",", ".")
            );
          } else if (transaction.tipo === "saida") {
            saldo -= parseFloat(
              transaction.valor.replace(/\./g, "").replace(",", ".")
            );
          }
        });

        const saldoFormatado = saldo.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

        setBalance(saldoFormatado);
      } catch (error) {
        console.error("Erro ao obter as transações:", error);
      }
    };

    fetchTransactions();
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
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductContainer>

      <OptionsContainer show={showOptions}>
        <OptionItem>
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
        <OptionItem>
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
`;

const OptionIcon = styled.span`
  margin-right: 8px;
  color: white;
  font-size: 16px;
`;
