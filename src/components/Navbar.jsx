import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext"; 
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Home, Grid3x3, User, LogOut, LogIn, UserPlus, Heart, Compass, Settings, Info, Languages,Menu, X,  Crown} from "lucide-react";
import { useState, useEffect } from "react";

function Navbar() {
  const { user, logout } = useAuth();
  const { lang, changeLanguage, t } = useLanguage(); 
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "id" : "en";
    changeLanguage(newLang);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", icon: <Home className="w-4 h-4" />, label: t("nav.home") },
    { to: "/games", icon: <Grid3x3 className="w-4 h-4" />, label: t("nav.games") },
    { to: "/explore", icon: <Compass className="w-4 h-4" />, label: t("nav.explore") },
    { to: "/about", icon: <Info className="w-4 h-4" />, label: t("nav.about") },
  ];

  const userLinks = [
    { to: "/profile", icon: <Settings className="w-4 h-4" />, label: t("nav.profile") },
    { to: "/favorites", icon: <Heart className="w-4 h-4" />, label: t("nav.favorites") },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className={`sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 backdrop-blur-md transition-all duration-300 ${
          scrolled 
            ? 'bg-slate-900/95 shadow-xl shadow-sky-900/10 border-b border-sky-500/20' 
            : 'bg-slate-900/80 border-b border-white/5'
        }`}
      >
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="flex items-center gap-3"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full bg-linear-to-r from-sky-500/20 to-cyan-400/20 blur-sm"
            />
            <div className="p-2 rounded-lg bg-slate-800/50 border border-sky-500/30 relative z-10">
              <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400" />
            </div>
          </div>
          <Link to="/" className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-cyan-300">
            DO-Games
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink 
              key={link.to} 
              to={link.to} 
              icon={link.icon} 
              label={link.label}
              isActive={location.pathname === link.to}
            />
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Premium Badge */}
          {user?.premium && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-linear-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30"
            >
              <Crown className="w-3 h-3 text-amber-400" />
              <span className="text-xs font-bold text-amber-300">PREMIUM</span>
            </motion.div>
          )}

          {/* Language Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleLanguage}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all"
          >
            <Languages className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-xs font-bold uppercase">{lang}</span>
          </motion.button>

          {/* User Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {!user ? (
              <>
                <Link 
                  to="/login" 
                  className="text-sm font-medium text-slate-400 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-all"
                >
                  {t("nav.login")}
                </Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/register" 
                    className="px-4 py-2 rounded-lg bg-linear-to-r from-sky-500 to-cyan-400 hover:shadow-lg hover:shadow-sky-500/25 transition-all text-sm font-bold"
                  >
                    {t("nav.register")}
                  </Link>
                </motion.div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 border-l border-slate-700/50 pl-3">
                  {userLinks.map((link) => (
                    <NavLink 
                      key={link.to} 
                      to={link.to} 
                      icon={link.icon} 
                      label={link.label}
                      isActive={location.pathname === link.to}
                    />
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-white border border-red-500/20 hover:border-red-500/40 transition-all text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  {t("nav.logout")}
                </motion.button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-slate-400" />
            ) : (
              <Menu className="w-5 h-5 text-slate-400" />
            )}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-900/95 backdrop-blur-md border-b border-slate-800/50 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <MobileNavLink
                    key={link.to}
                    to={link.to}
                    icon={link.icon}
                    label={link.label}
                    onClick={() => setIsMenuOpen(false)}
                    isActive={location.pathname === link.to}
                  />
                ))}
              </div>

              {/* Mobile User Links */}
              {user && (
                <div className="space-y-2 pt-4 border-t border-slate-800/50">
                  {userLinks.map((link) => (
                    <MobileNavLink
                      key={link.to}
                      to={link.to}
                      icon={link.icon}
                      label={link.label}
                      onClick={() => setIsMenuOpen(false)}
                      isActive={location.pathname === link.to}
                    />
                  ))}
                </div>
              )}

              {/* Mobile Language Toggle */}
              <div className="pt-4 border-t border-slate-800/50">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 transition-colors"
                >
                  <Languages className="w-4 h-4 text-sky-400" />
                  <span className="text-sm font-medium">
                    Switch to {lang === "en" ? "Bahasa Indonesia" : "English"}
                  </span>
                </button>
              </div>

              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-slate-800/50 space-y-3">
                {!user ? (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full text-center px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 transition-colors"
                    >
                      {t("nav.login")}
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full text-center px-4 py-3 rounded-lg bg-linear-to-r from-sky-500 to-cyan-400 hover:shadow-lg hover:shadow-sky-500/25 transition-all font-bold"
                    >
                      {t("nav.register")}
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-white border border-red-500/20 hover:border-red-500/40 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    {t("nav.logout")}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ to, icon, label, isActive }) {
  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
      <Link 
        to={to} 
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
          isActive 
            ? 'text-sky-400 bg-sky-500/10 border border-sky-500/20' 
            : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
        }`}
      >
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </Link>
    </motion.div>
  );
}

function MobileNavLink({ to, icon, label, onClick, isActive }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        isActive 
          ? 'text-sky-400 bg-sky-500/10 border border-sky-500/20' 
          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
}

export default Navbar;