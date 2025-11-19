import React, { useState } from "react";
import DestinationCard from "../components/DestinationCard";
import "./Home.css";

const featured = [
  { id: 1, title: "Paris", image: "https://picsum.photos/seed/paris-home/600/400" },
  { id: 2, title: "Bali", image: "https://picsum.photos/seed/bali-home/600/400" },
  { id: 3, title: "Swiss Alps", image: "https://picsum.photos/seed/swiss-home/600/400" }
];

export default function Home() {
  const [wishlist, setWishlist] = useState([]);

  const toggleWish = (id) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <section className="hero">
        <h1>Explore The World</h1>
        <p>Your dream vacation is just a click away.</p>
        <button className="btn-primary-custom">Get Started</button>
      </section>

      <section className="container">
        <h2 className="text-center mb-3">Featured Destinations</h2>
        <div className="grid">
          {featured.map(d => (
            <DestinationCard
              key={d.id}
              title={d.title}
              image={d.image}
              wished={wishlist.includes(d.id)}
              onAdd={() => toggleWish(d.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
