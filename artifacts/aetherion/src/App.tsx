import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarfieldBackground from "@/components/StarfieldBackground";
import CursorGlow from "@/components/CursorGlow";
import AmbientAudio from "@/components/AmbientAudio";
import ClickEffect from "@/components/ClickEffect";
import Home from "@/pages/Home";
import Books from "@/pages/Books";
import Characters from "@/pages/Characters";
import Clans from "@/pages/Clans";
import Artifacts from "@/pages/Artifacts";
import ProjectAether from "@/pages/ProjectAether";
import World from "@/pages/World";
import Power from "@/pages/Power";
import Timeline from "@/pages/Timeline";
import Archive from "@/pages/Archive";
import Search from "@/pages/Search";
import People from "@/pages/People";
import Author from "@/pages/Author";
import Map from "@/pages/Map";
import Gallery from "@/pages/Gallery";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/books" component={Books} />
      <Route path="/characters" component={Characters} />
      <Route path="/clans" component={Clans} />
      <Route path="/artifacts" component={Artifacts} />
      <Route path="/project-aether" component={ProjectAether} />
      <Route path="/world" component={World} />
      <Route path="/power" component={Power} />
      <Route path="/timeline" component={Timeline} />
      <Route path="/archive" component={Archive} />
      <Route path="/search" component={Search} />
      <Route path="/people" component={People} />
      <Route path="/author" component={Author} />
      <Route path="/map" component={Map} />
      <Route path="/gallery" component={Gallery} />
      <Route component={NotFound} />
    </Switch>
  );
}

function Layout() {
  return (
    <div className="min-h-screen relative" style={{ background: "#050816" }}>
      <StarfieldBackground />
      <CursorGlow />
      {/* Global top ambient arc */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 100% 50% at 50% -5%, rgba(125,249,255,0.05) 0%, rgba(168,85,247,0.03) 45%, transparent 65%)",
        }}
      />
      <Navbar />
      <main className="relative z-10">
        <Router />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
      <AmbientAudio />
      <ClickEffect />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Layout />
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
