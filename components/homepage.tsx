"use client";
//@ts-nocheck
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Slides data
const slides = [
  {
    image: "/images/slide1.jpg",
    title: "WELCOME TO SPORTWAVE",
    buttonText: "Get Started",
    buttonLink: "/services",
  },
  {
    image: "/images/slide2.jpg",
    title: "Find Players, Teams, and Events At Sportwave",
    buttonText: "Learn More",
    buttonLink: "/about",
  },
  {
    image: "/images/slide3.jpg",
    title: "Join or Create a Team",
    buttonText: "Learn More",
    buttonLink: "/about",
  },
  {
    image: "/images/slide4.jpg",
    title: "Discover or Host Events",
    buttonText: "Learn More",
    buttonLink: "/about",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isThrottled, setIsThrottled] = useState(false); // prevent spam scroll

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Preload images
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  // Handle scroll to change slides
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (isThrottled) return;

      if (e.deltaY > 0) {
        // Scroll down → next slide
        setCurrent((prev) => (prev + 1) % slides.length);
      } else if (e.deltaY < 0) {
        // Scroll up → previous slide
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
      }

      setIsThrottled(true);
      setTimeout(() => setIsThrottled(false), 3000); // throttle 1s
    };

    window.addEventListener("wheel", handleScroll, { passive: true });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [isThrottled]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background slideshow */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slides[current].image}
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[current].image})` }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40" />

      {/* Text + Button */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full px-12 md:px-24">
        <motion.h1
          key={slides[current].title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold text-white max-w-3xl"
        >
          {slides[current].title}
        </motion.h1>

        <motion.div
          key={slides[current].buttonText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-8"
        >
          <Link
            href={slides[current].buttonLink}
            className="px-6 py-3 text-lg font-semibold rounded-full bg-white text-black hover:bg-gray-200 active:scale-95 transition"
          >
            {slides[current].buttonText}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
