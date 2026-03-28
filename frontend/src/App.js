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

// Animated Section Wrapper
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

// Components
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.menu"), href: "#menu" },
    { name: t("nav.gallery"), href: "#interior" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-background/80 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center">
          <a href="#" className="text-2xl font-semibold tracking-tighter hover:opacity-80 transition-opacity">
            BOCCACCIO
          </a>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest">
                {link.name}
              </a>
            ))}
          </div>
          <div className="flex gap-2 ml-4">
            {Object.keys(languages).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center transition-all ${language === lang ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">
                  {link.name}
                </a>
              ))}
              <div className="flex gap-4 pt-4 border-t">
                {Object.keys(languages).map((lang) => (
                  <button key={lang} onClick={() => { setLanguage(lang); setMobileMenuOpen(false); }} className={`px-4 py-2 rounded-md ${language === lang ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                    {languages[lang].name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <motion.div initial="hidden" animate="visible" variants={scaleIn} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img src="https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/hkmwdsh7_1.jpg" alt="Boccaccio Atmosphere" className="w-full h-full object-cover" />
      </motion.div>
      <div className="relative z-20 text-center px-6">
        <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="inline-block font-script text-2xl md:text-3xl text-white mb-4">
          {t("hero.subtitle")}
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter mb-8">
          BOCCACCIO
        </motion.h1>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <a href="#about" className="flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors">
            <span className="text-xs uppercase tracking-[0.2em] font-medium">{t("hero.scroll")}</span>
            <ChevronDown className="animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
        <AnimatedSection>
          <motion.span variants={fadeInUp} className="font-script text-xl text-primary">
            {t("about.subtitle")}
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-semibold mt-2 mb-6">
            {t("about.title")}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg leading-relaxed mb-8">
            {t("about.description1")}
          </motion.p>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg leading-relaxed">
            {t("about.description2")}
          </motion.p>
        </AnimatedSection>
        <AnimatedSection className="relative">
          <motion.div variants={scaleIn} className="aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
            <img src="https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/ihg2mxmg_2.jpg" alt="Restaurant Interior" className="w-full h-full object-cover" />
          </motion.div>
          <div className="absolute -bottom-6 -left-6 bg-primary p-8 hidden md:block">
            <p className="text-primary-foreground font-script text-2xl tracking-wide">Since 1996</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

const InteriorSection = () => {
  const { t } = useLanguage();
  const interiorImages = [
    { id: 'int-1', src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/nsdgks27_3.jpg', alt: 'Hlavná sála' },
    { id: 'int-2', src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/ct5ecy86_4.jpg', alt: 'Detail prestierania' },
    { id: 'int-3', src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/5x1wd9c0_5.jpg', alt: 'Barová časť' },
  ];

  return (
    <section id="interior" className="py-24 bg-muted/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <AnimatedSection className="text-center mb-16">
          <motion.span variants={fadeInUp} className="font-script text-xl text-primary">Atmosphere</motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-semibold mt-2">Náš Interiér</motion.h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-3 gap-6">
          {interiorImages.map((img, i) => (
            <motion.div key={img.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="aspect-[3/4] overflow-hidden group">
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WinterGardenSection = () => {
  const { t } = useLanguage();
  const winterGardenImages = [
    { id: 'wg-1', src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/hkmwdsh7_1.jpg', alt: 'Zimná záhrada' },
    { id: 'wg-2', src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/vitaftqg_6.jpg', alt: 'Svetlá terasa' },
    { id: 'wg-3', src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/jy72c0z0_7.jpg', alt: 'Večerná atmosféra' },
  ];

  return (
    <section id="winter-garden" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <img src={winterGardenImages[0].src} className="rounded-sm w-full h-64 object-cover" alt="WG 1" />
            <img src={winterGardenImages[1].src} className="rounded-sm w-full h-80 object-cover" alt="WG 2" />
          </div>
          <div className="pt-12">
            <img src={winterGardenImages[2].src} className="rounded-sm w-full h-96 object-cover" alt="WG 3" />
          </div>
        </div>
        <AnimatedSection>
          <motion.span variants={fadeInUp} className="font-script text-xl text-primary">{t("winterGarden.subtitle")}</motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-semibold mt-2 mb-6">{t("winterGarden.title")}</motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg leading-relaxed">{t("winterGarden.description")}</motion.p>
        </AnimatedSection>
      </div>
    </section>
  );
};

const NaseJedlaSection = () => (
  <section className="py-12 bg-primary flex justify-center">
    <h2 className="text-3xl md:text-5xl font-semibold text-primary-foreground font-script tracking-widest uppercase">Naše Jedlá</h2>
  </section>
);

const FoodSection = () => {
  const foodImages = [
    { id: 'f1', src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/t5g97n44_1.jpg', alt: 'Pasta' },
    { id: 'f2', src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/e6idm4cl_2.jpg', alt: 'Meat' },
    { id: 'f3', src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/9on5a9f2_3.jpg', alt: 'Pizza' },
    { id: 'f4', src: 'https://customer-assets.emergentagent.com/job_boccaccio-nitra/artifacts/f66y2f9l_4.jpg', alt: 'Salad' },
  ];
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 w-full h-[300px] md:h-[400px]">
      {foodImages.map(img => (
        <div key={img.id} className="overflow-hidden group relative">
          <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
        </div>
      ))}
    </section>
  );
};

const JedalnyListokSection = () => (
  <section className="py-24 bg-background text-center">
    <AnimatedSection>
      <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-semibold mb-8 tracking-tighter uppercase">Jedálny Lístok</motion.h2>
      <motion.div variants={fadeInUp} className="flex justify-center">
        <a href="/menu.pdf" target="_blank" className="px-10 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 font-medium tracking-widest uppercase">
          Zobraziť kompletné menu
        </a>
      </motion.div>
    </AnimatedSection>
  </section>
);

// Menu Section - Denné Menu (TU JE TA HLAVNA OPRAVA)
const MenuSection = () => {
  const { t } = useLanguage();
  const [dailyMenu, setDailyMenu] = useState(null);

  useEffect(() => {
    fetch("https://boccacio11.onrender.com/api/daily-menu")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setDailyMenu(data[0]);
        } else {
          setDailyMenu(data);
        }
      })
      .catch(err => console.error("Chyba pri načítaní menu:", err));
  }, []);

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
          <motion.span variants={fadeInUp} className="font-script text-xl text-primary">{t("menu.subtitle")}</motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-semibold mt-2 text-foreground">{t("menu.title")}</motion.h2>
        </AnimatedSection>

        <div className="space-y-8">
          {/* Menu č.1 - DYNAMICKÉ */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="daily-menu-card">
            <div className="daily-menu-header">
              <h3 className="daily-menu-title">Menu č.1</h3>
              <span className="daily-menu-price">{dailyMenu ? dailyMenu.price : "8,90 €"}</span>
            </div>
            <div className="daily-menu-content">
              <div className="daily-menu-item">
                <span className="daily-menu-label">Polievka</span>
                <span className="daily-menu-value">{dailyMenu ? dailyMenu.soup : "Načítavam..."}</span>
              </div>
              <div className="daily-menu-item">
                <span className="daily-menu-label">Hlavné jedlo</span>
                <span className="daily-menu-value">{dailyMenu ? dailyMenu.mainCourse : "Načítavam..."}</span>
              </div>
            </div>
          </motion.div>

          {/* Menu č.2 - Pizza */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="daily-menu-card">
            <div className="daily-menu-header">
              <h3 className="daily-menu-title">Menu č.2 - Pizza menu</h3>
              <span className="daily-menu-price">8,90 €</span>
            </div>
            <div className="daily-menu-content">
              <div className="daily-menu-item">
                <span className="daily-menu-label">Hlavné jedlo</span>
                <span className="daily-menu-value">Výber z 8 druhov veľkej pizze:</span>
              </div>
            </div>
            <div className="pizza-options-grid mt-6">
              {pizzaOptions.map((pizza, index) => (
                <div key={index} className="pizza-option">
                  <div className="pizza-option-header">
                    <span className="pizza-number">{index + 1}.</span>
                    <span className="pizza-name">{pizza.name}</span>
                    <span className="pizza-allergens">{pizza.allergens}</span>
                  </div>
                  <p className="pizza-desc text-xs text-muted-foreground">{pizza.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Menu č.3 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="daily-menu-card">
            <div className="daily-menu-header">
              <h3 className="daily-menu-title">Menu č.3</h3>
              <span className="daily-menu-price">8,50 €</span>
            </div>
            <div className="daily-menu-content">
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

const ContactSection = () => {
  const { t } = useLanguage();
  const contactInfo = [
    { icon: MapPin, label: t("contact.address"), value: "Farská 36, 949 01 Nitra", href: "https://maps.google.com" },
    { icon: Phone, label: t("contact.phone"), value: "+421 903 444 964", href: "tel:+421903444964" },
    { icon: Mail, label: t("contact.email"), value: "boccaccio@boccaccio.sk", href: "mailto:boccaccio@boccaccio.sk" },
  ];
  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12">
        <AnimatedSection>
          <motion.h2 variants={fadeInUp} className="text-4xl font-semibold mb-8 uppercase tracking-tighter">Kontakt</motion.h2>
          <div className="space-y-6">
            {contactInfo.map(item => (
              <a key={item.label} href={item.href} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="font-medium">{item.value}</p>
                </div>
              </a>
            ))}
          </div>
        </AnimatedSection>
        <div className="h-96 bg-muted rounded-sm overflow-hidden grayscale">
            {/* Mapu si mozes vlozit cez iframe podla potreby */}
            <div className="w-full h-full bg-muted-foreground/20 flex items-center justify-center text-muted-foreground">Mapa / Farská 36</div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-12 bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h3 className="text-2xl font-bold mb-4">BOCCACCIO</h3>
        <p className="text-sm opacity-60">© {currentYear} Boccaccio. {t("footer.rights")}.</p>
      </div>
    </footer>
  );
};

const MainApp = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <Router>
      <div className="relative">
        <Routes>
          <Route path="/" element={
            <>
              <Navigation />
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
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
};

function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}

export default App;