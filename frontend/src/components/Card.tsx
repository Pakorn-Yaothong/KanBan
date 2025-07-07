import React from 'react';

export default function Card({ card }: any) {
  return (
    <div className="bg-bg rounded p-3 mb-3 shadow-md hover:shadow-xl transition">
      <p className="font-medium">{card.title}</p>
    </div>
  );
}
