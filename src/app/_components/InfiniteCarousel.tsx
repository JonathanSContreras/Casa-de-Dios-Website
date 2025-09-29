"use client";

import React, { useEffect, useRef, useState } from "react";

const InfiniteCarousel = ({
  images = [],
  speed = 1,
  gap = 16,
  imageWidth = 256,
  imageHeight = 320,
  pauseOnHover = true,
  direction = "left",
}) => {
  const scrollRef = useRef(null);
  const scrollPosition = useRef(0);
  const animationId = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || images.length === 0) return;

    // Set initial position for right direction
    if (direction === "right" && scrollPosition.current === 0) {
      scrollPosition.current = scrollContainer.scrollWidth / 2;
      scrollContainer.scrollLeft = scrollPosition.current;
    }

    const scroll = () => {
      if (!isPaused) {
        // Adjust scroll based on direction
        if (direction === "left") {
          scrollPosition.current += speed;
        } else {
          scrollPosition.current -= speed;
        }

        // Reset position when reaching boundaries
        if (
          direction === "left" &&
          scrollPosition.current >= scrollContainer.scrollWidth / 2
        ) {
          scrollPosition.current = 0;
        } else if (direction === "right" && scrollPosition.current <= 0) {
          scrollPosition.current = scrollContainer.scrollWidth / 2;
        }

        scrollContainer.scrollLeft = scrollPosition.current;
      }

      animationId.current = requestAnimationFrame(scroll);
    };

    animationId.current = requestAnimationFrame(scroll);

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [isPaused, speed, images.length, direction]);

  if (images.length === 0) {
    return (
      <div className="flex h-64 w-full items-center justify-center text-gray-500">
        No images to display
      </div>
    );
  }

  return (
    <div
      className="w-full overflow-hidden"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div
        ref={scrollRef}
        className="flex overflow-x-hidden"
        style={{
          gap: `${gap}px`,
          scrollBehavior: "auto",
        }}
      >
        {duplicatedImages.map((src, index) => (
          <div
            key={index}
            className="group relative flex-shrink-0 cursor-pointer"
            style={{
              width: `${imageWidth}px`,
              height: `${imageHeight}px`,
            }}
          >
            <img
              src={src}
              alt={`Carousel image ${index + 1}`}
              className="h-full w-full rounded-lg object-cover shadow-lg transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 rounded-lg transition-all duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteCarousel;
