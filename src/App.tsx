import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import UniversitySelection from "./pages/UniversitySelection";
import CourseExplorer from "./pages/CourseExplorer";
import MasterCategory from "./pages/MasterCategory";
import GraduateSchool from "./pages/GraduateSchool";
import UndergraduateSchool from "./pages/UndergraduateSchool";
import PostGraduateSchool from "./pages/PostGraduateSchool";
import CourseDetail from "./pages/CourseDetail";
import BusinessPartner from "./pages/BusinessPartner";
import PostPosition from "./pages/PostPosition";
import StudentBoard from "./pages/StudentBoard";
import About from "./pages/About";
import EasterEgg from "./pages/EasterEgg";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/universities" element={<UniversitySelection />} />
          <Route path="/course-explorer" element={<CourseExplorer />} />
          <Route path="/business-partner" element={<BusinessPartner />} />
          <Route path="/post-position" element={<PostPosition />} />
          <Route path="/student-board" element={<StudentBoard />} />
          <Route path="/about" element={<About />} />
          <Route path="/easter-egg" element={<EasterEgg />} />
          <Route path="/school/graduate" element={<GraduateSchool />} />
          <Route path="/school/undergraduate" element={<UndergraduateSchool />} />
          <Route path="/school/postgraduate" element={<PostGraduateSchool />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route path="/school/:schoolId" element={<MasterCategory />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
