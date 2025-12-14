import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BlockchainProvider } from "./contexts/BlockchainContext";
import ScrollToTop from "./components/ScrollToTop";
import BlockchainStatusBar from "./components/blockchain/BlockchainStatusBar";
import Index from "./pages/Index";
import UniversitySelection from "./pages/UniversitySelection";
import LuissUniversity from "./pages/LuissUniversity";
import MasterCategory from "./pages/MasterCategory";
import GraduateSchool from "./pages/GraduateSchool";
import GraduateProgramDetail from "./pages/GraduateProgramDetail";
import UndergraduateSchool from "./pages/UndergraduateSchool";
import UndergraduateProgramDetail from "./pages/UndergraduateProgramDetail";
import PostGraduateSchool from "./pages/PostGraduateSchool";
import PostGraduateProgramDetail from "./pages/PostGraduateProgramDetail";
import CourseDetail from "./pages/CourseDetail";
import Checkout from "./pages/Checkout";
import BusinessPartner from "./pages/BusinessPartner";
import PostPosition from "./pages/PostPosition";
import StudentBoard from "./pages/StudentBoard";
import StudentProfileDetail from "./pages/StudentProfileDetail";
import StudentActivities from "./pages/StudentActivities";
import About from "./pages/About";
import Suggestions from "./pages/Suggestions";
import EasterEgg from "./pages/EasterEgg";
import SearchResults from "./pages/SearchResults";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BlockchainProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/universities" element={<UniversitySelection />} />
            <Route path="/luiss-university" element={<LuissUniversity />} />
            <Route path="/business-partner" element={<BusinessPartner />} />
            <Route path="/post-position" element={<PostPosition />} />
            <Route path="/student-board" element={<StudentBoard />} />
            <Route path="/student-board/:id" element={<StudentProfileDetail />} />
            <Route path="/student-activities" element={<StudentActivities />} />
            <Route path="/about" element={<About />} />
            <Route path="/suggestions" element={<Suggestions />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/easter-egg" element={<EasterEgg />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/school/graduate" element={<GraduateSchool />} />
            <Route path="/graduate/program/:id" element={<GraduateProgramDetail />} />
            <Route path="/school/undergraduate" element={<UndergraduateSchool />} />
            <Route path="/undergraduate/program/:id" element={<UndergraduateProgramDetail />} />
            <Route path="/school/postgraduate" element={<PostGraduateSchool />} />
            <Route path="/postgraduate/program/:id" element={<PostGraduateProgramDetail />} />
            <Route path="/course/:courseId" element={<CourseDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/school/:schoolId" element={<MasterCategory />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BlockchainStatusBar />
        </BrowserRouter>
      </TooltipProvider>
    </BlockchainProvider>
  </QueryClientProvider>
);

export default App;
