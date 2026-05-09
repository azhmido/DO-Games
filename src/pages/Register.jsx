import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, User, Eye, EyeOff, Gamepad2, Check, AlertCircle, ChevronRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function Register() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const checkEmailExists = (email) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.email === email);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t("register.validation.name_required");
    if (!formData.email.trim()) newErrors.email = t("register.validation.email_required");
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t("register.validation.email_invalid");
    else if (checkEmailExists(formData.email)) newErrors.email = t("register.validation.email_exists");
    if (!formData.password) newErrors.password = t("register.validation.password_required");
    else if (formData.password.length < 6) newErrors.password = t("register.validation.password_min");
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = t("register.validation.password_mismatch");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setFormError("");
    
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const newUser = {
        id: Date.now(),
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        createdAt: new Date().toISOString(),
        gameHistory: []
      };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      setIsLoading(false);
      navigate("/login");
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800 rounded-2xl p-8 border border-slate-700"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-600 mb-4">
                <Gamepad2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-2">{t("register.form.create_account")}</h2>
              <p className="text-slate-400 text-sm">{t("register.form.fill_details")}</p>
            </div>

            {formError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2 text-sm"
              >
                <AlertCircle className="text-red-400" size={16} />
                <span className="text-red-300">{formError}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  {t("register.form.full_name")}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
                    placeholder="Enter Your Full Name"
                  />
                  {formData.name && !errors.name && (
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400" size={16} />
                  )}
                </div>
                {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  {t("register.form.email_address")}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
                    placeholder="email@example.com"
                  />
                </div>
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  {t("register.form.password")}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
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
                {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  {t("register.form.confirm_password")}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-400 mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t("common.loading")}
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <UserPlus size={18} />
                    {t("nav.register")}
                  </div>
                )}
              </button>

              {/* Terms */}
              <p className="text-center text-xs text-slate-500 mt-4">
                {t("register.form.terms")}{' '}
                <a href="#" className="text-purple-400 hover:text-purple-300 transition">
                  {t("register.form.terms_of_service")}
                </a>{' '}
                {t("auth.and")}{' '}
                <a href="#" className="text-purple-400 hover:text-purple-300 transition">
                  {t("register.form.privacy_policy")}
                </a>
              </p>
            </form>

            {/* Login Link */}
            <div className="mt-6 pt-6 border-t border-slate-700">
              <p className="text-center text-slate-400 text-sm">
                {t("register.form.already_have_account")}{' '}
                <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium transition">
                  {t("login.form.sign_in")}
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Register;