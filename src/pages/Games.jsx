import { useState, useEffect } from "react";
import games from "../json/data/games.json";
import GameCard from "../components/GameCard";
import Pagination from "../components/Pagination";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, SortAsc, Grid3x3, Gamepad2, Sparkles, Sliders, X, TrendingUp, Users, Zap, Clock, Menu, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function Games() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [sort, setSort] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const itemsPerPage = 12;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const genres = ["All", ...new Set(games.map((g) => g.genre))];
  
  const gameStats = {
    total: games.length,
    activePlayers: Math.floor(games.length * 15432),
    avgRating: "4.7",
    newThisWeek: games.filter(g => g.release_date?.includes("2024")).length
  };

  const filteredGames = games
    .filter((game) =>
      game.title.toLowerCase().includes(search.toLowerCase()) ||
      game.genre.toLowerCase().includes(search.toLowerCase()) ||
      game.publisher?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((game) =>
      genre === "All" ? true : game.genre === genre
    )
    .sort((a, b) => {
      switch (sort) {
        case "newest": return new Date(b.release_date || 0) - new Date(a.release_date || 0);
        case "oldest": return new Date(a.release_date || 0) - new Date(b.release_date || 0);
        case "name-asc": return a.title.localeCompare(b.title);
        case "name-desc": return b.title.localeCompare(a.title);
        case "popular": return Math.random() - 0.5; 
        default: return 0;
      }
    });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedGames = filteredGames.slice(startIndex, startIndex + itemsPerPage);

  const clearFilters = () => {
    setSearch("");
    setGenre("All");
    setCurrentPage(1);
    setActiveFilters([]);
  };

  const getSortLabel = (value) => {
    const labels = {
      "newest": t("games.sort.newest"),
      "oldest": t("games.sort.oldest"),
      "name-asc": t("games.sort.name_asc"),
      "name-desc": t("games.sort.name_desc"),
      "popular": t("games.sort.popular")
    };
    return labels[value] || value;
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-6 md:py-12 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ x: [0, 100, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-sky-500/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -100, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-cyan-500/5 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Stats Bar - Mobile friendly */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8 lg:mb-12 px-2"
          >
            {[
              { icon: <Gamepad2 className="w-3 h-3 md:w-4 md:h-4" />, label: t("games.stats.total_games"), value: gameStats.total },
              { icon: <Users className="w-3 h-3 md:w-4 md:h-4" />, label: t("games.stats.active_players"), value: `${Math.floor(gameStats.activePlayers / 1000000)}M+` },
              { icon: <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />, label: t("games.stats.avg_rating"), value: gameStats.avgRating },
              { icon: <Clock className="w-3 h-3 md:w-4 md:h-4" />, label: t("games.stats.new_this_week"), value: gameStats.newThisWeek },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: isMobile ? 1 : 1.05, y: isMobile ? 0 : -2 }}
                className="p-3 md:p-4 rounded-xl bg-slate-900/40 backdrop-blur-sm border border-slate-700/30"
              >
                <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                  <div className="p-1 md:p-1.5 rounded-lg bg-sky-500/20">
                    {stat.icon}
                  </div>
                  <span className="text-xs md:text-sm text-slate-400 truncate">
                    {stat.label}
                  </span>
                </div>
                <div className="text-lg md:text-xl lg:text-2xl font-bold truncate">
                  {stat.value}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center px-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block"
            >
              <motion.div
                whileHover={{ scale: isMobile ? 1 : 1.05 }}
                className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-slate-900/40 backdrop-blur-sm border border-slate-700/30 mb-4 md:mb-6"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 md:w-2 md:h-2 bg-linear-to-r from-sky-500 to-cyan-400 rounded-full"
                />
                <span className="text-xs md:text-sm font-medium text-slate-300">
                  {t("games.stats.premium_collection")}
                </span>
                <Sparkles className="w-3 h-3 md:w-3 md:h-3 text-sky-400 animate-pulse" />
              </motion.div>

              <div className="flex flex-col items-center gap-4 md:gap-6 mb-6 md:mb-8">
                <Gamepad2 className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-sky-400" />
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  <span className="text-white">{t("games.title")}</span>
                  <br />
                  <motion.span
                    initial={{ backgroundPosition: "200% center" }}
                    animate={{ backgroundPosition: "-200% center" }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 via-cyan-300 to-sky-400 bg-size-[200%_auto] text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                  >
                    {t("games.subtitle")}
                  </motion.span>
                </h1>
              </div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm md:text-base lg:text-lg text-slate-400 max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed px-2"
              >
                {t("games.desc")}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pb-8 md:pb-12">
        {/* Filters Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/40 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 md:mb-8 border border-slate-700/30 shadow-xl"
        >
          {/* Active Filters */}
          {(search || genre !== "All") && (
            <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
              {search && (
                <span className="inline-flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-sky-500/20 text-sky-400 text-xs md:text-sm">
                  Search: "{search.length > 15 ? `${search.substring(0, 15)}...` : search}"
                  <button 
                    onClick={() => setSearch("")} 
                    className="hover:text-white transition-colors"
                  >
                    <X className="w-3 h-3 md:w-3 md:h-3" />
                  </button>
                </span>
              )}
              {genre !== "All" && (
                <span className="inline-flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs md:text-sm">
                  Genre: {genre}
                  <button 
                    onClick={() => setGenre("All")} 
                    className="hover:text-white transition-colors"
                  >
                    <X className="w-3 h-3 md:w-3 md:h-3" />
                  </button>
                </span>
              )}
              {(search || genre !== "All") && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white text-xs md:text-sm transition-colors"
                >
                  {t("games.filter.clear_all")}
                  <X className="w-3 h-3 md:w-3 md:h-3" />
                </button>
              )}
            </div>
          )}

          {/* Filter Controls - Desktop */}
          <div className="hidden md:grid md:grid-cols-12 gap-3 md:gap-4">
            {/* Search */}
            <div className="md:col-span-5">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-400 group-focus-within:text-sky-400" />
                <input
                  className="w-full pl-9 md:pl-10 pr-4 py-2.5 md:py-3 bg-slate-900/50 border border-slate-700/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-sky-500/50 transition-all group-hover:border-slate-600/50 text-sm md:text-base"
                  placeholder={t("games.search_placeholder")}
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                />
              </div>
            </div>

            {/* Genre Filter */}
            <div className="md:col-span-4">
              <div className="relative group">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-400" />
                <select
                  className="w-full pl-9 md:pl-10 pr-8 py-2.5 md:py-3 bg-slate-900/50 border border-slate-700/30 rounded-xl text-white appearance-none focus:outline-none focus:border-sky-500/50 transition-all cursor-pointer group-hover:border-slate-600/50 text-sm md:text-base"
                  value={genre}
                  onChange={(e) => { setGenre(e.target.value); setCurrentPage(1); }}
                >
                  {genres.map((g) => (
                    <option key={g} value={g} className="bg-slate-800 py-2">
                      {g === "All" ? t("games.filter.all_genres") : g}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Sort */}
            <div className="md:col-span-3">
              <div className="relative group">
                <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-400" />
                <select
                  className="w-full pl-9 md:pl-10 pr-8 py-2.5 md:py-3 bg-slate-900/50 border border-slate-700/30 rounded-xl text-white appearance-none focus:outline-none focus:border-sky-500/50 transition-all cursor-pointer group-hover:border-slate-600/50 text-sm md:text-base"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="newest" className="bg-slate-800">{t("games.sort.newest")}</option>
                  <option value="oldest" className="bg-slate-800">{t("games.sort.oldest")}</option>
                  <option value="name-asc" className="bg-slate-800">{t("games.sort.name_asc")}</option>
                  <option value="name-desc" className="bg-slate-800">{t("games.sort.name_desc")}</option>
                  <option value="popular" className="bg-slate-800">{t("games.sort.popular")}</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Filter Controls */}
          {showMobileFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden space-y-3 mt-3"
            >
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-sky-500/50 text-sm"
                  placeholder={t("games.search_placeholder")}
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="relative group">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    className="w-full pl-10 pr-8 py-3 bg-slate-900/50 border border-slate-700/30 rounded-xl text-white appearance-none focus:outline-none focus:border-sky-500/50 text-sm"
                    value={genre}
                    onChange={(e) => { setGenre(e.target.value); setCurrentPage(1); }}
                  >
                    {genres.map((g) => (
                      <option key={g} value={g} className="bg-slate-800 py-2">
                        {g === "All" ? t("games.filter.all_genres") : g}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
                
                <div className="relative group">
                  <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    className="w-full pl-10 pr-8 py-3 bg-slate-900/50 border border-slate-700/30 rounded-xl text-white appearance-none focus:outline-none focus:border-sky-500/50 text-sm"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="newest">{t("games.sort.newest")}</option>
                    <option value="oldest">{t("games.sort.oldest")}</option>
                    <option value="name-asc">{t("games.sort.name_asc")}</option>
                    <option value="name-desc">{t("games.sort.name_desc")}</option>
                    <option value="popular">{t("games.sort.popular")}</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </div>
            </motion.div>
          )}

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden flex items-center justify-center gap-2 w-full mt-4 px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/30 text-slate-400 hover:text-white transition-all"
          >
            <Sliders className="w-4 h-4" />
            <span className="text-sm font-medium">{t("games.filter.filters")}</span>
            <div className={`ml-auto transition-transform ${showMobileFilters ? 'rotate-180' : ''}`}>
              {showMobileFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>
        </motion.div>

        {/* Results Count */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 md:mb-6"
        >
          <div>
            <h3 className="text-lg md:text-xl font-bold">
              Showing <span className="text-sky-400">{paginatedGames.length}</span> of{" "}
              <span className="text-cyan-400">{filteredGames.length}</span> games
            </h3>
            <p className="text-xs md:text-sm text-slate-500">
              Sorted by: <span className="text-slate-300 font-medium">{getSortLabel(sort)}</span>
            </p>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-slate-500">
            <Zap className="w-3 h-3 md:w-4 md:h-4" />
            <span>{Math.ceil(filteredGames.length / itemsPerPage)} pages available</span>
          </div>
        </motion.div>

        {/* Games Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-slate-900/30 rounded-2xl animate-pulse h-48 sm:h-56 md:h-64 lg:h-72"
                />
              ))}
            </div>
          ) : (
            <>
              <motion.div 
                layout
                className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
              >
                {paginatedGames.map((game, index) => (
                  <GameCard 
                    key={game.id} 
                    game={game} 
                    index={index} 
                    viewMode={viewMode}
                    isMobile={isMobile}
                  />
                ))}
              </motion.div>

              {paginatedGames.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 md:py-16 px-4"
                >
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-full bg-slate-800/50 flex items-center justify-center">
                      <Search className="w-8 h-8 md:w-10 md:h-10 text-slate-600" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">{t("games.not_found")}</h3>
                    <p className="text-sm md:text-base text-slate-400 mb-4 md:mb-6 px-2">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                    <button
                      onClick={clearFilters}
                      className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/30 text-sky-400 hover:text-white transition-all text-sm md:text-base"
                    >
                      {t("games.clear_filter")}
                      <X className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {filteredGames.length > 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 md:mt-12"
          >
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredGames.length / itemsPerPage)}
              onPageChange={setCurrentPage}
              isMobile={isMobile}
            />
          </motion.div>
        )}
      </section>
    </div>
  );
}

export default Games;