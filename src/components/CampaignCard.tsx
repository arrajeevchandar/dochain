import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CampaignCardProps {
  title: string;
  description: string;
  image: string;
}

export default function CampaignCard({ title, description, image }: CampaignCardProps) {
  return (
    <Card className="hover:shadow-2xl transition cursor-pointer max-w-xs bg-gradient-to-tr from-indigo-50 to-white border border-indigo-200">
      <img src={image} alt={title} className="w-full h-56 object-cover rounded-t" />
      <CardHeader>
        <CardTitle className="text-indigo-800">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-indigo-600 text-sm">{description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" className="w-full">
          Donate
        </Button>
      </CardFooter>
    </Card>
  );
}
