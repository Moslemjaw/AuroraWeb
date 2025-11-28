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
    <Card className="overflow-hidden border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 group bg-white">
      <CardContent className="p-0 relative aspect-[4/5] overflow-hidden bg-secondary/20">
        <img 
          src={image} 
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out" 
        />
        {/* Clean Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </CardContent>
      <CardFooter className="flex flex-col items-start p-6 space-y-3">
        <div className="flex w-full justify-between items-start">
          <h3 className="font-serif text-lg font-medium text-foreground">{title}</h3>
          <span className="font-sans font-bold text-primary">{price}</span>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{description}</p>
        <Button variant="outline" className="w-full mt-2 border-primary/20 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all rounded-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
