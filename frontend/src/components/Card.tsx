import React from "react";
import "../styles/Card.css";

export default function Card({ card }: any) {
  return (
    <div className="card-container">
      <p className="card-title">{card.title}</p>
    </div>
  );
}
