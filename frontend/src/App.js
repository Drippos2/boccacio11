import { useEffect, useState, useRef } from "react";
import "./App.css";
import { LanguageProvider, useLanguage, languages } from "./context/LanguageContext";
import { menuData, galleryImages } from "./data/menuData";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { Instagram, Facebook, Phone, Mail, MapPin, Clock, ChevronDown, Menu, X } from "lucide-react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./AdminPanel";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.4, 0, 0.2, 1] } }
};

// Animated Section Component
const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Navigation Component
const Navigation = () => {
  const { t, language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { key: "about", href: "#about" },
    { key: "interior", href: "#interior" },
    { key: "winterGarden", href: "#winter-garden" },
    { key: "food", href: "#food" },
    { key: "jedalnyListok", href: "#jedalny-listok" },
    { key: "menu", href: "#menu" },
    { key: "contact", href: "#contact" },
  ];

  const scrollToSection = (href) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Hero Navigation - Full width, transparent, shown at top */}
      <motion.nav 
        className={`hero-nav ${scrolled ? "hero-nav-hidden" : ""}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        data-testid="hero-navigation"
      >
        <div className="hero-nav-container">
          <div className="hero-nav-links">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className="hero-nav-link"
                data-testid={`hero-nav-${item.key}`}
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}
          </div>
          
          {/* Language Flags */}
          <div className="hero-nav-flags">
            {Object.values(languages).map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`hero-flag-btn ${language === lang.code ? "active" : ""}`}
                data-testid={`lang-${lang.code}`}
                title={lang.name}
              >
                <img 
                  src={lang.flagUrl} 
                  alt={lang.name}
                  className="w-6 h-4 object-cover rounded-sm"
                />
              </button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Scrolled Navigation - Compact pill, shown when scrolling */}
      <nav className={`scrolled-nav ${scrolled ? "scrolled-nav-visible" : ""}`} data-testid="main-navigation">
        <div className="scrolled-nav-container">
          {/* Logo/Brand */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="scrolled-nav-brand"
          >
            Boccaccio
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className="scrolled-nav-link"
                data-testid={`nav-${item.key}`}
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button - inside pill */}
          <button
            className="lg:hidden p-2 text-white/80 hover:text-white"
            onClick={() => setMobileMenuOpen(true)}
            data-testid="mobile-menu-toggle"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Hamburger Menu - Left Corner (visible when scrolled) */}
      <button
        className={`scrolled-nav-hamburger ${scrolled ? "scrolled-nav-hamburger-visible" : ""}`}
        onClick={() => setMobileMenuOpen(true)}
        data-testid="scrolled-menu-toggle"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mobile-menu"
            data-testid="mobile-menu"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-2"
              data-testid="mobile-menu-close"
            >
              <X className="w-6 h-6" />
            </button>

            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className="mobile-menu-link"
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}

            {/* Language Flags in Mobile Menu */}
            <div className="flex items-center gap-3 mt-8">
              {Object.values(languages).map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`lang-flag-btn ${language === lang.code ? "active" : ""}`}
                  title={lang.name}
                >
                  <img 
                    src={lang.flagUrl} 
                    alt={lang.name}
                    className="w-8 h-5 object-cover rounded-sm"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Hero Section
const HeroSection = () => {
  const { t } = useLanguage();
  const videoRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Slideshow media: 2 images + 1 video, repeating
  const heroMedia = [
    { type: 'image', src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/d6f5pm7l_1.jpg' },
    { type: 'image', src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/qpygp3k4_2h.jpg' },
    { type: 'video', src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/5g422ktq_lv_7450562944921881917_20260319224658.mp4' },
  ];

  useEffect(() => {
    const media = heroMedia[currentSlide];
    
    if (media.type === 'image') {
      // Show image for 2 seconds, then move to next
      const timer = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroMedia.length);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (media.type === 'video') {
      // For video, wait until it ends
      setIsVideoPlaying(true);
      const video = videoRef.current;
      if (video) {
        video.currentTime = 0;
        video.play();
        const handleEnded = () => {
          setIsVideoPlaying(false);
          setCurrentSlide((prev) => (prev + 1) % heroMedia.length);
        };
        video.addEventListener('ended', handleEnded);
        return () => video.removeEventListener('ended', handleEnded);
      }
    }
  }, [currentSlide]);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-section" data-testid="hero-section">
      {/* Background Slideshow - Images and Video */}
      <div className="hero-video-container">
        {heroMedia.map((media, index) => (
          media.type === 'image' ? (
            <div
              key={index}
              className={`hero-slide ${currentSlide === index ? 'active' : ''}`}
              style={{ backgroundImage: `url(${media.src})` }}
            />
          ) : (
            <video
              key={index}
              ref={videoRef}
              muted
              playsInline
              className={`hero-video ${currentSlide === index ? '' : 'hidden'}`}
            >
              <source src={media.src} type="video/mp4" />
            </video>
          )
        ))}
      </div>
      <div className="hero-overlay-video" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        {/* Main Title - Arc Effect */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <h1 className="hero-title-arc" data-testid="hero-title">
            <span className="arc-letter arc-1">B</span>
            <span className="arc-letter arc-2">o</span>
            <span className="arc-letter arc-3">c</span>
            <span className="arc-letter arc-4">c</span>
            <span className="arc-letter arc-5">a</span>
            <span className="arc-letter arc-6">c</span>
            <span className="arc-letter arc-7">c</span>
            <span className="arc-letter arc-8">i</span>
            <span className="arc-letter arc-9">o</span>
          </h1>
          <h2 className="hero-title-sub-elegant">
            <span>R</span><span>e</span><span>š</span><span>t</span><span>a</span><span>u</span><span>r</span><span>á</span><span>c</span><span>i</span><span>a</span>
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="hero-subtitle-modern mt-6"
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 mt-8"
        >
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollToSection("#contact"); }}
            className="hero-btn-primary"
            data-testid="hero-cta-contact"
          >
            {t("hero.ctaContact")}
          </a>
          <button
            onClick={() => scrollToSection("#menu")}
            className="hero-btn-secondary"
            data-testid="hero-cta-menu"
          >
            {t("nav.menu")}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 md:py-32 relative paper-texture" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <AnimatedSection className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <motion.div
            variants={scaleIn}
            className="relative aspect-[4/5] overflow-hidden rounded-sm"
          >
            <img
              src="https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/zb6k4fi9_fotka%20oreste.jpg"
              alt="Boccacio Restaurant Team"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Content */}
          <div className="space-y-8">
            <motion.div variants={fadeInUp}>
              <span className="about-tradition-text-readable">{t("about.subtitle")}</span>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h2 className="about-title">
                {t("about.title")}
              </h2>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground leading-relaxed">
              {t("about.description")}
            </motion.p>

            <motion.p variants={fadeInUp} className="text-muted-foreground leading-relaxed">
              {t("about.description2")}
            </motion.p>

            <motion.div variants={fadeInUp} className="grid grid-cols-1 gap-4 pt-6">
              {["feature1", "feature2", "feature3"].map((feature, i) => (
                <div key={feature} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">{i + 1}</span>
                  </div>
                  <p className="font-medium text-foreground">{t(`about.${feature}`)}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Naše jedlá section - REMOVED, moved to separate component */}
      </div>
    </section>
  );
};

// Naše Jedlá Section (Our Dishes description)
const NaseJedlaSection = () => {
  const { t } = useLanguage();
  
  const foodFeatures = [
    { icon: '🍕', key: 'pizza' },
    { icon: '🍲', key: 'soups' },
    { icon: '🥓', key: 'appetizers' },
    { icon: '🍝', key: 'pasta' },
    { icon: '🥩', key: 'meat' },
    { icon: '🐟', key: 'fish' },
    { icon: '🍰', key: 'desserts' },
  ];

  return (
    <section id="nase-jedla" className="py-24 md:py-32 relative paper-texture" data-testid="nase-jedla-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <AnimatedSection>
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-semibold text-foreground">{t("naseJedla.title")}</h3>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="food-features-grid">
            {foodFeatures.map((item, index) => (
              <div key={index} className="food-feature-item">
                <span className="food-feature-icon">{item.icon}</span>
                <p className="food-feature-text">{t(`naseJedla.${item.key}`)}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-8 text-center">
            <p className="food-features-note">
              {t("naseJedla.note")}
            </p>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

// Interior Section
const InteriorSection = () => {
  const { t } = useLanguage();

  // Interior photos - 10 photos
  const interiorImages = [
    { id: 'int-1', src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/3l2mpjr2_1.jpg', alt: 'Kniha hostí s Audrey Hepburn' },
    { id: 'int-2', src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/f26esfpr_2.jpg', alt: 'Elegantný príborník s vínami' },
    { id: 'int-3', src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/y82dxmf1_3.jpg', alt: 'Víno Sassicaia' },
    { id: 'int-4', src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/gk6jypa4_4.jpg', alt: 'Hlavná jedáleň s oblúkmi' },
    { id: 'int-5', src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/dn70my6a_5.jpg', alt: 'Prosciutto a dekorácie' },
    { id: 'int-6', src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/sblun0zv_6.jpg', alt: 'Elegantné stolovanie pod oblúkom' },
    { id: 'int-7', src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/vsxu8hl7_7.jpg', alt: 'Renoir obraz a antický nábytok' },
    { id: 'int-8', src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/zyx80dbz_8.jpg', alt: 'Slávnostná sála s lustrom' },
    { id: 'int-9', src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/falqavns_9.jpg', alt: 'Dlhý stôl pre oslavy' },
    { id: 'int-10', src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/a2xjc6hs_10.jpg', alt: 'Romantické stolovanie s kryštálmi' },
  ];

  return (
    <section id="interior" className="py-24 md:py-32 bg-muted/30" data-testid="interior-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <AnimatedSection className="text-center mb-16">
          <motion.span variants={fadeInUp} className="font-script text-xl text-primary">
            {t("interior.subtitle")}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold mt-2 text-foreground"
          >
            {t("interior.title")}
          </motion.h2>
        </AnimatedSection>

        <AnimatedSection>
          <motion.div variants={fadeIn} className="interior-grid" data-testid="interior-grid">
            {interiorImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="interior-item"
                data-testid={`interior-item-${image.id}`}
              >
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover" loading="lazy" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

// Food Section (Jedlá)
const FoodSection = () => {
  const { t } = useLanguage();

  // Real food photos - 9 photos total
  const foodImages = [
    {
      id: 'food-1',
      src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/2g1axo7z_2.jpg',
      alt: 'Grilované steaky',
    },
    {
      id: 'food-2',
      src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/2mp23cll_3.jpg',
      alt: 'Risotto s morskými plodmi',
    },
    {
      id: 'food-3',
      src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/ntkenzfq_5.jpg',
      alt: 'Cestoviny s cuketou a bazalkou',
    },
    {
      id: 'food-4',
      src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/l82l78b8_6.jpg',
      alt: 'Grilovaná ryba so zemiakmi',
    },
    {
      id: 'food-5',
      src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/bvnmlvgw_8.jpg',
      alt: 'Čerstvé ryby a tuniak',
    },
    {
      id: 'food-6',
      src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/c1xq6un7_9.jpg',
      alt: 'Steak so zeleninou',
    },
    {
      id: 'food-7',
      src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/79l3lc5f_10.jpg',
      alt: 'Teľacia kotleta',
    },
    {
      id: 'food-8',
      src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/0ppormdd_13.jpg',
      alt: 'Talianske antipasto',
    },
    {
      id: 'food-9',
      src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/agigipmh_14.jpg',
      alt: 'Risotto frutti di mare',
    },
    {
      id: 'food-10',
      src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/xkyb4c3o_1.jpg',
      alt: 'Hovädzie filé s rozmarínom',
    },
    {
      id: 'food-11',
      src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/3waulmsq_2.jpg',
      alt: 'Tagliatelle s hľuzovkou',
    },
    {
      id: 'food-12',
      src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/omxxyzc9_3.jpg',
      alt: 'Gnocchi s tekvicou a krevetami',
    },
    {
      id: 'food-13',
      src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/osw9jy9d_4.jpg',
      alt: 'Zuppa di pesce',
    },
    {
      id: 'food-14',
      src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/ckl2yav9_5.jpg',
      alt: 'Cozze al pomodoro',
    },
    {
      id: 'food-15',
      src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/tek6ui18_6.jpg',
      alt: 'Pizza Margherita z pece',
    },
    {
      id: 'food-16',
      src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/otsl18su_7.jpg',
      alt: 'Pizza s mortadelou a burratou',
    },
  ];

  return (
    <section id="food" className="py-24 md:py-32 relative paper-texture" data-testid="food-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <AnimatedSection className="text-center mb-16">
          <motion.span variants={fadeInUp} className="font-script text-xl text-primary">
            {t("food.subtitle")}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold mt-2 text-foreground"
          >
            {t("food.title")}
          </motion.h2>
        </AnimatedSection>

        <AnimatedSection>
          <motion.div variants={fadeIn} className="food-grid" data-testid="food-grid">
            {foodImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className="food-item"
                data-testid={`food-item-${image.id}`}
              >
                <img src={image.src} alt={image.alt} loading="lazy" />
                <div className="food-item-overlay">
                  <span>{image.alt}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

// Jedálny Lístok Section
const JedalnyListokSection = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('pizza');

  const menuCategories = [
    { id: 'pizza', icon: '🍕' },
    { id: 'zuppe', icon: '🥣' },
    { id: 'antipasti', icon: '🥗' },
    { id: 'pasta', icon: '🍝' },
    { id: 'risotti', icon: '🍚' },
    { id: 'carne', icon: '🥩' },
    { id: 'pesce', icon: '🐟' },
    { id: 'insalate', icon: '🥬' },
    { id: 'contorni', icon: '🥔' },
    { id: 'desert', icon: '🍰' },
    { id: 'napoje', icon: '🍷' },
  ];

  const menuItems = {
    pizza: [
      { name: 'Margherita', price: '10,90 €', desc: 'Paradajková omáčka, mozzarella', allergens: '1, 7' },
      { name: 'Vegetariana', price: '12,50 €', desc: 'Paradajková omáčka, mozzarella, olivy, kapia, cibuľa, šampiňony, kukurica', allergens: '1, 7' },
      { name: 'Fiorentina', price: '13,90 €', desc: 'Paradajková omáčka, mozzarella, kukurica, talianska šunka, parmezán', allergens: '1, 7' },
      { name: 'Bufala', price: '13,90 €', desc: 'Paradajková omáčka, mozzarella z byvola', allergens: '1, 7' },
      { name: 'Campagna', price: '13,00 €', desc: 'Paradajková omáčka, mozzarella, prosciutto, rucola, gorgonzola', allergens: '1, 7' },
      { name: 'Prosciutto cotto', price: '11,50 €', desc: 'Paradajková omáčka, mozzarella, dusená šunka', allergens: '1, 7' },
      { name: 'Prosciutto Salciccia', price: '12,50 €', desc: 'Paradajková omáčka, mozzarella, šunka, údená klobása', allergens: '1, 7' },
      { name: 'Quattro formaggi', price: '12,50 €', desc: 'Paradajková omáčka, 4 druhy syru', allergens: '1, 7' },
      { name: 'Capricciosa', price: '12,50 €', desc: 'Paradajková omáčka, mozzarella, šunka, klobása, šampiňóny, artičoky', allergens: '1, 7' },
      { name: 'Quattro stagioni', price: '12,90 €', desc: 'Paradajková omáčka, mozzarella, šunka, šampiňóny, artičoky, olivy', allergens: '1, 7' },
      { name: 'Barchetta', price: '12,90 €', desc: 'Plnená pizza - mozzarella, kuracie prsia, šampiňóny', allergens: '1, 7' },
      { name: 'Salame piccante ventricina', price: '12,90 €', desc: 'Paradajková omáčka, mozzarella, pikantná saláma ventricina', allergens: '1, 7' },
      { name: 'Contadina', price: '11,90 €', desc: 'Smotana, mozzarella, slanina, niva, cesnak', allergens: '1, 7' },
      { name: 'Tonno e cipolla', price: '12,50 €', desc: 'Paradajková omáčka, mozzarella, tuniak, cibuľa', allergens: '1, 4, 7' },
      { name: 'Pancetta e cipolla rossa', price: '11,50 €', desc: 'Paradajková omáčka, mozzarella, slanina, červená cibuľa', allergens: '1, 7' },
      { name: 'Bella Italia', price: '11,00 €', desc: 'Paradajková omáčka, mozzarella, cherry paradajky, šalát rucola', allergens: '1, 7' },
      { name: 'Calzone Farcito', price: '11,90 €', desc: 'Preložená pizza, paradajková omáčka, mozzarella, šampiňóny, šunka, artičoky', allergens: '1, 7' },
      { name: 'Foccaccia con prosciutto', price: '12,90 €', desc: 'Mozzarella, prosciutto, rucola', allergens: '1, 7' },
      { name: 'Boccaccio', price: '12,90 €', desc: 'Paradajková omáčka, mozzarella, šunka, šampiňóny, vajíčko, parmezán, saláma, olivy, tal.šunka', allergens: '1, 3, 7' },
      { name: 'Havai', price: '11,50 €', desc: 'Paradajková omáčka, mozzarella, šunka, ananás', allergens: '1, 7' },
      { name: 'Frutti di mare', price: '14,50 €', desc: 'Paradajková omáčka, mozzarella, čerstvé morské plody', allergens: '1, 4, 7' },
      { name: 'Funghi e salsiccia', price: '12,50 €', desc: 'Paradajková omáčka, mozzarella, šampiňóny, neúdená talianska klobása', allergens: '1, 7' },
      { name: 'Foccaccia bianca con rosmarino', price: '5,00 €', desc: 'Pizza bez príloh s rozmarínom', allergens: '1' },
    ],
    zuppe: [
      { name: 'Zuppa di pomodoro', price: '5,00 €', desc: 'Paradajková polievka', allergens: '' },
      { name: 'Minestrone', price: '5,00 €', desc: 'Talianska polievka so strukovinou a zeleninou', allergens: '' },
      { name: 'Polievka dňa', price: '5,00 €', desc: 'Podľa dennej ponuky', allergens: '' },
    ],
    antipasti: [
      { name: 'Bruschetta con pomodoro', price: '4,00 €', desc: 'Opečený domáci chlieb s paradajkou a cesnakom', allergens: '1' },
      { name: 'Carpaccio di manzo', price: '11,00 €', desc: 'Marinovaná hovädzia sviečková, parmezán, rukola', allergens: '7' },
      { name: 'Caprese', price: '9,50 €', desc: 'Mozzarella prekladaná s paradajkou a bazalkou', allergens: '7' },
      { name: 'Prosciutto di Parma', price: '12,00 €', desc: 'Parmská šunka', allergens: '' },
      { name: 'Antipasto Boccaccio', price: '19,50 €', desc: 'Predjedlo z chobotnice, mušla sv.jakuba, slávky, losos, krevety, kaviár, ustrica', allergens: '1, 2, 4' },
      { name: 'Grande antipasto italiano (4 os.)', price: '45,00 €', desc: 'Talianske predjedlo pre 4 osoby, miešané talianske syry a salámy, prosciutto, grilovaná zelenina, olivy, kapary, bruschette a pizza chlieb', allergens: '1, 7' },
    ],
    pasta: [
      { name: 'Spaghetti con Cozze', price: '14,90 €', desc: 'Špagety s morskými mušľami na cesnaku', allergens: '1, 14' },
      { name: 'Ravioli di zucca', price: '12,90 €', desc: 'Domáce ravioli plnené tekvicou hokkaido na masle a šalvii', allergens: '1, 3, 7' },
      { name: 'Tagliatelle con funghi porcini', price: '13,50 €', desc: 'Domáce rezance na dubákoch', allergens: '1, 7' },
      { name: 'Tagliatelle con manzo e grana', price: '14,90 €', desc: 'Rezance s hovädzkou roštenkou, rukola, parmezán', allergens: '1, 7' },
      { name: 'Spaghetti con pomodoro e basilico', price: '11,90 €', desc: 'Špagety s paradajkovou omáčkou a čerstvou bazalkou', allergens: '1' },
      { name: 'Spaghetti aglio olio e peperoncino', price: '11,90 €', desc: 'Špagety s cesnakom, olivovým olejom a čili', allergens: '1' },
      { name: 'Lasagne al forno', price: '12,90 €', desc: 'Mäsité lasagne', allergens: '1, 7, 9' },
      { name: 'Fusillata casereccia con salsiccia', price: '12,90 €', desc: 'Vretienka s talianskou klobásou a smotanovou omáčkou', allergens: '1, 7' },
      { name: 'Penne all\'Amatriciana', price: '12,90 €', desc: 'Penne s pikantnou paradajkovou omáčkou na slaninke s cibuľou', allergens: '1' },
      { name: 'Spaghetti alla Carbonara', price: '12,90 €', desc: 'Špagety s vajíčkom, guanciale, parmezán', allergens: '1, 3, 7' },
    ],
    risotti: [
      { name: 'Risotto con funghi porcini', price: '13,50 €', desc: 'Rizoto na dubákoch', allergens: '7' },
      { name: 'Risotto con asparagi', price: '13,50 €', desc: 'Rizoto so špargľou', allergens: '7' },
    ],
    carne: [
      { name: 'Petto di pollo con salsa di basilico', price: '13,90 €', desc: 'Grilované kuracie prsia s bazalkovou omáčkou a sušenými paradajkami', allergens: '7' },
      { name: 'Filetto di maiale con Gorgonzola', price: '14,50 €', desc: 'Medailónky z bravčovej panenky so syrom Gorgonzola', allergens: '7' },
      { name: 'Filetto di maiale con demi-glace', price: '14,50 €', desc: 'Medailónky z bravčovej panenky s demi-glace a kaparami', allergens: '10' },
      { name: 'Filetto Italiano', price: '12,50 € / 100g', desc: 'Steak na grile na rozmaríne', allergens: '' },
      { name: 'Filetto al pepe verde', price: '12,50 € / 100g', desc: 'Steak na zelenom korení', allergens: '7, 10' },
      { name: 'Tagliata di manzo', price: '16,00 €', desc: 'Hovädzia roštenka na grile na šaláte rucola, parmezán a ocot Balsamico', allergens: '7' },
    ],
    pesce: [
      { name: 'Salmone alla griglia con spinaci', price: '14,50 €', desc: 'Grilovaný losos na čerstvom špenáte', allergens: '4' },
      { name: 'Branzino alla griglia', price: '22,00 €', desc: 'Grilovaný morský vlk', allergens: '4' },
      { name: 'Orata alla mediterranea', price: '24,00 €', desc: 'Pražma kráľovská pečená so zemiakmi a južanskou zeleninou', allergens: '4' },
    ],
    insalate: [
      { name: 'Italia', price: '11,50 €', desc: 'Listový šalát, šalát rucola, parmezán, sušené paradajky, bazalkové pesto, opečený toast', allergens: '7' },
      { name: 'Pollo', price: '12,50 €', desc: 'Listový šalát, paradajky, olivy, grilované kuracie mäso, bylinkový dressing, opečený toast', allergens: '3' },
    ],
    contorni: [
      { name: 'Verdure alla griglia', price: '6,00 €', desc: 'Grilovaná zelenina', allergens: '' },
      { name: 'Patate lesse', price: '3,50 €', desc: 'Varené zemiaky', allergens: '' },
      { name: 'Patate al forno', price: '4,00 €', desc: 'Opekané zemiaky', allergens: '' },
      { name: 'Patate americane', price: '4,00 €', desc: 'Americké zemiaky', allergens: '' },
      { name: 'Patatine fritte', price: '4,00 €', desc: 'Hranolky', allergens: '' },
      { name: 'Riso', price: '3,00 €', desc: 'Ryža', allergens: '' },
    ],
    desert: [
      { name: 'Panna cotta', price: '5,00 €', desc: 'Vanilková tortička s karamelom', allergens: '7' },
      { name: 'Tiramisú', price: '6,00 €', desc: 'Kávový dezert', allergens: '1, 3, 7' },
      { name: 'Tortino al cioccolato', price: '6,00 €', desc: 'Čokoládový fondánt s lesnými plodmi a vanilkovou zmrzlinou', allergens: '1, 3, 7' },
      { name: 'Crema di mascarpone', price: '5,00 €', desc: 'Krém z mascarpone s jahodami a mandľovými sušienkami', allergens: '7' },
      { name: 'Sorbetto', price: '6,00 €', desc: 'Sorbet', allergens: '7' },
    ],
    napoje: [
      { name: 'Presso káva', price: '3,00 €', desc: '7g', allergens: '' },
      { name: 'Cappuccino', price: '3,50 €', desc: '7g', allergens: '' },
      { name: 'Caffè latte', price: '3,50 €', desc: '7g', allergens: '' },
      { name: 'Espresso macchiato', price: '3,50 €', desc: '7g', allergens: '' },
      { name: 'Doppio espresso', price: '4,50 €', desc: '14g', allergens: '' },
      { name: 'Viedenská káva', price: '3,50 €', desc: '7g', allergens: '' },
      { name: 'Írska káva', price: '4,00 €', desc: '7g', allergens: '' },
      { name: 'Ľadová káva', price: '4,50 €', desc: '7g', allergens: '' },
      { name: 'Čaj', price: '3,00 €', desc: '2g', allergens: '' },
    ],
  };

  return (
    <section id="jedalny-listok" className="py-24 md:py-32 bg-background" data-testid="jedalny-listok-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <AnimatedSection className="text-center mb-16">
          <motion.span variants={fadeInUp} className="font-script text-xl text-primary">
            {t("jedalnyListok.subtitle")}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold mt-2 text-foreground"
          >
            {t("jedalnyListok.title")}
          </motion.h2>
        </AnimatedSection>

        {/* Category Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="menu-category-tabs"
        >
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`menu-category-tab ${activeCategory === cat.id ? 'active' : ''}`}
            >
              <span className="menu-category-icon">{cat.icon}</span>
              <span className="menu-category-name">{t(`jedalnyListok.categories.${cat.id}`)}</span>
            </button>
          ))}
        </motion.div>

        {/* Menu Items */}
        <motion.div 
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="menu-items-grid"
        >
          {menuItems[activeCategory]?.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="menu-item-card"
            >
              <div className="menu-item-header">
                <h3 className="menu-item-name">{item.name}</h3>
                <span className="menu-item-price">{item.price}</span>
              </div>
              <p className="menu-item-desc">{item.desc}</p>
              {item.allergens && (
                <span className="menu-item-allergens">{t("jedalnyListok.allergens")}: {item.allergens}</span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Allergens Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-sm text-muted-foreground"
        >
          <p className="mb-2 font-medium">{t("jedalnyListok.allergensNote")}</p>
          <p className="max-w-4xl mx-auto leading-relaxed">
            {t("jedalnyListok.allergensInfo")}
          </p>
          <p className="mt-4 italic">{t("jedalnyListok.glutenFree")}</p>
        </motion.div>
      </div>
    </section>
  );
};

// Menu Section - Denné Menu
const MenuSection = () => {
  const { t } = useLanguage();

  const pizzaOptions = [
    { name: 'Prosciutto e funghi', allergens: '(1,7)', desc: 'Paradajková omáčka, mozzarella, šunka, šampiňóny' },
    { name: 'Pomodoro e rucola', allergens: '(1,7)', desc: 'Paradajková omáčka, mozzarella, rukola, paradajky' },
    { name: 'Pancetta e cipolla', allergens: '(1,7)', desc: 'Paradajková omáčka, mozzarella, slaninka, cibuľa' },
    { name: 'Salsiccia piccante', allergens: '(1,7)', desc: 'Paradajková omáčka, mozzarella, klobáska, feferóny' },
    { name: 'Diavola', allergens: '(1,7)', desc: 'Paradajková omáčka, mozzarella, saláma, chilli' },
    { name: 'Bianca', allergens: '(1,7)', desc: 'Mozzarella, smotana, šunka, kukurica' },
    { name: 'Vegetariana', allergens: '(1,7)', desc: 'Paradajková omáčka, mozzarella, olivy, kukurica, kápia, cibuľa, šampiňóny' },
    { name: 'Margherita', allergens: '(1,7)', desc: 'Paradajková omáčka, mozzarella' },
  ];

  return (
    <section id="menu" className="py-24 md:py-32 bg-muted/30" data-testid="menu-section">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <AnimatedSection className="text-center mb-16">
          <motion.span variants={fadeInUp} className="font-script text-xl text-primary">
            {t("menu.subtitle")}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold mt-2 text-foreground"
          >
            {t("menu.title")}
          </motion.h2>
        </AnimatedSection>

        <div className="space-y-8">
          {/* Menu č.1 - DYNAMICKÉ Z ADMINA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="daily-menu-card"
          >
            <div className="daily-menu-header">
              <h3 className="daily-menu-title">Menu č.1</h3>
              <span className="daily-menu-price">{dailyData.price}</span>
            </div>
            <div className="daily-menu-content">
              <div className="daily-menu-item">
                <span className="daily-menu-label">Polievka</span>
                <span className="daily-menu-value">{dailyData.soup}</span>
              </div>
              <div className="daily-menu-item">
                <span className="daily-menu-label">Hlavné jedlo</span>
                <span className="daily-menu-value">{dailyData.mainCourse}</span>
              </div>
            </div>
          </motion.div>

          {/* Menu č.2 - Pizza */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="daily-menu-card"
          >
            <div className="daily-menu-header">
              <h3 className="daily-menu-title">Menu č.2 - Pizza menu</h3>
              <span className="daily-menu-price">8,90 €</span>
            </div>
            <div className="daily-menu-content">
              <div className="daily-menu-item">
                <span className="daily-menu-label">Polievka</span>
                <span className="daily-menu-value">Výber z 2 polievok</span>
              </div>
              <div className="daily-menu-item">
                <span className="daily-menu-label">Hlavné jedlo</span>
                <span className="daily-menu-value">Výber z 8 druhov veľkej pizze:</span>
              </div>
            </div>
            
            <div className="pizza-options-grid">
              {pizzaOptions.map((pizza, index) => (
                <div key={index} className="pizza-option">
                  <div className="pizza-option-header">
                    <span className="pizza-number">{index + 1}.</span>
                    <span className="pizza-name">{pizza.name}</span>
                    <span className="pizza-allergens">{pizza.allergens}</span>
                  </div>
                  <p className="pizza-desc">{pizza.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Menu č.3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="daily-menu-card"
          >
            <div className="daily-menu-header">
              <h3 className="daily-menu-title">Menu č.3</h3>
              <span className="daily-menu-price">8,50 €</span>
            </div>
            <div className="daily-menu-content">
              <div className="daily-menu-item">
                <span className="daily-menu-label">Polievka</span>
                <span className="daily-menu-value">Výber z dvoch polievok</span>
              </div>
              <div className="daily-menu-item">
                <span className="daily-menu-label">Hlavné jedlo</span>
                <span className="daily-menu-value">Šalát Pollo</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Gallery Section
// Winter Garden Section
const WinterGardenSection = () => {
  const { t } = useLanguage();

  // Winter garden photos - 7 photos
  const winterGardenImages = [
    { id: 'wg-1', src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/hkmwdsh7_1.jpg', alt: 'Zimná záhrada s olivovníkom' },
    { id: 'wg-2', src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/ihg2mxmg_2.jpg', alt: 'Terasa s tehlami' },
    { id: 'wg-3', src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/nsdgks27_3.jpg', alt: 'Večerná atmosféra' },
    { id: 'wg-4', src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/ct5ecy86_4.jpg', alt: 'Posedenie pod strechou' },
    { id: 'wg-5', src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/5x1wd9c0_5.jpg', alt: 'Lampáše a sviečky' },
    { id: 'wg-6', src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/vitaftqg_6.jpg', alt: 'Romantický kútik so slnkom' },
    { id: 'wg-7', src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/jy72c0z0_7.jpg', alt: 'Elegantné stolovanie' },
  ];

  return (
    <section id="winter-garden" className="py-24 md:py-32 bg-muted/30 overflow-hidden" data-testid="winter-garden-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <AnimatedSection className="text-center mb-16">
          <motion.span variants={fadeInUp} className="font-script text-xl text-primary">
            {t("winterGarden.subtitle")}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold mt-2 text-foreground"
          >
            {t("winterGarden.title")}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            {t("winterGarden.description")}
          </motion.p>
        </AnimatedSection>

        {/* Masonry Gallery with Parallax Effects */}
        <div className="wg-masonry-grid" data-testid="winter-garden-grid">
          {winterGardenImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.7, 
                delay: (index % 5) * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`wg-masonry-item wg-item-${index + 1}`}
              data-testid={`winter-garden-item-${image.id}`}
            >
              <div className="wg-image-wrapper">
                <motion.img 
                  src={image.src} 
                  alt={image.alt} 
                  loading="lazy"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <div className="wg-image-overlay">
                  <span className="wg-image-caption">{image.alt}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: MapPin,
      label: t("contact.address"),
      value: "Farská 36, 949 01 Nitra",
      href: "https://maps.google.com/?q=Farská+36+Nitra",
    },
    {
      icon: Phone,
      label: t("contact.phone"),
      value: "+421 903 444 964",
      href: "tel:+421903444964",
    },
    {
      icon: Mail,
      label: t("contact.email"),
      value: "boccaccio@boccaccio.sk",
      href: "mailto:boccaccio@boccaccio.sk",
    },
  ];

  const hours = [
    { day: t("contact.monday"), time: "11:00 – 23:00" },
    { day: t("contact.tuesday"), time: "11:00 – 23:00" },
    { day: t("contact.wednesday"), time: "11:00 – 23:00" },
    { day: t("contact.thursday"), time: "11:00 – 23:00" },
    { day: t("contact.friday"), time: "11:00 – 23:00" },
    { day: t("contact.saturday"), time: "11:00 – 23:00" },
    { day: t("contact.sunday"), time: t("contact.closed") },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 bg-muted/30" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <AnimatedSection className="text-center mb-16">
          <motion.span variants={fadeInUp} className="font-script text-xl text-primary">
            {t("contact.subtitle")}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold mt-2 text-foreground"
          >
            {t("contact.title")}
          </motion.h2>
        </AnimatedSection>

        <AnimatedSection className="grid md:grid-cols-2 gap-8">
          {/* Map Placeholder */}
          <motion.div
            variants={fadeInUp}
            className="aspect-square md:aspect-auto md:h-full min-h-[400px] rounded-sm overflow-hidden"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2657.8!2d18.0873!3d48.3069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476b3ed8bb9a1d7d%3A0x0!2sFarsk%C3%A1%2036%2C%20949%2001%20Nitra!5e0!3m2!1sen!2ssk!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Boccaccio Location"
            />
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeInUp} className="space-y-6">
            {/* Contact Cards */}
            {contactInfo.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="contact-card flex items-center gap-4 p-5 rounded-sm"
                data-testid={`contact-${item.label.toLowerCase()}`}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="font-medium text-foreground">{item.value}</p>
                </div>
              </a>
            ))}

            {/* Opening Hours */}
            <div className="contact-card p-5 rounded-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <p className="font-medium text-foreground">{t("contact.hours")}</p>
              </div>
              <div className="space-y-2 pl-16">
                {hours.map((h) => (
                  <div key={h.day} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{h.day}</span>
                    <span className={`font-medium ${h.time === t("contact.closed") ? "text-destructive" : "text-foreground"}`}>
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">{t("contact.followUs")}</p>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/boccaccio_restauracia_nitra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link instagram"
                  data-testid="social-instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://www.facebook.com/boccaccio.restauracia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link facebook"
                  data-testid="social-facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer py-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-semibold text-background mb-1">BOCCACCIO</h3>
            <p className="text-sm text-background/60">{t("footer.madeWith")}</p>
          </div>
          <p className="text-sm text-background/60">
            © {currentYear} Boccaccio. {t("footer.rights")}.
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- HLAVNÝ KOMPONENT ---
const MainApp = () => {
  useEffect(() => {
    // Inicializácia Lenis (hladké skrolovanie)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative" data-testid="boccacio-app">
      <Navigation />
      <Routes>
        {/* HLAVNÁ STRÁNKA */}
        <Route path="/" element={
          <>
            <HeroSection />
            <AboutSection />
            <InteriorSection />
            <WinterGardenSection />
            <NaseJedlaSection />
            <FoodSection />
            <JedalnyListokSection />
            <MenuSection />
            <ContactSection />
            <Footer />
          </>
        } />

        {/* ADMIN PANEL */}
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </div>
  );
};

// TOTO JE TO NAJDÔLEŽITEJŠIE - EXPORT A WRAPPERS
export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <MainApp />
      </Router>
    </LanguageProvider>
  );
}