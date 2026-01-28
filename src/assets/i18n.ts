import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    es: {
      translation: {
        "header_sub": "Estudiante de Diseño Multimedial @ UNLP | Desarrollador",
        "volver": "← Volver a la grilla",
        "sobre": "Sobre el proyecto",
        "tech": "Tecnologías utilizadas"
      }
    },
    en: {
      translation: {
        "header_sub": "Multimedia Design Student @ UNLP | Developer",
        "volver": "← Back to grid",
        "sobre": "About the project",
        "tech": "Technologies used"
      }
    }
  },
  lng: "es", 
  fallbackLng: "es",
});

export default i18n;