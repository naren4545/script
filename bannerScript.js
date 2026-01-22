const scr = document.currentScript;
const rawConfig = scr.getAttribute('data-config');
const siteId=scr.getAttribute('data-site-id')
const {
checkedCategories,
compliance,
customization,
settings,

} = JSON.parse(rawConfig);




const moreInfoTranslations = {
  English: "More Info",
  Spanish: "Más Información",
  French: "Plus d'Informations",
  German: "Weitere Informationen",
  Italian: "Maggiori Informazioni",
  Portuguese: "Mais Informações",
  Swedish: "Mer Info",
  Dutch: "Meer Info",
};

const ccpaTranslations = {
  English: {
    heading: "Opt-out Preference",
    description:
      "We use third-party cookies that help us analyze how you use this website, store your preferences, and provide the content and advertisements that are relevant to you. We do not sell your information. However, you can opt out of these cookies by checking Do Not Share My Personal Information and clicking the Save My Preferences button. Once you opt out, you can opt in again at any time by unchecking Do Not Share My Personal Information and clicking the Save My Preferences button",
    doNotShare: ".Do Not Share My Personal Information",
    savePreference: "Save My Preference",
    cancel: "Cancel",
  },
  Spanish: {
    heading: "Preferencia de Exclusión",
    description:
      "Utilizamos cookies de terceros que nos ayudan a analizar cómo utiliza este sitio web, almacenar sus preferencias y proporcionar contenido y anuncios relevantes para usted. No vendemos su información. Sin embargo, puede optar por no recibir estas cookies marcando No Compartir Mi Información Personal y haciendo clic en el botón Guardar Mis Preferencias. Una vez que opte por no participar, puede volver a participar en cualquier momento desmarcando No Compartir Mi Información Personal y haciendo clic en el botón Guardar Mis Preferencias",
    doNotShare: ".No Compartir Mi Información Personal.",
    savePreference: "Guardar Mi Preferencia",
    cancel: "Cancelar",
  },
  French: {
    heading: "Préférence de Désinscription",
    description:
      "Nous utilisons des cookies tiers qui nous aident à analyser votre utilisation de ce site web, à stocker vos préférences et à fournir du contenu et des publicités pertinents pour vous. Nous ne vendons pas vos informations. Cependant, vous pouvez désactiver ces cookies en cochant Ne Pas Partager Mes Informations Personnelles et en cliquant sur le bouton Enregistrer Mes Préférences. Une fois désactivé, vous pouvez réactiver à tout moment en décochant Ne Pas Partager Mes Informations Personnelles et en cliquant sur le bouton Enregistrer Mes Préférences",
    doNotShare: ".Ne Pas Partager Mes Informations Personnelles.",
    savePreference: "Enregistrer Mes Préférences",
    cancel: "Annuler",
  },
  German: {
    heading: "Abmeldepräferenzen",
    description:
      "Wir verwenden Cookies von Drittanbietern, die uns helfen, Ihre Nutzung dieser Website zu analysieren, Ihre Präferenzen zu speichern und relevante Inhalte und Werbung bereitzustellen. Wir verkaufen Ihre Informationen nicht. Sie können diese Cookies jedoch deaktivieren, indem Sie 'Meine persönlichen Informationen nicht weitergeben' auswählen und auf 'Meine Präferenzen speichern' klicken. Sobald deaktiviert, können Sie dies jederzeit rückgängig machen, indem Sie die Auswahl von 'Meine persönlichen Informationen nicht weitergeben' aufheben und erneut auf 'Meine Präferenzen speichern' klicken.",
    doNotShare: "Meine persönlichen Informationen nicht weitergeben",
    savePreference: "Meine Präferenzen speichern",
    cancel: "Abbrechen",
  },
  Swedish: {
    heading: "Avregistreringspreferens",
    description:
      "Vi använder tredjepartscookies som hjälper oss att analysera hur du använder denna webbplats, lagra dina preferenser och tillhandahålla innehåll och annonser som är relevanta för dig. Vi säljer inte din information. Du kan dock välja bort dessa cookies genom att kryssa i 'Dela Inte Min Personliga Information' och klicka på 'Spara Mina Preferenser'-knappen. När du väljer bort kan du välja tillbaka när som helst genom att avmarkera 'Dela Inte Min Personliga Information' och klicka på 'Spara Mina Preferenser'-knappen",
    doNotShare: "Dela Inte Min Personliga Information",
    savePreference: "Spara Mina Preferenser",
    cancel: "Avbryt",
  },
  Dutch: {
    heading: "Afmeldingsvoorkeur",
    description:
      "We gebruiken cookies van derden die ons helpen bij het analyseren van hoe u deze website gebruikt, het opslaan van uw voorkeuren en het leveren van inhoud en advertenties die relevant voor u zijn. We verkopen uw informatie niet. U kunt deze cookies echter uitschakelen door 'Deel Mijn Persoonlijke Informatie Niet' aan te vinken en op de 'Sla Mijn Voorkeuren Op'-knop te klikken. Zodra u zich afmeldt, kunt u zich opnieuw aanmelden door het vinkje bij 'Deel Mijn Persoonlijke Informatie Niet' te verwijderen en op de 'Sla Mijn Voorkeuren Op'-knop te klikken",
    doNotShare: "Deel Mijn Persoonlijke Informatie Niet",
    savePreference: "Sla Mijn Voorkeuren Op",
    cancel: "Annuleren",
  },
  Portuguese: {
    heading: "Preferência de Exclusão",
    description:
      "Utilizamos cookies de terceiros que nos ajudam a analisar como você utiliza este site, armazenar suas preferências e fornecer conteúdos e anúncios relevantes para você. Não vendemos suas informações. No entanto, você pode desativar esses cookies marcando a opção Não Compartilhar Minhas Informações Pessoais e clicando no botão Salvar Minhas Preferências. Após desativar, você pode ativar novamente a qualquer momento desmarcando a opção e clicando no botão Salvar Minhas Preferências.",
    doNotShare: "Não Compartilhar Minhas Informações Pessoais",
    savePreference: "Salvar Minhas Preferências",
    cancel: "Cancelar",
  },
  Italian: {
    heading: "Preferenza di Opt-out",
    description:
      "Utilizziamo cookie di terze parti che ci aiutano ad analizzare come utilizzi questo sito web, a memorizzare le tue preferenze e a fornire contenuti e annunci pertinenti. Non vendiamo le tue informazioni. Tuttavia, puoi disattivare questi cookie selezionando Non Condividere le Mie Informazioni Personali e facendo clic sul pulsante Salva le Mie Preferenze. Una volta disattivato, puoi riattivarlo in qualsiasi momento deselezionando l'opzione e facendo clic sul pulsante Salva le Mie Preferenze.",
    doNotShare: "Non Condividere le Mie Informazioni Personali",
    savePreference: "Salva le Mie Preferenze",
    cancel: "Annulla",
  },
};
const translations = {
  English: {
    heading: "Cookie Settings",
    description:
      "We use cookies to provide you with the best possible experience. They also allow us to analyze user behavior in order to constantly improve the website for you.",
    accept: "Accept",
    reject: "Reject",
    preferences: "Preference",
    ccpa: {
      heading: "We value your Privacy",
      description:
        "We use cookies to provide you with the best possible experience. They also allow us to analyze user behavior in order to constantly improve the website for you.",
      doNotShare: "Do Not Share My Personal Information",
    },
  },
  Spanish: {
    heading: "Configuración de Cookies",
    description:
      "Utilizamos cookies para brindarle la mejor experiencia posible. También nos permiten analizar el comportamiento del usuario para mejorar constantemente el sitio web para usted.",
    accept: "Aceptar",
    reject: "Rechazar",
    preferences: "Preferencias",
    ccpa: {
      heading: "Valoramos tu Privacidad",
      description:
        "Utilizamos cookies para brindarle la mejor experiencia posible. También nos permiten analizar el comportamiento del usuario para mejorar constantemente el sitio web para usted.",
      doNotShare: "No Compartir Mi Información Personal",
    },
  },
  French: {
    heading: "Paramètres des Cookies",
    description:
      "Nous utilisons des cookies pour vous offrir la meilleure expérience possible. Ils nous permettent également d'analyser le comportement des utilisateurs afin d'améliorer constamment le site Web pour vous.",
    accept: "Accepter",
    reject: "Refuser",
    preferences: "Préférences",
    ccpa: {
      heading: "Nous Respectons Votre Vie Privée",
      description:
        "Nous utilisons des cookies pour vous offrir la meilleure expérience possible. Ils nous permettent également d'analyser le comportement des utilisateurs afin d'améliorer constamment le site Web pour vous.",
      doNotShare: "Ne Pas Partager Mes Informations Personnelles",
    },
  },
  German: {
    heading: "Cookie-Einstellungen",
    description:
      "Wir verwenden Cookies, um Ihnen das bestmögliche Erlebnis zu bieten. Sie helfen uns auch, das Nutzerverhalten zu analysieren, um die Website kontinuierlich für Sie zu verbessern.",
    accept: "Akzeptieren",
    reject: "Ablehnen",
    preferences: "Einstellungen",
    ccpa: {
      heading: "Wir Respektieren Ihre Privatsphäre",
      description:
        "Wir verwenden Cookies, um Ihnen das bestmögliche Erlebnis zu bieten. Sie helfen uns auch, das Nutzerverhalten zu analysieren, um die Website kontinuierlich für Sie zu verbessern.",
      doNotShare: "Meine persönlichen Informationen nicht weitergeben",
    },
  },
  Swedish: {
    heading: "Cookie-inställningar",
    description:
      "Vi använder cookies för att ge dig den bästa möjliga upplevelsen. De låter oss också analysera användarbeteende för att ständigt förbättra webbplatsen för dig.",
    accept: "Acceptera",
    reject: "Avvisa",
    preferences: "Inställningar",
    ccpa: {
      heading: "Vi Värdesätter Din Integritet",
      description:
        "Vi använder cookies för att ge dig den bästa möjliga upplevelsen. De låter oss också analysera användarbeteende för att ständigt förbättra webbplatsen för dig.",
      doNotShare: "Dela Inte Min Personliga Information",
    },
  },
  Dutch: {
    heading: "Cookie-instellingen",
    description:
      "We gebruiken cookies om u de best mogelijke ervaring te bieden. Ze stellen ons ook in staat om gebruikersgedrag te analyseren om de website voortdurend voor u te verbeteren.",
    accept: "Accepteren",
    reject: "Weigeren",
    preferences: "Voorkeuren",
    ccpa: {
      heading: "We Waarderen Uw Privacy",
      description:
        "We gebruiken cookies om u de best mogelijke ervaring te bieden. Ze stellen ons ook in staat om gebruikersgedrag te analyseren om de website voortdurend voor u te verbeteren.",
      doNotShare: "Deel Mijn Persoonlijke Informatie Niet",
    },
  },
  // Add these after the Dutch translations and before the closing brace
  Italian: {
    heading: "Impostazioni Cookie",
    description:
      "Utilizziamo i cookie per fornirti la migliore esperienza possibile. Ci permettono anche di analizzare il comportamento degli utenti per migliorare costantemente il sito web per te.",
    accept: "Accetta",
    reject: "Rifiuta",
    preferences: "Preferenze",
    ccpa: {
      heading: "Rispettiamo la Tua Privacy",
      description:
        "Utilizziamo i cookie per fornirti la migliore esperienza possibile. Ci permettono anche di analizzare il comportamento degli utenti per migliorare costantemente il sito web per te.",
      doNotShare: "Non Condividere Le Mie Informazioni Personali",
    },
  },
  Portuguese: {
    heading: "Configurações de Cookies",
    description:
      "Usamos cookies para fornecer a melhor experiência possível. Eles também nos permitem analisar o comportamento do usuário para melhorar constantemente o site para você.",
    accept: "Aceitar",
    reject: "Rejeitar",
    preferences: "Preferências",
    ccpa: {
      heading: "Valorizamos Sua Privacidade",
      description:
        "Usamos cookies para fornecer a melhor experiência possível. Eles também nos permitem analisar o comportamento do usuário para melhorar constantemente o site para você.",
      doNotShare: "Não Compartilhar Minhas Informações Pessoais",
    },
  },
};
const finalTranslations = {
  English: {
    heading: "Cookie Preferences",
    description:
      "By clicking, you agree to store cookies on your device to enhance navigation, analyze usage, and support marketing",
    acceptAll: "Save Preference",
    reject: "Reject",
    changePreference: "Change Preference",
    sections: {
      essential: {
        label: "Essential",
        description:
          "Essential cookies enable core site functions like security and accessibility. They don't store personal data and cant be disabled.",
      },
      analytics: {
        label: "Analytics",
        description:
          "These cookies collect anonymous data to help us improve website functionality and enhance user experience.",
      },
      marketing: {
        label: "Marketing",
        description:
          "These cookies track users across websites to deliver relevant ads and may process personal data, requiring explicit consent.",
      },
      preferences: {
        label: "Preferences",
        description:
          "These cookies remember settings like language or region and store display preferences to offer a more personalized, seamless experience.",
      },
    },
  },
  Spanish: {
    heading: "Preferencias de Cookies",
    description:
      "Al hacer clic, acepta el almacenamiento de cookies en su dispositivo para mejorar la navegación del sitio, analizar el uso del sitio y ayudar en nuestros esfuerzos de marketing como se describe en nuestro.",
    acceptAll: "Aceptar Todo",
    reject: "Rechazar",
    changePreference: "Cambiar Preferencias",
    sections: {
      essential: {
        label: "Esenciales",
        description:
          "Las cookies esenciales permiten funciones básicas del sitio como la seguridad y la accesibilidad. No almacenan datos personales y no se pueden desactivar.",
      },
      analytics: {
        label: "Analíticas",
        description:
          "Estas cookies recopilan datos anónimos para ayudarnos a mejorar la funcionalidad del sitio web y optimizar la experiencia del usuario.",
      },
      marketing: {
        label: "Marketing",
        description:
          "Estas cookies rastrean a los usuarios en diferentes sitios web para ofrecer anuncios relevantes y pueden procesar datos personales, por lo que requieren el consentimiento explícito.",
      },
      preferences: {
        label: "Preferencias",
        description:
          "Estas cookies recuerdan configuraciones como el idioma o la región y almacenan preferencias de visualización para ofrecer una experiencia más personalizada y fluida.",
      },
    },
  },
  French: {
    heading: "Préférences des Cookies",
    description:
      "Ces cookies sont nécessaires au bon fonctionnement du site web. Ils ne stockent aucune information personnelle.",
    acceptAll: "Accepter",
    reject: "Refuser",
    changePreference: "Modifier les Préférences",
    sections: {
      essential: {
        label: "Essentiels",
        description:
          "Les cookies essentiels permettent les fonctions de base du site, comme la sécurité et l'accessibilité. Ils ne stockent pas de données personnelles et ne peuvent pas être désactivés.",
      },
      analytics: {
        label: "Analytiques",
        description:
          "Ces cookies collectent des données anonymes pour nous aider à améliorer les fonctionnalités du site web et à enrichir l'expérience utilisateur.",
      },
      marketing: {
        label: "Marketing",
        description:
          "Ces cookies suivent les utilisateurs sur différents sites web pour diffuser des publicités pertinentes et peuvent traiter des données personnelles, nécessitant ainsi un consentement explicite.",
      },
      preferences: {
        label: "Préférences",
        description:
          "Ces cookies mémorisent des paramètres tels que la langue ou la région et enregistrent les préférences d'affichage afin d'offrir une expérience plus personnalisée et fluide.",
      },
    },
  },
  German: {
    heading: "Cookie-Einstellungen",
    description:
      "Durch Klicken stimmen Sie zu, Cookies auf Ihrem Gerät zu speichern, um die Navigation zu verbessern, die Nutzung zu analysieren und Marketing zu unterstützen",
    acceptAll: "Einstellungen speichern",
    reject: "Ablehnen",
    changePreference: "Einstellungen ändern",
    sections: {
      essential: {
        label: "Notwendig",
        description:
          "Notwendige Cookies ermöglichen grundlegende Website-Funktionen wie Sicherheit und Barrierefreiheit. Sie speichern keine persönlichen Daten und können nicht deaktiviert werden.",
      },
      analytics: {
        label: "Analytik",
        description:
          "Diese Cookies sammeln anonyme Daten, um uns zu helfen, die Website-Funktionalität zu verbessern und die Benutzererfahrung zu optimieren.",
      },
      marketing: {
        label: "Marketing",
        description:
          "Diese Cookies verfolgen Benutzer über Websites hinweg, um relevante Anzeigen zu liefern und können persönliche Daten verarbeiten, was eine ausdrückliche Zustimmung erfordert.",
      },
      preferences: {
        label: "Einstellungen",
        description:
          "Diese Cookies merken sich Einstellungen wie Sprache oder Region und speichern Anzeigepräferenzen, um eine personalisiertere, nahtlose Erfahrung zu bieten.",
      },
    },
  },
  Italian: {
    heading: "Preferenze sui Cookie",
    description:
      "Cliccando, accetti di memorizzare i cookie sul tuo dispositivo per migliorare la navigazione, analizzare l'utilizzo e supportare il marketing",
    acceptAll: "Salva Preferenze",
    reject: "Rifiuta",
    changePreference: "Cambia Preferenze",
    sections: {
      essential: {
        label: "Essenziali",
        description:
          "I cookie essenziali abilitano le funzioni principali del sito come sicurezza e accessibilità. Non memorizzano dati personali e non possono essere disabilitati.",
      },
      analytics: {
        label: "Analitica",
        description:
          "Questi cookie raccolgono dati anonimi per aiutarci a migliorare la funzionalità del sito web e ottimizzare l'esperienza utente.",
      },
      marketing: {
        label: "Marketing",
        description:
          "Questi cookie tracciano gli utenti su diversi siti web per fornire annunci rilevanti e possono elaborare dati personali, richiedendo un consenso esplicito.",
      },
      preferences: {
        label: "Preferenze",
        description:
          "Questi cookie ricordano le impostazioni come lingua o regione e memorizzano le preferenze di visualizzazione per offrire un'esperienza più personalizzata e fluida.",
      },
    },
  },
  Portuguese: {
    heading: "Preferências de Cookies",
    description:
      "Ao clicar, você concorda em armazenar cookies no seu dispositivo para melhorar a navegação, analisar o uso e apoiar o marketing",
    acceptAll: "Salvar Preferências",
    reject: "Rejeitar",
    changePreference: "Alterar Preferências",
    sections: {
      essential: {
        label: "Essenciais",
        description:
          "Os cookies essenciais permitem funções básicas do site como segurança e acessibilidade. Eles não armazenam dados pessoais e não podem ser desabilitados.",
      },
      analytics: {
        label: "Analíticos",
        description:
          "Esses cookies coletam dados anônimos para nos ajudar a melhorar a funcionalidade do site e otimizar a experiência do usuário.",
      },
      marketing: {
        label: "Marketing",
        description:
          "Esses cookies rastreiam usuários em diferentes sites para fornecer anúncios relevantes e podem processar dados pessoais, exigindo consentimento explícito.",
      },
      preferences: {
        label: "Preferências",
        description:
          "Esses cookies lembram configurações como idioma ou região e armazenam preferências de exibição para oferecer uma experiência mais personalizada e fluida.",
      },
    },
  },
  Swedish: {
    heading: "Cookie-inställningar",
    description:
      "Genom att klicka godkänner du att lagra cookies på din enhet för att förbättra navigering, analysera användning och stödja marknadsföring",
    acceptAll: "Spara Inställningar",
    reject: "Avvisa",
    changePreference: "Ändra Inställningar",
    sections: {
      essential: {
        label: "Nödvändiga",
        description:
          "Nödvändiga cookies aktiverar grundläggande webbplatsfunktioner som säkerhet och tillgänglighet. De lagrar inte personuppgifter och kan inte inaktiveras.",
      },
      analytics: {
        label: "Analytik",
        description:
          "Dessa cookies samlar in anonyma data för att hjälpa oss att förbättra webbplatsens funktionalitet och optimera användarupplevelsen.",
      },
      marketing: {
        label: "Marknadsföring",
        description:
          "Dessa cookies spårar användare över webbplatser för att leverera relevanta annonser och kan behandla personuppgifter, vilket kräver uttryckligt samtycke.",
      },
      preferences: {
        label: "Inställningar",
        description:
          "Dessa cookies kommer ihåg inställningar som språk eller region och lagrar visningspreferenser för att erbjuda en mer personlig och smidig upplevelse.",
      },
    },
  },
  Dutch: {
    heading: "Cookie-instellingen",
    description:
      "Door te klikken stemt u in met het opslaan van cookies op uw apparaat om navigatie te verbeteren, gebruik te analyseren en marketing te ondersteunen",
    acceptAll: "Instellingen Opslaan",
    reject: "Weigeren",
    changePreference: "Instellingen Wijzigen",
    sections: {
      essential: {
        label: "Essentieel",
        description:
          "Essentiële cookies maken kernwebsite-functies mogelijk zoals beveiliging en toegankelijkheid. Ze slaan geen persoonlijke gegevens op en kunnen niet worden uitgeschakeld.",
      },
      analytics: {
        label: "Analytics",
        description:
          "Deze cookies verzamelen anonieme gegevens om ons te helpen de website-functionaliteit te verbeteren en de gebruikerservaring te optimaliseren.",
      },
      marketing: {
        label: "Marketing",
        description:
          "Deze cookies volgen gebruikers op verschillende websites om relevante advertenties te leveren en kunnen persoonlijke gegevens verwerken, wat expliciete toestemming vereist.",
      },
      preferences: {
        label: "Voorkeuren",
        description:
          "Deze cookies onthouden instellingen zoals taal of regio en slaan weergavevoorkeuren op om een meer gepersonaliseerde, naadloze ervaring te bieden.",
      },
    },
  },
};



const custom = customization || {
    bannerAlignment: "center",
    bannerStyle: "style1",
    font: "Inter",
    weight: "Regular",
    size: 15,
    textAlignment: "left",
    colors: {
      bannerBg: "#23234b",
      bannerBg2: "#0c0c5f",
      title: "#000000",
      body: "#4c4a86",
      btnPrimaryBg: "#000000",
      btnPrimaryText: "#fff",
      btnSecondaryBg: "#e8e8ea",
      btnSecondaryText: "#000000",
    },
    radius: { container: 12, button: 7 },
  };

 const fontWeightMap = {
  Light: 300,
  Regular: 400,
  Medium: 500,
  "Semi Bold": 600,
  Bold: 700,
  "Extra Bold": 800,
  Black: 900,
};

const fontWeight = fontWeightMap[custom.weight] || 400;

  const bannerAlignment =
    custom.bannerAlignment === "center"
      ? "center"
      : custom.bannerAlignment === "left"
      ? "flex-start"
      : "flex-end";

  let positionStyles =
    custom.bannerAlignment === "center"
      ? "left:50%; transform:translateX(-50%);"
      : custom.bannerAlignment === "left"
      ? "left:23px; transform:none;"
      : "right:23px; transform:none;";

  positionStyles =
    custom.bannerStyle === "style5" ? "left:auto;right:0px;" : positionStyles;
  const width =
    custom.bannerStyle === "style1"
      ? 318
      : custom.bannerStyle === "style2"
      ? 318
      : custom.bannerStyle === "style3"
      ? 250
      : custom.bannerStyle === "style4"
      ? 318
      : 448;
  const buttonAlignment =
    custom.bannerStyle === "style4" ? "center" : "flex-end";
  const buttonAlignmentHTMl =
    custom.bannerStyle === "style4" ? "center" : "flex-end";
  const widthHtml =
    custom.bannerStyle === "style1"
      ? "459px"
      : custom.bannerStyle === "style2"
      ? "459px"
      : custom.bannerStyle === "style3"
      ? "370px"
      : custom.bannerStyle === "style4"
      ? "459px"
      : "100%";

  const isAnalyticsChecked =
    checkedCategories.find((item) => item.name === "Analytics")?.checked ||
    false;
  const isMarketing =
    checkedCategories.find((item) => item.name === "Marketing")?.checked ||
    false;
  const isPreferences =
    checkedCategories.find((item) => item.name === "Preferences")?.checked ||
    false;

 const hideLogo = settings?.hideLogo ?? false;

  const isCenter = custom.bannerAlignment === "center";

  const animationMap = {
    fade: isCenter ? "fadeCenterIn" : "fadeIn",
    "slide-up": isCenter ? "slideUpCenter" : "slideUpBottom",
    "slide-down": isCenter ? "slideDownCenter" : "slideDownBottom",
    "slide-left": isCenter ? "slideLeftCenter" : "slideLeftBottom",
    "slide-right": isCenter ? "slideRightCenter" : "slideRightBottom",
  };

  const animationKeyframe =
    animationMap[settings.animation] || (isCenter ? "fadeCenterIn" : "fadeIn");
  const animationStyle = {
    animation: `${animationKeyframe} 0.5s ${settings.easing || "ease"}`,
  };
const prefrenceHtml = `${
    isAnalyticsChecked
      ? `<div>
              <div class="consentbit-prefrence_toggle">
                <p class="consentbit-button-preference">Analytics</p>
                <label
                  id="analytics-checkbox"
                   ${settings.customtoggle ? `customtoggle="true"` : ""}
                  class="w-checkbox consentbit-toggle"
                  ><input
                    type="checkbox"
                    id="checkbox-2"
                    name="checkbox-2"
                    data-name="Checkbox 2"
                    data-consent-id="analytics-checkbox"
                    class="w-checkbox-input" /><span
                    class="w-form-label"
                    for="checkbox-2"
                  ></span
                ></label>
              </div>
              <p class="consentbit-prefrence_text">
                ${
                  finalTranslations[settings.language].sections.analytics
                    .description
                }
              </p>
            </div>`
      : ""
  }
           ${
             isMarketing
               ? `<div>
              <div class="consentbit-prefrence_toggle">
                <p class="consentbit-button-preference">Marketing</p>
                <label
                  id="marketing-checkbox"
                ${settings.customtoggle ? `customtoggle="true"` : ""}
                  class="w-checkbox consentbit-toggle"
                  ><input
                    type="checkbox"
                    id="checkbox-3"
                    name="checkbox-3"
                    data-name="Checkbox 3"
                    data-consent-id="marketing-checkbox"
                    class="w-checkbox-input" /><span
                    class="w-form-label"
                    for="checkbox-3"
                  ></span
                ></label>
              </div>
              <p class="consentbit-prefrence_text">
                ${
                  finalTranslations[settings.language].sections.marketing
                    .description
                }
              </p>
            </div>`
               : ""
           }
           ${
             isPreferences
               ? ` <div>
              <div class="consentbit-prefrence_toggle">
                <p class="consentbit-button-preference">Preferences</p>
                <label
                  id="personalization-checkbox"
                   ${settings.customtoggle ? `customtoggle="true"` : ""}
                  class="w-checkbox consentbit-toggle"
                  ><input
                    type="checkbox"
                    id="checkbox-5"
                    name="checkbox-5"
                    data-name="Checkbox 5"
                    data-consent-id="personalization-checkbox"
                    class="w-checkbox-input" /><span
                    class="w-form-label"
                    for="checkbox-5"
                  ></span
                ></label>
              </div>
              <p class="consentbit-prefrence_text">
               ${
                 finalTranslations[settings.language].sections.preferences
                   .description
               }
              </p>
            </div>`
               : ""
           }`;


  const cookiePreviewHTML = `



<div id="banner-code">

<style>
div#banner-code {
 font-family: ${custom.font};
}
@keyframes slideUpBottom   { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes slideDownBottom { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes slideLeftBottom { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
@keyframes slideRightBottom{ from { transform: translateX(-100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

/* ===========================
   Preference Animations (Center Origin)
   =========================== */
@keyframes slideUpCenter   { from { top:50%; left:50%; transform: translate(-50%, 100%);  opacity:0; } to { top:50%; left:50%; transform: translate(-50%, -50%); opacity:1; } }
@keyframes slideDownCenter { from { top:50%; left:50%; transform: translate(-50%, -200%); opacity:0; } to { top:50%; left:50%; transform: translate(-50%, -50%); opacity:1; } }
@keyframes slideLeftCenter { from { top:50%; left:50%; transform: translate(100%, -50%);  opacity:0; } to { top:50%; left:50%; transform: translate(-50%, -50%); opacity:1; } }
@keyframes slideRightCenter{ from { top:50%; left:50%; transform: translate(-200%,-50%);  opacity:0; } to { top:50%; left:50%; transform: translate(-50%, -50%); opacity:1; } }


@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0)    scale(1); }
}

@keyframes fadeInOut {
  0%   { opacity: 0; transform: translateY(10px)  scale(0.8); }
  20%  { opacity: 1; transform: translateY(0)     scale(1); }
  80%  { opacity: 1; transform: translateY(0)     scale(1); }
  100% { opacity: 0; transform: translateY(-10px) scale(0.8); }
}

@keyframes fadeCenterIn {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) translateY(10px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) translateY(0) scale(1);
  }
}
.consentbit-banner-div[data-animation="slide-up"],
.consentbit-ccpa-banner-div[data-animation="slide-up"],
.consentbit-ccpa_banner_div[data-animation="slide-up"],
.consentbit-gdpr-banner-div[data-animation="slide-up"],
.consentbit-gdpr_banner_div[data-animation="slide-up"] {
  animation: slideUpBottom 0.6s ease-out forwards;
}

.consentbit-banner-div[data-animation="slide-down"],
.consentbit-ccpa-banner-div[data-animation="slide-down"],
.consentbit-ccpa_banner_div[data-animation="slide-down"],
.consentbit-gdpr-banner-div[data-animation="slide-down"],
.consentbit-gdpr_banner_div[data-animation="slide-down"] {
  animation: slideDownBottom 0.6s ease-out forwards;
}

.consentbit-banner-div[data-animation="slide-left"],
.consentbit-ccpa-banner-div[data-animation="slide-left"],
.consentbit-ccpa_banner_div[data-animation="slide-left"],
.consentbit-gdpr-banner-div[data-animation="slide-left"],
.consentbit-gdpr_banner_div[data-animation="slide-left"] {
  animation: slideLeftBottom 0.6s ease-out forwards;
}

.consentbit-banner-div[data-animation="slide-right"],
.consentbit-ccpa-banner-div[data-animation="slide-right"],
.consentbit-ccpa_banner_div[data-animation="slide-right"],
.consentbit-gdpr-banner-div[data-animation="slide-right"],
.consentbit-gdpr_banner_div[data-animation="slide-right"] {
  animation: slideRightBottom 0.6s ease-out forwards;
}

/* BANNER FADE (enter) — matches .cookie-banner.fade example */
.consentbit-banner-div[data-animation="fade"],
.consentbit-ccpa-banner-div[data-animation="fade"],
.consentbit-ccpa_banner_div[data-animation="fade"],
.consentbit-gdpr-banner-div[data-animation="fade"],
.consentbit-gdpr_banner_div[data-animation="fade"] {
  opacity: 0;                       /* start transparent */
  will-change: opacity, transform;  /* hint for smoother anim */
  animation: fadeIn 0.5s ease-out forwards;
}

/* OPTIONAL: BANNER FADE-IN-OUT (toast-like) */
.consentbit-banner-div[data-animation="fade-in-out"],
.consentbit-ccpa-banner-div[data-animation="fade-in-out"],
.consentbit-ccpa_banner_div[data-animation="fade-in-out"],
.consentbit-gdpr-banner-div[data-animation="fade-in-out"],
.consentbit-gdpr_banner_div[data-animation="fade-in-out"] {
  opacity: 0;
  will-change: opacity, transform;
  animation: fadeInOut 1.2s ease-in-out forwards;
}

/* ===========================
   Preference assignments
   =========================== */
.consentbit-preference-div[data-animation="slide-up"],
.consentbit-preference_div[data-animation="slide-up"],
.consentbit-ccpa-preference-div[data-animation="slide-up"],
.consentbit-ccpa_preference[data-animation="slide-up"] {
  animation: slideUpCenter 0.6s ease-out forwards;
}

.consentbit-preference-div[data-animation="slide-down"],
.consentbit-preference_div[data-animation="slide-down"],
.consentbit-ccpa-preference-div[data-animation="slide-down"],
.consentbit-ccpa_preference[data-animation="slide-down"] {
  animation: slideDownCenter 0.6s ease-out forwards;
}

.consentbit-preference-div[data-animation="slide-left"],
.consentbit-preference_div[data-animation="slide-left"],
.consentbit-ccpa-preference-div[data-animation="slide-left"],
.consentbit-ccpa_preference[data-animation="slide-left"] {
  animation: slideLeftCenter 0.6s ease-out forwards;
}

.consentbit-preference-div[data-animation="slide-right"],
.consentbit-preference_div[data-animation="slide-right"],
.consentbit-ccpa-preference-div[data-animation="slide-right"],
.consentbit-ccpa_preference[data-animation="slide-right"] {
  animation: slideRightCenter 0.6s ease-out forwards;
}

/* Smooth fade-in for centered preference modal */
.consentbit-preference-div[data-animation="fade"],
.consentbit-preference_div[data-animation="fade"],
.consentbit-ccpa-preference-div[data-animation="fade"],
.consentbit-ccpa_preference[data-animation="fade"] {
  opacity: 0;
  will-change: opacity, transform;
  animation: fadeCenterIn 0.5s ease-out forwards;
}




  .consentbit-gdpr_banner_div {
    z-index: 99999;
    transform-style: preserve-3d;
    background-color: ${custom.colors.bannerBg};
    border-radius: ${custom.radius.container}px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: ${widthHtml};
    
    padding: 20px;
    font-family: ${custom.font};
    display: none;
    position: fixed;
    bottom: ${custom.bannerStyle === "style5" ? "0" : "6%"};
    left: auto;
    right: ${custom.bannerStyle === "style5" ? "0" : "3%"};
    transform: translate3d(0, 0, 0);
    box-shadow: 2px 2px 20px #00000082;
   ${positionStyles}
  }

  .consentbit-gdpr_banner_text {
    color: #4c4a66;
    font-size: 16px;
    line-height: 1.5;
    font-weight: Regular;
    text-align: left;
    width: 100%;
    margin: 0 0 10px;
    display: block;
  }

  .consentbit-banner_button_container {
    justify-content: right;
    width: 100%;
    margin-top: 10px;
    display: flex;
  }

  .consentbit-banner_button_preference, .consentbit-banner_button_decline {
    color: #000;
    text-align: center;
    cursor: pointer;
    background-color: #c9c9c9;
    border-radius: 3px;
    justify-content: center;
    min-width: 80px;
    margin-left: 5px;
    margin-right: 5px;
    font-family: Montserrat, sans-serif;
    display: flex;
  }

  .consentbit-banner_accept {
    color: #fff;
    text-align: center;
    cursor: pointer;
    background-color: #000;
    border-radius: 3px;
    justify-content: center;
    min-width: 80px;
    margin-left: 5px;
    margin-right: 5px;
    font-family: Montserrat, sans-serif;
    display: flex;
  }

  .consentbit-banner_headings {
    color: #000;
    font-size: 20px;
    font-weight: Regular;
    text-align: left;
    width: 100%;
    margin-top: 0;
    margin-bottom: 10px;
  }

  .consentbit-innerdiv {
    max-width: 877px;
    margin-left: auto;
    margin-right: auto;
  }

  .consentbit-banner_second-bg {
    z-index: -3;
    opacity: .3;
    background-color: ${custom.colors.bannerBg2};
    border-top-right-radius: ${custom.radius.container}px;
    border-bottom-right-radius:  ${custom.radius.container}px;
    width: 35%;
    height: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .close-consent {
    z-index: 99;
    color: #000;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    font-family: Montserrat, sans-serif;
    display: flex;
    position: absolute;
    top: 5%;
    left: auto;
    right: 2%;
  }

  .consentbit-preference_div {
    z-index: 99999;
    background-color: ${custom.colors.bannerBg};
    border-radius: ${custom.radius.container}px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    max-width: 435px;
    max-height: 510px;
    padding: 20px;
    font-family: ${custom.font};
    position: relative;
    top: 50%;
    left: 50%;
    overflow-y: scroll;
    transform: translate(-50%, -50%);
    box-shadow: 2px 2px 20px #00000082;
  }

  .consentbit-prefrence_text {
    color: ${custom.colors.body};
    text-align: left;
    width: 100%;
    max-width: 400px;
    margin: 0 0 10px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    display: block;
  }

  .consentbit-formblock {
    background-color: #fff;
    border-radius: 8px;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    display: flex;
  }

  .consentbit-prefrence_block {
    flex-direction: column;
    width: 100%;
    margin-top: 10px;
    display: flex;
  }

  .consentbit-prefrence_toggle {
    color: #10d68a00;
    justify-content: space-between;
    width: 100%;
    margin-top: 10px;
    display: flex;
  }

  .consentbit-prefrence-container {
    justify-content: right;
    width: 100%;
    margin-top: 10px;
    display: flex;
  }

  .consentbit-button-preference {
    color: #483999;
    font-size: 18px;
    font-weight: 500;
  }
.consentbit-prefrence-container a {
    text-decoration: none;
     cursor: pointer;
}
  .consentbit-checkbox-label {
    color: #000;
    text-align: center;
    cursor: pointer;
    background-color: #c9c9c9;
    border-radius: 3px;
    justify-content: center;
    min-width: 80px;
    margin-left: 5px;
    margin-right: 5px;
    display: flex;
  }

  .consebit-prefrence-accept {
    color: #fff;
    text-align: center;
    cursor: pointer;
    background-color: #000;
    border-radius: 3px;
    justify-content: center;
    min-width: 80px;
    margin-left: 5px;
    margin-right: 5px;
    display: flex;
  }

  .consentbit-prefrence-decline {
    color: ${custom.colors.btnSecondaryText};
    text-align: center;
    cursor: pointer;
    background-color: ${custom.colors.btnPrimaryBg};
    border-radius: ${custom.radius.button}px;
    justify-content: center;
    min-width: 80px;
    margin-left: 5px;
    margin-right: 5px;
    display: flex;
  }

  .consebit-prefrence-heading {
    color: #000;
    text-align: left;
    width: 100%;
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 500;
  }

  .consentbit-toggle {
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
    background-color: transparent;
    border-radius: 4px;
    width: 20px;
    height: 20px;
    display: inline-block;
    position: relative;
  }

  .consentbit-change-preference {
    z-index: 999;
    cursor: pointer;
    background-image: url("https://script-5qu.pages.dev/67ebf5ee639d12979361f2bc_consent.webp");
    background-position: 50%;
    background-size: cover;
    border-radius: 50%;
    width: 55px;
    height: 55px;
    position: fixed;
    bottom: 3%;
    left: 2%;
  }

  .consentbit-close {
    z-index: 99;
    color: #000;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    font-family: Montserrat, sans-serif;
    display: flex;
    position: absolute;
    top: 5%;
    left: auto;
    right: 10px;
  }

  .consentbit-preference {
    z-index: 99999;
    display: none;
    position: fixed;
    inset: 0%;
  }

  .consentbit-ccpa-banner-div {
    z-index: 99999;
    transform-style: preserve-3d;
    background-color: ${custom.colors.bannerBg};
    border-radius: ${custom.radius.container}px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: ${widthHtml};
    
    padding: 20px;
    font-family: ${custom.font};
    display: none;
    position: fixed;
    bottom: ${custom.bannerStyle === "style5" ? "0" : "3%"};
    left: auto;
    right: 3%;
    transform: translate3d(0, 0, 0);
    box-shadow: 2px 2px 20px #00000082;
  }

  .consentbit-ccpa-banner-text {
    color: #4c4a66;
    font-size: 16px;
    line-height: 1.5;
    font-weight: Regular;
    text-align: left;
    width: 100%;
    margin: 0 0 10px;
    display: block;
  }

  .consentbit-ccpa-button-container {
    justify-content: left;
    width: 100%;
    margin-top: 10px;
    display: flex;
  }

  .consentbit-ccpa-banner-heading {
    color: #000;
    font-size: 20px;
    font-weight: Regular;
    text-align: left;
    width: 100%;
    margin-top: 0;
    margin-bottom: 10px;
  }

  .consentbit-ccpa-linkblock {
    color: #483999;
    cursor: pointer;

    border-radius: 48px;
    min-width: 80px;
    margin-left: 5px;
    margin-right: 5px;
  }

  .consentbit-ccpa-innerdiv {
    max-width: 877px;
    margin-left: auto;
    margin-right: auto;
  }

  .consentbit-banner-ccpasecond-bg {
    z-index: -3;
    opacity: .3;
    background-color: #798eff;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    width: 35%;
    height: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .close-consentbit {
    z-index: 99;
    color: #000;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    font-family: Montserrat, sans-serif;
    display: flex;
    position: absolute;
    top: 5%;
    left: auto;
    right: 2%;
  }

  .consentbit-ccpa_preference {
    z-index: 99999;
   border-radius:${custom.radius.container}px;
  	background-color:${custom.colors.bannerBg};
  	color:${custom.colors.body};
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 20px;
    font-family: Montserrat, sans-serif;
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    overflow-y: scroll;
    transform: translate(-50%, -50%);
    box-shadow: 2px 2px 20px #00000082;
  }

  .consentbit-ccpa_prefrence_text {
    color:${custom.colors.body};
    text-align: left;
    width: 100%;
    max-width: 400px;
    margin: 0 0 10px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    display: block;
  }

  .consentbit-ccpa-formblock {
    background-color: #fff;
    border-radius: 8px;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    display: flex;
  }

  .consentbit-ccpa-prefrence-block {
    flex-direction: column;
    width: 100%;
    margin-top: 10px;
    display: flex;
  }

  .consentbit-ccpa-prefrence-toggle {
    direction: rtl;
    color: #483999;
    flex-flow: row;
    justify-content: space-between;
    width: 100%;
    margin-top: 10px;
    display: flex;
  }

  .consebit-ccpa-prefrence-container {
    justify-content: right;
    width: 100%;
    margin-top: 10px;
    display: flex;
  }
.cookie-btn-row button {
    cursor: pointer;
}
  .consentbit-ccpa-button-preference {
    color: #000;
    text-align: center;
    cursor: pointer;
    background-color: #c9c9c9;
    border-radius: 3px;
    justify-content: center;
    min-width: 80px;
    margin-left: 5px;
    margin-right: 5px;
    display: flex;
  	padding: 9px 15px;
  }

  .consebit-ccpa-prefrence-accept {
    color: ${custom.colors.btnPrimaryText};
    text-align: center;
    cursor: pointer;
    background-color: ${custom.colors.btnPrimaryBg};
    border-radius: ${custom.radius.button}px;
    justify-content: center;
    min-width: 80px;
    margin-left: 5px;
  	padding: 9px 15px;
    margin-right: 5px;
    display: flex;
  }

  .consebit-ccpa-prefrence-decline {
    padding: 9px 15px;
    color: ${custom.colors.btnSecondaryText};
    text-align: center;
    cursor: pointer;
    background-color:  ${custom.colors.btnSecondaryBg};
    border-radius: ${custom.radius.button}px;
    justify-content: center;
    min-width: 80px;
    margin-left: 5px;
    margin-right: 5px;
    display: flex;
  }

  .consebit-ccpa-prefrence-heading {
    color: #000;
    text-align: left;
    width: 100%;
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 500;
  }
[customtoggle="true"]{
    position: relative;
    display: inline-block;
    width: 49px;
    height: 24px;
}
  .consent-close {
    z-index: 99;
    color: #000;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    font-family: Montserrat, sans-serif;
    display: flex;
    position: absolute;
    top: 10px;
    left: auto;
    right: 0;
  }

  .div-block {
    display: none;
  }


  .consentbit-prefrence-decline
   {
  	color: #000;
  	text-align: center;
  	cursor: pointer;
  	background-color: #c9c9c9;
  	border-radius: 3px;
  	justify-content: center;
  	min-width: 80px;
  	margin-left: 5px;
  	margin-right: 5px;
  	display: flex
  ;
  padding: 9px 15px;
  }
  .consebit-ccpa-prefrence-container a {
    text-decoration: none;
    cursor: pointer;
}
  .consebit-prefrence-accept {
  	color: ${custom.colors.btnPrimaryText};
  	text-align: center;
  	cursor: pointer;
  	background-color: ${custom.colors.btnPrimaryBg};
  	border-radius: ${custom.radius.button}px;
  	justify-content: center;
  	min-width: 80px;
  	margin-left: 5px;
  	margin-right: 5px;
  	display: flex;
  	padding: 9px 15px;

  }
  @media screen and (max-width: 991px) {
    .consentbit-preference_div, .consentbit-ccpa_preference {
  	width: 100%;
  	max-width: 23.5rem;
    }
  }

  @media screen and (max-width: 767px) {
    .consentbit-gdpr_banner_div {
  	width: 100%;
  	max-width: 100%;
  	inset: auto 0 0;
  	transform: none;
    }

    .consentbit-banner_button_container {
  	text-align: center;
  	flex-direction: column;
  	justify-content: center;
  	row-gap: 12px;
  	margin-bottom: 10px;
  	display: flex;
    }

    .consentbit-ccpa-banner-div {
  	width: 100%;
  	max-width: 100%;
  	inset: auto 0 0;
  	transform: none;
    }
  }
</style>

<span style="font-family:${custom.font}; position:absolute; opacity:0; left:-9999px;">font-preload</span>
<div
id="consent-banner"
  class="cookie-preview  consentbit-gdpr-banner-div hidden consentbit-gdpr_banner_div"
  ${settings.disableScroll ? "data-cookie-banner= true" : ""}
 data-animation="${settings.animation.toLowerCase()}"
  style=" position:fixed;  z-index:9999999;${positionStyles}"
>
 ${
   settings.showCloseButton
     ? `<p consentbit="close" class="close-consent">X</p>`
     : ""
 }
  <div
    class="cookie-preview-popup consentbit-innerdiv"
    style="
		text-align:${custom.textAlignment};

		width: 100%;
	
		font-weight:${fontWeight};
		font-size:${custom.size}px;
		border-radius:${custom.radius.container}px;
		
		color:${custom.colors.body}; 
		
		
	  "
  >
    ${
      custom.bannerStyle === "style2"
        ? `<div class="consentbit-banner_second-bg"></div>`
        : ""
    }
    <div
      class="cookie-title"
      style="color:${custom.colors.title};font-weight:600;margin-bottom:16px;"
    >
      ${translations[settings.language].heading}
    </div>
    <div class="cookie-desc">
      ${translations[settings.language].description}  ${
    settings.privacyUrl.length > 0
      ? `<a href="${settings.privacyUrl}" target="_blank">${
          moreInfoTranslations[settings.language]
        }</a>`
      : ""
  }
    </div>
    <div
      class="cookie-btn-row"
      style="margin-top:16px; display:flex;gap:8px;justify-content:${buttonAlignment};"
    >
      <button
       id="preferences-btn"
        class="cookie-pref-btn"
        style="font-size:${custom.size}px;padding:7px 14px;border:none;color:${
    custom.colors.btnSecondaryText
  };background-color:${custom.colors.btnSecondaryBg};border-radius:${
    custom.radius.button
  }px;"
      >
        ${translations[settings.language].preferences}
      </button>
      <button
      id="decline-btn"
        class="cookie-reject-btn"
        style="font-size:${custom.size}px;padding:7px 14px;border:none;color:${
    custom.colors.btnSecondaryText
  };background-color:${custom.colors.btnSecondaryBg};border-radius:${
    custom.radius.button
  }px;"
      >
         ${translations[settings.language].reject}
      </button>
      <button
       id="accept-btn"
        class="cookie-accept-btn"
        style="font-size:${custom.size}px;padding:7px 14px;border:none;color:${
    custom.colors.btnPrimaryText
  };background-color:${custom.colors.btnPrimaryBg};border-radius:${
    custom.radius.button
  }px;"
      >
         ${translations[settings.language].accept}
      </button>
    </div>
  </div>
</div>

${
  compliance.length === 1 && compliance.includes("gdpr")
    ? ""
    : `<div
  class="cookie-preview-CCPA-banner hidden consentbit-ccpa-banner-div"
  data-animation="${settings.animation}"
    ${settings.disableScroll ? "data-cookie-banner= true" : ""}
  id="initial-consent-banner"
  style=" position:fixed;  z-index:99999;${positionStyles}"
>
   ${
     settings.showCloseButton
       ? `<p consentbit="close" class="close-consent">X</p>`
       : ""
   }
  <div
    class="cookie-preview-popup consentbit-innerdiv"
    style="
		text-align:${custom.textAlignment};
		max-width:${widthHtml};
		width: 100%;
		
		font-weight:${fontWeight};
		font-size:${custom.size}px;
		border-radius:${custom.radius.container}px;
		
		color:${custom.colors.body}; 
		
		
	  "
  >
        ${
          custom.bannerStyle === "style2"
            ? `<div class="consentbit-banner_second-bg"></div>`
            : ""
        }

    
    <div
      class="cookie-title"
      style="color:${custom.colors.title};font-weight:600;margin-bottom:16px;"
    >
    ${translations[settings.language].ccpa.heading}
    </div>
    <div class="cookie-desc">
     ${translations[settings.language].ccpa.description} ${
        settings.privacyUrl.length > 0
          ? `<a href="${settings.privacyUrl}" target="_blank">${
              moreInfoTranslations[settings.language]
            }</a>`
          : ""
      }
    </div>
    <div
      class="cookie-btn-row"
      style="margin-top:16px; display:flex;gap:8px;justify-content:${buttonAlignment};"
    >
      <a id="do-not-share-link" class="consentbit-ccpa-linkblock w-inline-block"
        >  ${translations[settings.language].ccpa.doNotShare}</a
      >
    </div>
  </div>
</div>
          `
}
<!-- Preference Panel -->
<div id="main-banner" ${settings.disableScroll ? `data-cookie-banner= "true"` : ""}  class="consentbit-preference hidden">
  <div

  
    data-animation="${settings.animation}"
    class="consentbit-preference_div hidden"
  >
    <h4 class="consebit-prefrence-heading">${
      finalTranslations[settings.language].heading
    }</h4>
    <p class="consentbit-prefrence_text">
     ${finalTranslations[settings.language].description}  ${
    settings.privacyUrl.length > 0
      ? `<a href="${settings.privacyUrl}" target="_blank">${
          moreInfoTranslations[settings.language]
        }</a>`
      : ""
  }
    </p>
    <div id="consentbit-preference_div" class="consentbit-prefrence_block">
      <div class="consentbit-prefrence_block">
        <div class="w-form">
          <form
            id="email-form"
            name="email-form"
            data-name="Email Form"
            method="get"
            data-wf-page-id="68adcbabbd0941faf8b0f6e3"
            data-wf-element-id="662bb4bb-38c2-4633-ba3c-94853af51a03"
            data-turnstile-sitekey="0x4AAAAAAAQTptj2So4dx43e"
            aria-label="Email Form"
          >

         
            <div>
              <div class="consentbit-prefrence_toggle">
                <p class="consentbit-button-preference">Essential</p>
                <label
                  id="necessary-checkbox"
                  ${settings.customtoggle ? `customtoggle="true"` : ""}
                  class="w-checkbox consentbit-toggle"
                  ><input
                    type="checkbox"
                    id="checkbox"
                    name="checkbox"
                    data-name="Checkbox"
                    data-consent-id="necessary-checkbox"
                    class="w-checkbox-input"
                    disabled="" /><span
                    class="w-form-label"
                    for="checkbox"
                  ></span
                ></label>
              </div>
              <p class="consentbit-prefrence_text">
               ${
                 finalTranslations[settings.language].sections.essential
                   .description
               }
              </p>
            </div>
            ${prefrenceHtml}
            <div>
              <div>
                <input
                  type="hidden"
                  name="cf-turnstile-response"
                  id="cf-chl-widget-qnkn0_response"
                  value="0.a14CwqWmLpN69rTD813XVPvK0qUIZuVZ-48ikJ9o_qxsh3jLLSz7gY9tCiTGjflto4qES2CASPAzx36SpRXMitCaAUJ0i4TKguiH8vRtcLGX8KVJ_D-F_RM0hgd3i_IuUdYVGnXZgpkm8y1rBasg3k7Fl7g8g_spqxfLoq7dt72QaBVHDJUwGzgzOdvNdzhP0a2Dfx4hR6-n_twx_BiZXMWH85xB5unXAJ8mvHX1y-ABT8x1AeXSlRUwuU5jTZwJRQA8k2RYxxJSiuq8Yg8FwoTwP54rOXEImOU0oRWbeVibwRvEYGhA-xgFv--BRqnKUtN_jipmXGJKguMahxsDnMzCqSlvnb1ockIfxu5CAl8XX9HKe5QK2fo4kWD6nAuoQnZ744RNdJ3zQg691eC5Rg7Kw09x4YCVq-USLlK9ebb4tts-JiDX1M_hk_n6Yjw8b4MECJF19OV_U2d43Fpjd6D10KsEwJJvnATXG4PRK3HLype2WmQ3VHXz45IWPDr_K5jDVYUsbRf-up8daMm93Im1l4FR2eKunPomgfBASU3DsoNQseN8K5eK7FHUUc85hnInbkTFy21LrD9BbspRKHazKKS5X_cPaSAPN2DCgmGJBuEOeINWeeAcDLtTGG_orHI19CBKoGVgS2cRa-5HNEiSVINly_PGvHG-oCQA-NHB7KPKwFlaNvxRx46A0SeC7wxSaprpT3ktZqjEUxEfqkzYh5Lhq5l301GyihkktVwUCYcVRGy_S5_wUSYyPR-qeEogqjNFUzPGeyYIWJ4wQ0yPqC5IOdgIRbrWttVmDSQaj4DuHIYTgxuPQ5kgu32LkRcGKB7jUf2G73kILCWqt-U1KpFyKo6i4vehn0NUjmr6TCtxl6V_tTjPWIGUMbBFYC2m-xOQG4FdlL6zi0h6cdE44AO_xnai6S8JMJ9wjk0yjtx1BNUzE9I9PQwamrA10YFCQSI5d91CE_hGOG0L0K1gCIRt3Od1Oohbf4hENXY2Prt_4pJKlGDXxzJkuC3p.Pmv2JAeG_BD4T9j1wnDBPw.0d34d4f3562d80d32333e61203bf9c3e4cb428c0984507551c5cbba7af2a6f49"
                />
              </div>
            </div>
          </form>
        
        </div>
      </div>
    </div>
    <div class="consentbit-prefrence-container">
      <a
        id="save-preferences-btn"
        href="#"
        class="consebit-prefrence-accept w-button"
        >   ${finalTranslations[settings.language].acceptAll}</a
      ><a id="cancel-btn" href="#" class="consentbit-prefrence-decline w-button"
        >               ${finalTranslations[settings.language].reject}
</a
      >
    </div>
    ${
      settings.showCloseButton
        ? `<p consentbit="close" class="consentbit-close">X</p>`
        : ""
    }
  </div>
</div>

${
  compliance.length === 1 && compliance.includes("gdpr")
    ? ""
    : `<div
  id="main-consent-banner"
  data-animation="${settings.animation}"
   ${settings.disableScroll ? "data-cookie-banner= true" : ""}
  class="consentbit-ccpa_preference hidden"
  style="visibility: visible !important; opacity: 1 !important"
>
  <h4 class="consebit-ccpa-prefrence-heading">${
    ccpaTranslations[settings.language]?.heading || "CCPA Preferences"
  }</h4>
  <p class="consentbit-ccpa_prefrence_text">
    ${ccpaTranslations[settings.language]?.description}  ${
        settings.privacyUrl.length > 0
          ? `<a href="${settings.privacyUrl}" target="_blank">${
              moreInfoTranslations[settings.language]
            }</a>`
          : ""
      }
  </p>
  <div class="consentbit-ccpa-prefrence-block">
    <div class="consentbit-ccpa-prefrence-block">
      <div class="w-form">
        <form
          id="email-form-2"
          name="email-form-2"
          data-name="Email Form 2"
          method="get"
          data-wf-page-id="68adcbabbd0941faf8b0f6e3"
          data-wf-element-id="7030da06-8426-da3e-f39d-32e7c521fafd"
          data-turnstile-sitekey="0x4AAAAAAAQTptj2So4dx43e"
          aria-label="Email Form 2"
        >
          <div class="consentbit-ccpa-prefrence-toggle">
            <p class="consentbit-ccpa_prefrence_text">
              ${ccpaTranslations[settings.language]?.doNotShare}
            </p>
            <label
              id="do-not-share-checkbox"
              class="w-checkbox consentbit-toggle"
              ><input
                type="checkbox"
                id="checkbox-4"
                name="checkbox-4"
                data-name="Checkbox 4"
                data-consent-id="do-not-share-checkbox"
                class="w-checkbox-input" /><span
                class="w-form-label"
                for="checkbox-4"
              ></span
            ></label>
          </div>
          <div>
            <div>
              <input
                type="hidden"
                name="cf-turnstile-response"
                id="cf-chl-widget-0o4xi_response"
                value="0.V_8gszRqeGk1-ht5eYtUjq6rKSmITfnuGoM51eBszGdNoT5APYq9LNeKRL4ZzD5ju-1PlvX5Vb9M7K9hyERJj9ABRsuu_jxoyAaIuc8Uc55EobcEm36rZnLcDzurAxx11tC_D4FWa1_J_fN5kgaQ0DTHdbVrvesVyfIwk7GsxDFMgngresvZfQmseTfNgUq22FgbKduu_nWORmNhUJ4rgrzvhqGzxu9jm3BP8qP0PeeilnVuThkiIB9BB9BBlNAwFX-zhx8_rIbThw7kHZCbWltu21JR-_5gQ5uXhdP2EXsZBssWbbK_QgFegYdF-kXLzzt-WnK99pJa7iQXavbvlZnLF_FxQocq_pjq1ZE9bc6tnJO4bY2TD7LTow4QCwaemzjKJserOGxUty7IpX6QcUl1tDzdDhQYRw2FRe8GTV9V5_wpcsQcSceLZuyPKqpwm2oQ3VZiqhfYwNMTgV3dIljTIMRFckC29AB3AL-ejkwrF2Ys6TmAQvxbSY6uVHYyYxh4Cbbc2_Y2kRetvm-Y3xRvi0aPfLQtkujaDbZspavh6QbPqxydE3T9kShy91NWCStXm-HfL6ju8INcsiKpagTaKv0ypq9mga2Z8xhcCAjIK-pZfpu2osVeWsMNeDRrzVhStQ3TLGSldtVoC7MMWpalTODNinCg45W7B2rDfQxkz-nI3jgK-rFXT8B_YbsRxVW57nnWf_pQd0i_fsmXmsengubaru_A8EM3nIVieK6kjtzXDCyJSF5-uZsSXTvTtsxpm6s_BiatTCd4q7GPe-Mk-kgLgeSN72uUc0MLs_WlMYeKi-g7SmD2Y1BPt0tm8SSRt10O9Iv7zpc42sCOcH3ahOyzDND4nEwZEuE3xfU1PS7u6N7UVgq2jB2NVk_d1UtReGExox_Oc-8alVkP9doNCvfcyhexmiaw-0pnEo9zqtoi8WNK5-RL0dcbWSw19zrykQTQqSg9CO8oyiTU0sF8aOH-Aj7Rbl1x8FqcvDU.deBXwvou6-uz-_VPirGS5w.10ecc4776b37fa6cb843c4811c9c22a71ed877121d5fd03980db6bc754783c97"
              />
            </div>
          </div>
        </form>
       
       
      </div>
    </div>
  </div>
  <div class="consebit-ccpa-prefrence-container">
    <a id="save-btn" href="#" class="consebit-ccpa-prefrence-accept w-button"
      > ${ccpaTranslations[settings.language]?.savePreference}</a
    ><a
      id="close-consent-banner"
      href="#"
      class="consebit-ccpa-prefrence-decline w-button"
      > ${ccpaTranslations[settings.language]?.cancel}</a
    >
  </div>
  <p consentbit="close" class="consent-close">X</p>
</div>`
}
<div id="consensite-id" style="display:none">${siteId}</div>
<div id="consensite-banner-type" style="display:none">${
    compliance.length === 1 && compliance.includes("gdpr") ? "gdpr" : "ccpa"
  }</div>
${!(settings?.hideLogo ?? false) ?`<div id="toggle-consent-btn"   scroll-control="true" class="consentbit-change-preference " style="
    display: none;
"></div>`: ` `}

<div>
`;
document.addEventListener("DOMContentLoaded", () => {
  document.body.insertAdjacentHTML('beforeend', cookiePreviewHTML);
});
