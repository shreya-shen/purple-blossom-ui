const Index = () => {
  return (
    <div className="min-h-screen landing-bg relative">
      {/* Full-screen background overlay with text positioning to match landingPageDesign.jpg */}
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          {/* Main heading - positioned similar to landingPageDesign.jpg */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight">
            Sarang
          </h1>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-8 tracking-wide">
            Music Therapy
          </h2>
          {/* Subtitle text */}
          <p className="text-lg md:text-xl lg:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
            Personalized music therapy based on your mood to uplift your spirits and enhance your well-being
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
