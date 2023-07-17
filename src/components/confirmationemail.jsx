import React from 'react';

const ConfirmationEmail = ({ cliente, produto, preco, quantidade, total }) => {
  return (
    <div className="container">
      <h1>Confirmação de Compra - ShopNow</h1>

      <p>Olá, {cliente}!</p>

      <p>Obrigado por comprar em nossa loja online. Seguem abaixo os detalhes da sua compra:</p>

      <div className="product-info">
        <h2>{produto}</h2>

        <p>
          <strong>Preço:</strong> R$ {preco}
        </p>
        <p>
          <strong>Quantidade:</strong> {quantidade}
        </p>
        <p>
          <strong>Total:</strong> R$ {total}
        </p>
      </div>

      <div className="footer">
        <p>Se você tiver alguma dúvida, entre em contato com nossa equipe de suporte.</p>
        <p>Atenciosamente, Equipe ShopNow</p>
      </div>
    </div>
  );
};

export default ConfirmationEmail;
