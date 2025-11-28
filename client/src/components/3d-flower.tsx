import Spline from '@splinetool/react-spline';

export default function SplineFlower() {
  return (
    <div className="w-full h-[400px] lg:h-[600px] flex items-center justify-center bg-pink-50/50 rounded-3xl overflow-hidden relative">
      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 font-serif text-2xl z-0">
        Loading 3D Flower...
      </div>
      {/* 
        Note: The 'scene' prop requires a valid .splinecode URL. 
        I've used a demo scene URL here. You can replace it with your specific flower scene URL.
      */}
      <Spline 
        className="relative z-10 w-full h-full"
        scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
      />
    </div>
  );
}
