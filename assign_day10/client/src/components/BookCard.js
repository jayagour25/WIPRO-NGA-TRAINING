export default function BookCard({ title, author, price, view }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        margin: "10px",
        width: view === "grid" ? "200px" : "100%",
        display: "flex",
        flexDirection: view === "grid" ? "column" : "row",
        justifyContent: "space-between",
      }}
    >
      <h3>{title}</h3>
      <p>Author: {author}</p>
      <p>Price: ₹{price}</p>
    </div>
  );
}
