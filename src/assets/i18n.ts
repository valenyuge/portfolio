import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector) 
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        translation: {
          subtitulo: "Diseñador Multimedial y Frontend Developer enfocado en interfaces interactivas y experiencias digitales.",
          volver: "← Volver a la grilla",
          sobre: "Sobre el proyecto",
          tech: "Tecnologías utilizadas",
          ver_demo: "VER REPOSITORIO / DEMO ↗",
          detalle_mas: "VER DETALLES +",
          contacto_tit: "Contacto",
          contacto_desc: "¿Tenés una idea o proyecto en mente? Escribime. Estoy disponible para trabajos freelance y nuevas oportunidades laborales."
        }
      },
      en: {
        translation: {
          subtitulo: "Multimedia Designer & Frontend Developer focused on interactive interfaces and digital experiences.",
          volver: "← Back to grid",
          sobre: "About the project",
          tech: "Technologies used",
          ver_demo: "VIEW REPOSITORY / DEMO ↗",
          detalle_mas: "VIEW DETAILS +",
          contacto_tit: "Contact me",
          contacto_desc: "Have an idea or project in mind? Reach out. I'm available for freelance work and new opportunities."
        }
      }
    },
    fallbackLng: "es",
    detection: { 
      order: ['querystring', 'localStorage', 'navigator'],
      caches: ['localStorage'] 
    },
    interpolation: { escapeValue: false }
  });

export default i18n;
