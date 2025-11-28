import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface ProductCardProps {
  id?: string;
  image: string;
  title: string;
  price: string;
  description: string;
}

export default function ProductCard({ id, image, title, price, description }: ProductCardProps) {
  const Content = (
    <div className="group flex flex-col cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary/20">
        <img 
          src={image} 
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out" 
        />
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute inset-x-3 sm:inset-x-4 bottom-3 sm:bottom-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
           <Button className="w-full bg-white text-foreground hover:bg-primary hover:text-white shadow-lg rounded-none uppercase tracking-widest text-[10px] sm:text-xs font-bold h-9 sm:h-10 border-none">
             View Details
           </Button>
        </div>
      </div>
      
      <div className="space-y-1 text-center p-4 pt-2">
        <h3 className="font-serif text-lg sm:text-xl text-foreground font-normal">{title}</h3>
        <p className="text-muted-foreground text-xs sm:text-sm line-clamp-1 mb-1">{description}</p>
        <span className="font-sans font-bold text-primary block pt-1 text-sm sm:text-base">{price}</span>
      </div>
    </div>
  );

  if (id) {
    return <Link href={`/product/${id}`}>{Content}</Link>;
  }

  return Content;
}
