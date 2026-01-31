import React from "react";
import "./index.css";

const testimonials = [
  {
    text: "This app finally helped me understand where my money goes!",
    name: "Alex R.",
  },
  {
    text: "Budgeting has never been this simple.",
    name: "Priya M.",
  },
  {
    text: "I saved more in 3 months than in the last year.",
    name: "Daniel K.",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <h2 className="testimonials-title">What Users Say</h2>

        <div className="testimonials-grid">
          {testimonials.map((item, index) => (
            <div className="testimonial-card" key={index}>
              <div className="quote-icon">“</div>
              <p className="testimonial-text">{item.text}</p>
              <h4 className="testimonial-name">— {item.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
