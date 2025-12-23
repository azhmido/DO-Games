import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Gamepad2, ExternalLink, Calendar, Star, ChevronRight, Clock, Users, Trophy, Sparkles, Play, Zap } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function GameCard({ game, index, viewMode = "grid" }) {
  const { t } = useLanguage();
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const gameStats = {
    rating: (Math.random() * 1 + 4).toFixed(1),
    players: Math.floor(Math.random() * 5000000) + 100000,
    playTime: Math.floor(Math.random() * 50) + 10,
  };

  const getGenreColor = (genre) => {
    const colors = {
      "Shooter": "from-red-500/20 to-orange-500/20 border-red-500/30 text-red-400",
      "Action": "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400",
      "RPG": "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400",
      "Strategy": "from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400",
      "Adventure": "from-amber-500/20 to-yellow-500/20 border-amber-500/30 text-amber-400",
      "Sports": "from-lime-500/20 to-green-500/20 border-lime-500/30 text-lime-400",
      "Racing": "from-violet-500/20 to-fuchsia-500/20 border-violet-500/30 text-violet-400",
      "MMO": "from-rose-500/20 to-pink-500/20 border-rose-500/30 text-rose-400",
    };
    return colors[genre] || "from-sky-500/20 to-cyan-500/20 border-sky-500/30 text-sky-400";
  };

  const genreColor = getGenreColor(game.genre);

  const sharedInfo = (
    <div className="flex items-center gap-3">
      <motion.span 
        whileHover={{ scale: 1.05 }}
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-linear-to-r ${genreColor} text-xs font-medium`}
      >
        <Gamepad2 className="w-3 h-3" /> {game.genre}
      </motion.span>
      <span className="flex items-center gap-1 text-xs text-slate-400">
        <Calendar className="w-3 h-3" /> {game.release_date || "Recently"}
      </span>
    </div>
  );

  if (viewMode === "list") {
    return (
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ x: 5 }}
        className="group bg-linear-to-r from-slate-900/40 to-slate-800/20 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/30 hover:border-sky-500/30 transition-all duration-300 p-4"
      >
        <div className="flex items-center gap-4">
          {/* Game Thumbnail */}
          <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden group">
            <motion.div
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              className="w-full h-full"
            >
              <img 
                src={imgError ? '/fallback.jpg' : game.thumbnail} 
                alt={game.title}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            </motion.div>
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-2 left-2">
              <span className="px-2 py-1 bg-green-500/20 backdrop-blur-sm rounded-full text-xs font-bold text-green-400 border border-green-500/30">
                FREE
              </span>
            </div>
          </div>

          {/* Game Info */}
          <div className="flex-1">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold group-hover:text-sky-400 transition-colors">{game.title}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-amber-400">{gameStats.rating}</span>
                  </div>
                </div>
                {sharedInfo}
                <p className="text-slate-300 text-sm mt-3 line-clamp-1">{game.short_description}</p>
              </div>
              
              {/* Stats */}
              <div className="hidden md:flex items-center gap-4 ml-4">
                <div className="text-center">
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Users className="w-3 h-3" />
                    <span className="font-bold">{Math.floor(gameStats.players / 1000)}K</span>
                  </div>
                  <span className="text-[10px] text-slate-500 uppercase">Players</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span className="font-bold">{gameStats.playTime}h</span>
                  </div>
                  <span className="text-[10px] text-slate-500 uppercase">Avg Time</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs px-2 py-1 rounded bg-slate-800/50 text-slate-400">
                  {game.platform || "PC"}
                </span>
                <span className="text-xs px-2 py-1 rounded bg-slate-800/50 text-slate-400">
                  {game.publisher || "Independent"}
                </span>
              </div>
              <Link 
                to={`/games/${game.id}`}
                className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-sky-500/50 text-sky-400 hover:text-white transition-all"
              >
                <span className="text-sm font-medium">{t("common.details")}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-linear-to-b from-slate-900/40 to-slate-800/20 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/30 hover:border-sky-500/30 transition-all duration-300"
    >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-linear-to-br from-sky-500/0 via-sky-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Game Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.5 }}
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="px-2 py-1 bg-green-500/20 backdrop-blur-sm rounded-full text-xs font-bold text-green-400 border border-green-500/30">
            FREE
          </span>
          {game.publisher && (
            <span className="px-2 py-1 bg-slate-900/80 backdrop-blur-sm rounded-full text-xs text-slate-300">
              {game.publisher}
            </span>
          )}
        </div>

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span className="text-xs font-bold text-white">{gameStats.rating}</span>
        </div>

        {/* Quick Play Button on Hover */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          className="absolute bottom-4 left-4 right-4"
        >
          <a
            href={game.game_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg bg-linear-to-r from-sky-500 to-cyan-400 hover:shadow-lg hover:shadow-sky-500/25 transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <Play className="w-4 h-4" />
            <span className="text-sm font-bold">{t("home.hero.play_now")}</span>
          </a>
        </motion.div>
      </div>

      {/* Game Info */}
      <div className="p-5 relative z-10">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-2 group-hover:text-sky-400 transition-colors line-clamp-1">
              {game.title}
            </h3>
            {sharedInfo}
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-300 text-sm mb-4 line-clamp-2 leading-relaxed">
          {game.short_description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex flex-col items-center p-2 rounded-lg bg-slate-900/50">
            <Users className="w-4 h-4 text-slate-400 mb-1" />
            <span className="text-xs font-bold text-white">
              {Math.floor(gameStats.players / 1000)}K
            </span>
            <span className="text-[10px] text-slate-500">Players</span>
          </div>
          <div className="flex flex-col items-center p-2 rounded-lg bg-slate-900/50">
            <Clock className="w-4 h-4 text-slate-400 mb-1" />
            <span className="text-xs font-bold text-white">{gameStats.playTime}h</span>
            <span className="text-[10px] text-slate-500">Avg Time</span>
          </div>
          <div className="flex flex-col items-center p-2 rounded-lg bg-slate-900/50">
            <Trophy className="w-4 h-4 text-slate-400 mb-1" />
            <span className="text-xs font-bold text-white">{game.platform || "PC"}</span>
            <span className="text-[10px] text-slate-500">Platform</span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/games/${game.id}`}
          className="group flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-sky-500/50 text-sky-400 hover:text-white transition-all"
        >
          <Zap className="w-4 h-4 group-hover:animate-pulse" />
          <span className="text-sm font-medium">{t("common.details")}</span>
          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </Link>
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-8 h-8 bg-linear-to-br from-sky-500/10 to-cyan-500/10 border-l border-b border-sky-500/20 rounded-bl-2xl" />
      </div>
    </motion.div>
  );
}

export default GameCard;