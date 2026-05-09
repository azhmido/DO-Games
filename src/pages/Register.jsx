import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, User, Eye, EyeOff, Gamepad2, Check, Sparkles, Users, Award, AlertCircle, ChevronRight, Shield } from "lucide-react";
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

  const benefits = [
    { icon: <Gamepad2 className="w-5 h-5" />, text: t("register.benefits.personalized_recommendations"), color: "from-sky-500 to-cyan-400", bg: "bg-sky-500/10" },
    { icon: <Users className="w-5 h-5" />, text: t("register.benefits.join_communities"), color: "from-purple-500 to-violet-400", bg: "bg-purple-500/10" },
    { icon: <Award className="w-5 h-5" />, text: t("register.benefits.exclusive_perks"), color: "from-amber-500 to-yellow-400", bg: "bg-amber-500/10" },
    { icon: <Shield className="w-5 h-5" />, text: t("register.benefits.secure_saves"), color: "from-emerald-500 to-green-400", bg: "bg-emerald-500/10" },
    { icon: <Sparkles className="w-5 h-5" />, text: t("register.benefits.early_access"), color: "from-indigo-500 to-blue-400", bg: "bg-indigo-500/10" },
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

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
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

      <div className="relative container mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <Link to="/Login" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition mb-6">
            <ChevronRight className="rotate-180" size={16} />
            {t("common.back")}
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
            {t("register.subtitle")}
          </h1>
          <p className="text-slate-400 max-w-md mx-auto">
            {t("register.description")}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Left Column - Benefits */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-1/2 w-full"
          >
            <div className="bg-slate-800/30 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl shadow-purple-500/10">
              <div className="flex items-center gap-4 mb-10">
                <div className="relative">
                  <div className="p-4 rounded-2xl bg-linear-to-r from-purple-500 to-pink-500">
                    <Gamepad2 className="w-7 h-7" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                    <Sparkles size={10} />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{t("register.why_join")}</h2>
                  <p className="text-slate-400">{t("register.premium_experience")}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.03, translateY: -5 }}
                    className="group"
                  >
                    <div className={`p-5 rounded-2xl border border-slate-700/50 ${benefit.bg} hover:border-slate-600/50 transition-all duration-300 h-full`}>
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl bg-linear-to-r ${benefit.color} bg-opacity-20 group-hover:bg-opacity-30 transition`}>
                          {benefit.icon}
                        </div>
                        <div>
                          <p className="font-medium text-white group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition">
                            {benefit.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-linear-to-r from-slate-800/50 to-transparent p-5 rounded-2xl border border-slate-700/50">
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-slate-400">{t("register.security.secure_registration")}</span>
                  </div>
                  <div className="w-px h-4 bg-slate-700" />
                  <div className="flex items-center gap-2">
                    <Shield size={14} className="text-sky-400" />
                    <span className="text-slate-400">{t("register.security.privacy_protected")}</span>
                  </div>
                  <div className="w-px h-4 bg-slate-700" />
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-amber-400" />
                    <span className="text-slate-400">{t("register.security.instant_access")}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:w-1/2 w-full max-w-md"
          >
            <div className="relative bg-slate-800/30 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl shadow-purple-500/10">
              {/* Form Header */}
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-2">{t("register.form.create_account")}</h2>
                <p className="text-slate-400">{t("register.form.fill_details")}</p>
              </div>

              {formError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-2xl flex items-center gap-3"
                >
                  <AlertCircle className="text-red-400" />
                  <span className="text-red-300">{formError}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">{t("register.form.full_name")}</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-400 transition">
                      <User size={20} />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-700 rounded-2xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition placeholder:text-slate-500"
                      placeholder={t("register.form.enter_full_name")}
                    />
                    {formData.name && !errors.name && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <Check className="text-emerald-400" size={18} />
                      </div>
                    )}
                  </div>
                  {errors.name && <p className="text-sm text-red-400 flex items-center gap-2"><AlertCircle size={14} /> {errors.name}</p>}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">{t("register.form.email_address")}</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-400 transition">
                      <Mail size={20} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-700 rounded-2xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition placeholder:text-slate-500"
                      placeholder={t("register.form.enter_email")}
                    />
                  </div>
                  {errors.email && <p className="text-sm text-red-400 flex items-center gap-2"><AlertCircle size={14} /> {errors.email}</p>}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">{t("register.form.password")}</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-400 transition">
                      <Lock size={20} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-12 pr-12 py-4 bg-slate-900/50 border border-slate-700 rounded-2xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition placeholder:text-slate-500"
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
                  {errors.password && <p className="text-sm text-red-400 flex items-center gap-2"><AlertCircle size={14} /> {errors.password}</p>}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">{t("register.form.confirm_password")}</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-400 transition">
                      <Lock size={20} />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-12 pr-12 py-4 bg-slate-900/50 border border-slate-700 rounded-2xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition placeholder:text-slate-500"
                      placeholder={t("register.form.re_enter_password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-400 flex items-center gap-2"><AlertCircle size={14} /> {errors.confirmPassword}</p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-linear-to-r from-purple-600 via-purple-500 to-pink-500 rounded-2xl font-bold text-lg shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t("common.loading")}
                      </>
                    ) : (
                      <>
                        <UserPlus size={20} />
                        {t("nav.register")}
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-purple-700 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>

                {/* Terms */}
                <p className="text-center text-sm text-slate-500">
                  {t("register.form.terms")}{' '}
                  <a href="#" className="text-purple-400 hover:text-purple-300 transition hover:underline">
                    {t("register.form.terms_of_service")}
                  </a>{' '}
                  {t("auth.and")}{' '}
                  <a href="#" className="text-purple-400 hover:text-purple-300 transition hover:underline">
                    {t("register.form.privacy_policy")}
                  </a>
                </p>
              </form>

              {/* Login Link */}
              <div className="mt-10 pt-8 border-t border-slate-800">
                <p className="text-center text-slate-400">
                  {t("register.form.already_have_account")}{' '}
                  <Link
                    to="/"
                    className="text-purple-400 hover:text-purple-300 font-medium transition hover:underline inline-flex items-center gap-1"
                  >
                    {t("login.form.sign_in")}
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition" />
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 pt-8 border-t border-slate-800/50"
        >
          <p className="text-sm text-slate-500">
            {t("register.form.join_thousands")}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Register;