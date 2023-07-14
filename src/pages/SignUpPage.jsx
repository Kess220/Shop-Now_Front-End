import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import Logo from "/store.png";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}sign-up`, {
        name,
        email,
        password,
      });

      // Redirecionar o usuário para a página de login
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("Este email já está sendo utilizado.");
      } else {
        console.error("Erro ao cadastrar usuário:", error);
        alert(
          "Erro ao cadastrar usuário. Verifique os campos e tente novamente."
        );
      }
    }
  };

  return (
    <SignUpContainer>
      <LogoImage src={Logo} alt="Logo" />
      <form onSubmit={handleSignUpSubmit}>
        <input
          placeholder="Nome"
          data-test="name"
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        <input
          placeholder="E-mail"
          type="email"
          data-test="email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          placeholder="Senha"
          data-test="password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input
          placeholder="Confirme a senha"
          data-test="conf-password"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <StyledButton data-test="sign-up-submit" type="submit">
          Cadastrar
        </StyledButton>
      </form>

      <Link to="/">Já tem uma conta? Entre agora!</Link>
    </SignUpContainer>
  );
}

const SignUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.button`
  background-color: #614e93;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
`;

const LogoImage = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
`;
