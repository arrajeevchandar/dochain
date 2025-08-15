// components/ExplodingCarousel.tsx
"use client";
import { useKeenSlider } from "keen-slider/react";
import CampaignCard from "./CampaignCard";
import "keen-slider/keen-slider.min.css";

const campaigns = [
  { id: "c1", title: "Clean Water for Africa", description: "Building wells to bring clean water.", image: "https://source.unsplash.com/800x600/?water" },
  { id: "c2", title: "Solar Energy for Schools", description: "Solar panels for remote schools.", image: "https://source.unsplash.com/800x600/?solar" },
  { id: "c3", title: "Healthcare Improvement", description: "Medical supplies for clinics.", image: "https://source.unsplash.com/800x600/?healthcare" },
  // add more if you want!
];

export default function MatrixCarousel() {
  const [ref] = useKeenSlider({
    loop: true,
    slides: { perView: 1.3, spacing: 24 },
    mode: "free-snap",
    breakpoints: {
      "(min-width: 820px)": { slides: { perView: 2.25, spacing: 32 }},
      "(min-width: 1200px)": { slides: { perView: 3.25, spacing: 36 }},
    }
  });

  return (
    <section className="max-w-7xl mx-auto py-20">
      <h2 className="text-center text-4xl font-extrabold text-yellow-500 mb-10 tracking-tight">
        Trending Blockchain Campaigns
      </h2>
      <div ref={ref} className="keen-slider flex">
        {campaigns.map(({ id, title, description, image }) => (
          <div key={id} className="keen-slider__slide">
            <CampaignCard title={title} description={description} image={image} />
          </div>
        ))}
      </div>
    </section>
  );
}
