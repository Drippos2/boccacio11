import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const languages = {
  sk: { 
    code: 'sk', 
    name: 'Slovensky', 
    flagUrl: 'https://flagcdn.com/w40/sk.png'
  },
  en: { 
    code: 'en', 
    name: 'English', 
    flagUrl: 'https://flagcdn.com/w40/gb.png'
  },
  de: { 
    code: 'de', 
    name: 'Deutsch', 
    flagUrl: 'https://flagcdn.com/w40/de.png'
  },
  it: { 
    code: 'it', 
    name: 'Italiano', 
    flagUrl: 'https://flagcdn.com/w40/it.png'
  },
};

export const translations = {
  sk: {
    nav: {
      about: 'O nás',
      interior: 'Interiér',
      food: 'Jedlá',
      menu: 'Denné menu',
      winterGarden: 'Exteriér',
      jedalnyListok: 'Jedálny lístok',
      gallery: 'Galéria',
      contact: 'Kontakt',
    },
    hero: {
      subtitle: 'Typická talianska reštaurácia v Nitre',
      cta: 'Rezervovať stôl',
      ctaContact: 'Kontaktujte nás',
      scroll: 'Scrollujte nadol',
    },
    about: {
      title: 'O nás',
      subtitle: 'Tradícia od roku 1997',
      description: 'Reštaurácia Boccaccio, založená talianskym podnikateľom Orestem Calzolarim z Bologne v roku 1997, je miestom, kde sa snúbi pohodlie, autentická talianska kuchyňa a špičková obsluha.',
      description2: 'Ponúkame príjemné prostredie vo vnútri aj vonku, vhodné pre romantické večere, obchodné stretnutia, rodinné oslavy či bankety.',
      feature1: 'Autentická talianska kuchyňa',
      feature2: 'Vinotéka s talianskymi vínami',
      feature3: 'Ocenenie "Typická Talianska Reštaurácia"',
    },
    menu: {
      title: 'Denné menu',
      subtitle: 'Naša denná ponuka',
      dateRange: 'od 23.3.2026 do 27.3.2026',
      timeRange: '11:00 - 14:30',
      categories: {
        steaks: 'Steaky na grile',
        seafood: 'Morské špeciality',
        salads: 'Šaláty',
        sides: 'Prílohy',
        desserts: 'Dezerty',
      },
      allergens: 'Alergény',
    },
    gallery: {
      title: 'Galéria',
      subtitle: 'Naše prostredie a jedlá',
    },
    interior: {
      title: 'Interiér',
      subtitle: 'Naše prostredie',
    },
    food: {
      title: 'Jedlá',
      subtitle: 'Naše špeciality',
    },
    naseJedla: {
      title: 'Naše jedlá',
      pizza: 'Široký výber pizze pečenej v originálnej peci na drevo',
      soups: 'Polievky slovenské a talianske',
      appetizers: 'Predjedlá z talianskej šunky Parma, San Daniele, salámy a syry',
      pasta: 'Domáce cestoviny podľa talianskych tradičných receptúr',
      meat: 'Hlavné jedlá z bravčového, kuracieho, hovädzieho, T-bone a Tomahawk steaky',
      fish: 'Špeciality z morských rýb a plodov mora',
      desserts: 'Tradičné talianske dezerty',
      note: 'Všetky jedlá sú vyrobené z čerstvých talianskych originálnych surovín a ingrediencií',
    },
    jedalnyListok: {
      title: 'Jedálny lístok',
      subtitle: 'Naša ponuka',
      allergens: 'Alergény',
      allergensNote: 'Zoznam alergénov:',
      allergensInfo: '1-Lepok, 2-Kôrovce, 3-Vajcia, 4-Ryby, 5-Arašidy, 6-Sója, 7-Mlieko, 8-Orechy, 9-Zeler, 10-Horčica, 11-Sezam, 12-Siričitany, 13-Vlčí bôb, 14-Mäkkýše',
      glutenFree: 'Pripravujeme pizzu z bezlepkovej múky na požiadanie.',
      categories: {
        pizza: 'Pizza',
        zuppe: 'Polievky',
        antipasti: 'Predjedlá',
        pasta: 'Cestoviny',
        risotti: 'Rizotá',
        carne: 'Mäso',
        pesce: 'Ryby',
        insalate: 'Šaláty',
        contorni: 'Prílohy',
        desert: 'Dezerty',
        napoje: 'Nápoje',
      },
    },
    winterGarden: {
      title: 'Exteriér',
      subtitle: 'Vonkajšie sedenie',
      description: 'Užite si jedinečnú atmosféru nášho vonkajšieho posedenia, ideálneho pre rodinné stretnutia a oslavy.',
    },
    contact: {
      title: 'Kontakt',
      subtitle: 'Navštívte nás',
      address: 'Adresa',
      phone: 'Telefón',
      email: 'E-mail',
      hours: 'Otváracie hodiny',
      monday: 'Pondelok',
      tuesday: 'Utorok',
      wednesday: 'Streda',
      thursday: 'Štvrtok',
      friday: 'Piatok',
      saturday: 'Sobota',
      sunday: 'Nedeľa',
      closed: 'Zatvorené',
      followUs: 'Sledujte nás',
    },
    footer: {
      rights: 'Všetky práva vyhradené',
      madeWith: 'Vytvorené s láskou v Nitre',
    },
  },
  en: {
    nav: {
      about: 'About',
      interior: 'Interior',
      food: 'Food',
      menu: 'Daily Menu',
      winterGarden: 'Exterior',
      jedalnyListok: 'Menu',
      gallery: 'Gallery',
      contact: 'Contact',
    },
    hero: {
      subtitle: 'Typical Italian Restaurant in Nitra',
      cta: 'Book a Table',
      ctaContact: 'Contact Us',
      scroll: 'Scroll down',
    },
    about: {
      title: 'About Us',
      subtitle: 'Tradition since 1997',
      description: 'Boccaccio Restaurant, founded by Italian entrepreneur Oreste Calzolari from Bologna in 1997, is a place where comfort, authentic Italian cuisine, and top-notch service come together.',
      description2: 'We offer a pleasant environment inside and outside, suitable for romantic dinners, business meetings, family celebrations, or banquets.',
      feature1: 'Authentic Italian Cuisine',
      feature2: 'Wine cellar with Italian wines',
      feature3: '"Typical Italian Restaurant" Award',
    },
    menu: {
      title: 'Daily Menu',
      subtitle: 'Our Daily Offer',
      dateRange: 'from 23.3.2026 to 27.3.2026',
      timeRange: '11:00 - 14:30',
      categories: {
        steaks: 'Grilled Steaks',
        seafood: 'Seafood Specialties',
        salads: 'Salads',
        sides: 'Side Dishes',
        desserts: 'Desserts',
      },
      allergens: 'Allergens',
    },
    gallery: {
      title: 'Gallery',
      subtitle: 'Our Ambiance & Dishes',
    },
    interior: {
      title: 'Interior',
      subtitle: 'Our Ambiance',
    },
    food: {
      title: 'Food',
      subtitle: 'Our Specialties',
    },
    naseJedla: {
      title: 'Our Dishes',
      pizza: 'Wide selection of pizza baked in original wood-fired oven',
      soups: 'Slovak and Italian soups',
      appetizers: 'Appetizers from Italian Parma ham, San Daniele, salami and cheeses',
      pasta: 'Homemade pasta according to traditional Italian recipes',
      meat: 'Main dishes from pork, chicken, beef, T-bone and Tomahawk steaks',
      fish: 'Specialties from sea fish and seafood',
      desserts: 'Traditional Italian desserts',
      note: 'All dishes are made from fresh Italian original ingredients',
    },
    jedalnyListok: {
      title: 'Menu',
      subtitle: 'Our Offer',
      allergens: 'Allergens',
      allergensNote: 'Allergen list:',
      allergensInfo: '1-Gluten, 2-Crustaceans, 3-Eggs, 4-Fish, 5-Peanuts, 6-Soy, 7-Milk, 8-Nuts, 9-Celery, 10-Mustard, 11-Sesame, 12-Sulphites, 13-Lupin, 14-Molluscs',
      glutenFree: 'We prepare gluten-free pizza on request.',
      categories: {
        pizza: 'Pizza',
        zuppe: 'Soups',
        antipasti: 'Appetizers',
        pasta: 'Pasta',
        risotti: 'Risotto',
        carne: 'Meat',
        pesce: 'Fish',
        insalate: 'Salads',
        contorni: 'Sides',
        desert: 'Desserts',
        napoje: 'Drinks',
      },
    },
    winterGarden: {
      title: 'Exterior',
      subtitle: 'Outdoor Seating',
      description: 'Enjoy the unique atmosphere of our outdoor seating, ideal for family gatherings and celebrations.',
    },
    contact: {
      title: 'Contact',
      subtitle: 'Visit Us',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      hours: 'Opening Hours',
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday',
      closed: 'Closed',
      followUs: 'Follow Us',
    },
    footer: {
      rights: 'All rights reserved',
      madeWith: 'Made with love in Nitra',
    },
  },
  de: {
    nav: {
      about: 'Über uns',
      interior: 'Interieur',
      food: 'Speisen',
      menu: 'Tagesmenü',
      winterGarden: 'Außenbereich',
      jedalnyListok: 'Speisekarte',
      gallery: 'Galerie',
      contact: 'Kontakt',
    },
    hero: {
      subtitle: 'Typisches italienisches Restaurant in Nitra',
      cta: 'Tisch reservieren',
      ctaContact: 'Kontaktieren Sie uns',
      scroll: 'Nach unten scrollen',
    },
    about: {
      title: 'Über uns',
      subtitle: 'Tradition seit 1997',
      description: 'Das Restaurant Boccaccio, gegründet vom italienischen Unternehmer Oreste Calzolari aus Bologna im Jahr 1997, ist ein Ort, an dem Komfort, authentische italienische Küche und erstklassiger Service zusammenkommen.',
      description2: 'Wir bieten eine angenehme Atmosphäre drinnen und draußen, geeignet für romantische Abendessen, Geschäftstreffen, Familienfeiern oder Bankette.',
      feature1: 'Authentische italienische Küche',
      feature2: 'Weinkeller mit italienischen Weinen',
      feature3: 'Auszeichnung "Typisches italienisches Restaurant"',
    },
    menu: {
      title: 'Tagesmenü',
      subtitle: 'Unser Tagesangebot',
      dateRange: 'vom 23.3.2026 bis 27.3.2026',
      timeRange: '11:00 - 14:30',
      categories: {
        steaks: 'Gegrillte Steaks',
        seafood: 'Meeresfrüchte-Spezialitäten',
        salads: 'Salate',
        sides: 'Beilagen',
        desserts: 'Desserts',
      },
      allergens: 'Allergene',
    },
    gallery: {
      title: 'Galerie',
      subtitle: 'Unser Ambiente & Gerichte',
    },
    interior: {
      title: 'Interieur',
      subtitle: 'Unser Ambiente',
    },
    food: {
      title: 'Speisen',
      subtitle: 'Unsere Spezialitäten',
    },
    naseJedla: {
      title: 'Unsere Gerichte',
      pizza: 'Große Auswahl an Pizza aus dem original Holzofen',
      soups: 'Slowakische und italienische Suppen',
      appetizers: 'Vorspeisen aus italienischem Parmaschinken, San Daniele, Salami und Käse',
      pasta: 'Hausgemachte Pasta nach traditionellen italienischen Rezepten',
      meat: 'Hauptgerichte aus Schwein, Huhn, Rind, T-Bone und Tomahawk Steaks',
      fish: 'Spezialitäten aus Meeresfisch und Meeresfrüchten',
      desserts: 'Traditionelle italienische Desserts',
      note: 'Alle Gerichte werden aus frischen italienischen Originalzutaten zubereitet',
    },
    jedalnyListok: {
      title: 'Speisekarte',
      subtitle: 'Unser Angebot',
      allergens: 'Allergene',
      allergensNote: 'Allergenliste:',
      allergensInfo: '1-Gluten, 2-Krebstiere, 3-Eier, 4-Fisch, 5-Erdnüsse, 6-Soja, 7-Milch, 8-Nüsse, 9-Sellerie, 10-Senf, 11-Sesam, 12-Sulfite, 13-Lupinen, 14-Weichtiere',
      glutenFree: 'Wir bereiten glutenfreie Pizza auf Anfrage zu.',
      categories: {
        pizza: 'Pizza',
        zuppe: 'Suppen',
        antipasti: 'Vorspeisen',
        pasta: 'Pasta',
        risotti: 'Risotto',
        carne: 'Fleisch',
        pesce: 'Fisch',
        insalate: 'Salate',
        contorni: 'Beilagen',
        desert: 'Desserts',
        napoje: 'Getränke',
      },
    },
    winterGarden: {
      title: 'Außenbereich',
      subtitle: 'Außensitzplätze',
      description: 'Genießen Sie die einzigartige Atmosphäre unseres Außenbereichs, ideal für Familienfeiern.',
    },
    contact: {
      title: 'Kontakt',
      subtitle: 'Besuchen Sie uns',
      address: 'Adresse',
      phone: 'Telefon',
      email: 'E-Mail',
      hours: 'Öffnungszeiten',
      monday: 'Montag',
      tuesday: 'Dienstag',
      wednesday: 'Mittwoch',
      thursday: 'Donnerstag',
      friday: 'Freitag',
      saturday: 'Samstag',
      sunday: 'Sonntag',
      closed: 'Geschlossen',
      followUs: 'Folgen Sie uns',
    },
    footer: {
      rights: 'Alle Rechte vorbehalten',
      madeWith: 'Mit Liebe gemacht in Nitra',
    },
  },
  it: {
    nav: {
      about: 'Chi siamo',
      interior: 'Interni',
      food: 'Piatti',
      menu: 'Menu del giorno',
      winterGarden: 'Esterno',
      jedalnyListok: 'Menu',
      gallery: 'Galleria',
      contact: 'Contatti',
    },
    hero: {
      subtitle: 'Tipico Ristorante Italiano a Nitra',
      cta: 'Prenota un tavolo',
      ctaContact: 'Contattaci',
      scroll: 'Scorri verso il basso',
    },
    about: {
      title: 'Chi siamo',
      subtitle: 'Tradizione dal 1997',
      description: 'Il Ristorante Boccaccio, fondato dall\'imprenditore italiano Oreste Calzolari di Bologna nel 1997, è un luogo dove comfort, autentica cucina italiana e servizio di prim\'ordine si incontrano.',
      description2: 'Offriamo un ambiente piacevole all\'interno e all\'esterno, adatto per cene romantiche, incontri d\'affari, feste di famiglia o banchetti.',
      feature1: 'Autentica cucina italiana',
      feature2: 'Cantina con vini italiani',
      feature3: 'Premio "Tipico Ristorante Italiano"',
    },
    menu: {
      title: 'Menu del giorno',
      subtitle: 'La nostra offerta del giorno',
      dateRange: 'dal 23.3.2026 al 27.3.2026',
      timeRange: '11:00 - 14:30',
      categories: {
        steaks: 'Bistecche alla griglia',
        seafood: 'Specialità di mare',
        salads: 'Insalate',
        sides: 'Contorni',
        desserts: 'Dolci',
      },
      allergens: 'Allergeni',
    },
    gallery: {
      title: 'Galleria',
      subtitle: 'Il nostro ambiente e piatti',
    },
    interior: {
      title: 'Interni',
      subtitle: 'Il nostro ambiente',
    },
    food: {
      title: 'Piatti',
      subtitle: 'Le nostre specialità',
    },
    naseJedla: {
      title: 'I nostri piatti',
      pizza: 'Ampia scelta di pizza cotta nel forno a legna originale',
      soups: 'Zuppe slovacche e italiane',
      appetizers: 'Antipasti con prosciutto di Parma, San Daniele, salumi e formaggi italiani',
      pasta: 'Pasta fatta in casa secondo le ricette tradizionali italiane',
      meat: 'Piatti principali di maiale, pollo, manzo, T-bone e Tomahawk steaks',
      fish: 'Specialità di pesce di mare e frutti di mare',
      desserts: 'Dolci tradizionali italiani',
      note: 'Tutti i piatti sono preparati con ingredienti italiani freschi e originali',
    },
    jedalnyListok: {
      title: 'Menu',
      subtitle: 'La nostra offerta',
      allergens: 'Allergeni',
      allergensNote: 'Elenco allergeni:',
      allergensInfo: '1-Glutine, 2-Crostacei, 3-Uova, 4-Pesce, 5-Arachidi, 6-Soia, 7-Latte, 8-Noci, 9-Sedano, 10-Senape, 11-Sesamo, 12-Solfiti, 13-Lupini, 14-Molluschi',
      glutenFree: 'Prepariamo pizza senza glutine su richiesta.',
      categories: {
        pizza: 'Pizza',
        zuppe: 'Zuppe',
        antipasti: 'Antipasti',
        pasta: 'Pasta',
        risotti: 'Risotti',
        carne: 'Carne',
        pesce: 'Pesce',
        insalate: 'Insalate',
        contorni: 'Contorni',
        desert: 'Dolci',
        napoje: 'Bevande',
      },
    },
    winterGarden: {
      title: 'Esterno',
      subtitle: 'Posti a sedere all\'aperto',
      description: 'Goditi l\'atmosfera unica dei nostri posti a sedere all\'aperto, ideale per riunioni di famiglia e celebrazioni.',
    },
    contact: {
      title: 'Contatti',
      subtitle: 'Visitaci',
      address: 'Indirizzo',
      phone: 'Telefono',
      email: 'Email',
      hours: 'Orari di apertura',
      monday: 'Lunedì',
      tuesday: 'Martedì',
      wednesday: 'Mercoledì',
      thursday: 'Giovedì',
      friday: 'Venerdì',
      saturday: 'Sabato',
      sunday: 'Domenica',
      closed: 'Chiuso',
      followUs: 'Seguici',
    },
    footer: {
      rights: 'Tutti i diritti riservati',
      madeWith: 'Fatto con amore a Nitra',
    },
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('sk');

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
