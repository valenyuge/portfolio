export interface Proyecto {
  id: string;
  titulo: string;
  titulo_en?: string;
  fechaInicio: string;
  fechaFin: string;
  descripcion: string;
  descripcion_en?: string;
  contenidoLargo: string;
  contenidoLargo_en?: string;
  tecnologias: string[];
  categoria: 'Web' | 'Videojuegos' | 'Multimedia';
  urlExterna: string;
  videoUrl?: string;
  canvaUrl?: string;
  figmaUrl?: string;
  bitacoraUrl?: string;
}

export const proyectos: Proyecto[] = [
    {
      id: "todo-list",
      titulo: "Gestor de Tareas Full Stack",
      titulo_en: "Full Stack Task Manager",
      fechaInicio: "2026-01",
      fechaFin: "2026-01",
      descripcion: "Aplicación de productividad con persistencia de datos y lógica de tipado estricto.",
      descripcion_en: "Productivity app with data persistence and strict typing logic.",
      contenidoLargo: "Desarrollo integral de una aplicación de tareas utilizando el stack React + Vite. Implementé una base de datos PostgreSQL en Render para la persistencia, utilizando consultas SQL para la manipulación de la información. El proyecto destaca por su arquitectura limpia en TypeScript y una interfaz optimizada con TailwindCSS, priorizando la experiencia de usuario (UX) y el rendimiento.",
      contenidoLargo_en: "End-to-end development of a task application using the React + Vite stack. I implemented a PostgreSQL database on Render for persistence, using SQL queries for data manipulation. The project stands out for its clean TypeScript architecture and an optimized UI with TailwindCSS, prioritizing user experience (UX) and performance.",
      tecnologias: ["TypeScript", "React", "PostgreSQL", "Node.js", "Express", "TailwindCSS", "SQL", "Vite"],
      categoria: 'Web',
      urlExterna: "https://todolist-18e7.onrender.com/",
      videoUrl: "/proyectos/to-do.mp4"
    },
    {
      id: "runner-vr",
      titulo: "Hora Pico: Unity VR Mobile",
      titulo_en: "Rush Hour: Unity Mobile VR",
      fechaInicio: "2025-09",
      fechaFin: "2025-12",
      descripcion: "Videojuego inmersivo de realidad virtual que captura el caos urbano de intentar tomar el último colectivo.",
      descripcion_en: "Immersive VR game capturing the urban chaos of trying to catch the last bus.",
      contenidoLargo: "Desarrollo de un videojuego de realidad virtual (VR) para móviles con una mecánica de 'Endless Runner' en 3D. El jugador asume el rol de un niño que debe sortear obstáculos urbanos, autos y peatones en cuatro carriles dinámicos para alcanzar la parada antes de que el colectivo se retire. Implementé un sistema de colisiones preciso y una arquitectura de sonido espacial que incluye alertas de proximidad y feedback sonoro de pasos. La banda sonora fue generada mediante Suno AI para lograr una atmósfera frenética y envolvente. El proyecto destaca por su diseño de entorno urbano y la integración de inputs físicos para una experiencia inmersiva total.",
      contenidoLargo_en: "Mobile Virtual Reality (VR) game development featuring a 3D 'Endless Runner' mechanic. Players take on the role of a child navigating urban obstacles, cars, and pedestrians across four dynamic lanes to reach the bus stop on time. I implemented a precise collision system and spatial audio architecture, including proximity alerts and footstep sound feedback. The soundtrack was generated using Suno AI to create a frantic and immersive atmosphere. The project stands out for its urban environment design and the integration of physical inputs for a complete immersive experience.",
      tecnologias: ["Unity 3D", "C#", "OSC", "Mobile VR", "Suno AI"],
      bitacoraUrl: "https://cherry-halloumi-3aa.notion.site/Hora-pico-Bit-cora-2a387ae1d566802fa823f963f5a055de?pvs=14",
      categoria: 'Videojuegos',
      urlExterna: "",
      videoUrl: "/proyectos/VR.mp4"
    },
    {
      id: "win98",
      titulo: "OS Interactivo: Historia de la IA",
      titulo_en: "Interactive OS: History of AI",
      fechaInicio: "2025-09",
      fechaFin: "2025-09",
      descripcion: "Sistema operativo simulado en la web que funciona como una infografía interactiva sobre la evolución de la IA.",
      descripcion_en: "Simulated web operating system acting as an interactive infographic on the evolution of AI.",
      contenidoLargo: "Desarrollo de una infografía interactiva con estética de Windows 98 que explora el origen y el impacto de la Inteligencia Artificial. Programé un sistema de ventanas funcional utilizando JavaScript Vanilla, permitiendo una navegación no lineal a través de aplicaciones simuladas: un Explorador de Archivos para la cronología histórica, un Internet Explorer para el análisis de ChatGPT, un Vlog/Chat para el debate sobre autoría, y una instancia de Paint para la reflexión sobre el arte generado por máquinas. El proyecto incluye un Bloc de Notas para interacción de usuarios, demostrando un manejo avanzado de la manipulación del DOM y la gestión de estados de interfaz sin frameworks externos.",
      contenidoLargo_en: "Development of an interactive infographic with a Windows 98 aesthetic exploring the origins and impact of Artificial Intelligence. I programmed a functional window system using Vanilla JavaScript, allowing non-linear navigation through simulated applications: a File Explorer for historical chronology, an Internet Explorer for ChatGPT analysis, a Vlog/Chat for the authorship debate, and a Paint instance for reflection on machine-generated art. The project includes a Notepad for user interaction, demonstrating advanced DOM manipulation and interface state management without external frameworks.",
      tecnologias: ["JavaScript", "HTML", "CSS", "UX/UI Design"],
      categoria: 'Web',
      urlExterna: "https://valenyuge.github.io/infografia-taller/inicio.html",
      videoUrl: "/proyectos/Infografia-Windows.mp4",
      figmaUrl: "https://embed.figma.com/slides/0MrmBkCXCZ4qg5SctYO4mA/TP3-Memoria-Descriptiva?node-id=1-29&embed-host=share"
    },
    {
      id: "influencers-ia",
      titulo: "InfluencIA: Instalación Física",
      titulo_en: "InfluencIA: Physical Installation",
      fechaInicio: "2025-09",
      fechaFin: "2025-12",
      descripcion: "Instalación multimedia con Arduino y Unity que explora el fenómeno de las influencers IA mediante hardware personalizado.",
      descripcion_en: "Multimedia installation with Arduino and Unity exploring the AI influencer phenomenon.",
      contenidoLargo: "Desarrollo integral de InfluencIA, una instalación interactiva física con lógica en Unity. El sistema permite una navegación no lineal mediante el escaneo de códigos QR reales vinculados a objetos físicos. Implementé una interfaz controlada por un potenciómetro programado en Arduino para la interacción con carruseles de datos y comparativas gráficas. La experiencia incluye un módulo de trivia gamificado con una 'ruleta aleatoria' y un sistema de feedback pedagógico. Programé la comunicación serial para integrar los sensores físicos y diseñé un flujo de usuario circular que permite reiniciar la instalación automáticamente para el siguiente usuario.",
      contenidoLargo_en: "NComprehensive development of InfluencIA, a physical interactive installation powered by Unity. The system allows non-linear navigation through real-world QR code scanning linked to physical objects. I implemented a user interface controlled by an Arduino-programmed potentiometer for interacting with data carousels and graphical comparisons. The experience features a gamified trivia module with a 'random roulette' and a pedagogical feedback system. I programmed serial communication to integrate physical sensors and designed a circular user flow that automatically resets the installation for the next user.",
      tecnologias: ["Unity", "Arduino", "C#", "OSC", "Physical Interaction"],
      categoria: 'Multimedia',
      urlExterna: "",
      videoUrl: "/proyectos/influencia.mp4",
      figmaUrl: "https://embed.figma.com/slides/LDxUXS9EZQ4gYKyfLzNSpl/Memoria-InfluencIA?node-id=1-735&embed-host=share"
    },
    {
      id: "redisenio-gato",
      titulo: "Rediseño 'El Gato y la Caja'",
      titulo_en: "'El Gato y la Caja' Redesign",
      fechaInicio: "2025-06",
      fechaFin: "2025-08",
      descripcion: "Rediseño de plataforma informativa mediante metodologías de Design Thinking y UX Research.",
      descripcion_en: "Digital news platform redesign using Design Thinking and UX Research methodologies.",
      contenidoLargo: "Proyecto de rediseño integral para el medio 'El Gato y la Caja' desarrollado bajo la metodología de Diseño Centrado en el Usuario (DCU). El proceso incluyó etapas de Benchmarking, creación de User Personas y Arquitectura de la Información mediante Card Sorting para optimizar el flujo de navegación. Desarrollé una propuesta de valor que incluye el rediseño de la Home, secciones específicas y notas de profundidad, enfocándome en la legibilidad y jerarquías visuales. La implementación funcional se realizó con HTML, CSS y JavaScript, logrando un sistema de diseño consistente y escalable para una experiencia de lectura fluida en desktop.",
      contenidoLargo_en: "Comprehensive redesign project for 'El Gato y la Caja' news outlet, developed under User-Centered Design (UCD) methodology. The process involved Benchmarking, User Personas creation, and Information Architecture through Card Sorting to optimize navigation flow. I developed a value proposition that includes a redesigned Home, specific sections, and in-depth articles, focusing on readability and visual hierarchy. The functional implementation was built with HTML, CSS, and JavaScript, achieving a consistent and scalable design system for a seamless desktop reading experience.",
      tecnologias: ["JavaScript", "HTML", "CSS", "Figma", "UX/UI Design", "Information Architecture"],
      categoria: 'Web',
      urlExterna: "https://valenyuge.github.io/UI-UXRedesignforSciencePlatform/index.html",
      videoUrl: "/proyectos/elgatoylacaja.mp4",
      figmaUrl: "https://embed.figma.com/deck/It7Ypl2xf2cKbyq1BfZBJm/Memoria-EGYLC?node-id=1-48&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&embed-host=share"
    },
    {
      id: "audio-reactiva",
      titulo: "Voice Brush: Arte Generativo",
      titulo_en: "Voice Brush: Generative Art",
      fechaInicio: "2025-04",
      fechaFin: "2025-08",
      descripcion: "Experiencia de arte generativo controlada por voz que deforma grillas algorítmicas en tiempo real.",
      descripcion_en: "Voice-controlled generative art experience that deforms algorithmic grids in real-time.",
      contenidoLargo: "Desarrollo de una experiencia web de arte generativo que reinterpreta las grillas de cuadrados de Vera Molnar. Utilizando la Web Audio API, programé un analizador de frecuencias que distingue entre tonos graves y agudos para controlar la deformación y el dibujo de la grilla en diferentes ejes (horizontal/vertical). Implementé lógica de detección de transitorios para reconocer aplausos (reinicio aleatorio de la obra) y silbidos (sistema de 'undo' o borrado progresivo). Todo el renderizado se realizó mediante Canvas API, permitiendo una performance fluida mientras el usuario interactúa mediante la voz o sonidos ambientales.",
      contenidoLargo_en: "Development of a generative art web experience reinterpreting Vera Molnar's square grids. Using the Web Audio API, I programmed a frequency analyzer that distinguishes between bass and treble tones to control the deformation and drawing of the grid on different axes. I implemented transient detection logic to recognize claps (random work reset) and whistles (progressive 'undo' or erasing system). All rendering was done via Canvas API, allowing fluid performance while the user interacts through voice or ambient sounds.",
      tecnologias: ["Web Audio API", "JavaScript", "Generative Art"],
      categoria: 'Multimedia',
      urlExterna: "https://valenyuge.github.io/WebAudio-ReactiveExperience/index.html",
      videoUrl: "/proyectos/obra-sonido.mp4"
    },
    {
      id: "endless-runner-js",
      titulo: "Vanilla JS Runner & Web",
      titulo_en: "Vanilla JS Runner & Web",
      fechaInicio: "2024-09",
      fechaFin: "2024-11",
      descripcion: "Motor de juego 2D desarrollado desde cero en JS puro y plataforma web desplegada en Neocities.",
      descripcion_en: "2D game engine developed from scratch in Vanilla JS and web platform deployed on Neocities.",
      contenidoLargo: "Desarrollo de un videojuego 'Endless Runner' utilizando exclusivamente JavaScript puro (Vanilla JS), sin motores externos. Programé desde cero el Game Loop, la lógica de detección de colisiones AABB y el sistema de gravedad. El proyecto se presenta en una plataforma web diseñada para contextualizar la obra, incluyendo la fundamentación narrativa, un carrusel interactivo de assets y una galería multimedia. El sitio fue desplegado en Neocities, integrando el juego mediante una arquitectura de navegación fluida que conecta la landing page con la instancia ejecutable del juego.",
      contenidoLargo_en: "Development of an 'Endless Runner' video game using exclusively Vanilla JavaScript, without external engines. I programmed the Game Loop, AABB collision detection logic, and gravity system from scratch. The project is presented on a web platform designed to contextualize the work, including the narrative foundation, an interactive asset carousel, and a multimedia gallery. The site was deployed on Neocities, integrating the game through a fluid navigation architecture that connects the landing page with the playable instance of the game.",
      tecnologias: ["JavaScript", "HTML", "CSS", "Neocities", "Game Logic"],
      categoria: 'Videojuegos',
      urlExterna: "https://valenyuge.neocities.org/",
      videoUrl: "/proyectos/runner-html.mp4"
    },
    {
      id: "arcade-versus",
      titulo: "Arcade: Amargados 1v1",
      titulo_en: "Amargados Arcade 1v1",
      fechaInicio: "2024-09",
      fechaFin: "2024-12",
      descripcion: "Instalación interactiva con controladores físicos hackeados y lógica de ritmo en Unity.",
      descripcion_en: "Interactive installation with hacked physical controllers and rhythm logic in Unity.",
      contenidoLargo: "Desarrollo integral de una experiencia de arcade física 1v1 con estética 2D. El proyecto incluyó la creación de un controlador personalizado mediante el desensamblaje y mapeo de un teclado para accionar 6 botones arcade físicos. Dentro de Unity, programé el Game Manager central que coordina el sistema de puntuación por 'timing' (ritmo), un temporizador de 90 segundos y eventos climáticos dinámicos (neblina, viento). Implementé la lógica de colisiones para los 'power-ups' (Alfajor especial) y sincronicé las animaciones de los personajes mediante eventos de código para generar una respuesta visual inmediata al input físico.",
      contenidoLargo_en: "Full development of a 1v1 physical arcade experience with 2D aesthetics. The project involved creating a custom controller by disassembling and mapping a keyboard to trigger 6 physical arcade buttons. Inside Unity, I programmed the central Game Manager to coordinate the timing-based scoring system, a 90-second timer, and dynamic weather events (fog, wind). I implemented collision logic for power-ups (special Alfajor) and synchronized character animations with code events to provide immediate visual feedback to physical inputs.",
      tecnologias: ["Unity", "C#", "Hardware Hacking", "Game Design"],
      categoria: 'Videojuegos',
      urlExterna: "",
      videoUrl: "/proyectos/amargados.mp4"
    },
    {
      id: "landing-vorterix",
      titulo: "Landing Page 'Vorterix'",
      titulo_en: "'Vorterix' Landing Page",
      fechaInicio: "2025-04",
      fechaFin: "2025-05",
      descripcion: "Maquetación Pixel Perfect con enfoque en conversión y fidelidad visual de marca.",
      descripcion_en: "Pixel Perfect layout focused on conversion and brand visual fidelity.",
      contenidoLargo: "Desarrollo de una landing page de alto impacto para Vorterix, partiendo de un diseño original en Figma. El desafío principal fue lograr una maquetación Pixel Perfect que respetara la estética cruda y técnica del medio. Implementé una estructura Full Responsive utilizando metodologías modernas de CSS (Flexbox y Grid) y JavaScript para la validación de formularios de captura de datos en el lado del cliente. Me enfoqué en la optimización de activos visuales para garantizar una carga rápida sin perder calidad de imagen.",
      contenidoLargo_en: "High-impact landing page development for Vorterix, based on an original Figma design. The main challenge was achieving a Pixel Perfect layout that respected the brand's raw and technical aesthetics. I implemented a Full Responsive structure using modern CSS methodologies (Flexbox and Grid) and JavaScript for client-side data capture form validation. I focused on visual asset optimization to ensure fast loading times without compromising image quality.",
      tecnologias: ["JavaScript", "HTML", "CSS", "Figma", "UX/UI Design"],
      categoria: 'Web',
      urlExterna: "https://valenyuge.github.io/vorterix/index.html",
      videoUrl: "/proyectos/vorterix.mp4",
      canvaUrl: "https://www.canva.com/design/DAGoab_G6qE/OuNi1EX8LkiOvj41jqFICQ/view?embed"
    }
  ];