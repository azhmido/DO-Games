import Header from "../components/Header";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Gamepad2, Star, ChevronRight, ArrowRight, 
  Sparkles, TrendingUp, Users, Clock 
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext"; 
import iconicGames from "../json/data/iconicGames.json";
import featuredGames from "../json/data/featuredGames.json";
import allGamesData from "../json/data/games.json";

function Home() {
  const { t } = useLanguage();
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentGameIndex((prevIndex) => (prevIndex + 1) % iconicGames.length);
      }, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying, iconicGames.length]);

  const nextGame = () => {
    setCurrentGameIndex((prevIndex) => (prevIndex + 1) % iconicGames.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevGame = () => {
    setCurrentGameIndex((prevIndex) => (prevIndex - 1 + iconicGames.length) % iconicGames.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handlePlayNow = (gameTitle) => {
    const gameDetail = allGamesData.find(
      (g) => g.title.toLowerCase() === gameTitle.toLowerCase()
    );

    if (gameDetail?.game_url) {
      window.open(gameDetail.game_url, "_blank", "noopener,noreferrer");
    } else {
      alert("Link game tidak ditemukan!");
    }
  };

  const currentIconicGame = iconicGames[currentGameIndex];
  const gameDetail = allGamesData.find(g => g.title === currentIconicGame.title);

  const stats = [
    { icon: <Users className="w-5 h-5" />, label: "Active Players", value: "10K+" },
    { icon: <Gamepad2 className="w-5 h-5" />, label: "Total Games", value: "500+" },
    { icon: <TrendingUp className="w-5 h-5" />, label: "Growth", value: "40%" },
    { icon: <Clock className="w-5 h-5" />, label: "Avg Play Time", value: "2.5h" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-cyan-500/30 rounded-full"
            initial={{ 
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh'
            }}
            animate={{
              y: [null, Math.random() * -100],
              x: [null, Math.random() * 100]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <Header />
      
      {/* Hero Section dengan Carousel */}
      <section className="relative min-h-[85vh] flex items-center px-4 md:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIconicGame.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.95)), url(${currentIconicGame.image})`,
                backgroundBlendMode: 'multiply'
              }}
            />
            <div className="absolute inset-0 bg-linear-to-r from-slate-900/60 via-transparent to-slate-900/60" />
          </motion.div>
        </AnimatePresence>
        
        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto w-full mt-16">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 w-full"
            >
              <div className="backdrop-blur-xl bg-slate-900/40 p-6 md:p-8 rounded-3xl border border-slate-700/30 shadow-2xl shadow-slate-900/50">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="px-4 py-2 bg-linear-to-r from-blue-600 to-cyan-500 text-white rounded-full text-sm font-bold flex items-center gap-2">
                    <Sparkles className="w-3 h-3" />
                    {currentIconicGame.category}
                  </span>
                  <span className="px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold border border-emerald-500/30">
                    {t("home.hero.free_to_play")}
                  </span>
                  <span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold border border-purple-500/30">
                    {gameDetail?.platform || "Multi Platform"}
                  </span>
                </div>
                
                {/* Title & Rating */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight tracking-tight">
                  {currentIconicGame.title}
                  <span className="block text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
                    {gameDetail?.genre || "Adventure"}
                  </span>
                </h1>
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < Math.floor(currentIconicGame.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-slate-600 text-slate-600'}`}
                      />
                    ))}
                  </div>
                  <span className="text-slate-300 text-lg font-semibold">
                    {currentIconicGame.rating}/5.0
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">{gameDetail?.publisher || "Popular Publisher"}</span>
                </div>
                
                {/* Description */}
                <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                  {gameDetail?.short_description || t("home.hero.desc_default")}
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center p-3 bg-slate-800/30 rounded-xl border border-slate-700/30">
                      <div className="flex items-center justify-center gap-2 text-cyan-400 mb-1">
                        {stat.icon}
                        <span className="text-2xl font-bold">{stat.value}</span>
                      </div>
                      <span className="text-xs text-slate-400">{stat.label}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePlayNow(currentIconicGame.title)}
                    className="group flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-xl hover:from-blue-700 hover:via-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-xl shadow-blue-500/25 font-bold text-lg"
                  >
                    <Gamepad2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    {t("home.hero.play_now")}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
            
            {/* Right Carousel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:w-1/2 w-full"
            >
              <div className="relative group">
                {/* Navigation Buttons */}
                <button 
                  onClick={prevGame}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-slate-900/80 backdrop-blur-lg rounded-full hover:bg-blue-600 transition-all border border-slate-700 hover:border-blue-400 shadow-lg"
                >
                  <ChevronRight className="w-6 h-6 rotate-180" />
                </button>
                <button 
                  onClick={nextGame}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-slate-900/80 backdrop-blur-lg rounded-full hover:bg-blue-600 transition-all border border-slate-700 hover:border-blue-400 shadow-lg"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                
                {/* Main Image */}
                <div className="relative h-72 md:h-96 lg:h-125 rounded-3xl overflow-hidden border-2 border-slate-700/30 shadow-2xl group-hover:border-cyan-500/50 transition-all duration-500">
                  <img 
                    src={currentIconicGame.image} 
                    alt={currentIconicGame.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
                  
                  {/* Game Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-white">{currentIconicGame.title}</h3>
                        <p className="text-slate-300">Released: {gameDetail?.release_date || "2024"}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-cyan-400">{currentIconicGame.rating}</div>
                        <div className="text-sm text-slate-400">Rating</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex justify-center gap-3 mt-6 overflow-x-auto pb-2">
                  {iconicGames.map((game, index) => (
                    <button
                      key={game.id}
                      onClick={() => {
                        setCurrentGameIndex(index);
                        setIsAutoPlaying(false);
                        setTimeout(() => setIsAutoPlaying(true), 10000);
                      }}
                      className={`relative shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${index === currentGameIndex ? 'border-cyan-400 scale-110 shadow-lg shadow-cyan-500/30' : 'border-slate-700 opacity-60 hover:opacity-100 hover:scale-105'}`}
                    >
                      <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
                      {index === currentGameIndex && (
                        <div className="absolute inset-0 bg-cyan-500/20" />
                      )}
                    </button>
                  ))}
                </div>
                
                {/* Progress Indicator */}
                <div className="mt-4 flex justify-center">
                  <div className="flex gap-2">
                    {iconicGames.map((_, index) => (
                      <div
                        key={index}
                        className={`h-1 rounded-full transition-all duration-500 ${index === currentGameIndex ? 'w-8 bg-cyan-400' : 'w-3 bg-slate-700'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Games Section */}
      <section className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-4"
          >
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-purple-300">TRENDING NOW</span>
          </motion.span>
          
          <div className="flex flex-col md:flex-row items-center justify-between mb-10">
            <div className="text-left mb-6 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent">
                {t("home.popular.title")}
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl">
                {t("home.popular.subtitle")} Explore our curated collection of the most played games.
              </p>
            </div>
            <Link 
              to="/games" 
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/50 hover:bg-slate-800/60 transition-all duration-300"
            >
              <span className="font-bold text-cyan-400 group-hover:text-cyan-300">
                {t("home.popular.view_all")}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -15, scale: 1.02 }}
              onClick={() => handlePlayNow(game.title)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer bg-linear-to-b from-slate-800/30 to-slate-900/30 border border-slate-700/30 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-500"
            >
              {/* Popular Badge */}
              {index < 3 && (
                <div className="absolute top-3 left-3 z-20">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${index === 0 ? 'bg-linear-to-r from-yellow-500 to-amber-500' : index === 1 ? 'bg-linear-to-r from-slate-400 to-slate-500' : 'bg-linear-to-r from-amber-700 to-orange-600'}`}>
                    #{index + 1} Trending
                  </span>
                </div>
              )}
              
              {/* Game Image */}
              <div className="aspect-16/10 overflow-hidden relative">
                <img 
                  src={game.image} 
                  alt={game.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent opacity-70" />
                
                {/* Overlay Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-sm rounded-md text-sm font-bold uppercase tracking-wider">
                      {game.category}
                    </span>
                    <div className="flex items-center gap-1 bg-slate-900/80 backdrop-blur-sm px-2 py-1 rounded-md">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold">{game.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Game Details */}
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                  {game.title}
                </h3>
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                  {allGamesData.find(g => g.title === game.title)?.short_description || "Exciting adventure awaits!"}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    ⏱️ {Math.floor(Math.random() * 5) + 1}h average play
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-linear-to-r from-blue-600 to-cyan-500 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all"
                  >
                    Play Now
                  </motion.button>
                </div>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-linear-to-br from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:via-cyan-500/2 group-hover:to-cyan-500/10 transition-all duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;