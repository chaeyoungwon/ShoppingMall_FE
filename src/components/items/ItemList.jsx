import React from "react";
import styled from "styled-components";

const ItemContainer = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const ItemList = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <ItemContainer key={item.id}>
          <h3>{item.item_name}</h3>
          <p> ID: {item.id}</p>
          <p>Price: {item.item_price}</p>
          <p>Quantity: {item.stock_quantity}</p>
        </ItemContainer>
      ))}
    </div>
  );
};

export default ItemList;
