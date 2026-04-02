"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

interface CategoryData {
  category: string;
  title: string;
  src: string;
  href: string;
  content: React.ReactNode;
}

export function CategoriesCarousel({
  availableCount,
  soldCount,
  stonesCount,
  watchesCount,
  partsCount,
}: {
  availableCount: number;
  soldCount: number;
  stonesCount: number;
  watchesCount: number;
  partsCount: number;
}) {
  const data: CategoryData[] = [
    {
      category: `${availableCount} items`,
      title: "Available Now",
      src: "/available.png",
      href: "/available",
      content: null,
    },
    {
      category: `${stonesCount} items`,
      title: "Stones & Amber",
      src: "/amber.png",
      href: "/stones",
      content: null,
    },
    {
      category: `${watchesCount} items`,
      title: "Vintage Watches",
      src: "/omega.png",
      href: "/watches",
      content: null,
    },
    {
      category: `${partsCount} items`,
      title: "Watch Parts",
      src: "/parts.png",
      href: "/parts",
      content: null,
    },
    {
      category: `${soldCount} items`,
      title: "Previously Sold",
      src: "/soldout.png",
      href: "/sold",
      content: null,
    },
  ];

  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return <Carousel items={cards} />;
}
