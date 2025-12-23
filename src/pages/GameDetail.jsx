import { useParams, Link } from "react-router-dom";
import games from "../json/data/games.json";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, MessageCircle, Send, Trash2, Heart, Play, Zap, 
  Monitor, Cpu, HardDrive, Download, Users, Clock, Trophy, 
  Star, Shield, Globe, Gamepad2, Share2, Bookmark, 
  ChevronRight, TrendingUp, BarChart3, Calendar, Award
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

function GameDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { t, lang } = useLanguage();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [shareOpen, setShareOpen] = useState(false);

  const game = games.find((g) => g.id === Number(id));

  useEffect(() => {
    if (game) {
      if (user) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const currentUser = users.find(u => u.email === user.email);
        if (currentUser) {
          setIsFavorite(currentUser.favorites?.includes(game.id) || false);
          setIsBookmarked(currentUser.bookmarks?.includes(game.id) || false);
        }
      }
      const allComments = JSON.parse(localStorage.getItem('game_comments')) || {};
      setComments(allComments[game.id] || []);
    }
  }, [game, user]);

  if (!game) return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 to-slate-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">{t("common.loading")}</h2>
        <div className="w-16 h-16 mx-auto border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );

  const gameStats = {
    rating: (Math.random() * 1 + 4).toFixed(1),
    downloads: Math.floor(Math.random() * 5000000) + 1000000,
    playTime: Math.floor(Math.random() * 100) + 20,
    players: Math.floor(Math.random() * 10000000) + 5000000,
    achievements: Math.floor(Math.random() * 50) + 10,
  };

  const toggleFavorite = () => {
    if (!user) {
      alert(t("common.error_login"));
      return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.email === user.email);
    if (userIndex !== -1) {
      let userFavs = users[userIndex].favorites || [];
      if (isFavorite) userFavs = userFavs.filter(favId => favId !== game.id);
      else userFavs.push(game.id);
      users[userIndex].favorites = userFavs;
      localStorage.setItem('users', JSON.stringify(users));
      setIsFavorite(!isFavorite);
    }
  };

  const toggleBookmark = () => {
    if (!user) {
      alert(t("common.error_login"));
      return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.email === user.email);
    if (userIndex !== -1) {
      let userBookmarks = users[userIndex].bookmarks || [];
      if (isBookmarked) userBookmarks = userBookmarks.filter(bmId => bmId !== game.id);
      else userBookmarks.push(game.id);
      users[userIndex].bookmarks = userBookmarks;
      localStorage.setItem('users', JSON.stringify(users));
      setIsBookmarked(!isBookmarked);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;
    const commentObj = {
      id: Date.now(),
      userName: user.name || "Gamer",
      userEmail: user.email,
      userAvatar: user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=0ea5e9&color=fff`,
      text: newComment,
      date: new Date().toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { 
        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' 
      }),
      likes: 0,
    };
    const updatedComments = [commentObj, ...comments];
    setComments(updatedComments);
    const allComments = JSON.parse(localStorage.getItem('game_comments')) || {};
    allComments[game.id] = updatedComments;
    localStorage.setItem('game_comments', JSON.stringify(allComments));
    setNewComment("");
  };

  const handleDeleteComment = (commentId) => {
    if (!window.confirm(lang === 'id' ? "Hapus komentar ini?" : "Delete this comment?")) return;
    const updatedComments = comments.filter(c => c.id !== commentId);
    setComments(updatedComments);
    const allComments = JSON.parse(localStorage.getItem('game_comments')) || {};
    allComments[game.id] = updatedComments;
    localStorage.setItem('game_comments', JSON.stringify(allComments));
  };

  const shareGame = () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: game.title,
        text: game.short_description,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
    setShareOpen(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center justify-between mb-8">
          <Link to="/games" className="group inline-flex items-center gap-3 text-slate-400 hover:text-white transition-all">
            <motion.div whileHover={{ x: -5 }} className="p-2 rounded-lg bg-slate-900/50 border border-slate-700/30">
              <ArrowLeft className="w-5 h-5" />
            </motion.div>
            <span className="text-sm font-medium">{t("common.back")}</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleBookmark}
              className={`p-3 rounded-xl border transition-all ${isBookmarked ? "bg-amber-500/20 border-amber-500/30 text-amber-400" : "bg-slate-900/50 border-slate-700/30 text-slate-400 hover:text-amber-400"}`}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShareOpen(!shareOpen)}
              className="p-3 rounded-xl bg-slate-900/50 border border-slate-700/30 text-slate-400 hover:text-sky-400 transition-all relative"
            >
              <Share2 className="w-5 h-5" />
              {shareOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full right-0 mt-2 p-2 bg-slate-900 border border-slate-700 rounded-lg shadow-xl"
                >
                  <button onClick={shareGame} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-800 rounded">
                    Share Game
                  </button>
                </motion.div>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Game Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl border border-slate-700/30 bg-linear-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-sm shadow-2xl"
        >
          {/* Background Image */}
          <div className="relative h-64 md:h-80 lg:h-96">
            <img 
              src={game.thumbnail} 
              alt={game.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-r from-slate-900/80 via-transparent to-slate-900/80" />
            
            {/* Overlay Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 rounded-full bg-sky-500/20 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider"
                    >
                      {game.genre}
                    </motion.span>
                    <span className="px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-wider">
                      FREE TO PLAY
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3">{game.title}</h1>
                  <p className="text-slate-300 flex items-center gap-2">
                    <Monitor className="w-4 h-4" /> 
                    <span className="font-medium">{game.platform || "PC"}</span>
                    <span className="text-slate-500 mx-2">•</span>
                    <Calendar className="w-4 h-4" />
                    <span>{game.release_date || "Recently Released"}</span>
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleFavorite}
                    className={`p-4 rounded-2xl border transition-all ${isFavorite ? "bg-pink-500/20 border-pink-500/30 text-pink-500" : "bg-slate-900/50 border-slate-700/30 text-slate-400 hover:text-pink-500"}`}
                  >
                    <Heart className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`} />
                  </motion.button>
                  
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={game.game_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-linear-to-r from-sky-500 to-cyan-400 hover:shadow-xl hover:shadow-sky-500/25 text-white font-bold transition-all"
                  >
                    <Play className="w-5 h-5" /> 
                    <span>{t("home.hero.play_now")}</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Game Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8"
        >
          {[
            { icon: <Star className="w-5 h-5 text-amber-400 fill-amber-400" />, label: "Rating", value: gameStats.rating },
            { icon: <Download className="w-5 h-5 text-sky-400" />, label: "Downloads", value: `${Math.floor(gameStats.downloads / 1000000)}M+` },
            { icon: <Users className="w-5 h-5 text-green-400" />, label: "Active Players", value: `${Math.floor(gameStats.players / 1000000)}M+` },
            { icon: <Clock className="w-5 h-5 text-purple-400" />, label: "Avg Playtime", value: `${gameStats.playTime}h` },
            { icon: <Award className="w-5 h-5 text-yellow-400" />, label: "Achievements", value: gameStats.achievements },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -2 }}
              className="p-4 rounded-xl bg-slate-900/40 backdrop-blur-sm border border-slate-700/30"
            >
              <div className="flex items-center gap-3 mb-2">
                {stat.icon}
                <span className="text-xs text-slate-400 font-medium">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs */}
            <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-1 border border-slate-700/30">
              <div className="flex gap-1">
                {["overview", "gameplay", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all capitalize ${
                      activeTab === tab
                        ? "bg-slate-800 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {tab === "overview" ? "Overview" : tab === "gameplay" ? "Gameplay" : "Reviews"}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Based on Active Tab */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="space-y-8">
                    <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-700/30">
                      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <Gamepad2 className="w-6 h-6 text-sky-400" />
                        Game Overview
                      </h2>
                      <div className="space-y-4">
                        <p className="text-slate-300 leading-relaxed">{game.short_description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                          <div className="p-4 rounded-xl bg-slate-800/50">
                            <h4 className="font-bold mb-2 text-sky-400">Features</h4>
                            <ul className="space-y-2 text-sm text-slate-300">
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                                Multiplayer Support
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                                Cross-Platform Play
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                                Regular Updates
                              </li>
                            </ul>
                          </div>
                          <div className="p-4 rounded-xl bg-slate-800/50">
                            <h4 className="font-bold mb-2 text-cyan-400">Publisher</h4>
                            <p className="text-slate-300 text-sm">{game.publisher || "Independent Studio"}</p>
                            <div className="flex items-center gap-2 mt-3">
                              <Shield className="w-4 h-4 text-green-400" />
                              <span className="text-xs text-green-400">Verified Developer</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Comments Section */}
                    <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-700/30">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold flex items-center gap-3">
                          <MessageCircle className="w-6 h-6 text-sky-400" />
                          Community Discussion
                          <span className="px-3 py-1 rounded-full bg-slate-800 text-sm font-normal">
                            {comments.length} comments
                          </span>
                        </h3>
                        <button className="text-sm text-sky-400 hover:text-sky-300">
                          Sort by: Newest
                        </button>
                      </div>

                      {/* Comment Form */}
                      <form onSubmit={handleAddComment} className="relative mb-8 group">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center">
                            {user ? (
                              <span className="font-bold text-sky-400">
                                {user.name?.charAt(0)?.toUpperCase()}
                              </span>
                            ) : (
                              <MessageCircle className="w-5 h-5 text-slate-600" />
                            )}
                          </div>
                          <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder={user ? "Share your thoughts about this game..." : "Please login to comment"}
                            disabled={!user}
                            className="flex-1 bg-slate-900/80 border border-slate-700/30 rounded-2xl p-4 min-h-32 focus:outline-none focus:border-sky-500/50 resize-none"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            disabled={!user || !newComment.trim()}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                          >
                            <Send className="w-4 h-4" />
                            Post Comment
                          </button>
                        </div>
                      </form>

                      {/* Comments List */}
                      <div className="space-y-4">
                        <AnimatePresence mode="popLayout">
                          {comments.map((comment) => (
                            <motion.div
                              key={comment.id}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="p-5 rounded-2xl bg-slate-800/20 border border-slate-700/30 group hover:bg-slate-800/30 transition-all"
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex items-start gap-3 mb-3">
                                  <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center font-bold text-sky-400">
                                    {comment.userName.charAt(0)}
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-white">{comment.userName}</h4>
                                    <p className="text-xs text-slate-500">{comment.date}</p>
                                  </div>
                                </div>
                                {user && user.email === comment.userEmail && (
                                  <button
                                    onClick={() => handleDeleteComment(comment.id)}
                                    className="p-2 text-slate-600 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                              <p className="text-slate-300 leading-relaxed">{comment.text}</p>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                )}

                {/* Gameplay Tab */}
                {activeTab === "gameplay" && (
                  <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/30">
                    <h3 className="text-2xl font-bold mb-6">Gameplay Features</h3>
                    <div className="space-y-4">
                      <p className="text-slate-300">Detailed gameplay information would go here...</p>
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === "reviews" && (
                  <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/30">
                    <h3 className="text-2xl font-bold mb-6">Player Reviews</h3>
                    <div className="space-y-4">
                      <p className="text-slate-300">Player reviews would be displayed here...</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* System Requirements */}
            <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30">
              <h3 className="text-lg font-bold mb-5 text-sky-400 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                System Requirements
              </h3>
              <div className="space-y-3">
                {[
                  { icon: <Cpu className="w-4 h-4 text-sky-500" />, title: "Processor", value: "Intel Core i7-7700K or AMD Ryzen 5 3600" },
                  { icon: <HardDrive className="w-4 h-4 text-sky-500" />, title: "Memory", value: "16 GB RAM" },
                  { icon: <Monitor className="w-4 h-4 text-sky-500" />, title: "Graphics", value: "NVIDIA GTX 1060 or AMD RX 580" },
                  { icon: <BarChart3 className="w-4 h-4 text-sky-500" />, title: "Storage", value: "50 GB available space" },
                ].map((req, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/50 hover:bg-slate-800/50 transition-all">
                    <div className="p-2 rounded-lg bg-slate-800/50">{req.icon}</div>
                    <div className="flex-1">
                      <p className="text-xs text-slate-500 uppercase font-bold mb-1">{req.title}</p>
                      <p className="text-sm text-slate-300">{req.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar Games */}
            <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30">
              <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                Similar Games
              </h3>
              <div className="space-y-3">
                {games
                  .filter(g => g.genre === game.genre && g.id !== game.id)
                  .slice(0, 3)
                  .map(similar => (
                    <Link
                      key={similar.id}
                      to={`/games/${similar.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50 hover:bg-slate-800/50 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <img src={similar.thumbnail} alt={similar.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium group-hover:text-sky-400 transition-colors">
                          {similar.title}
                        </h4>
                        <p className="text-xs text-slate-500">{similar.genre}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-sky-400 transition-colors" />
                    </Link>
                  ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30">
              <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
                <Globe className="w-5 h-5 text-purple-400" />
                Additional Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-slate-800/50">
                  <span className="text-sm text-slate-400">Developer</span>
                  <span className="text-sm font-medium">{game.developer || game.publisher || "Unknown"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800/50">
                  <span className="text-sm text-slate-400">Publisher</span>
                  <span className="text-sm font-medium">{game.publisher || "Independent"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800/50">
                  <span className="text-sm text-slate-400">Release Date</span>
                  <span className="text-sm font-medium">{game.release_date || "Unknown"}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-slate-400">Game ID</span>
                  <span className="text-sm font-mono text-sky-400">#{game.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GameDetail;