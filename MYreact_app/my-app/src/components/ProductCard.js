import React from "react";

const ProductCard = ({ title, price, discount }) => {
  const finalPrice = price - discount;

  return (
    <div style={{ border: "1px solid black", padding: 20, marginBottom: 10 }}>
      <h3>{title}</h3>
      <p>Price: ₹{price}</p>
      <p>Discount: ₹{discount}</p>
      <h4>Final Price: ₹{finalPrice}</h4>
    </div>
  );
};

export default ProductCard;
