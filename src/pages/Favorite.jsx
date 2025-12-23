import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, Trash2, Filter, Search, Grid3x3, List, Star, Gamepad2, 
  Clock, Eye, AlertCircle, ChevronRight, X, Download, Play, 
  Share2, MoreVertical, Tag, Calendar, Users, Trophy, Zap, 
  Bookmark, ExternalLink, ChevronLeft, Filter as FilterIcon, 
  SortAsc, Crown, Image as ImageIcon
} from "lucide-react";
import gamesData from "../json/data/games.json";

function Favorite() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState("grid");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedSort, setSelectedSort] = useState("recent");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [selectedGames, setSelectedGames] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (user) loadUserFavorites();
    else setLoading(false);
  }, [user]);

  const getDefaultThumbnail = (gameId, genre) => {
    const genreColors = {
      "Action": "from-red-500 to-orange-500",
      "Adventure": "from-emerald-500 to-green-500",
      "RPG": "from-purple-500 to-pink-500",
      "Strategy": "from-amber-500 to-yellow-500",
      "Sports": "from-blue-500 to-cyan-500",
      "FPS": "from-rose-500 to-pink-500",
      "Puzzle": "from-indigo-500 to-violet-500",
      "Racing": "from-sky-500 to-blue-500",
      "Default": "from-slate-500 to-slate-700"
    };
    
    const color = genreColors[genre] || genreColors.Default;
    
    return (
      <div className={`w-full h-full flex items-center justify-center bg-linear-to-br ${color}`}>
        <div className="text-center">
          <Gamepad2 className="w-12 h-12 text-white/80 mx-auto mb-2" />
          <span className="text-white/90 font-bold text-sm">Game {gameId}</span>
        </div>
      </div>
    );
  };

  const loadUserFavorites = () => {
    setLoading(true);
    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const currentUser = users.find(u => u.email === user.email);
      if (currentUser && currentUser.favorites) {
        const myFavs = gamesData
          .filter(game => currentUser.favorites.includes(game.id))
          .map(game => ({
            ...game,
            thumbnail: game.thumbnail || `https://picsum.photos/seed/${game.id}/300/200`,
            description: game.description || t("favorites.default_description") || "An exciting game with great gameplay.",
            platform: game.platform || "PC",
            genre: game.genre || "Action",
            rating: game.rating || 4.0 + Math.random(),
            popularity: game.popularity || Math.floor(Math.random() * 100)
          }));
        setFavorites(myFavs);
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredFavorites = favorites
    .filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === "All" || game.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      switch (selectedSort) {
        case "name":
          return a.title.localeCompare(b.title);
        case "recent":
          return b.id - a.id;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "popular":
          return (b.popularity || 0) - (a.popularity || 0);
        default:
          return 0;
      }
    });

  const genres = ["All", ...new Set(favorites.map(game => game.genre).filter(Boolean))];
  const sortOptions = [
    { value: "recent", label: t("favorites.sort.recent") || "Recently Added" },
    { value: "name", label: t("favorites.sort.name") || "Name (A-Z)" },
    { value: "rating", label: t("favorites.sort.rating") || "Highest Rated" },
    { value: "popular", label: t("favorites.sort.popular") || "Most Popular" }
  ];

  const removeFavorite = (gameId) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.email === user.email);
    if (userIndex !== -1) {
      users[userIndex].favorites = users[userIndex].favorites.filter(id => id !== gameId);
      localStorage.setItem('users', JSON.stringify(users));
      setFavorites(prev => prev.filter(game => game.id !== gameId));
      setMessage({ type: 'success', text: t("success.game_removed") || "Game removed from favorites" });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  const removeSelectedGames = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.email === user.email);
    if (userIndex !== -1) {
      users[userIndex].favorites = users[userIndex].favorites.filter(
        id => !selectedGames.includes(id)
      );
      localStorage.setItem('users', JSON.stringify(users));
      setFavorites(prev => prev.filter(game => !selectedGames.includes(game.id)));
      setSelectedGames([]);
      setMessage({ 
        type: 'success', 
        text: t("favorites.removed_selected", { count: selectedGames.length }) || 
              `${selectedGames.length} games removed` 
      });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  const toggleGameSelection = (gameId) => {
    setSelectedGames(prev => 
      prev.includes(gameId) 
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId]
    );
  };

  const selectAllGames = () => {
    if (selectedGames.length === filteredFavorites.length) {
      setSelectedGames([]);
    } else {
      setSelectedGames(filteredFavorites.map(game => game.id));
    }
  };

  const getGenreColor = (genre) => {
    const colors = {
      "Action": "from-red-500 to-orange-500",
      "Adventure": "from-emerald-500 to-green-500",
      "RPG": "from-purple-500 to-pink-500",
      "Strategy": "from-amber-500 to-yellow-500",
      "Sports": "from-blue-500 to-cyan-500",
      "FPS": "from-rose-500 to-pink-500",
      "Puzzle": "from-indigo-500 to-violet-500",
      "Racing": "from-sky-500 to-blue-500",
      "Default": "from-slate-500 to-slate-700"
    };
    return colors[genre] || colors.Default;
  };

  const getSafeThumbnail = (game) => {
    if (game.thumbnail && game.thumbnail.startsWith('http')) {
      return game.thumbnail;
    }
    if (game.thumbnail && game.thumbnail.startsWith('/')) {
      return game.thumbnail;
    }
    return null;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="p-8 bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700/50 shadow-xl">
            <Heart className="w-16 h-16 text-pink-500/50 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">{t("auth.sign_in_required") || "Sign In Required"}</h2>
            <p className="text-slate-400 mb-8">
              {t("favorites.sign_in_required") || "Please sign in to view your favorite games"}
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/login" className="px-8 py-3 bg-pink-600 hover:bg-pink-700 rounded-xl font-bold transition">
                {t("nav.login") || "Sign In"}
              </Link>
              <Link to="/register" className="px-8 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl font-bold transition">
                {t("nav.register") || "Register"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-pink-500/30 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-slate-400">{t("favorites.loading") || "Loading your favorite games..."}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-pink-500/10 rounded-lg">
                  <Heart className="text-pink-400" size={20} />
                </div>
                <span className="text-sm text-slate-500 uppercase tracking-wider">
                  {t("favorites.my_collection") || "My Collection"}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 flex items-center gap-3">
                <span className="bg-linear-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                  {t("nav.favorites") || "Favorites"}
                </span>
                <div className="text-lg text-slate-500">({favorites.length})</div>
              </h1>
              <p className="text-slate-400">
                {t("favorites.subtitle") || "Your personal collection of favorite games"}
                {favorites.length > 0 && ` • ${favorites.length} ${t("favorites.games_saved") || "games saved"}`}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* View Toggle */}
              <div className="flex items-center gap-2 bg-slate-800/50 p-1 rounded-xl border border-slate-700/50">
                <button 
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition ${viewMode === "grid" ? "bg-pink-500/20 text-pink-400" : "text-slate-400 hover:text-white"}`}
                >
                  <Grid3x3 size={20} />
                </button>
                <button 
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition ${viewMode === "list" ? "bg-pink-500/20 text-pink-400" : "text-slate-400 hover:text-white"}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Message Alert */}
          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-2xl border ${message.type === 'success' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-red-500/20 border-red-500/50 text-red-400'}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {message.type === 'success' ? (
                    <Heart className="text-emerald-400" size={18} />
                  ) : (
                    <AlertCircle size={18} />
                  )}
                  <span>{message.text}</span>
                </div>
                <button onClick={() => setMessage({ type: '', text: '' })}>
                  <X size={18} className="text-slate-400 hover:text-white" />
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Filters & Search */}
        <div className="mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Bar */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-400 transition" size={18} />
              <input
                type="text"
                placeholder={t("favorites.search_placeholder") || "Search your favorite games..."}
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl py-3 pl-12 pr-4 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition placeholder:text-slate-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Genre Filter */}
            <select
              className="bg-slate-800/50 border border-slate-700/50 rounded-2xl py-3 px-4 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition cursor-pointer"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="All">{t("games.filter.all_genres") || "All Genres"}</option>
              {genres.slice(1).map(g => (
                <option key={g} value={g}>{t(`genres.${g.toLowerCase()}`) || g}</option>
              ))}
            </select>
            
            {/* Sort Options */}
            <select
              className="bg-slate-800/50 border border-slate-700/50 rounded-2xl py-3 px-4 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition cursor-pointer"
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          {/* Selection Actions */}
          {selectedGames.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-pink-500/10 border border-pink-500/30 rounded-2xl p-4"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                    <span className="font-bold">
                      {selectedGames.length} {t("favorites.games_selected") || "games selected"}
                    </span>
                  </div>
                  <button
                    onClick={selectAllGames}
                    className="text-sm text-pink-400 hover:text-pink-300 transition"
                  >
                    {selectedGames.length === filteredFavorites.length 
                      ? t("favorites.deselect_all") || 'Deselect All' 
                      : t("favorites.select_all") || 'Select All'
                    }
                  </button>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={removeSelectedGames}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-white rounded-xl transition"
                  >
                    <Trash2 size={16} />
                    {t("favorites.remove_selected") || "Remove Selected"}
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition">
                    <Share2 size={16} />
                    {t("favorites.share_list") || "Share List"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Games Grid/List */}
        {filteredFavorites.length > 0 ? (
          <>
            {/* Grid View */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredFavorites.map((game) => {
                  const safeThumbnail = getSafeThumbnail(game);
                  
                  return (
                    <motion.div
                      key={game.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ scale: 1.02, translateY: -5 }}
                      className={`group relative bg-slate-800/50 backdrop-blur-sm rounded-3xl overflow-hidden border transition-all duration-300 ${
                        selectedGames.includes(game.id)
                          ? 'border-pink-500 ring-2 ring-pink-500/30'
                          : 'border-slate-700/50 hover:border-slate-600/50'
                      } shadow-xl`}
                    >
                      {/* Selection Checkbox */}
                      <button
                        onClick={() => toggleGameSelection(game.id)}
                        className={`absolute top-4 left-4 z-20 w-6 h-6 rounded-lg border transition ${
                          selectedGames.includes(game.id)
                            ? 'bg-pink-500 border-pink-500'
                            : 'bg-slate-900/80 border-slate-600'
                        }`}
                      >
                        {selectedGames.includes(game.id) && (
                          <div className="w-2 h-2 bg-white rounded-sm mx-auto"></div>
                        )}
                      </button>
                      
                      {/* Game Image */}
                      <div className="relative h-48 overflow-hidden bg-slate-900">
                        {safeThumbnail ? (
                          <img 
                            src={safeThumbnail} 
                            alt={game.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentElement.innerHTML = getDefaultThumbnail(game.id, game.genre);
                            }}
                          />
                        ) : (
                          getDefaultThumbnail(game.id, game.genre)
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                        
                        {/* Genre Badge */}
                        {game.genre && (
                          <div className="absolute top-4 right-4">
                            <div className={`px-3 py-1 rounded-lg bg-linear-to-r ${getGenreColor(game.genre)} text-white text-xs font-bold`}>
                              {t(`genres.${game.genre.toLowerCase()}`) || game.genre}
                            </div>
                          </div>
                        )}
                        
                        {/* Rating Badge */}
                        <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-lg">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="text-sm font-bold">{game.rating ? game.rating.toFixed(1) : '4.5'}</span>
                        </div>
                      </div>
                      
                      {/* Game Info */}
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-lg mb-1 group-hover:text-pink-400 transition">
                              {game.title}
                            </h3>
                            <div className="flex items-center gap-3 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <Gamepad2 size={12} />
                                {t(`platforms.${game.platform?.toLowerCase()}`) || game.platform || "PC"}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users size={12} />
                                {Math.floor(Math.random() * 100) + 1}K {t("favorites.players") || "players"}
                              </span>
                            </div>
                          </div>
                          <button className="text-slate-400 hover:text-white">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                        
                        <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                          {game.description || t("favorites.default_game_description") || "Exciting gameplay with stunning graphics and immersive experience."}
                        </p>
                        
                        {/* Action Buttons */}
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            <Link
                              to={`/games/${game.id}`}
                              className="p-2 bg-slate-700/50 hover:bg-sky-500/20 rounded-lg text-sky-400 hover:text-sky-300 transition group"
                              title={t("buttons.view_details") || "View Details"}
                            >
                              <Eye size={18} />
                            </Link>
                            <button 
                              className="p-2 bg-slate-700/50 hover:bg-emerald-500/20 rounded-lg text-emerald-400 hover:text-emerald-300 transition"
                              title={t("buttons.play_now") || "Play Now"}
                            >
                              <Play size={18} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFavorite(game.id)}
                            className="flex items-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl transition"
                            title={t("buttons.remove_from_favorites") || "Remove from Favorites"}
                          >
                            <Trash2 size={16} />
                            <span className="text-sm">{t("buttons.remove") || "Remove"}</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {filteredFavorites.map((game) => {
                  const safeThumbnail = getSafeThumbnail(game);
                  
                  return (
                    <motion.div
                      key={game.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={`group flex items-stretch bg-slate-800/50 backdrop-blur-sm rounded-3xl overflow-hidden border transition-all ${
                        selectedGames.includes(game.id)
                          ? 'border-pink-500 ring-2 ring-pink-500/30'
                          : 'border-slate-700/50 hover:border-slate-600/50'
                      }`}
                    >
                      {/* Selection Checkbox */}
                      <button
                        onClick={() => toggleGameSelection(game.id)}
                        className={`w-16 flex items-center justify-center border-r transition ${
                          selectedGames.includes(game.id)
                            ? 'bg-pink-500/10 border-pink-500/30'
                            : 'border-slate-700/50'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded border ${
                          selectedGames.includes(game.id)
                            ? 'bg-pink-500 border-pink-500'
                            : 'border-slate-600'
                        }`}>
                          {selectedGames.includes(game.id) && (
                            <div className="w-3 h-3 bg-white rounded-sm mx-auto mt-1"></div>
                          )}
                        </div>
                      </button>
                      
                      {/* Game Image */}
                      <div className="w-48 h-48 relative overflow-hidden bg-slate-900">
                        {safeThumbnail ? (
                          <img 
                            src={safeThumbnail} 
                            alt={game.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentElement.innerHTML = getDefaultThumbnail(game.id, game.genre);
                            }}
                          />
                        ) : (
                          getDefaultThumbnail(game.id, game.genre)
                        )}
                        <div className="absolute inset-0 bg-linear-to-r from-slate-900/50 to-transparent"></div>
                      </div>
                      
                      {/* Game Info */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold group-hover:text-pink-400 transition">
                                {game.title}
                              </h3>
                              {game.genre && (
                                <div className={`px-3 py-1 rounded-lg bg-linear-to-r ${getGenreColor(game.genre)} text-white text-xs font-bold`}>
                                  {t(`genres.${game.genre.toLowerCase()}`) || game.genre}
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-6 text-sm text-slate-400 mb-3">
                              <span className="flex items-center gap-2">
                                <Gamepad2 size={14} />
                                {t(`platforms.${game.platform?.toLowerCase()}`) || game.platform || "PC"}
                              </span>
                              <span className="flex items-center gap-2">
                                <Star size={14} className="text-amber-400" />
                                <span className="font-bold text-white">{game.rating ? game.rating.toFixed(1) : '4.5'}</span> {t("favorites.rating") || "rating"}
                              </span>
                              <span className="flex items-center gap-2">
                                <Users size={14} />
                                {Math.floor(Math.random() * 100) + 1}K {t("favorites.players") || "players"}
                              </span>
                            </div>
                            
                            <p className="text-slate-400 line-clamp-2">
                              {game.description || t("favorites.default_game_description") || "An immersive gaming experience with stunning graphics and engaging gameplay."}
                            </p>
                          </div>
                          
                          <div className="flex flex-col gap-2 ml-4">
                            <Link
                              to={`/games/${game.id}`}
                              className="p-3 bg-sky-500/10 hover:bg-sky-500/20 rounded-xl text-sky-400 transition flex items-center gap-2"
                            >
                              <Eye size={18} />
                              {t("buttons.view") || "View"}
                            </Link>
                            <button
                              onClick={() => removeFavorite(game.id)}
                              className="p-3 bg-red-500/10 hover:bg-red-500/20 rounded-xl text-red-400 transition flex items-center gap-2"
                            >
                              <Trash2 size={18} />
                              {t("buttons.remove") || "Remove"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Results Count */}
            <div className="mt-10 pt-6 border-t border-slate-800">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <div className="flex items-center gap-4">
                  <span>
                    {t("favorites.showing_results", { 
                      showing: filteredFavorites.length, 
                      total: favorites.length 
                    }) || `Showing ${filteredFavorites.length} of ${favorites.length} games`}
                  </span>
                  {selectedGenre !== 'All' && (
                    <span className="px-3 py-1 bg-slate-800 rounded-lg">
                      {t("labels.genre") || "Genre"}: {t(`genres.${selectedGenre.toLowerCase()}`) || selectedGenre}
                    </span>
                  )}
                </div>
                <Link to="/games" className="text-pink-400 hover:text-pink-300 transition flex items-center gap-2">
                  {t("favorites.explore_more") || "Explore More Games"}
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-slate-800/20 backdrop-blur-sm rounded-3xl border border-dashed border-slate-700/50"
          >
            <div className="max-w-md mx-auto">
              <div className="relative mb-6">
                <Heart className="w-20 h-20 text-slate-700 mx-auto" />
                <div className="absolute inset-0 flex items-center justify-center">
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">
                {t("favorites.empty_title") || "Your Favorites List is Empty"}
              </h3>
              <p className="text-slate-400 mb-8">
                {favorites.length === 0 
                  ? t("favorites.empty_description") || "Start building your gaming collection by adding games you love"
                  : t("favorites.no_matches") || "No games match your current filters. Try adjusting your search criteria."
                }
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  to="/games"
                  className="px-8 py-3 bg-linear-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 rounded-xl font-bold transition flex items-center gap-3"
                >
                  <Gamepad2 size={18} />
                  {t("favorites.browse_games") || "Browse Games"}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Favorite;