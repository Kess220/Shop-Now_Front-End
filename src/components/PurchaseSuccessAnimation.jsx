import React from "react";
import styled from "styled-components";
import gifAnimation from "../assets/W0zfpCnqF0.gif";

const Container = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 8px;
`;

const Image = styled.img`
  width: 30%;
  height: 30%;
`;

const Title = styled.h1`
  color: green;
  text-align: center;
`;

const Subtitle = styled.h2`
  color: gray;
  text-align: center;
`;

const PurchaseSuccessAnimation = () => {
  return (
    <Container>
      <Image src={gifAnimation} alt="Animation" />
      <Title>Compra Realizada</Title>
      <Subtitle>Confirme no seu Email</Subtitle>
    </Container>
  );
};

export default PurchaseSuccessAnimation;
