import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GeosciencesSDGs from "./pages/GeosciencesSDGs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const basename = import.meta.env.BASE_URL.replace(/\/+$/, "");

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/geosciences-sdgs" element={<GeosciencesSDGs />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
