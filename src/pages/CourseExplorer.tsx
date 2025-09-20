import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import MasterCategories from "@/components/MasterCategories";
import Footer from "@/components/Footer";

const CourseExplorer = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <MasterCategories />
      <Footer />
    </div>
  );
};

export default CourseExplorer;