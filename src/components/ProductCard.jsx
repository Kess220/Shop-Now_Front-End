import React, { useState } from "react";
import styled from "styled-components";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: isModalOpen ? 1 : 0 },
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.imgs.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.imgs.length - 1 : prevIndex - 1
    );
  };

  return (
    <Card>
      <ImageContainer onClick={openModal}>
        <ProductImage src={product.imgs[0]} alt={product.modelo} />
      </ImageContainer>
      <CardContent>
        <ProductName>{product.modelo}</ProductName>
        <ProductPrice>R$ {product.preco}</ProductPrice>
        <ActionButtons>
          <AddToCartButton>Adicionar ao Carrinho</AddToCartButton>
          <BuyNowButton>
            <Link to="/checkout">Comprar Agora</Link>
          </BuyNowButton>
        </ActionButtons>
      </CardContent>
      {isModalOpen && (
        <Modal onClick={closeModal}>
          <animated.div style={fade}>
            <ModalContent>
              <ModalImage
                src={product.imgs[currentImageIndex]}
                alt={product.modelo}
              />
              <ModalDetails>
                <LeftArrow onClick={handlePrevImage}>
                  <FiChevronLeft />
                </LeftArrow>
                <RightArrow onClick={handleNextImage}>
                  <FiChevronRight />
                </RightArrow>
                <ProductName>{product.modelo}</ProductName>
                <ProductPrice>R$ {product.preco}</ProductPrice>
                <ActionButtons>
                  <AddToCartButton>Adicionar ao Carrinho</AddToCartButton>
                  <BuyNowButton>
                    <Link to="/checkout">Comprar Agora</Link>
                  </BuyNowButton>
                </ActionButtons>
              </ModalDetails>
            </ModalContent>
          </animated.div>
        </Modal>
      )}
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
  width: 100%;
  max-width: 300px;
  margin-bottom: 16px;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  cursor: pointer;
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

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;

const AddToCartButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #fff;
  border: none;
  color: #000;
  font-size: 14px;
  cursor: pointer;
`;

const BuyNowButton = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
`;

const Modal = styled.div`
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

const ModalContent = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 16px;
  max-width: 500px;
  width: 320px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -60px;
  right: 8px;
  background-color: transparent;
  border: none;
  color: #000;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
  margin-bottom: 16px;
`;

const ModalDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LeftArrow = styled.div`
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
  font-size: 24px;
  color: #000;
  cursor: pointer;
`;

const RightArrow = styled.div`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  font-size: 24px;
  color: #000;
  cursor: pointer;
`;

export default ProductCard;
