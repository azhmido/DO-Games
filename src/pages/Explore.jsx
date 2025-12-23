import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {Compass, TrendingUp, Star, Users, Clock, Gamepad2, Filter, Search, Sparkles, Zap, Heart, Download, Eye, Crown, Target,Calendar, TrendingDown, Award, Users as UsersIcon, CheckCircle, X, ChevronRight, Plus, ThumbsUp, MessageSquare, Share2, Bookmark, Clock as ClockIcon, ArrowRight, Globe, Tag, TrendingDown as TrendingDownIcon, Flame, Crown as CrownIcon, Gamepad2 as Gamepad2Icon, BarChart3, Trophy, Zap as ZapIcon, Gamepad} from "lucide-react";

function Explore() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedSort, setSelectedSort] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userPreferences, setUserPreferences] = useState({
    favoriteGenres: [],
    playtime: 0,
    skillLevel: "Beginner"
  });

  const getTranslation = (key, defaultValue = "") => {
    const translation = t(key);
    return translation !== key ? translation : defaultValue;
  };

  const genreOptions = [
    { id: "action", label: getTranslation("games.genres.action", "Action") },
    { id: "adventure", label: getTranslation("games.genres.adventure", "Adventure") },
    { id: "rpg", label: getTranslation("games.genres.rpg", "RPG") },
    { id: "battle_royale", label: getTranslation("games.genres.battle_royale", "Battle Royale") },
    { id: "strategy", label: getTranslation("games.genres.strategy", "Strategy") },
    { id: "shooter", label: getTranslation("games.genres.shooter", "Shooter") },
    { id: "racing", label: getTranslation("games.genres.racing", "Racing") },
    { id: "sports", label: getTranslation("games.genres.sports", "Sports") },
    { id: "puzzle", label: getTranslation("games.genres.puzzle", "Puzzle") },
    { id: "horror", label: getTranslation("games.genres.horror", "Horror") },
    { id: "simulation", label: getTranslation("games.genres.simulation", "Simulation") },
    { id: "mmo", label: getTranslation("games.genres.mmo", "MMO") },
    { id: "indie", label: getTranslation("games.genres.indie", "Indie") },
    { id: "arcade", label: getTranslation("games.genres.arcade", "Arcade") },
    { id: "card_game", label: getTranslation("games.genres.card_game", "Card Game") },
    { id: "fighting", label: getTranslation("games.genres.fighting", "Fighting") },
    { id: "survival", label: getTranslation("games.genres.survival", "Survival") },
    { id: "sandbox", label: getTranslation("games.genres.sandbox", "Sandbox") },
    { id: "fps", label: getTranslation("games.genres.fps", "FPS") },
    { id: "moba", label: getTranslation("games.genres.moba", "MOBA") },
    { id: "tactical", label: getTranslation("games.genres.tactical", "Tactical") },
    { id: "music", label: getTranslation("games.genres.music", "Music") },
    { id: "educational", label: getTranslation("games.genres.educational", "Educational") },
    { id: "casual", label: getTranslation("games.genres.casual", "Casual") }
  ];

  const platformOptions = [
    { id: "pc", label: getTranslation("games.platforms.pc", "PC") },
    { id: "mobile", label: getTranslation("games.platforms.mobile", "Mobile") },
    { id: "console", label: getTranslation("games.platforms.console", "Console") },
    { id: "browser", label: getTranslation("games.platforms.browser", "Browser") },
    { id: "windows", label: getTranslation("games.platforms.windows", "Windows") },
    { id: "mac", label: getTranslation("games.platforms.mac", "Mac") },
    { id: "linux", label: getTranslation("games.platforms.linux", "Linux") },
    { id: "ios", label: getTranslation("games.platforms.ios", "iOS") },
    { id: "android", label: getTranslation("games.platforms.android", "Android") },
    { id: "ps5", label: getTranslation("games.platforms.ps5", "PS5") },
    { id: "xbox", label: getTranslation("games.platforms.xbox", "Xbox") },
    { id: "switch", label: getTranslation("games.platforms.switch", "Switch") },
    { id: "playstation", label: getTranslation("games.platforms.playstation", "PlayStation") }
  ];

  const allGames = [
    { 
      id: 1, 
      title: "Valorant", 
      genre: ["fps", "shooter", "tactical"], 
      rating: 4.8, 
      players: "2.5M", 
      trend: "up", 
      icon: "🎯",
      color: "from-red-500/20 to-orange-500/20",
      description: "5v5 character-based tactical shooter",
      platforms: ["pc"],
      free: true,
      multiplayer: true,
      difficulty: "high",
      avgPlaytime: "40h",
      releaseDate: "2020-06-02",
      tags: ["competitive", "esports", "team_based"],
      featured: true
    },
    { 
      id: 2, 
      title: "Genshin Impact", 
      genre: ["rpg", "action", "adventure"], 
      rating: 4.7, 
      players: "1.8M", 
      trend: "up", 
      icon: "⚔️",
      color: "from-purple-500/20 to-pink-500/20",
      description: "Open-world action RPG with gacha elements",
      platforms: ["pc", "mobile", "playstation"],
      free: true,
      multiplayer: true,
      difficulty: "medium",
      avgPlaytime: "120h",
      releaseDate: "2020-09-28",
      tags: ["anime", "gacha", "open_world"],
      featured: true
    },
    { 
      id: 3, 
      title: "Marvel Rivals", 
      genre: ["shooter"], 
      rating: 4.5, 
      players: "3.2M", 
      trend: "stable", 
      icon: "⚡",
      color: "from-blue-500/20 to-cyan-500/20",
      description: "Superhero team shooter",
      platforms: ["pc"],
      free: true,
      multiplayer: true,
      difficulty: "high",
      avgPlaytime: "500h",
      releaseDate: "2024-12-06",
      tags: ["esports", "strategic", "6v6"],
      featured: false
    },
    { 
      id: 4, 
      title: "Fortnite", 
      genre: ["battle_royale", "shooter"], 
      rating: 4.6, 
      players: "2.1M", 
      trend: "up", 
      icon: "🛡️",
      color: "from-green-500/20 to-emerald-500/20",
      description: "Battle royale with building mechanics",
      platforms: ["pc", "console", "mobile"],
      free: true,
      multiplayer: true,
      difficulty: "medium",
      avgPlaytime: "80h",
      releaseDate: "2017-07-25",
      tags: ["battle_royale", "building", "cross_play"],
      featured: true
    },
    { 
      id: 5, 
      title: "Dota 2", 
      genre: ["moba", "strategy"], 
      rating: 4.3, 
      players: "800K", 
      trend: "stable", 
      icon: "⚔️",
      color: "from-amber-500/20 to-yellow-500/20",
      description: "Complex team strategy game",
      platforms: ["pc"],
      free: true,
      multiplayer: true,
      difficulty: "very_high",
      avgPlaytime: "300h",
      releaseDate: "2013-07-09",
      tags: ["complex", "strategic", "5v5"],
      featured: false
    },
    { 
      id: 6, 
      title: "Apex Legends", 
      genre: ["battle_royale", "fps"], 
      rating: 4.4, 
      players: "1.5M", 
      trend: "up", 
      icon: "🎯",
      color: "from-rose-500/20 to-pink-500/20",
      description: "Hero-based battle royale",
      platforms: ["pc", "console"],
      free: true,
      multiplayer: true,
      difficulty: "medium",
      avgPlaytime: "60h",
      releaseDate: "2019-02-04",
      tags: ["hero_shooter", "battle_royale", "squad"],
      featured: false
    },
    { 
      id: 7, 
      title: "Rocket League", 
      genre: ["sports", "racing", "action"], 
      rating: 4.6, 
      players: "8.5M", 
      trend: "stable", 
      icon: "🚗",
      color: "from-sky-500/20 to-cyan-500/20",
      description: "Soccer meets rocket-powered cars",
      platforms: ["pc", "console", "mobile"],
      free: true,
      multiplayer: true,
      difficulty: "medium",
      avgPlaytime: "150h",
      releaseDate: "2015-07-07",
      tags: ["sports", "racing", "competitive"],
      featured: true
    },
    { 
      id: 8, 
      title: "PUBG: BATTLEGROUNDS", 
      genre: ["battle_royale", "fps", "shooter"], 
      rating: 4.2, 
      players: "15M", 
      trend: "stable", 
      icon: "🎯",
      color: "from-orange-500/20 to-red-500/20",
      description: "Original battle royale game",
      platforms: ["pc", "console", "mobile"],
      free: true,
      multiplayer: true,
      difficulty: "high",
      avgPlaytime: "200h",
      releaseDate: "2017-12-20",
      tags: ["battle_royale", "survival", "tactical"],
      featured: false
    },
  ];

  // Opsi sorting dengan terjemahan
  const sortOptions = [
    { id: "popular", label: getTranslation("games.sort.popular", "Most Popular"), icon: <Flame className="w-4 h-4" /> },
    { id: "rating", label: getTranslation("games.sort.highest_rated", "Highest Rated"), icon: <Star className="w-4 h-4" /> },
    { id: "new", label: getTranslation("games.sort.newest", "New Releases"), icon: <Zap className="w-4 h-4" /> },
    { id: "trending", label: getTranslation("games.sort.trending", "Trending Now"), icon: <TrendingUp className="w-4 h-4" /> },
    { id: "easy", label: getTranslation("explore.beginner_friendly", "Beginner Friendly"), icon: <Target className="w-4 h-4" /> },
    { id: "multiplayer", label: getTranslation("explore.best_multiplayer", "Best Multiplayer"), icon: <Users className="w-4 h-4" /> }
  ];

  useEffect(() => {
    if (user) {
      const preferences = {
        favoriteGenres: user.favoriteGenres || [],
        playtime: user.totalHours || 0,
        skillLevel: user.gamingLevel || "Beginner"
      };
      setUserPreferences(preferences);
      const recommendedGames = getPersonalizedRecommendations(allGames, preferences);
      setGames(recommendedGames);
      setFilteredGames(recommendedGames);
    } else {
      setGames(allGames);
      setFilteredGames(allGames);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    let result = [...games];
    if (searchQuery) {
      result = result.filter(game =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.genre.some(g => {
          const genreLabel = genreOptions.find(opt => opt.id === g)?.label || g;
          return genreLabel.toLowerCase().includes(searchQuery.toLowerCase());
        }) ||
        game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    if (selectedGenres.length > 0) {
      result = result.filter(game =>
        game.genre.some(g => selectedGenres.includes(g))
      );
    }
    if (selectedPlatforms.length > 0) {
      result = result.filter(game =>
        game.platforms.some(p => selectedPlatforms.includes(p))
      );
    }
    result = sortGames(result, selectedSort);
    setFilteredGames(result);
  }, [searchQuery, selectedGenres, selectedPlatforms, selectedSort, games]);

  const getPersonalizedRecommendations = (gamesList, preferences) => {
    let scoredGames = gamesList.map(game => {
      let score = 0;
      if (preferences.favoriteGenres.length > 0) {
        const genreMatches = game.genre.filter(g => 
          preferences.favoriteGenres.includes(g)
        ).length;
        score += genreMatches * 10;
      }
      if (preferences.skillLevel === "Beginner" && game.difficulty === "low") score += 5;
      else if (preferences.skillLevel === "Intermediate" && game.difficulty === "medium") score += 5;
      else if (preferences.skillLevel === "Advanced" && game.difficulty === "high") score += 5;
      
      if (preferences.playtime < 50 && game.avgPlaytime < "50h") score += 3;
      score += (game.rating - 3) * 2;
      if (game.featured) score += 5;
      return { ...game, personalScore: score };
    });
    scoredGames.sort((a, b) => b.personalScore - a.personalScore);
    return scoredGames.map(({ personalScore, ...game }) => game);
  };

  const sortGames = (gamesList, sortBy) => {
    const gamesCopy = [...gamesList];
    switch (sortBy) {
      case "rating": return gamesCopy.sort((a, b) => b.rating - a.rating);
      case "new": return gamesCopy.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
      case "trending": return gamesCopy.sort((a, b) => {
          const trendValue = { "up": 3, "stable": 2, "down": 1 };
          return trendValue[b.trend] - trendValue[a.trend];
        });
      case "easy": return gamesCopy.sort((a, b) => {
          const difficultyValue = { "low": 3, "medium": 2, "high": 1, "very_high": 0 };
          return difficultyValue[b.difficulty] - difficultyValue[a.difficulty];
        });
      case "multiplayer": return gamesCopy.filter(game => game.multiplayer).concat(gamesCopy.filter(game => !game.multiplayer));
      default: return gamesCopy.sort((a, b) => parseFloat(b.players.replace('M', '000').replace('K', '')) - parseFloat(a.players.replace('M', '000').replace('K', '')));
    }
  };

  const toggleGenre = (genre) => {
    setSelectedGenres(prev => prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]);
  };

  const togglePlatform = (platform) => {
    setSelectedPlatforms(prev => prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGenres([]);
    setSelectedPlatforms([]);
    setSelectedSort("popular");
  };

  const getGenreLabel = (genreId) => {
    console.log(`🔍 getGenreLabel called with: ${genreId}`);
    
    const found = genreOptions.find(g => g.id === genreId);
    
    if (!found) {
      console.warn(`⚠️ Genre "${genreId}" not found in genreOptions`);
      console.log(`Available genres:`, genreOptions.map(g => g.id));
      return genreId;
    }
    
    console.log(`✅ Found genre: ${found.id} = "${found.label}"`);
    return found.label;
  };

  const getPlatformLabel = (platformId) => {
    console.log(`🔍 getPlatformLabel called with: ${platformId}`);
    
    const found = platformOptions.find(p => p.id === platformId);
    
    if (!found) {
      console.warn(`⚠️ Platform "${platformId}" not found in platformOptions`);
      console.log(`Available platforms:`, platformOptions.map(p => p.id));
      return platformId;
    }
    
    console.log(`✅ Found platform: ${found.id} = "${found.label}"`);
    return found.label;
  };

  const getTagLabel = (tagId) => {
    const translation = getTranslation(`tags.${tagId}`, tagId);
    console.log(`🔍 Tag: ${tagId} -> "${translation}"`);
    return translation;
  };

  const renderGameCard = (game, index) => (
    <motion.div 
      key={game.id} 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="group relative bg-linear-to-br from-slate-900/40 to-slate-800/20 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/30 hover:border-sky-500/30 transition-all duration-300"
    >
      {/* Hover Glow */}
      <div className="absolute inset-0 bg-linear-to-br from-sky-500/0 via-sky-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Featured Badge */}
      {game.featured && (
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-linear-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <CrownIcon className="w-3 h-3" />
            {getTranslation("games.card.featured", "FEATURED")}
          </span>
        </div>
      )}

      <div className="p-6 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl bg-linear-to-r ${game.color} border border-slate-700/50`}>
              <span className="text-2xl">{game.icon}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">{game.title}</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {game.genre.slice(0, 2).map((g, index) => {
                  console.log(`🎮 Game: ${game.title}, Genre: ${g}`);
                  return (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-slate-800/50 text-sky-300 rounded-full text-xs font-medium border border-slate-700/50"
                    >
                      {getGenreLabel(g)}
                    </span>
                  );
                })}
                {game.genre.length > 2 && (
                  <span className="px-2 py-1 bg-slate-800/70 text-slate-400 rounded-full text-xs">
                    +{game.genre.length - 2}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${game.trend === "up" ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-slate-800/50 text-slate-300 border border-slate-700/30"}`}>
            {game.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDownIcon className="w-3 h-3" />}
            {game.trend === "up" ? getTranslation("explore.trending_up", "Rising") : getTranslation("explore.trending_stable", "Stable")}
          </div>
        </div>
        
        <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-2">{game.description}</p>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-amber-500/20">
                <Star className="w-3 h-3 text-amber-400" />
              </div>
              <div>
                <span className="text-white font-bold text-sm">{game.rating}/5.0</span>
                <div className="text-xs text-slate-500">{getTranslation("explore.rating", "Rating")}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-cyan-500/20">
                <UsersIcon className="w-3 h-3 text-cyan-400" />
              </div>
              <div>
                <span className="text-slate-300 text-sm font-medium">{game.players}</span>
                <div className="text-xs text-slate-500">{getTranslation("explore.players", "Players")}</div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-purple-500/20">
                <Target className="w-3 h-3 text-purple-400" />
              </div>
              <div>
                <span className="text-slate-300 text-sm font-medium">
                  {getTranslation(`common.${game.difficulty}`, game.difficulty)}
                </span>
                <div className="text-xs text-slate-500">{getTranslation("explore.difficulty", "Difficulty")}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-green-500/20">
                <ClockIcon className="w-3 h-3 text-green-400" />
              </div>
              <div>
                <span className="text-slate-300 text-sm font-medium">{game.avgPlaytime}</span>
                <div className="text-xs text-slate-500">{getTranslation("explore.avg_playtime", "Avg Playtime")}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Platforms */}
        <div className="flex flex-wrap gap-2 mb-6">
          {game.platforms.map((p, i) => {
            console.log(`🖥️ Game: ${game.title}, Platform: ${p}`); 
            return (
              <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-slate-800/50 text-slate-300 rounded-lg text-xs">
                <Globe className="w-3 h-3" />
                {getPlatformLabel(p)}
              </span>
            );
          })}
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {game.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="px-2 py-1 bg-slate-900/50 text-slate-400 rounded-md text-xs border border-slate-700/50">
              {getTagLabel(tag)}
            </span>
          ))}
        </div>
      </div>
      
      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-8 h-8 bg-linear-to-br from-sky-500/10 to-cyan-500/10 border-l border-b border-sky-500/20 rounded-bl-2xl" />
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ x: [0, 100, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -100, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/40 backdrop-blur-sm border border-slate-700/30 mb-6"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-linear-to-r from-sky-500 to-cyan-400 rounded-full"
                />
                <span className="text-sm font-medium text-slate-300">
                  {getTranslation("explore.smart_discovery", "Smart Discovery")}
                </span>
                <Compass className="w-3 h-3 text-sky-400 animate-pulse" />
              </motion.div>

              <div className="flex flex-col items-center gap-6 mb-8">
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full bg-linear-to-r from-sky-500/20 to-cyan-500/20 blur-md"
                  />
                  <Compass className="w-16 h-16 text-sky-400 relative z-10" />
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-white">{getTranslation("explore.discover_your", "Discover Your")}</span>
                  <br />
                  <motion.span
                    initial={{ backgroundPosition: "200% center" }}
                    animate={{ backgroundPosition: "-200% center" }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 via-cyan-300 to-sky-400 bg-size-[200%_auto]"
                  >
                    {getTranslation("explore.next_favorite_game", "Next Favorite Game")}
                  </motion.span>
                </h1>
              </div>
            </motion.div>
          </div>

          {/* User Stats */}
          {user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12"
            >
              {[
                { 
                  icon: <Gamepad className="w-4 h-4" />, 
                  label: getTranslation("explore.favorite_genre", "Favorite Genre"), 
                  value: userPreferences.favoriteGenres[0] ? 
                    getGenreLabel(userPreferences.favoriteGenres[0])
                    : getTranslation("common.all", "All")
                },
                { 
                  icon: <Clock className="w-4 h-4" />, 
                  label: getTranslation("explore.total_playtime", "Total Playtime"), 
                  value: `${userPreferences.playtime}h` 
                },
                { 
                  icon: <Target className="w-4 h-4" />, 
                  label: getTranslation("explore.skill_level", "Skill Level"), 
                  value: getTranslation(`common.${userPreferences.skillLevel.toLowerCase()}`, userPreferences.skillLevel)
                },
                { 
                  icon: <BarChart3 className="w-4 h-4" />, 
                  label: getTranslation("explore.recommendations", "Recommendations"), 
                  value: filteredGames.length 
                },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="p-4 rounded-xl bg-slate-900/40 backdrop-blur-sm border border-slate-700/30"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-lg bg-sky-500/20">{stat.icon}</div>
                    <span className="text-xs text-slate-400">{stat.label}</span>
                  </div>
                  <div className="text-lg font-bold text-sky-400">{stat.value}</div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Search and Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-slate-700/30 shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search */}
            <div className="md:col-span-6">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-sky-400" />
                <input
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-sky-500/50 transition-all group-hover:border-slate-600/50"
                  placeholder={getTranslation("explore.search_placeholder", "Search games, genres, or features...")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <div className="md:col-span-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-900/50 border border-slate-700/30 rounded-xl text-slate-300 hover:text-white transition-all group"
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">{getTranslation("buttons.filter", "Filters")}</span>
                {(selectedGenres.length > 0 || selectedPlatforms.length > 0) && (
                  <span className="ml-auto px-2 py-0.5 bg-sky-500 text-white text-xs rounded-full">
                    {selectedGenres.length + selectedPlatforms.length}
                  </span>
                )}
              </motion.button>
            </div>

            {/* Sort */}
            <div className="md:col-span-3">
              <div className="relative group">
                <SortOptions 
                  options={sortOptions}
                  selectedSort={selectedSort}
                  setSelectedSort={setSelectedSort}
                />
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedGenres.length > 0 || selectedPlatforms.length > 0) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex flex-wrap gap-2 mt-4"
            >
              {selectedGenres.map(genre => (
                <motion.span
                  key={genre}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-sky-500/20 text-sky-400 text-sm"
                >
                  <Tag className="w-3 h-3" />
                  {getGenreLabel(genre)}
                  <button onClick={() => toggleGenre(genre)} className="hover:text-white ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </motion.span>
              ))}
              {selectedPlatforms.map(platform => (
                <motion.span
                  key={platform}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-cyan-500/20 text-cyan-400 text-sm"
                >
                  <Globe className="w-3 h-3" />
                  {getPlatformLabel(platform)}
                  <button onClick={() => togglePlatform(platform)} className="hover:text-white ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </motion.span>
              ))}
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white text-sm ml-2"
              >
                {getTranslation("games.filter.clear_all", "Clear All")}
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 mb-8 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Filter className="w-5 h-5 text-sky-400" />
                  {getTranslation("explore.filter_games", "Filter Games")}
                </h3>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Genres */}
                <div>
                  <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                    <Gamepad2 className="w-4 h-4 text-sky-400" />
                    {getTranslation("labels.genre", "Genres")}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {genreOptions.map(genre => (
                      <motion.button
                        key={genre.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleGenre(genre.id)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${selectedGenres.includes(genre.id) ? "bg-sky-500 text-white" : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50"}`}
                      >
                        {genre.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Platforms */}
                <div>
                  <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    {getTranslation("labels.platform", "Platforms")}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {platformOptions.map(platform => (
                      <motion.button
                        key={platform.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => togglePlatform(platform.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedPlatforms.includes(platform.id) ? "bg-cyan-500 text-white" : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50"}`}
                      >
                        {platform.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Games Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-slate-900/30 h-96 rounded-2xl animate-pulse"
                />
              ))}
            </div>
          ) : (
            <>
              {filteredGames.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredGames.map((game, index) => renderGameCard(game, index))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-800/50 flex items-center justify-center">
                      <Search className="w-10 h-10 text-slate-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">
                      {getTranslation("games.not_found", "No Games Found")}
                    </h3>
                    <p className="text-slate-400 mb-6">
                      {getTranslation("games.filter.adjust_search", "Try adjusting your filters or search terms to find what you're looking for.")}
                    </p>
                    <button
                      onClick={clearFilters}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/30 text-sky-400 hover:text-white transition-all"
                    >
                      {getTranslation("games.filter.clear_all_filters", "Clear All Filters")}
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}

function SortOptions({ options, selectedSort, setSelectedSort }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(opt => opt.id === selectedSort);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-4 py-3 bg-slate-900/50 border border-slate-700/30 rounded-xl text-slate-300 hover:text-white transition-all group"
      >
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-slate-800/50">
            {selectedOption?.icon}
          </div>
          <span className="text-sm font-medium">{selectedOption?.label}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronRight className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full bg-slate-900 border border-slate-700/30 rounded-xl shadow-xl z-50"
          >
            {options.map(option => (
              <button
                key={option.id}
                onClick={() => {
                  setSelectedSort(option.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all ${
                  selectedSort === option.id
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-300 hover:bg-slate-800/50'
                } ${option.id === options[0].id ? 'rounded-t-xl' : ''} ${option.id === options[options.length - 1].id ? 'rounded-b-xl' : ''}`}
              >
                <div className="p-1 rounded-md bg-slate-800/50">
                  {option.icon}
                </div>
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Explore;