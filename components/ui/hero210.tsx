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
import { 
  Calculator, 
  Clock, 
  TrendingUp, 
  Zap, 
  FileCheck,
  Building2,
  PiggyBank,
  Shield,
  Home
} from "lucide-react";

const Hero210 = () => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const cards = [
    {
      icon: Calculator,
      title: "10 700 €",
      description: "Déduction annuelle sur le revenu global",
      color: "from-black to-gray-700",
    },
    {
      icon: Clock,
      title: "10 ans",
      description: "Report du déficit excédentaire sur les loyers",
      color: "from-gray-700 to-gray-900",
    },
    {
      icon: TrendingUp,
      title: "Plus-value",
      description: "Travaux ayant généré du déficit réintégrés dans la plus-value",
      color: "from-black to-gray-800",
    },
    {
      icon: Zap,
      title: "Rénovation énergétique",
      description: "Rénover votre logement en lui apportant de la valeur",
      color: "from-gray-600 to-black",
    },
    {
      icon: FileCheck,
      title: "Simplicité déclarative",
      description: "Le déficit foncier est extrêmement simple à déclarer et ne nécessite aucune connaissance",
      color: "from-gray-800 to-black",
    },
    {
      icon: Building2,
      title: "-21% à -63%",
      description: "Réduction d'impôt selon votre tranche marginale d'imposition",
      color: "from-black to-gray-700",
    },
    {
      icon: PiggyBank,
      title: "Effet de levier",
      description: "Financez les travaux à crédit et laissez la fiscalité rembourser les mensualités",
      color: "from-gray-700 to-black",
    },
    {
      icon: Shield,
      title: "Sécurisation",
      description: "Accompagnement juridique et fiscal pour éviter tout redressement",
      color: "from-black to-gray-900",
    },
    {
      icon: Home,
      title: "Valorisation",
      description: "Augmentation du loyer potentiel et de la valeur de revente du bien",
      color: "from-gray-800 to-gray-900",
    },
  ];

  const css = `
  .mySwiperHero210 {
    width: 100%;
    height: 400px;
    padding-bottom: 60px;
  }
  
  .mySwiperHero210 .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 320px;
    height: 320px;
  }
  
  .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
    
  .swiper-3d .swiper-slide-shadow-right{
    background: none;
  }
  
  /* Personnalisation des ombres pour les cartes */
  .mySwiperHero210 .swiper-slide-active {
    transform: scale(1.08);
    transition: transform 0.3s ease;
  }
  
  .mySwiperHero210 .swiper-slide .card-content {
    transition: all 0.3s ease;
  }
  
  .mySwiperHero210 .swiper-slide-active .card-content {
    transform: translateY(-5px);
  }
  `;
  
  return (
    <section className="py-20 -mt-16">
      <style>{css}</style>
      <div className="container">
        <div className="relative h-[400px] w-full lg:px-10">
          {/* Gradients latéraux pour effet de fondu */}
          <div className="absolute left-0 z-10 h-full w-24 bg-gradient-to-r from-background via-background/80 to-transparent md:w-48 lg:left-8" />
          <div className="absolute right-0 z-10 h-full w-24 bg-gradient-to-l from-background via-background/80 to-transparent md:w-48 lg:right-8" />

          {domLoaded && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full h-full"
            >
              <Swiper
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                effect="coverflow"
                grabCursor={true}
                slidesPerView="auto"
                centeredSlides={true}
                loop={true}
                speed={600}
                coverflowEffect={{
                  rotate: 30,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: false,
                }}
                className="mySwiperHero210"
                modules={[EffectCoverflow, Autoplay]}
              >
                {cards.map((card, index) => {
                  const Icon = card.icon;
                  return (
                    <SwiperSlide key={index}>
                      <div className="card-content h-full w-full p-6 bg-white rounded-2xl shadow-lg border border-gray-200/50 flex flex-col group hover:shadow-2xl hover:border-gray-300 transition-all duration-300 cursor-pointer">
                        
                        {/* Contenu de la carte */}
                        <div className="flex-1 flex flex-col">
                          {/* Icône avec fond coloré */}
                          <div className="mb-6">
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                              <Icon className="h-8 w-8 text-white" strokeWidth={1.5} />
                            </div>
                          </div>
                          
                          {/* Titre */}
                          <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            {card.title}
                          </h3>
                          
                          {/* Description */}
                          <p className="text-sm text-gray-600 leading-relaxed flex-1">
                            {card.description}
                          </p>
                        </div>
                        
                        {/* Barre de couleur en bas */}
                        <div className="mt-6 pt-4 border-t border-gray-100">
                          <div className={`h-1.5 w-24 bg-gradient-to-r ${card.color} rounded-full`} />
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export { Hero210 };
