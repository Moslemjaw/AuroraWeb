import { Button } from "@/components/ui/button";

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  description: string;
}

export default function ProductCard({ image, title, price, description }: ProductCardProps) {
  return (
    <div className="group flex flex-col space-y-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary/20">
        <img 
          src={image} 
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out" 
        />
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute inset-x-4 bottom-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
           <Button className="w-full bg-white text-foreground hover:bg-primary hover:text-white shadow-lg rounded-none uppercase tracking-widest text-xs font-bold h-10 border-none">
             Add to Cart
           </Button>
        </div>
      </div>
      
      <div className="space-y-1 text-center pt-2">
        <h3 className="font-serif text-xl text-foreground font-normal">{title}</h3>
        <p className="text-muted-foreground text-sm line-clamp-1 mb-1">{description}</p>
        <span className="font-sans font-bold text-primary block pt-1">{price}</span>
      </div>
    </div>
  );
}
