"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const clients = [
  { name: "Inobex", image: "/images/inobexlogo.png", className: "has-caption" },
  { name: "Shine Labs", image: "/images/shinelabslogo.png", className: "inverse-bg" },
  { name: "Merclay", image: "/images/merclay logo.jpg", className: "framed-logo" },
  { name: "Zyka", image: "/images/zykalogo.jpg", className: "framed-logo" },
  { name: "Audo", image: "/images/audo-logo-white.png", className: "framed-logo audo-logo" },
  { name: "Tutorly", image: "/images/tutorly-logo.png", className: "framed-logo" },
] as const;

export function ClientsCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => setIndex((current) => (current + 1) % clients.length), 4200);
    return () => window.clearInterval(interval);
  }, []);

  function move(direction: -1 | 1) {
    setIndex((current) => (current + direction + clients.length) % clients.length);
  }

  return (
    <div className="carousel-container client-carousel-shell" role="region" aria-label="Client logos" aria-live="polite">
      <div className="clients-carousel" style={{ transform: `translateX(-${index * 100}%)` }} aria-roledescription="carousel">
        {clients.map((client, clientIndex) => (
          <div className="client-slide" role="group" aria-label={`Slide ${clientIndex + 1} of ${clients.length}`} key={client.name}>
            <div className={`client-logo-box ${client.className}`}>
              <Image src={client.image} alt={`${client.name} logo`} width={320} height={320} sizes="280px" />
              {client.name === "Inobex" ? <div className="client-caption">Inobex</div> : null}
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-arrow client-prev" type="button" aria-label="Previous client" onClick={() => move(-1)}>
        <ChevronLeft aria-hidden="true" />
      </button>
      <button className="carousel-arrow client-next" type="button" aria-label="Next client" onClick={() => move(1)}>
        <ChevronRight aria-hidden="true" />
      </button>
      <div className="carousel-indicators" aria-label="Choose client">
        {clients.map((client, clientIndex) => (
          <button
            className={`client-indicator ${index === clientIndex ? "active" : ""}`}
            type="button"
            aria-label={`Go to client ${clientIndex + 1}`}
            aria-current={index === clientIndex ? "true" : undefined}
            onClick={() => setIndex(clientIndex)}
            key={client.name}
          />
        ))}
      </div>
    </div>
  );
}
