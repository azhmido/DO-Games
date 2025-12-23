import { motion } from "framer-motion";
import { Gamepad2, Users, Target, Globe, Sparkles, Zap, Heart, Award, Shield, Rocket, Star, Users as UsersIcon, TrendingUp, Gamepad, Target as TargetIcon, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { Compass } from 'lucide-react';

function About() {
  const { t } = useLanguage();

  const stats = [
    { icon: <Gamepad2 className="w-5 h-5" />, value: "500+", label: t("nav.games"), color: "from-sky-500 to-cyan-500" },
    { icon: <Users className="w-5 h-5" />, value: "1M+", label: t("about.statistics.active_players"), color: "from-green-500 to-emerald-500" },
    { icon: <Target className="w-5 h-5" />, value: "50+", label: t("about.statistics.game_genres"), color: "from-purple-500 to-violet-500" },
    { icon: <Globe className="w-5 h-5" />, value: "100+", label: t("about.statistics.countries"), color: "from-amber-500 to-orange-500" },
  ];

  const values = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: t("about.values.quality_first"),
      desc: "We curate only the best free-to-play experiences",
      color: "from-sky-500/20 to-cyan-500/20",
      points: ["Expert curation team", "Regular quality updates", "Player-driven reviews"]
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: t("about.values.zero_cost"),
      desc: "All games are completely free to play",
      color: "from-green-500/20 to-emerald-500/20",
      points: ["No hidden fees", "No pay-to-win", "Truly free gaming"]
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: t("about.values.community_driven"),
      desc: "Built by gamers, for gamers",
      color: "from-rose-500/20 to-pink-500/20",
      points: ["Player feedback integration", "Community events", "Shared experiences"]
    },
    {
      icon: <Rocket className="w-5 h-5" />,
      title: t("about.values.constant_innovation"),
      desc: "Always improving your gaming experience",
      color: "from-purple-500/20 to-violet-500/20",
      points: ["Regular feature updates", "New game additions", "Tech advancements"]
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/40 backdrop-blur-sm border border-slate-700/30"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-linear-to-r from-sky-500 to-cyan-400 rounded-full"
              />
              <span className="text-sm font-medium text-slate-300">
                {t("about.mission")}
              </span>
              <Sparkles className="w-3 h-3 text-sky-400 animate-pulse" />
            </motion.div>

            {/* Main Title */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex flex-col items-center gap-6"
              >
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full bg-linear-to-r from-sky-500/20 to-cyan-500/20 blur-md"
                  />
                  <Gamepad2 className="w-16 h-16 text-sky-400 relative z-10" />
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                  {t("nav.about")}{" "}
                  <motion.span
                    initial={{ backgroundPosition: "200% center" }}
                    animate={{ backgroundPosition: "-200% center" }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 via-cyan-300 to-sky-400 bg-size-[200%_auto]"
                  >
                    DO-Games
                  </motion.span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed"
              >
                {t("about.hero_description")}
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="p-4 rounded-xl bg-slate-900/40 backdrop-blur-sm border border-slate-700/30"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`p-3 rounded-lg bg-linear-to-r ${stat.color} mb-3`}>
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-16">
        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/40 backdrop-blur-sm border border-slate-700/30 mb-4"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-slate-300">{t("about.promise")}</span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {t("about.values_title")}
            </h2>        
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group bg-slate-900/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 hover:border-sky-500/30 transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-xl bg-linear-to-r ${value.color} border border-slate-700/50`}>
                    {value.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                    <p className="text-slate-400">{value.desc}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {value.points.map((point, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-linear-to-br from-slate-900/40 to-slate-800/20 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/30">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/40 backdrop-blur-sm border border-slate-700/30 mb-6"
            >
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-slate-300">{t("about.cta.ready_to_play")}</span>
              <Rocket className="w-4 h-4 text-emerald-400" />
            </motion.div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              {t("about.cta.join_millions")}
            </h3>
            
            <p className="text-slate-400 max-w-2xl mx-auto mb-8">
              {t("about.cta.discover_collection")} {t("about.cta.play_instantly")} {t("about.cta.no_signup")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Link
                  to="/games"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-linear-to-r from-sky-500 to-cyan-400 hover:shadow-xl hover:shadow-sky-500/25 text-white font-bold transition-all"
                >
                  <Gamepad2 className="w-5 h-5" />
                  <span>{t("home.hero.play_now")}</span>
                  <Sparkles className="w-4 h-4" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Link
                  to="/explore"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-sky-500/30 text-sky-400 hover:text-white transition-all"
                >
                  <Compass className="w-5 h-5" />
                  <span>{t("nav.explore")}</span>
                </Link>
              </motion.div>
            </div>
            
            <p className="text-sm text-slate-500 mt-8">
              Join our community of passionate gamers today
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default About;