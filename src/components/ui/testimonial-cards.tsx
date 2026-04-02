"use client";

import * as React from "react";
import { motion, PanInfo } from "framer-motion";

export interface Testimonial {
  id: number;
  testimonial: string;
  author: string;
}

interface TestimonialCardProps {
  handleShuffle: () => void;
  testimonial: string;
  position: string;
  id: number;
  author: string;
}

export function TestimonialCard({
  handleShuffle,
  testimonial,
  position,
  id,
  author,
}: TestimonialCardProps) {
  const isFront = position === "front";

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? 3 : position === "middle" ? 2 : position === "back" ? 1 : 0,
      }}
      animate={{
        rotate:
          position === "front"
            ? "-6deg"
            : position === "middle"
            ? "0deg"
            : "6deg",
        x:
          position === "front"
            ? "0%"
            : position === "middle"
            ? "33%"
            : "66%",
      }}
      drag={isFront}
      dragElastic={0.35}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragEnd={(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x < -150) {
          handleShuffle();
        }
      }}
      transition={{ duration: 0.35 }}
      className={`absolute left-0 top-0 grid h-[450px] w-[350px] select-none place-content-center space-y-6 rounded-2xl border-2 border-amber-700/40 bg-stone-800/60 p-6 shadow-xl backdrop-blur-md ${
        isFront ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      <img
        src={`https://i.pravatar.cc/128?img=${id}`}
        alt={`Avatar of ${author}`}
        className="pointer-events-none mx-auto h-24 w-24 rounded-full border-2 border-amber-600/50 bg-stone-700 object-cover"
      />
      <span className="text-center text-base italic text-stone-300 leading-relaxed">
        &ldquo;{testimonial}&rdquo;
      </span>
      <div className="text-center">
        <span className="text-sm font-semibold text-amber-400">{author}</span>
        <div className="flex justify-center gap-0.5 mt-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="text-xs text-stone-500 mt-1">Verified Tradera buyer</p>
      </div>
    </motion.div>
  );
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 12,
    testimonial:
      "Great communication and a pleasure to deal with. Highly recommended. 👍🏻",
    author: "Tudores",
  },
  {
    id: 25,
    testimonial: "Super smooth and shipped very quickly. No hassle.",
    author: "OskarHammar",
  },
  {
    id: 33,
    testimonial:
      "The product was very well packaged, fast and smooth delivery. Highly recommended!!",
    author: "Stintan68",
  },
  {
    id: 44,
    testimonial:
      "Exactly like the photos and description!! And super fast delivery too!! Fantastic!",
    author: "deheerdejong",
  },
];

export function ShuffleTestimonials() {
  const [order, setOrder] = React.useState([0, 1, 2, 3]);

  const handleShuffle = () => {
    setOrder((prev) => {
      const next = [...prev];
      next.push(next.shift()!);
      return next;
    });
  };

  const positions = ["front", "middle", "back", "stack"];

  return (
    <div className="relative -ml-[100px] h-[450px] w-[350px] md:-ml-[175px]">
      {order.map((testimonialIndex, positionIndex) => (
        <TestimonialCard
          key={TESTIMONIALS[testimonialIndex].id}
          {...TESTIMONIALS[testimonialIndex]}
          handleShuffle={handleShuffle}
          position={positions[positionIndex]}
        />
      ))}
    </div>
  );
}
