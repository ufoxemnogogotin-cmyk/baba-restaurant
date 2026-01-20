 "use client";


import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";

import Image from "next/image";


import "swiper/css";

import "swiper/css/navigation";


const dishes = [

  { id: 1, img: "/dish1.jpg", w: 720, h: 520 },

  { id: 2, img: "/dish2.jpg", w: 420, h: 600 },

  { id: 3, img: "/dish3.jpg", w: 420, h: 600 },

];


export default function KitchenGallery() {

  return (

    <section

      className="relative overflow-hidden py-32"

      style={{ backgroundColor: "#f5f2ed" }}

    >

      <div className="relative max-w-[1600px] mx-auto px-8">


        {/* BIG EDITORIAL TITLE */}

        <div className="absolute left-8 top-0 z-20 pointer-events-none">

          <h2

            className="leading-none"

            style={{

              fontFamily: "serif",

              color: "#722f37",

            }}

          >

            <span className="block text-[180px] font-light">23</span>

            <span className="block -mt-6 text-[48px] tracking-widest">

              GÄNGE

            </span>

          </h2>

        </div>


        {/* SLIDER */}

        <div className="relative pt-32">

          <Swiper

            modules={[Navigation]}

            slidesPerView="auto"

            spaceBetween={80}

            navigation={{ nextEl: ".next-btn" }}

            className="!overflow-visible"

          >

            {dishes.map((d) => (

              <SwiperSlide key={d.id} className="!w-auto">

                <div

                  className="relative bg-black"

                  style={{ width: d.w, height: d.h }}

                >

                  <Image

                    src={d.img}

                    alt="Dish"

                    fill

                    className="object-cover"

                  />


                  {/* NEXT BUTTON ON IMAGE EDGE (only on first slide visually works fine) */}

                  {d.id === 1 && (

                    <button

                      className="next-btn absolute right-[-32px] top-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition hover:scale-110"

                      style={{ backgroundColor: "#722f37" }}

                    >

                      <svg

                        width="26"

                        height="26"

                        viewBox="0 0 24 24"

                        fill="none"

                        stroke="white"

                        strokeWidth="2.5"

                        strokeLinecap="round"

                        strokeLinejoin="round"

                      >

                        <line x1="5" y1="12" x2="19" y2="12" />

                        <polyline points="12 5 19 12 12 19" />

                      </svg>

                    </button>

                  )}

                </div>

              </SwiperSlide>

            ))}

          </Swiper>

        </div>


        {/* TEXT BLOCK */}

        <div className="mt-24 max-w-xl">

          <p

            className="text-base leading-relaxed"

            style={{ color: "#212121" }}

          >

            Bernhard Zimmerl serviert ein fein abgestimmtes 23-Gänge-Menü, das

            seine Handschrift trägt und Gästen ein ebenso präzises wie

            überraschendes Geschmackserlebnis bietet.

          </p>


          <button

            className="mt-8 inline-flex items-center gap-3 border-b pb-1 tracking-[0.25em] font-semibold text-sm"

            style={{ color: "#212121", borderColor: "#722f37" }}

          >

            MENÜ <span style={{ color: "#722f37" }}>→</span>

          </button>

        </div>

      </div>

    </section>

  );

}

