import React from "react";
import styled from "styled-components";

const ProductCard = ({ product }) => {
  return (
    <Card>
      <ImageContainer>
        <ProductImage src={product.image} alt={product.name} />
      </ImageContainer>
      <CardContent>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>R$ {product.price}</ProductPrice>
        <ProductDescription>{product.description}</ProductDescription>
      </CardContent>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  width: 127px;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

const CardContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  margin-bottom: 8px;
`;

const ProductDescription = styled.p`
  font-size: 14px;
`;

export default ProductCard;
