import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, Gamepad2, Eye, EyeOff, AlertCircle, ChevronRight } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <Link to="/" className="absolute top-8 left-8 inline-flex items-center gap-2 text-slate-400 hover:text-white transition z-10">
          <ChevronRight className="rotate-180" size={16} />
          {t("common.back")}
        </Link>

        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800 rounded-2xl p-8 border border-slate-700"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sky-600 mb-4">
                <Gamepad2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-2">{t("auth.welcome_back")}</h2>
              <p className="text-slate-400">{t("login.form.sign_in")}</p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2 text-sm"
              >
                <AlertCircle className="text-red-400" size={16} />
                <span className="text-red-300">{error}</span>
              </motion.div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  {t("login.form.email")}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  {t("login.form.password")}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-sky-600 hover:bg-sky-700 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t("common.loading")}
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <LogIn size={18} />
                    {t("nav.login")}
                  </div>
                )}
              </button>
            </form>

            {/* Register link */}
            <div className="mt-8 pt-6 border-t border-slate-700">
              <p className="text-center text-slate-400 text-sm">
                {t("login.form.no_account")}{' '}
                <Link to="/register" className="text-sky-400 hover:text-sky-300 font-medium transition">
                  {t("nav.register")}
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Login;