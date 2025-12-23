import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";
import { User, Mail, Calendar, Edit2, Save, X, LogOut, MapPin, CheckCircle, ChevronRight,Settings, Gamepad2, Globe, Heart, Crown} from "lucide-react";
import { Link } from "react-router-dom";

function Profile() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    bio: "",
    location: "",
    joinDate: "",
    gamingLevel: "Beginner",
    avatarColor: "from-sky-500 to-cyan-400"
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(true);
  const [avatarColors] = useState([
    "from-sky-500 to-cyan-400",
    "from-purple-500 to-pink-500",
    "from-green-500 to-emerald-400",
    "from-amber-500 to-orange-400",
    "from-red-500 to-rose-400",
    "from-indigo-500 to-violet-400"
  ]);

  useEffect(() => {
    if (user) {
      loadUserProfile();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadUserProfile = () => {
    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const currentUser = users.find(u => u.email === user.email);
      
      if (currentUser) {
        setProfileData({
          name: currentUser.name || user.name || "Gamer",
          email: currentUser.email || user.email || "",
          bio: currentUser.bio || "Passionate gamer exploring the world of free-to-play games! 🎮",
          location: currentUser.location || "Indonesia",
          joinDate: currentUser.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : "Recently",
          gamingLevel: currentUser.gamingLevel || "Intermediate",
          avatarColor: currentUser.avatarColor || avatarColors[0]
        });
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      setSaveMessage({ type: 'success', text: t("success.profile_updated") || "Profile updated successfully!" });
      setTimeout(() => setSaveMessage({ type: '', text: '' }), 3000);
    }, 1000);
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const gamingLevels = ["Newbie", "Beginner", "Intermediate", "Advanced", "Expert"];

  if (!user && !loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-950 to-slate-900 text-white flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700/50">
            <User className="w-16 h-16 text-slate-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">{t("auth.sign_in_required") || "Sign In Required"}</h1>
            <p className="text-slate-400 mb-8">{t("auth.please_sign_in") || "Please sign in to view your profile"}</p>
            <div className="flex gap-4 justify-center">
              <Link to="/login" className="px-8 py-3 bg-sky-600 hover:bg-sky-700 rounded-xl font-bold transition">
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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-sky-500/30 border-t-sky-500 rounded-full animate-spin"></div>
        <p className="text-slate-400">{t("common.loading") || "Loading"}...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-4">
              <div className={`relative p-0.5 rounded-2xl bg-linear-to-r ${profileData.avatarColor}`}>
                <div className="bg-slate-900 rounded-2xl p-5">
                  <User className="w-10 h-10" />
                </div>              
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-linear-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
                  {profileData.name}
                </h1>
                <p className="text-slate-400 flex items-center gap-2">
                  <Crown size={14} className="text-amber-400" />
                  {profileData.gamingLevel} {t("common.gamer") || "Gamer"}
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition group"
              >
                {isEditing ? (
                  <>
                    <X size={18} className="group-hover:rotate-90 transition" />
                    {t("buttons.cancel") || "Cancel"}
                  </>
                ) : (
                  <>
                    <Edit2 size={18} className="group-hover:scale-110 transition" />
                    {t("buttons.edit") || "Edit Profile"}
                  </>
                )}
              </button>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-white border border-red-500/30 hover:border-red-500 rounded-xl transition group"
              >
                <LogOut size={18} className="group-hover:translate-x-1 transition" />
                {t("nav.logout") || "Sign Out"}
              </button>
            </div>
          </div>

          {/* Save Message */}
          {saveMessage.text && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`mb-6 p-4 rounded-2xl border ${saveMessage.type === 'success' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-amber-500/20 border-amber-500/50 text-amber-400'}`}
            >
              <div className="flex items-center gap-3">
                <CheckCircle size={20} />
                <span>{saveMessage.text}</span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-800/40 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 shadow-xl"
            >
              {isEditing ? (
                <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">
                      {t("auth.full_name") || "Display Name"}
                    </label>
                    <input
                      className="w-full px-5 py-4 bg-slate-900 border border-sky-500 rounded-2xl focus:ring-2 focus:ring-sky-500/20 outline-none transition"
                      value={profileData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder={t("auth.enter_full_name") || "Enter your name"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">
                      {t("profile.bio") || "Bio"}
                    </label>
                    <textarea
                      className="w-full px-5 py-4 bg-slate-900 border border-sky-500 rounded-2xl focus:ring-2 focus:ring-sky-500/20 outline-none transition h-40 resize-none"
                      value={profileData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      placeholder={t("profile.bio_placeholder") || "Tell us about yourself..."}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-3">
                        {t("labels.location") || "Location"}
                      </label>
                      <input
                        className="w-full px-5 py-4 bg-slate-900 border border-sky-500 rounded-2xl focus:ring-2 focus:ring-sky-500/20 outline-none transition"
                        value={profileData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        placeholder={t("profile.location_placeholder") || "Your location"}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-3">
                        {t("profile.gaming_level") || "Gaming Level"}
                      </label>
                      <select
                        className="w-full px-5 py-4 bg-slate-900 border border-sky-500 rounded-2xl focus:ring-2 focus:ring-sky-500/20 outline-none transition"
                        value={profileData.gamingLevel}
                        onChange={(e) => handleInputChange("gamingLevel", e.target.value)}
                      >
                        {gamingLevels.map(level => (
                          <option key={level} value={level}>
                            {t(`common.${level.toLowerCase()}`) || level}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="px-8 py-3 bg-linear-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 rounded-xl font-bold transition disabled:opacity-50 flex items-center gap-3"
                    >
                      {isSaving ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {t("common.saving") || "Saving"}...
                        </>
                      ) : (
                        <>
                          <Save size={18} />
                          {t("buttons.save") || "Save Changes"}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <User className="text-sky-400" />
                      {t("profile.information") || "Profile Information"}
                    </h2>
                    <p className="text-slate-300 text-lg leading-relaxed">{profileData.bio}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-sky-500/10 rounded-xl">
                          <Mail className="text-sky-400" size={20} />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">{t("auth.email") || "Email Address"}</p>
                          <p className="font-medium">{profileData.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-emerald-500/10 rounded-xl">
                          <MapPin className="text-emerald-400" size={20} />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">{t("labels.location") || "Location"}</p>
                          <p className="font-medium">{profileData.location}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-purple-500/10 rounded-xl">
                          <Calendar className="text-purple-400" size={20} />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">{t("profile.member_since") || "Member Since"}</p>
                          <p className="font-medium">{profileData.joinDate}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-amber-500/10 rounded-xl">
                          <Crown className="text-amber-400" size={20} />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">{t("profile.gaming_level") || "Gaming Level"}</p>
                          <p className="font-medium">{profileData.gamingLevel}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* User Level Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-linear-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 shadow-xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-linear-to-r from-amber-500 to-orange-500 rounded-2xl">
                  <Crown className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{t("common.level") || "Level"}</h3>
                  <p className="text-slate-400 text-sm">{profileData.gamingLevel}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Progress</span>
                  <span className="text-sky-400">75%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-linear-to-r from-amber-500 to-orange-500 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
              
              <div className="text-sm text-slate-400">
                <p>{t("profile.next_level_hint") || "Play more games to level up!"}</p>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800/40 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 shadow-xl"
            >
              <h3 className="text-xl font-bold mb-6">{t("profile.quick_actions") || "Quick Actions"}</h3>
              <div className="space-y-3">
                <Link
                  to="/favorites"
                  className="flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-900 rounded-2xl transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-500/10 rounded-lg">
                      <Heart className="text-pink-400" size={18} />
                    </div>
                    <span>{t("nav.favorites") || "My Favorites"}</span>
                  </div>
                  <ChevronRight className="text-slate-500 group-hover:text-slate-300 group-hover:translate-x-1 transition" size={16} />
                </Link>
                
                <Link
                  to="/games"
                  className="flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-900 rounded-2xl transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-sky-500/10 rounded-lg">
                      <Gamepad2 className="text-sky-400" size={18} />
                    </div>
                    <span>{t("nav.games") || "Browse Games"}</span>
                  </div>
                  <ChevronRight className="text-slate-500 group-hover:text-slate-300 group-hover:translate-x-1 transition" size={16} />
                </Link>
                
                <Link
                  to="/explore"
                  className="flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-900 rounded-2xl transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                      <Globe className="text-emerald-400" size={18} />
                    </div>
                    <span>{t("nav.explore") || "Explore"}</span>
                  </div>
                  <ChevronRight className="text-slate-500 group-hover:text-slate-300 group-hover:translate-x-1 transition" size={16} />
                </Link>
                
                <Link
                  to="/settings"
                  className="flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-900 rounded-2xl transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                      <Settings className="text-purple-400" size={18} />
                    </div>
                    <span>{t("nav.settings") || "Settings"}</span>
                  </div>
                  <ChevronRight className="text-slate-500 group-hover:text-slate-300 group-hover:translate-x-1 transition" size={16} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;