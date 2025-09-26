"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-cards";

import { Button } from "@/components/ui/button";

const Hero210Images = () => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const images = [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg",
      alt: "Portrait of Joanna Doe in urban setting",
      name: "Joanna Doe",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random1.jpeg",
      alt: "Portrait of Joan Doe in natural lighting",
      name: "Joan Doe",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random2.jpeg",
      alt: "Portrait of Sarah Chen in studio setting",
      name: "Sarah Chen",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg",
      alt: "Portrait of Joanna Doe in urban setting",
      name: "Joanna Doe",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random1.jpeg",
      alt: "Portrait of Joan Doe in natural lighting",
      name: "Joan Doe",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random2.jpeg",
      alt: "Portrait of Sarah Chen in studio setting",
      name: "Sarah Chen",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg",
      alt: "Portrait of Joanna Doe in urban setting",
      name: "Joanna Doe",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random1.jpeg",
      alt: "Portrait of Joan Doe in natural lighting",
      name: "Joan Doe",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random2.jpeg",
      alt: "Portrait of Sarah Chen in studio setting",
      name: "Sarah Chen",
    },
  ];

  const css = `
  .mySwiperHero210Images {
    width: 100%;
    height: 420px;
    padding-bottom: 50px;
  }

  .mySwiperHero210Images .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
  }

  .mySwiperHero210Images .swiper-slide img {
    display: block;
    width: 100%;
  }

  .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }

  .swiper-3d .swiper-slide-shadow-right{
    background: none;
  }
  `;
  return (
    <section className="py-32">
      <style>{css}</style>
      <div className="container">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-4">
          <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Investir en déficit foncier avec Hagnéré Patrimoine
          </h2>
          <p className="text-center text-muted-foreground lg:text-lg max-w-3xl">
            Hagnéré Patrimoine vous propose des projets sur mesure via sa filiale Hagnéré Investissement vous garantissant des logements rénovés clés en main, ou tout simplement via des promoteurs immobiliers en direct
          </p>
        </div>

        <div className="relative mt-12 h-[420px] w-full lg:px-20">
          <div className="lg:110 absolute left-0 z-10 h-full w-12 bg-gradient-to-r from-background via-white to-transparent md:w-58 lg:left-16" />
          <div className="absolute right-0 z-10 h-full w-12 bg-gradient-to-l from-background via-white to-transparent md:w-58 lg:right-16" />

          {domLoaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Swiper
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false,
                }}
                effect="coverflow"
                grabCursor={true}
                slidesPerView="auto"
                centeredSlides={true}
                loop={true}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                className="mySwiperHero210Images"
                modules={[EffectCoverflow, Autoplay]}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      className="h-full w-full overflow-hidden rounded-3xl object-cover shadow-lg"
                      src={image.src}
                      alt={image.alt}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          )}
        </div>

        <div className="mx-auto mt-4 flex w-fit justify-center">
          <Button className="rounded-full px-6 py-3 active:scale-105 bg-black hover:bg-gray-800 text-white">
            Découvrir avec un conseiller gratuitement
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Hero210Images };