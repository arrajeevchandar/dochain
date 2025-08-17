// components/SwipeCarousel.tsx
'use client';
import { useKeenSlider } from 'keen-slider/react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import CampaignCard from './CampaignCard';

const campaigns = [
    {
        id: 'c1',
        title: 'Clean Water for Africa',
        description: 'Building wells to bring clean water.',
        image: 'https://source.unsplash.com/800x600/?water',
    },
    {
        id: 'c2',
        title: 'Solar Energy for Schools',
        description: 'Solar panels for remote schools.',
        image: 'https://source.unsplash.com/800x600/?solar',
    },
    {
        id: 'c3',
        title: 'Healthcare Improvement',
        description: 'Medical supplies for clinics.',
        image: 'https://source.unsplash.com/800x600/?healthcare',
    },
];

export default function SwipeCarousel() {
    const [ref] = useKeenSlider({
        loop: true,
        mode: 'free-snap',
        slides: { perView: 1.4, spacing: 18 },
        breakpoints: {
            '(min-width: 820px)': { slides: { perView: 2.2, spacing: 24 } },
            '(min-width: 1100px)': { slides: { perView: 3.2, spacing: 28 } },
        },
    });

    const router = useRouter();

    function handleDonate(id: string) {
        router.push(`/donate/${id}`);
    }

    return (
        <section className="mt-8 mb-24">
            <h2 className="text-3xl font-bold mb-8 text-center text-yellow-400 drop-shadow-lg">
                Featured Campaigns
            </h2>
            <div ref={ref} className="keen-slider px-4">
                {campaigns.map(({ id, title, description, image }) => (
                    <div key={id} className="keen-slider__slide">
                        <CampaignCard
                            title={title}
                            description={description}
                            image={image}
                            onDonate={() => handleDonate(id)}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
