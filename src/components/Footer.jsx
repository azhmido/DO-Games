import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Gamepad2, Mail, Phone, MapPin, Instagram, Github, Shield, ArrowUpRight, ExternalLink, Heart } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useState } from "react";

function Footer() {
  const { t } = useLanguage();
  const [currentYear] = useState(new Date().getFullYear());

  const quickLinks = [
    { name: t("nav.home"), path: "/", icon: "🏠" },
    { name: t("nav.games"), path: "/games", icon: "🎮" },
    { name: t("nav.about"), path: "/about", icon: "ℹ️" },
    { name: t("nav.explore"), path: "/explore", icon: "🧭" },
    { name: t("nav.login"), path: "/login", icon: "🔐" },
    { name: t("nav.register"), path: "/register", icon: "✨" },
  ];

  const socialMedia = [
    { icon: <Instagram className="w-4 h-4" />, name: "Instagram", color: "hover:bg-pink-500/20 hover:text-pink-400", url: "https://www.instagram.com/zvckhm/" },
    { icon: <Github className="w-4 h-4" />, name: "GitHub", color: "hover:bg-gray-700/50 hover:text-gray-300", url: "https://github.com/azhmido" },
  ];

  const contactInfo = [
    { icon: <Mail className="w-4 h-4" />, text: "support@dogame.com", link: "mailto:support@dogame.com" },
    { icon: <Phone className="w-4 h-4" />, text: "+62 812-3456-7890", link: "tel:+6281234567890" },
    { icon: <MapPin className="w-4 h-4" />, text: "Jakarta, Indonesia", link: "#" },
  ];

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-linear-to-b from-slate-900 via-slate-950 to-black text-white border-t border-slate-800/30 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-sky-950/10 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-slate-900/50 to-transparent" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Brand Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <Link to="/" className="inline-flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="p-3 rounded-xl bg-linear-to-br from-sky-500/10 to-cyan-500/10 border border-sky-500/20 group-hover:border-sky-500/40 transition-colors"
              >
                <Gamepad2 className="w-6 h-6 text-sky-400" />
              </motion.div>
              <div>
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-cyan-300">
                  DO-Game
                </span>
                <p className="text-xs text-slate-500 mt-1">Premium Gaming Experience</p>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t("home.hero.desc_default")}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-bold text-white mb-6 pb-3 border-b border-slate-800/50 flex items-center gap-2">
              <span className="bg-sky-500/20 p-1.5 rounded-md">
                <ArrowUpRight className="w-4 h-4 text-sky-400" />
              </span>
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link 
                    to={link.path} 
                    className="group flex items-center gap-3 text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800/30 transition-all duration-300"
                  >
                    <span className="text-sm">{link.icon}</span>
                    <span className="text-sm font-medium flex-1">{link.name}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-bold text-white mb-6 pb-3 border-b border-slate-800/50 flex items-center gap-2">
              <span className="bg-cyan-500/20 p-1.5 rounded-md">
                <Mail className="w-4 h-4 text-cyan-400" />
              </span>
              Contact Us
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((contact, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <a 
                    href={contact.link} 
                    className="group flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800/30 transition-all duration-300"
                  >
                    <div className="p-2 rounded-lg bg-slate-800/50 group-hover:bg-slate-700/50 transition-colors">
                      {contact.icon}
                    </div>
                    <span className="text-sm text-slate-400 group-hover:text-white transition-colors pt-1">
                      {contact.text}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Media & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-bold text-white mb-6 pb-3 border-b border-slate-800/50">
                Connect With Me
              </h3>
              <div className="flex gap-3">
                {socialMedia.map((social) => (
                  <motion.a 
                    key={social.name}
                    href={social.url}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-xl bg-slate-900/50 border border-slate-800/50 ${social.color} transition-all duration-300 group relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-linear-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative z-10">{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-px bg-linear-to-r from-transparent via-slate-800 to-transparent mb-8"
        />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-slate-500">
              &copy; {currentYear} DO-Games. All rights reserved.
            </p>
          </div>
          

          {/* Back to Top Button */}
          <motion.button
            onClick={backToTop}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-slate-900/50 border border-slate-800/50 hover:border-sky-500/30 hover:bg-slate-800/50 transition-all group"
          >
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-sky-400 transform -rotate-45 transition-colors" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;