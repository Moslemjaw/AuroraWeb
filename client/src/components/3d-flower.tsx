import Spline from '@splinetool/react-spline';

export default function SplineFlower() {
  return (
    <div className="w-full h-[500px] lg:h-[700px] flex items-center justify-center rounded-[2rem] overflow-hidden relative shadow-2xl shadow-pink-200/50">
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-100 via-white to-purple-50 opacity-50" />
      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 font-serif text-2xl z-0 animate-pulse">
        Loading 3D Art...
      </div>
      <Spline 
        className="relative z-10 w-full h-full scale-110 hover:scale-100 transition-transform duration-700 ease-out"
        scene="https://prod.spline.design/KM0s8r9Jk9en7NWt/scene.splinecode"
      />
    </div>
  );
}
