import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, Gamepad2, Eye, EyeOff, Sparkles, Zap, AlertCircle, ChevronRight, Shield, Smartphone, Globe } from "lucide-react";

function Login() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const validateCredentials = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email);
    if (!user) return { success: false, message: t("errors.invalid_credentials") };
    if (user.password !== password) return { success: false, message: t("errors.invalid_credentials") };
    return { success: true, user };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.email.trim() || !formData.password) {
      setError(t("auth.email_required"));
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const result = validateCredentials(formData.email, formData.password);
      if (result.success) {
        login(result.user);
        navigate("/profile");
      } else {
        setError(result.message);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const features = [
    { icon: <Zap className="w-5 h-5" />, text: t("login.features.fast_loading"), color: "from-amber-500 to-orange-400" },
    { icon: <Shield className="w-5 h-5" />, text: t("login.features.secure_login"), color: "from-emerald-500 to-green-400" },
    { icon: <Smartphone className="w-5 h-5" />, text: t("login.features.cross_platform"), color: "from-blue-500 to-cyan-400" },
    { icon: <Globe className="w-5 h-5" />, text: t("login.features.global_community"), color: "from-indigo-500 to-purple-400" },
  ];

  const floatAnimationStyle = {
    animation: "float 3s ease-in-out infinite"
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden relative">
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(10deg); }
          }
        `}
      </style>

      {/* Animated ackground */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              ...floatAnimationStyle
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 py-8 flex items-center justify-center min-h-screen">
        <Link to="/" className="absolute top-8 left-8 inline-flex items-center gap-2 text-slate-400 hover:text-white transition z-10">
          <ChevronRight className="rotate-180" size={16} />
          {t("common.back")}
        </Link>

        <div className="w-full max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
            {/* Left Column - Features */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:w-1/2 w-full max-w-lg"
            >
              <div className="bg-slate-800/30 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-slate-700/50 shadow-2xl shadow-sky-500/10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="relative">
                    <div className="p-4 rounded-2xl bg-linear-to-r from-sky-500 to-cyan-500">
                      <Gamepad2 className="w-7 h-7" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                      <Sparkles size={10} />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold bg-linear-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
                      {t("login.title")}
                    </h1>
                    <p className="text-slate-400">{t("login.subtitle")}</p>
                  </div>
                </div>

                <div className="space-y-6 mb-10">
                  <p className="text-slate-300 text-lg leading-relaxed">
                    {t("login.description")}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {features.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 transition"
                      >
                        <div className={`p-2 rounded-lg bg-linear-to-r ${feature.color} bg-opacity-20`}>
                          {feature.icon}
                        </div>
                        <span className="font-medium">{feature.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="bg-linear-to-r from-slate-800/50 to-transparent p-5 rounded-2xl border border-slate-700/50">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-sky-400">50K+</div>
                      <div className="text-xs text-slate-500">{t("login.stats.active_gamers")}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-400">1M+</div>
                      <div className="text-xs text-slate-500">{t("login.stats.hours_played")}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-emerald-400">99%</div>
                      <div className="text-xs text-slate-500">{t("login.stats.satisfaction")}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Login Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:w-1/2 w-full max-w-md"
            >
              <div className="relative bg-slate-800/30 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl shadow-sky-500/10">
                {/* Form Header */}
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-r from-sky-500 to-cyan-500 mb-6">
                    <LogIn className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">{t("auth.welcome_back")}</h2>
                  <p className="text-slate-400">{t("login.form.sign_in")}</p>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-2xl flex items-center gap-3"
                  >
                    <AlertCircle className="text-red-400" />
                    <span className="text-red-300">{error}</span>
                  </motion.div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">{t("login.form.email")}</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-400 transition">
                        <Mail size={20} />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-700 rounded-2xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition placeholder:text-slate-500"
                        placeholder={t("register.form.enter_email")}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-slate-300">{t("login.form.password")}</label>
                    </div>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-400 transition">
                        <Lock size={20} />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-12 pr-12 py-4 bg-slate-900/50 border border-slate-700 rounded-2xl focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition placeholder:text-slate-500"
                        placeholder={t("register.form.password_hint")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-linear-to-r from-sky-600 via-sky-500 to-cyan-500 rounded-2xl font-bold text-lg shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {t("common.loading")}
                        </>
                      ) : (
                        <>
                          <LogIn size={20} />
                          {t("nav.login")}
                          <ChevronRight size={18} className="group-hover:translate-x-1 transition" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-linear-to-r from-sky-700 via-sky-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                </form>

                {/* register link */}
                <div className="mt-10 pt-8 border-t border-slate-800">
                  <p className="text-center text-slate-400">
                    {t("login.form.no_account")}{' '}
                    <Link
                      to="/register"
                      className="text-sky-400 hover:text-sky-300 font-medium transition hover:underline inline-flex items-center gap-1"
                    >
                      {t("nav.register")}
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition" />
                    </Link>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;