export default function ProductCard({ product }) {
  if (!product) {
    throw new Error("Product not found!");
  }

  return (
    <div className="card p-3 m-2">
      <h4>{product.name}</h4>
      <p>Price: ${product.price}</p>
    </div>
  );
}
