import React from 'react';

export default function Contact() {
  return (
    <div className="mx-auto" style={{maxWidth: 720}}>
      <h2>Contact Us</h2>
      <p className="text-muted">We'd love to hear from you. Reach us at support@example.com</p>
      <div className="ratio ratio-16x9">
        <iframe
          title="Map"
          src="https://www.openstreetmap.org/export/embed.html?bbox=72.80%2C18.90%2C72.90%2C19.00&amp;layer=mapnik"
          allowFullScreen
        />
      </div>
    </div>
  );
}
