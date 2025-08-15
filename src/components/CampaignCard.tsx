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
    <Card className="max-w-xs bg-slate-900 border border-cyan-400 shadow-lg rounded-2xl hover:scale-105 hover:shadow-cyan-400/50 transition-all">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-2xl border-b-2 border-yellow-400" />
      <CardHeader>
        <CardTitle className="text-cyan-400 text-xl font-black uppercase">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-100 text-sm font-semibold">{description}</p>
      </CardContent>
      <CardFooter>
        <Button className="bg-cyan-400 text-black font-bold w-full rounded shadow hover:bg-yellow-400 hover:text-cyan-600 transition uppercase">
          Donate
        </Button>
      </CardFooter>
    </Card>
  );
}
