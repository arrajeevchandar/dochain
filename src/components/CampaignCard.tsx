// components/CampaignCard.tsx
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CampaignCardProps {
  title: string;
  description: string;
  image: string;
}

export default function CampaignCard({ title, description, image }: CampaignCardProps) {
  return (
    <Card className="max-w-xs bg-black/50 backdrop-blur-xl border-2 border-cyan-400 shadow-lg rounded-2xl hover:scale-105 hover:shadow-cyan-400/70 transition">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-2xl border-b-2 border-yellow-400" />
      <CardHeader>
        <CardTitle className="text-cyan-300 text-xl font-black uppercase">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-100 text-sm font-semibold">{description}</p>
      </CardContent>
      <CardFooter>
        <Button className="bg-yellow-400 text-black font-bold w-full rounded hover:bg-cyan-400 hover:text-yellow-800 shadow transition uppercase">
          Donate
        </Button>
      </CardFooter>
    </Card>
  );
}
