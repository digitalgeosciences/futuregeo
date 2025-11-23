import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import InsightsArchive from "./pages/InsightsArchive";
import InsightDetail from "./pages/InsightDetail";
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
        <Route path="/insights" element={<InsightsArchive />} />
        <Route path="/insights/:slug" element={<InsightDetail />} />
        {/* Legacy paths kept for backwards compatibility */}
        <Route path="/writings" element={<InsightsArchive />} />
        <Route path="/writings/:slug" element={<InsightDetail />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
