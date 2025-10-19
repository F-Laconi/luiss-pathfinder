import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import MasterCategories from "@/components/MasterCategories";
import FeaturedCourses from "@/components/FeaturedCourses";
import Footer from "@/components/Footer";

const CourseExplorer = () => {
  return (
    <>
      <title>LUISS University Programs | Undergraduate & Graduate Courses</title>
      <meta name="description" content="Explore LUISS Guido Carli University programs in Business, Economics, Law, and Political Science. Find undergraduate, graduate and postgraduate courses." />
      <link rel="canonical" href="https://unicompass.lovable.app/luiss" />
      
      <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <MasterCategories />
      <FeaturedCourses />
      <Footer />
      
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollegeOrUniversity",
          "name": "LUISS Guido Carli",
          "description": "Business, Economics, Law, Political Science",
          "url": "https://unicompass.lovable.app/luiss",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Rome",
            "addressCountry": "IT"
          }
        })}
      </script>
    </div>
    </>
  );
};

export default CourseExplorer;