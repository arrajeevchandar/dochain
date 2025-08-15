import CampaignCard from "./CampaignCard";

const campaigns = [
  {
    id: "c1",
    title: "Clean Water for Africa",
    description: "Building wells to bring clean water.",
    image: "https://source.unsplash.com/800x600/?water",
  },
  {
    id: "c2",
    title: "Solar Energy for Schools",
    description: "Solar panels for remote schools.",
    image: "https://source.unsplash.com/800x600/?solar",
  },
  {
    id: "c3",
    title: "Healthcare Improvement",
    description: "Medical supplies for clinics.",
    image: "https://source.unsplash.com/800x600/?healthcare",
  },
];

export default function Carousel() {
  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Featured Campaigns</h2>
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-blue-500">
        {campaigns.map(({ id, title, description, image }) => (
          <div key={id} className="flex-shrink-0 w-80 snap-center">
            <CampaignCard title={title} description={description} image={image} />
          </div>
        ))}
      </div>
    </section>
  );
}
