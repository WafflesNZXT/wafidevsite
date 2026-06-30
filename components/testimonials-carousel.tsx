"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { testimonials } from "@/lib/site-data";

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => setIndex((current) => (current + 1) % testimonials.length), 6500);
    return () => window.clearInterval(interval);
  }, []);

  function move(direction: -1 | 1) {
    setIndex((current) => (current + direction + testimonials.length) % testimonials.length);
  }

  return (
    <div className="testimonials-carousel">
      <div className="testimonials-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {testimonials.map((testimonial) => (
          <article className="testimonial testimonial-card" key={testimonial.author}>
            <div className="stars" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }, (_, starIndex) => <Star fill="currentColor" aria-hidden="true" key={starIndex} />)}
            </div>
            <blockquote className="testimonial-text">&ldquo;{testimonial.quote}&rdquo;</blockquote>
            <div className="testimonial-author"><span>{testimonial.author}</span></div>
          </article>
        ))}
      </div>
      <div className="testimonial-controls">
        <button className="testimonial-arrow" type="button" aria-label="Previous testimonial" onClick={() => move(-1)}><ChevronLeft aria-hidden="true" /></button>
        <button className="testimonial-arrow" type="button" aria-label="Next testimonial" onClick={() => move(1)}><ChevronRight aria-hidden="true" /></button>
      </div>
    </div>
  );
}
