import React, { useState } from 'react';
import DestinationCard from '../components/DestinationCard';

const featured = [
  { id: 1, title: 'Paris', image: 'https://picsum.photos/seed/paris-home/600/400' },
  { id: 2, title: 'Bali', image: 'https://picsum.photos/seed/bali-home/600/400' },
  { id: 3, title: 'Swiss Alps', image: 'https://picsum.photos/seed/swiss-home/600/400' },
];

export default function Home() {
  const [wishlist, setWishlist] = useState([]);
  const toggleWish = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  return (
    <div>
      <div className="py-4 text-center">
        <h2>Featured Destinations</h2>
        <p className="text-muted">Add places to your wishlist </p>
      </div>
      <div className="row g-4">
        {featured.map((d) => (
          <div className="col-12 col-sm-6 col-lg-4" key={d.id}>
            <DestinationCard
              title={d.title}
              image={d.image}
              wished={wishlist.includes(d.id)}
              onAdd={() => toggleWish(d.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
