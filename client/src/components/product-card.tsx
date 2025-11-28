import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  description: string;
}

export default function ProductCard({ image, title, price, description }: ProductCardProps) {
  return (
    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 group bg-white/80 backdrop-blur-sm">
      <CardContent className="p-0 relative aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </CardContent>
      <CardFooter className="flex flex-col items-start p-6 gap-2">
        <div className="flex w-full justify-between items-center">
          <h3 className="font-serif text-xl font-medium text-foreground">{title}</h3>
          <span className="font-sans font-bold text-primary text-lg">{price}</span>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
