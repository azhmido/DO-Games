  import { Outlet } from "react-router-dom";
  import Navbar from "./components/Navbar";
  import Footer from "./components/Footer";
  import { LanguageProvider } from "./context/LanguageContext";

  function Layout() {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-950 to-slate-900 text-white">
        <Navbar />
        <main className="min-h-[calc(100vh-200px)]">
          <Outlet /> 
        </main>
        <Footer />
      </div>
    );
  }

  function App() {
    return (
      <LanguageProvider>
        <Layout />
      </LanguageProvider>
    );
  }

  export default App;