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
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- COMPONENTS ---

const Navigation = () => {
  const { t, language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav.home"), href: "#home" },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.menu"), href: "#jedalny-listok" },
    { name: t("nav.daily"), href: "#menu" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-background/95 backdrop-blur-md py-4 shadow-lg" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#home" className="text-2xl font-semibold tracking-tighter text-foreground">
          BOCCACCIO
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}

          {/* Language Switcher */}
          <div className="flex items-center gap-3 ml-4 border-l pl-8 border-foreground/10">
            {Object.entries(languages).map(([code, lang]) => (
              <button
                key={code}
                onClick={() => setLanguage(code)}
                className={`text-xs font-bold transition-all ${
                  language === code
                    ? "text-primary scale-110"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {lang.flag}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-background z-[60] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-semibold tracking-tighter">BOCCACCIO</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-light hover:text-primary transition-colors lowercase tracking-tighter"
                >
                  {link.name}
                </a>
              ))}
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
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2 }}
          className="w-full h-full bg-[url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-script text-2xl md:text-3xl text-primary mb-4 block"
        >
          Benvenuti a Boccaccio
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-6xl md:text-8xl lg:text-9xl font-semibold mb-8 tracking-tighter leading-none"
        >
          Autentická
          <br />
          Talianska Chuť
        </motion.h1>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium opacity-50">Spoznajte nás</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </motion.div>
    </section>
  );
};

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-20 items-center">
        <AnimatedSection>
          <motion.span variants={fadeInUp} className="font-script text-xl text-primary">
            {t("about.subtitle")}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-semibold mt-2 mb-8 tracking-tight text-foreground"
          >
            {t("about.title")}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground leading-relaxed mb-8"
          >
            {t("about.description")}
          </motion.p>
        </AnimatedSection>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="aspect-[4/5] bg-[url('https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center rounded-sm"
          />
        </div>
      </div>
    </section>
  );
};

const InteriorSection = () => {
  const { t } = useLanguage();
  return (
    <section id="interior" className="py-24 md:py-32 bg-muted/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="aspect-video lg:aspect-square bg-[url('https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center rounded-sm"
            />
          </div>
          <AnimatedSection className="order-1 lg:order-2">
            <motion.span variants={fadeInUp} className="font-script text-xl text-primary">
              Atmosféra
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-semibold mt-2 mb-6 tracking-tight">
              Elegantný Interiér
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground leading-relaxed">
              Naša reštaurácia ponúka štýlové prostredie, ktoré spája moderný dizajn s tradičnými talianskymi prvkami. Ideálne miesto pre romantickú večeru aj rodinnú oslavu.
            </motion.p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

const WinterGardenSection = () => {
  return (
    <section id="garden" className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <motion.span variants={fadeInUp} className="font-script text-xl text-primary">
              Oáza pokoja
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-semibold mt-2 mb-6 tracking-tight">
              Zimná Záhrada
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground leading-relaxed">
              Vychutnajte si svoje obľúbené jedlo v našej presvetlenej zimnej záhrade, ktorá je v prevádzke počas celého roka. Ponúka jedinečný výhľad a relaxačnú atmosféru.
            </motion.p>
          </AnimatedSection>
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="aspect-video bg-[url('https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center rounded-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const NaseJedlaSection = () => {
  return (
    <section className="py-24 md:py-32 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-16">
        <span className="font-script text-xl text-primary">Gastronómia</span>
        <h2 className="text-4xl md:text-5xl font-semibold mt-2">Naše Špeciality</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 max-w-[1600px] mx-auto">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 0.98 }}
            className="aspect-square bg-muted overflow-hidden rounded-sm"
          >
            <img 
              src={`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`} 
              alt="Food" 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const FoodSection = () => {
  const categories = ["Všetko", "Pizza", "Pasta", "Dezerty"];
  const [active, setActive] = useState("Všetko");

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-center gap-8 mb-16 overflow-x-auto pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`text-sm uppercase tracking-widest font-medium transition-all ${active === cat ? "text-primary border-b border-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

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

const MenuSection = () => {
  const { t } = useLanguage();
  const [dailyMenu, setDailyMenu] = useState(null);

  useEffect(() => {
    fetch("https://boccacio11.onrender.com/api/daily-menu")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setDailyMenu(data[0]);
        else setDailyMenu(data);
      })
      .catch(err => console.error("Chyba pri načítavaní menu:", err));
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
    <section id="menu" className="py-24 md:py-32 relative bg-background" data-testid="menu-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <AnimatedSection className="text-center mb-16">
          <motion.span variants={fadeInUp} className="font-script text-xl text-primary">
            {t("menu.subtitle")}
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-semibold mt-2 text-foreground">
            {t("menu.title")}
          </motion.h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* MENU 1 */}
          <AnimatedSection>
            <motion.div variants={fadeInUp} className="menu-card featured">
              <div className="menu-card-badge">{t("menu.dailyBadge")}</div>
              <h3 className="text-2xl font-semibold mb-4">{t("menu.dailyTitle")}</h3>
              
              <div className="space-y-4">
                <div>
                  <span className="block text-sm uppercase tracking-wider text-primary font-medium mb-1">
                    {t("menu.soup")}
                  </span>
                  <p className="text-lg italic">
                    {dailyMenu ? dailyMenu.soup : "Načítavam..."}
                  </p>
                </div>
                
                <div>
                  <span className="block text-sm uppercase tracking-wider text-primary font-medium mb-1">
                    {t("menu.mainCourse")}
                  </span>
                  <p className="text-lg font-medium leading-tight">
                    {dailyMenu ? dailyMenu.mainCourse : "Načítavam..."}
                  </p>
                </div>

                <div className="pt-4 border-t border-primary/10 flex justify-between items-center">
                   <span className="text-2xl font-bold text-primary">
                     {dailyMenu ? dailyMenu.price : "8,90 €"}
                   </span>
                   <span className="text-xs text-muted-foreground uppercase">Po-Pi 11:00 - 14:00</span>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* MENU 2 - PIZZA */}
          <AnimatedSection>
            <motion.div variants={fadeInUp} className="menu-card">
              <h3 className="text-2xl font-semibold mb-4">Menu č.2 - Pizza</h3>
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {pizzaOptions.map((item, index) => (
                  <div key={index} className="border-b border-primary/5 pb-2">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-medium text-sm">{index + 1}. {item.name}</h4>
                      <span className="text-[10px] text-muted-foreground">{item.allergens}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-tight mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="pt-4 mt-4 border-t border-primary/10 flex justify-between items-center">
                 <span className="text-2xl font-bold text-primary">8,90 €</span>
                 <span className="text-xs text-muted-foreground uppercase">Vrátane polievky</span>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* MENU 3 - SALAT */}
          <AnimatedSection>
            <motion.div variants={fadeInUp} className="menu-card">
              <h3 className="text-2xl font-semibold mb-4">Menu č.3 - Šalát</h3>
              <div className="space-y-4">
                <div>
                  <span className="block text-sm uppercase tracking-wider text-primary font-medium mb-1">
                    Insalata di Pollo
                  </span>
                  <p className="text-muted-foreground text-sm">
                    Listový šalát, paradajky, olivy, grilované kuracie mäso, bylinkový dressing, opečený toast
                  </p>
                </div>
                <div className="pt-4 border-t border-primary/10 flex justify-between items-center">
                   <span className="text-2xl font-bold text-primary">8,50 €</span>
                   <span className="text-xs text-muted-foreground uppercase">Vrátane polievky</span>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const { t } = useLanguage();
  return (
    <section id="contact" className="py-24 md:py-32 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-semibold mb-8 tracking-tight">{t("contact.title")}</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="text-primary mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">{t("contact.addressTitle")}</h4>
                  <p className="text-muted-foreground">{t("contact.address")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="text-primary mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">{t("contact.phoneTitle")}</h4>
                  <a href="tel:+421915744443" className="text-muted-foreground hover:text-primary transition-colors">+421 915 744 443</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="text-primary mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">{t("contact.hoursTitle")}</h4>
                  <p className="text-muted-foreground whitespace-pre-line">{t("contact.hours")}</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
          
          <div className="h-[450px] bg-muted rounded-sm overflow-hidden shadow-xl grayscale hover:grayscale-0 transition-all duration-700">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.347589258249!2d18.2618!3d48.7188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDQzJzA3LjciTiAxOMKwMTUnNDIuNSJF!5e0!3m2!1ssk!2ssk!4v1620000000000!5m2!1ssk!2ssk" 
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
            ></iframe>
          </div>
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
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h3 className="text-2xl font-semibold mb-6">BOCCACCIO</h3>
        <p className="text-sm opacity-60">© {currentYear} Boccaccio. Všetky práva vyhradené.</p>
      </div>
    </footer>
  );
};

const MainApp = () => {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="relative">
      <Navigation />
      <Routes>
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
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <MainApp />
      </Router>
    </LanguageProvider>
  );
}