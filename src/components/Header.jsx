import { motion } from "framer-motion";
import { Gamepad2, ArrowRight, Sparkles, Zap, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

function Header() {
  const { t } = useLanguage(); 
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    size: Math.random() * 3 + 1
  }));

  return (
    <header className="relative min-h-[95vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-sky-950/20 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-sky-900/10 via-transparent to-transparent" />
      </div>

      {/* Interactive Gradient Grid */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(56, 189, 248, 0.1) 0%, transparent 50%)`
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ 
              x: `${particle.x}vw`,
              y: `${particle.y}vh`,
              opacity: 0
            }}
            animate={{ 
              y: [`${particle.y}vh`, `${particle.y - 20}vh`],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 4,
              delay: particle.delay,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-px h-px bg-cyan-400 rounded-full"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}
      </div>

      {/* Animated Orbs */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-linear-to-r from-sky-500/5 via-transparent to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-linear-to-l from-cyan-500/5 via-transparent to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* Glowing Border Effect */}
      <div className="absolute inset-x-4 md:inset-x-8 top-1/4 h-px bg-linear-to-r from-transparent via-sky-500/30 to-transparent" />
      <div className="absolute inset-x-4 md:inset-x-8 bottom-1/4 h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="mb-8 sm:mb-12"
        >
          {/* Animated Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/40 backdrop-blur-md border border-slate-700/50 mb-6 sm:mb-8 shadow-lg shadow-sky-900/20"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-linear-to-r from-sky-500 to-cyan-400 rounded-full"
            />
            <span className="text-sm font-medium text-slate-300 tracking-wide">
              {t("home.hero.free_to_play")}
            </span>
            <Sparkles className="w-3 h-3 text-sky-400 animate-pulse" />
          </motion.div>

          {/* Main Title with Gradient Text Effect */}
          <div className="relative mb-6 sm:mb-8">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="absolute bottom-0 left-0 right-0 mx-auto h-px bg-linear-to-r from-transparent via-sky-500 to-transparent"
            />
            
            <div className="overflow-hidden">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight tracking-tight"
              >
                <span className="text-white drop-shadow-lg">
                  {t("games.title")}{" "}
                </span>
                <br />
                <motion.span
                  initial={{ backgroundPosition: "200% center" }}
                  animate={{ backgroundPosition: "-200% center" }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 via-cyan-300 to-sky-400 bg-size-[200%_auto] inline-block"
                >
                  DO-Games
                </motion.span>
              </motion.h1>
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mt-6"
            >
              {t("home.hero.desc_default")}
            </motion.p>
          </div>
        </motion.div>

        {/* CTA Buttons with Hover Effects */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, type: "spring" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 sm:mb-20"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/games"
              className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-slate-900/80 to-slate-800/80 rounded-xl sm:rounded-2xl border border-slate-700/50 hover:border-sky-500/50 transition-all duration-300 backdrop-blur-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-r from-sky-500/0 via-sky-500/10 to-sky-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Gamepad2 className="w-5 h-5 text-sky-400 relative z-10" />
              <span className="font-semibold text-white relative z-10">
                {t("nav.games")}
              </span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-slate-500 tracking-widest uppercase">
              Scroll
            </span>
            <ChevronDown className="w-5 h-5 text-slate-600" />
          </motion.div>
        </motion.div>
      </div>

      {/* Parallax Layer */}
      <motion.div
        style={{ y: scrollY * 0.3 }}
        className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent pointer-events-none"
      />
    </header>
  );
}

export default Header;