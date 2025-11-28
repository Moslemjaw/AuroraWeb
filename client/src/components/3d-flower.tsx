import Spline from '@splinetool/react-spline';

export default function SplineFlower() {
  return (
    <div className="w-full h-full flex items-center justify-center rounded-[2.5rem] overflow-hidden relative bg-secondary/30">
      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 font-serif text-xl z-0">
        Loading Artwork...
      </div>
      <Spline 
        className="relative z-10 w-full h-full scale-105"
        scene="https://prod.spline.design/KM0s8r9Jk9en7NWt/scene.splinecode"
      />
    </div>
  );
}
