import { useState, useEffect, useLayoutEffect, useRef, useCallback, Fragment } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import ovalMarco from './assets/ovalMraco.webp';
import coronaImg from './assets/coronaReal1.webp';

// 💌 Sobre de portada
import sobrePortada from './assets/sobre-1080.webp';
import sobrePortada640 from './assets/sobre-640.webp';

// 🎵 Música
import audioSong from './assets/cancion-optimized.mp3';

// 🦋 Mariposas
import mariposa1 from './assets/mariposaDere.webp';
import mariposa2 from './assets/mariposaDere2.webp';
import mariposa4 from './assets/mariposaIzq.webp';
import mariposa5 from './assets/mariposaIzq_dch.webp';
import mariposa6 from './assets/mariposamedio1.webp';
import mariposa7 from './assets/mariposamedio2.webp';
import mariposa8 from './assets/mariposamedio3.webp';
import mariposa9 from './assets/mariposamedioG.webp';
import mariposa10 from './assets/mariposasIzqmedia.webp';

// 🌸 Flores
import inferiorDerecho from './assets/florInferiorDerecho.webp';
import inferiorIzquierdo from './assets/florInferiorIzquierdo.webp';
import superiorDerecho from './assets/florSuperiorDerecho.webp';
import superiorIzquierdo from './assets/florSuperiorIzquierdo.webp';
import itinerario1 from './assets/itinerario_1.webp';
import itinerario2 from './assets/itinerario_2.webp';
import itinerario3 from './assets/itinerario_3.webp';
import itinerario4 from './assets/itinerario_4.webp';
import itinerario5 from './assets/itinerario_5.webp';
import iconoRegalo from './assets/extra_5.webp';
import fotoPeque1 from './assets/img/img_peque.webp';
import fotoPeque2 from './assets/img/img_peque2.webp';
import fotoMediana1 from './assets/img/img_mediana.webp';
import fotoMediana2 from './assets/img/img_mediana2.webp';
import fotoImg1 from './assets/img/img1.webp';
import fotoImg2 from './assets/img/img2.webp';
import fotoPeque1Small from './assets/img/img_peque-480.webp';
import fotoPeque1Large from './assets/img/img_peque-800.webp';
import fotoPeque2Small from './assets/img/img_peque2-480.webp';
import fotoPeque2Large from './assets/img/img_peque2-800.webp';
import fotoMediana1Small from './assets/img/img_mediana-480.webp';
import fotoMediana1Large from './assets/img/img_mediana-800.webp';
import fotoMediana2Small from './assets/img/img_mediana2-480.webp';
import fotoMediana2Large from './assets/img/img_mediana2-800.webp';
import fotoImg1Small from './assets/img/img1-480.webp';
import fotoImg1Large from './assets/img/img1-800.webp';
import fotoImg2Small from './assets/img/img2-480.webp';
import fotoImg2Large from './assets/img/img2-800.webp';

// 🌟 Partículas de Fondo
const BackgroundParticles = ({ active }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let lastRenderAt = 0;
    let canvasWidth = 0;
    let canvasHeight = 0;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    const resizeCanvas = () => {
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;
      canvas.width = Math.round(canvasWidth * pixelRatio);
      canvas.height = Math.round(canvasHeight * pixelRatio);
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };
    resizeCanvas();

    const particles = Array.from({ length: canvasWidth < 640 ? 36 : 56 }, () => ({
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      radius: Math.random() * 2 + 1,
      color: ['rgba(255, 249, 226, 0.75)', 'rgba(212, 175, 55, 0.58)', 'rgba(182, 149, 192, 0.5)'][Math.floor(Math.random() * 3)],
      shape: Math.random() < 0.18 ? 'star' : 'dot',
      vy: Math.random() * -0.6 - 0.2,
      vx: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.55 + 0.35,
      phase: Math.random() * Math.PI * 2
    }));

    const render = (timestamp) => {
      if (timestamp - lastRenderAt < 1000 / 30) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastRenderAt = timestamp;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      particles.forEach(p => {
        p.y += p.vy;
        p.x += p.vx;
        if (p.y < 0) p.y = canvasHeight;
        if (p.x < 0 || p.x > canvasWidth) p.x = Math.random() * canvasWidth;

        const shimmer = 0.65 + Math.sin(performance.now() * 0.002 + p.phase) * 0.35;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * shimmer;
        ctx.shadowBlur = p.shape === 'star' ? 14 : 9;
        ctx.shadowColor = p.color;
        if (p.shape === 'star') {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - p.radius * 3.5);
          ctx.lineTo(p.x + p.radius * 0.65, p.y - p.radius * 0.65);
          ctx.lineTo(p.x + p.radius * 3.5, p.y);
          ctx.lineTo(p.x + p.radius * 0.65, p.y + p.radius * 0.65);
          ctx.lineTo(p.x, p.y + p.radius * 3.5);
          ctx.lineTo(p.x - p.radius * 0.65, p.y + p.radius * 0.65);
          ctx.lineTo(p.x - p.radius * 3.5, p.y);
          ctx.lineTo(p.x - p.radius * 0.65, p.y - p.radius * 0.65);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };
    const startAnimation = () => {
      if (document.visibilityState === 'visible' && animationFrameId === undefined) {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    const stopAnimation = () => {
      if (animationFrameId !== undefined) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = undefined;
      }
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        stopAnimation();
      } else {
        startAnimation();
      }
    };

    window.addEventListener('resize', resizeCanvas, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    startAnimation();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      stopAnimation();
    };
  }, [active]);

  return <canvas ref={canvasRef} className="background-particles fixed inset-0 pointer-events-none z-0" />;
};

const CursorSparkles = ({ active }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!active || !container) return undefined;
    if (window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) return undefined;

    let lastSparkleAt = 0;
    const handlePointerMove = (event) => {
      if (event.pointerType === 'touch') return;
      const firstSection = document.querySelector('.invitation-main > header');
      if (firstSection && event.clientY + window.scrollY < firstSection.getBoundingClientRect().bottom + window.scrollY) return;

      const now = performance.now();
      if (now - lastSparkleAt < 75) return;
      lastSparkleAt = now;

      if (container.childElementCount >= 16) {
        container.firstElementChild?.remove();
      }

      const sparkle = document.createElement('span');
      sparkle.className = 'cursor-sparkle';
      sparkle.style.left = `${event.clientX}px`;
      sparkle.style.top = `${event.clientY}px`;
      sparkle.style.setProperty('--sparkle-x', `${Math.round((Math.random() - 0.5) * 28)}px`);
      sparkle.style.setProperty('--sparkle-y', `${Math.round((Math.random() - 0.5) * 28)}px`);
      container.appendChild(sparkle);
      sparkle.addEventListener('animationend', () => sparkle.remove(), { once: true });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [active]);

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden="true" />;
};

const PageCornerSparkles = () => (
  <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
    <span className="page-sparkle page-sparkle--bottom-left" />
    <span className="page-sparkle page-sparkle--bottom-left-small" />
    <span className="page-sparkle page-sparkle--bottom-right" />
    <span className="page-sparkle page-sparkle--bottom-right-small" />
  </div>
);

const SectionSparkles = () => {
  const clusterPositions = ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right'];

  return (
    <div className="section-sparkles pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {clusterPositions.map((position) => (
        <div key={position} className={`section-sparkle-cluster section-sparkle-cluster--${position}`}>
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index} className="section-sparkle" />
          ))}
        </div>
      ))}
    </div>
  );
};

const FloatingButterfly = ({ src, className = '', duration = 4.5, delay = 0 }) => (
  <motion.img
    src={src}
    alt=""
    aria-hidden="true"
    animate={{ y: [0, -10, 0], x: [0, 5, 0], rotate: [-6, 6, -6] }}
    transition={{ repeat: Infinity, duration, delay, ease: "easeInOut" }}
    className={`pointer-events-none absolute z-25 opacity-90 drop-shadow-[0_2px_8px_rgba(74,62,77,0.22)] ${className}`}
  />
);

const SectionDivider = ({ butterfly }) => (
  <motion.div
    initial={{ opacity: 0, scaleX: 0.65 }}
    whileInView={{ opacity: 1, scaleX: 1 }}
    viewport={{ once: false, amount: 0.8 }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className="relative flex w-full max-w-[680px] items-center justify-center text-[#b695c0]/80 my-2"
    aria-hidden="true"
  >
    {butterfly && (
      <>
        <FloatingButterfly src={butterfly} className="divider-butterfly-side divider-butterfly-side--left h-7 w-7" duration={5.1} />
        <FloatingButterfly src={butterfly} className="divider-butterfly-side divider-butterfly-side--right h-7 w-7 scale-x-[-1]" duration={5.6} delay={0.6} />
      </>
    )}
    <div className="relative flex w-28 shrink-0 items-center justify-center gap-2">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#b695c0]/55" />
      {butterfly ? (
        <span className="relative z-10 inline-flex h-8 w-8 shrink-0 items-center justify-center">
          <FloatingButterfly
            src={butterfly}
            className="divider-butterfly h-7 w-7 opacity-95"
            duration={5.2}
          />
        </span>
      ) : (
        <span className="text-[10px]">✧</span>
      )}
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#b695c0]/55" />
    </div>
  </motion.div>
);

const EventCalendar = ({ sectionItem }) => {
  const year = 2026;
  const month = 11; // Diciembre (0-indexado)
  const eventDay = 26;
  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Ajuste para que la semana inicie en lunes
  const startOffset = (firstDay.getDay() + 6) % 7;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(day);

  return (
    <motion.div variants={sectionItem} className="event-calendar relative z-0 w-full max-w-[420px] flex flex-col items-center gap-4 py-2 px-2 sm:px-4">
      <motion.div className="event-calendar-card relative w-full overflow-hidden rounded-[28px] border border-[#d7c3df]/70 bg-gradient-to-b from-[#fbf8fc]/95 via-[#f6f0f8]/92 to-[#f1e8f4]/90 px-2 py-5 shadow-[0_18px_45px_rgba(107,91,114,0.12),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-sm sm:px-6 sm:py-6">
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />
        <div className="pointer-events-none absolute -left-10 -top-10 h-28 w-28 rounded-full bg-[#d4af37]/10 blur-2xl" />
        <div className="pointer-events-none absolute -right-10 -bottom-10 h-28 w-28 rounded-full bg-[#b695c0]/10 blur-2xl" />

        <div className="relative z-10 mb-3 flex items-center justify-center gap-3 text-[#b695c0]/70">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#b695c0]/50" />
          <span className="calendar-month text-xs sm:text-sm tracking-[0.28em] uppercase font-serif text-[#6b5b72]/80">Diciembre 2026</span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#b695c0]/50" />
        </div>

        <div className="calendar-grid relative z-10 grid grid-cols-7 gap-y-2.5 gap-x-1 text-center">
          {weekDays.map((d) => (
            <div key={d} className="calendar-weekday pb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6b5b72]/75 sm:text-[11px]">
              {d}
            </div>
          ))}
          {cells.map((day, idx) => {
            if (!day) return <div key={`e-${idx}`} className="h-10 sm:h-11" />;

            const date = new Date(year, month, day);
            date.setHours(0, 0, 0, 0);
            const isPast = date < today;
            const isEvent = day === eventDay;

            return (
              <div key={day} className="relative flex h-10 items-center justify-center sm:h-11">
                {isEvent && (
                  <>
                    <span className="absolute inset-[3px] rounded-full bg-gradient-to-b from-[#cdb0d8]/35 to-[#b695c0]/20 ring-1 ring-[#b695c0]/50 shadow-[0_0_18px_rgba(182,149,192,0.35)]" />
                    <span className="absolute -inset-0.5 rounded-full border border-[#d4af37]/30" />
                  </>
                )}
                <span
                  className={`relative z-10 font-serif text-[15px] sm:text-base ${
                    isEvent
                      ? 'font-semibold text-[#3f3342]'
                      : isPast
                        ? 'text-[#6b5b72]/45'
                        : 'text-[#4a3e4d]/85'
                  }`}
                >
                  {day}
                </span>
                {isPast && (
                  <motion.img
                    src={mariposa6}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    aria-hidden="true"
                    initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
                    whileInView={{ opacity: 0.95, scale: 1, rotate: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.45, delay: (day % 7) * 0.03 }}
                    className="pointer-events-none absolute -right-0.5 -top-1 z-20 h-[15px] w-[15px] drop-shadow-[0_2px_3px_rgba(74,62,77,0.25)] sm:h-[18px] sm:w-[18px]"
                  />
                )}
                {isEvent && !isPast && (
                  <motion.img
                    src={mariposa8}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    aria-hidden="true"
                    animate={{ y: [0, -2, 0], rotate: [-4, 4, -4] }}
                    transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
                    className="pointer-events-none absolute -right-1 -top-1.5 z-20 h-[15px] w-[15px] drop-shadow-sm sm:h-[18px] sm:w-[18px]"
                  />
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

const FadeAway = ({ children }) => (
  <div className="snap-section relative isolate flex w-full flex-col items-center justify-center">
    <SectionSparkles />
    <div className="relative z-10 flex w-full flex-col items-center justify-center">
      {children}
    </div>
  </div>
);

const EVENT_DATE = new Date(2026, 11, 26, 14, 0, 0); // 26 de diciembre de 2026, 2:00 PM
const WHATSAPP_NUMBER = '525532307675'; // Número de prueba (cámbialo luego por el definitivo, con lada/país)
const RSVP_MESSAGE = 'Hola, confirmo mi asistencia para los XV de Johana Estefania.';

const GALLERY_SLIDES = [
  { title: 'Mis Recuerdos', subtitle: 'Un instante que vive para siempre', image: fotoPeque1, imageSmall: fotoPeque1Small, imageLarge: fotoPeque1Large },
  { title: 'Momentos Especiales', subtitle: 'Sonrisas que iluminan el corazón', image: fotoPeque2, imageSmall: fotoPeque2Small, imageLarge: fotoPeque2Large },
  { title: 'Sueños y Alegría', subtitle: 'La magia de celebrar tus XV', image: fotoMediana1, imageSmall: fotoMediana1Small, imageLarge: fotoMediana1Large },
  { title: 'Instantes Inolvidables', subtitle: 'Recuerdos que guardo con amor', image: fotoMediana2, imageSmall: fotoMediana2Small, imageLarge: fotoMediana2Large },
  { title: 'Dulces Sonrisas', subtitle: 'Instantes llenos de ilusión', image: fotoImg1, imageSmall: fotoImg1Small, imageLarge: fotoImg1Large },
  { title: 'Recuerdos de Amor', subtitle: 'Momentos para atesorar siempre', image: fotoImg2, imageSmall: fotoImg2Small, imageLarge: fotoImg2Large },
];

const getTimeLeft = () => {
  const diff = Math.max(0, EVENT_DATE.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const isTodayEventDay = () => {
  const now = new Date();
  return (
    now.getFullYear() === EVENT_DATE.getFullYear() &&
    now.getMonth() === EVENT_DATE.getMonth() &&
    now.getDate() === EVENT_DATE.getDate()
  );
};

function App() {
  const [isOpeningAnimation, setIsOpeningAnimation] = useState(false);
  const [introStep, setIntroStep] = useState(0); // 0: Cerrado, 3: Invitación
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const [isPlaying, setIsPlaying] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const audioRef = useRef(null);
  const galleryRef = useRef(null);
  const isGalleryVisible = useInView(galleryRef, { amount: 0.01 });
  const stopMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    if (introStep !== 3 || !isGalleryVisible) return undefined;

    const timer = setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % GALLERY_SLIDES.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [introStep, isGalleryVisible]);

  useEffect(() => {
    const stopWhenHidden = () => {
      if (document.visibilityState === 'hidden') stopMusic();
    };

    window.addEventListener('pagehide', stopMusic);
    window.addEventListener('beforeunload', stopMusic);
    document.addEventListener('visibilitychange', stopWhenHidden);

    return () => {
      window.removeEventListener('pagehide', stopMusic);
      window.removeEventListener('beforeunload', stopMusic);
      document.removeEventListener('visibilitychange', stopWhenHidden);
    };
  }, [stopMusic]);

  useLayoutEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, left: 0 });

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    if (introStep === 3) {
      window.scrollTo({ top: 0, left: 0 });
    }
  }, [introStep]);

  useEffect(() => {
    const updateCountdown = () => setTimeLeft(getTimeLeft());
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenEnvelope = () => {
    if (isOpeningAnimation) return;
    setIsOpeningAnimation(true);

    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          setIsPlaying(false);
          console.error('No se pudo reproducir la música:', error);
        });
    }

    setTimeout(() => {
      setIntroStep(3);
    }, 650);
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      setIsPlaying(false);
      console.error('No se pudo reproducir la música:', error);
    }
  };

  const shouldReduceMotion = useReducedMotion();

  const sectionItem = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0.25 }
        : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const heroRevealFromBehind = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0.04 : 0.14,
        delayChildren: 0.08
      }
    }
  };

  const heroItem = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0.25 }
        : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };
  const pieceViewport = { once: false, amount: 0.2, margin: "0px 0px -10% 0px" };
  const pieceEase = [0.22, 1, 0.36, 1];

  const elegantPiece = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.985, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      filter: 'blur(0px)',
      transition: { duration: shouldReduceMotion ? 0.25 : 0.9, ease: pieceEase },
    },
  };

  const fromTop = elegantPiece;
  const fromBottom = elegantPiece;
  const fromLeft = elegantPiece;
  const fromRight = elegantPiece;
  const zoomIn = elegantPiece;
  const dropRotate = elegantPiece;

  const piece = (variants = elegantPiece) => ({
    variants,
    initial: 'hidden',
    animate: 'hidden',
    whileInView: 'visible',
    viewport: pieceViewport,
  });
  return (
    <div className="w-full max-w-none min-h-[100svh] bg-bg-page relative overflow-x-clip flex flex-col mx-auto font-sans text-black">
      
      {/* ✉️ APERTURA DEL SOBRE */}
      <AnimatePresence>
        {introStep < 3 && (
          <motion.div 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 w-screen h-dvh z-50 flex items-center justify-center bg-bg-page overflow-hidden"
          >
            <div 
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={handleOpenEnvelope}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  handleOpenEnvelope();
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Abrir invitación"
            >
              <motion.div 
                animate={isOpeningAnimation ? { opacity: 0, scale: 1.02 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 z-20 flex items-center justify-center"
              >
                <picture className="relative z-10 h-full w-full">
                  <source srcSet={`${sobrePortada640} 640w, ${sobrePortada} 1080w`} sizes="100vw" type="image/webp" />
                  <img src={sobrePortada} alt="" width="768" height="1365" fetchPriority="high" decoding="async" className="h-full w-full object-cover object-center pointer-events-none" />
                </picture>
              </motion.div>

              <motion.span 
                animate={{ scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute z-30 font-serif text-sm sm:text-base font-semibold tracking-[0.35em] uppercase text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] pointer-events-none"
              >
                Abrir
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌟 Fondo de Partículas */}
      <BackgroundParticles active={introStep === 3} />
      <PageCornerSparkles />
      <CursorSparkles active={introStep === 3} />
      <audio ref={audioRef} src={audioSong} loop preload="none" />
      {introStep === 3 && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
          className="fixed top-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[#d9c8e2]/80 bg-[#fbf8fc]/90 text-[#6b5b72] shadow-[0_10px_24px_rgba(107,91,114,0.18)] backdrop-blur-sm transition hover:bg-[#f3ecf6] hover:text-[#4a3e4d]"
        >
          <span className="text-sm leading-none">{isPlaying ? '❚❚' : '▶'}</span>
        </button>
      )}

      {/* 🌸 FLORES EN BORDES (en capa z-10 en los bordes para no tapar texto) */}
      <motion.img initial={{ opacity: 0, y: -16 }} animate={introStep === 3 ? { opacity: 0.9, y: 0 } : { opacity: 0, y: -16 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} src={superiorDerecho} alt="" loading="lazy" decoding="async" className="absolute top-0 left-0 w-28 sm:w-36 lg:w-44 pointer-events-none z-10" />
      <motion.img initial={{ opacity: 0, y: -16 }} animate={introStep === 3 ? { opacity: 0.9, y: 0 } : { opacity: 0, y: -16 }} transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }} src={superiorIzquierdo} alt="" loading="lazy" decoding="async" className="absolute top-0 right-0 w-28 sm:w-36 lg:w-44 pointer-events-none z-10" />
      {/* Contenedor principal con flujo continuo (sin cuadros) */}
      <div className="invitation-main relative z-20 flex w-full flex-col px-4 pb-36 gap-8 text-center items-center sm:px-12 lg:px-20">

        {/* 1️⃣ SECCIÓN PRINCIPAL: MARCO OVALADO */}
        <motion.header 
          variants={heroRevealFromBehind}
          initial="hidden"
          animate={introStep === 3 ? "visible" : "hidden"}
          className="snap-section relative w-full max-w-[680px] min-h-[100svh] flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16 text-center"
        >
          <motion.img 
            variants={heroItem} 
            src={ovalMarco} 
            alt="Marco Ovalado" 
            width="675"
            height="1200"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10" 
          />

          <div className="relative z-30 mx-auto flex w-full max-w-[600px] flex-col items-center justify-center gap-4 px-2">
            <motion.img 
              variants={heroItem}
              src={coronaImg} 
              alt="Corona" 
              width="683"
              height="463"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="mb-1 h-auto w-[clamp(12rem,42vw,20rem)] max-w-full object-contain drop-shadow-sm" 
            />
            
            <motion.h2 variants={heroItem} className="font-serif text-2xl sm:text-3xl font-medium uppercase tracking-[0.2em] text-[#6b5b72]">
              Mis XV Años
            </motion.h2>
            
            <motion.h1 variants={heroItem} className="font-serif text-[2.5rem] sm:text-[3.4rem] font-normal italic leading-tight tracking-wide text-[#4a3e4d]">
              Johana Estefania <br />
              <span className="text-[2.1rem] sm:text-[2.9rem]">Ojeda Gregorio</span>
            </motion.h1>
            
            <motion.p variants={heroItem} className="mt-2 font-serif text-xl sm:text-2xl tracking-wider text-gray-700">
              Sábado, 26 de Diciembre de 2026
            </motion.p>
          </div>

          <motion.img variants={heroItem} animate={{ y: [0, -6, 0], x: [0, 3, 0], rotate: [-12, -6, -12] }} transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }} src={mariposa1} alt="" className="hero-butterfly hero-butterfly--left absolute top-[5%] h-8 w-8 pointer-events-none z-35 sm:h-10 sm:w-10" />
          <motion.img variants={heroItem} animate={{ y: [0, -8, 0], x: [0, -3, 0], rotate: [45, 38, 45] }} transition={{ repeat: Infinity, duration: 5.1, delay: 0.3, ease: 'easeInOut' }} src={mariposa5} alt="" className="hero-butterfly hero-butterfly--right absolute top-[8%] h-8 w-8 pointer-events-none z-35 sm:h-10 sm:w-10" />
          <motion.img variants={heroItem} animate={{ y: [0, -7, 0], x: [0, 4, 0], rotate: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 4.6, delay: 0.6, ease: 'easeInOut' }} src={mariposa2} alt="" className="hero-butterfly hero-butterfly--left absolute bottom-[8%] h-8 w-8 pointer-events-none z-35 scale-x-[-1] sm:h-10 sm:w-10" />
          <motion.img variants={heroItem} animate={{ y: [0, -9, 0], x: [0, -4, 0], rotate: [-4, 4, -4] }} transition={{ repeat: Infinity, duration: 5.4, delay: 0.2, ease: 'easeInOut' }} src={mariposa10} alt="" className="hero-butterfly hero-butterfly--right absolute bottom-[5%] h-8 w-8 pointer-events-none z-35 sm:h-10 sm:w-10" />
          <FloatingButterfly src={mariposa4} className="hero-butterfly hero-butterfly--edge-left top-[26%] h-5 w-5 sm:h-7 sm:w-7" duration={4.5} delay={0.2} />
          <FloatingButterfly src={mariposa4} className="hero-butterfly hero-butterfly--edge-right top-[30%] h-5 w-5 sm:h-7 sm:w-7" duration={5.1} delay={0.8} />
          <FloatingButterfly src={mariposa6} className="hero-butterfly hero-butterfly--edge-left top-[43%] h-5 w-5 sm:h-7 sm:w-7" duration={4.8} delay={1.1} />
          <FloatingButterfly src={mariposa7} className="hero-butterfly hero-butterfly--edge-right top-[47%] h-5 w-5 sm:h-7 sm:w-7" duration={5.3} delay={0.5} />
          <FloatingButterfly src={mariposa8} className="hero-butterfly hero-butterfly--edge-left top-[59%] h-5 w-5 sm:h-7 sm:w-7" duration={5.0} delay={0.4} />
          <FloatingButterfly src={mariposa9} className="hero-butterfly hero-butterfly--edge-right top-[63%] h-5 w-5 sm:h-7 sm:w-7" duration={4.7} delay={0.9} />
          <FloatingButterfly src={mariposa10} className="hero-butterfly hero-butterfly--edge-left top-[76%] h-5 w-5 sm:h-7 sm:w-7" duration={5.4} delay={1.2} />
          <FloatingButterfly src={mariposa5} className="hero-butterfly hero-butterfly--edge-right top-[80%] h-5 w-5 sm:h-7 sm:w-7" duration={4.9} delay={0.6} />
        </motion.header>

        <SectionDivider butterfly={mariposa7} />

        <FadeAway>
          {/* 1️⃣ UN DÍA INOLVIDABLE */}
          <section
            style={{ perspective: 1000 }}
            className="w-full max-w-[600px] flex flex-col items-center gap-2 relative"
          >
            <motion.span {...piece(zoomIn)} className="text-2xl text-[#b695c0]">✦</motion.span>
            <motion.h3 {...piece(dropRotate)} className="font-serif text-2xl sm:text-3xl tracking-[0.25em] uppercase text-[#6b5b72] font-semibold">Un Día Inolvidable</motion.h3>
            <motion.p {...piece(fromLeft)} className="font-serif italic text-xl sm:text-2xl text-gray-700 leading-relaxed mt-1">
              "Hay momentos en la vida que se vuelven inolvidables, y compartirlos con las personas que más quiero los hace aún más especiales. Te espero para celebrar juntos mis 15 años."
            </motion.p>
            <motion.span {...piece(fromRight)} className="font-serif italic text-xl sm:text-2xl text-[#4a3e4d] font-medium mt-1">— Johana Estefania</motion.span>
          </section>
        </FadeAway>

        <FadeAway>
          <SectionDivider butterfly={mariposa2} />

          {/* 🌸 PADRES Y PADRINOS */}
          <section
            style={{ perspective: 1000 }}
            className="relative w-full max-w-[680px] flex flex-col items-center gap-4 px-5 py-3 text-center sm:px-8"
          >
            <motion.span {...piece(zoomIn)} className="text-2xl text-[#b695c0]">✦</motion.span>
            <motion.h3 {...piece(dropRotate)} className="max-w-full text-center font-serif text-2xl sm:text-3xl tracking-[0.25em] uppercase text-[#6b5b72] font-semibold">
              Con la Bendición de Dios
            </motion.h3>
            <motion.p {...piece(fromBottom)} className="max-w-[500px] px-2 text-center font-serif italic text-xl sm:text-2xl text-gray-600 leading-relaxed">
              Y el amor incondicional de mis padres y padrinos
            </motion.p>

            <div className="mt-2 flex w-full max-w-[620px] flex-col items-center gap-6 px-2 sm:flex-row sm:justify-center sm:gap-10">
              <motion.div {...piece(fromLeft)} className="flex flex-col items-center text-center">
                <div className="mb-2 flex items-center justify-center gap-3 text-[#b695c0]/70">
                  <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4af37]/60" />
                  <span className="font-serif text-sm font-semibold uppercase tracking-[0.25em] text-[#6b5b72] sm:text-base">Mis Padres</span>
                  <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#d4af37]/60" />
                </div>
                <p className="font-serif text-[clamp(1.25rem,5vw,1.875rem)] leading-tight font-medium text-[#4a3e4d]">MARIA LUISA GREGORIO BOLAÑOS</p>
                <span className="my-1 font-serif text-lg italic leading-none text-[#b695c0] sm:text-xl">&amp;</span>
                <p className="font-serif text-[clamp(1.25rem,5vw,1.875rem)] leading-tight font-medium text-[#4a3e4d]">SANTIAGO OJEDA SANCHEZ</p>
              </motion.div>

              <span
                aria-hidden="true"
                className="h-px w-24 bg-gradient-to-r from-transparent via-[#b695c0]/45 to-transparent sm:h-28 sm:w-px sm:bg-gradient-to-b"
              />

              <motion.div {...piece(fromRight)} className="flex flex-col items-center text-center">
                <div className="mb-2 flex items-center justify-center gap-3 text-[#b695c0]/70">
                  <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4af37]/60" />
                  <span className="font-serif text-sm font-semibold uppercase tracking-[0.25em] text-[#6b5b72] sm:text-base">Mis Padrinos</span>
                  <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#d4af37]/60" />
                </div>
                <p className="font-serif text-[clamp(1.25rem,5vw,1.875rem)] leading-tight font-medium text-[#4a3e4d]">Laura Gregorio</p>
                <span className="my-1 font-serif text-lg italic leading-none text-[#b695c0] sm:text-xl">&amp;</span>
                <p className="font-serif text-[clamp(1.25rem,5vw,1.875rem)] leading-tight font-medium text-[#4a3e4d]">Martín Durán</p>
                <span className="my-1 font-serif text-lg italic leading-none text-[#b695c0] sm:text-xl">&amp;</span>
                <p className="font-serif text-[clamp(1.25rem,5vw,1.875rem)] leading-tight font-medium text-[#4a3e4d]">JOSÉ MANUEL OLIVARES GARAY</p>
              </motion.div>
            </div>
          </section>
        </FadeAway>

        <FadeAway>
          <SectionDivider butterfly={mariposa8} />

          {/* 2️⃣ GALERÍA DE MOMENTOS */}
          <section className="relative w-full max-w-[820px] flex flex-col items-center gap-4 py-1 overflow-visible">
            <motion.span {...piece(zoomIn)} className="text-2xl text-[#b695c0]">✦</motion.span>
            <motion.h3 {...piece(fromTop)} className="font-serif text-2xl sm:text-3xl tracking-[0.25em] uppercase text-[#6b5b72] font-semibold">
              Galería de Momentos
            </motion.h3>
            <motion.p {...piece(fromBottom)} className="font-serif italic text-xl sm:text-2xl text-gray-600 max-w-[420px] leading-relaxed">
              Recuerdos enmarcados que acompañan la magia de este día especial
            </motion.p>

            <motion.div {...piece(zoomIn)} className="relative w-full px-0 sm:px-2">
              <div className="pointer-events-none absolute inset-x-2 -top-4 -bottom-2 -z-10 rounded-[44px] bg-gradient-to-b from-[#f8f3fa]/70 via-[#f3ecf6]/35 to-transparent blur-2xl" />

              {/* Carrusel con fotos encimadas a los lados */}
              <div ref={galleryRef} className="relative mx-auto h-[420px] w-full max-w-[620px] sm:h-[500px]">
                {(() => {
                  const total = GALLERY_SLIDES.length;
                  const prev = (galleryIndex - 1 + total) % total;
                  const next = (galleryIndex + 1) % total;
                  const visible = [prev, next, galleryIndex];

                  return visible.map((i) => {
                    const slide = GALLERY_SLIDES[i];
                    const isActive = i === galleryIndex;
                    const isLeft = i === prev;

                    return (
                      <motion.button
                        key={`${i}-${isActive ? 'active' : isLeft ? 'left' : 'right'}`}
                        type="button"
                        onClick={() => setGalleryIndex(i)}
                        initial={false}
                        animate={{
                          x: isActive ? '0%' : isLeft ? '-22%' : '22%',
                          y: isActive ? [0, -5, 0] : [8, 3, 8],
                          scale: isActive ? 1 : 0.88,
                          rotate: isActive ? 0 : isLeft ? -4 : 4,
                          opacity: isActive ? 1 : 0.62,
                          filter: isActive ? 'blur(0px)' : 'blur(0.4px) saturate(0.88)',
                          zIndex: isActive ? 30 : 20,
                        }}
                        transition={{
                          x: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                          scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                          rotate: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.55 },
                          y: isActive
                            ? { duration: 6.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
                            : { duration: 5.6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 0.3 },
                        }}
                        className="absolute left-1/2 top-1/2 w-[68%] -translate-x-1/2 -translate-y-1/2 text-left sm:w-[48%]"
                        aria-label={`Ver recuerdo ${i + 1}`}
                      >
                        <div
                          className={`relative rounded-[26px] border p-2.5 sm:p-3 shadow-[0_20px_45px_rgba(107,91,114,0.16),inset_0_1px_0_rgba(255,255,255,0.85)] ${
                            isActive
                              ? 'border-[#d9c8e2]/80 bg-gradient-to-b from-[#fbf8fc]/98 via-[#f5eff8]/95 to-[#efe4f2]/94'
                              : 'border-[#d9c8e2]/55 bg-gradient-to-b from-[#fbf8fc]/90 via-[#f5eff8]/86 to-[#efe4f2]/84'
                          }`}
                        >
                          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />
                          <div className="relative overflow-hidden rounded-[20px] border border-white/70 aspect-[3/4] sm:aspect-[4/5]">
                            {slide.image ? (
                              <picture className="absolute inset-0 h-full w-full">
                                <source srcSet={`${slide.imageSmall} 480w, ${slide.imageLarge} 800w`} sizes="(max-width: 640px) 68vw, 420px" type="image/webp" />
                                <motion.img
                                  src={slide.image}
                                  alt={slide.title}
                                  loading="lazy"
                                  decoding="async"
                                  className="h-full w-full object-cover"
                                  animate={isActive ? { scale: [1, 1.04, 1] } : { scale: 1 }}
                                  transition={{ duration: 8, repeat: isActive ? Infinity : 0, repeatType: 'mirror', ease: 'easeInOut' }}
                                />
                              </picture>
                            ) : (
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(212,175,55,0.16),transparent_30%),radial-gradient(circle_at_75%_75%,rgba(182,149,192,0.22),transparent_38%),linear-gradient(180deg,#faf7fb,#f1e8f4)]" />
                            )}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2b2230]/35 via-transparent to-white/10" />
                            <div className="pointer-events-none absolute inset-2.5 sm:inset-3 rounded-[14px] border border-[#f8f1dc]/35" />
                            {isActive && (
                              <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1 px-4 pb-4 pt-10 text-center sm:px-6 sm:pb-5"
                              >
                                <h4 className="font-serif italic text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] leading-snug text-2xl sm:text-3xl">
                                  {slide.title}
                                </h4>
                                <p className="font-serif text-lg sm:text-xl text-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)] max-w-[260px] leading-relaxed">
                                  {slide.subtitle}
                                </p>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    );
                  });
                })()}

                {/* Mini marcos decorativos (toque de la composición anterior) */}
                <motion.div
                  animate={{ y: [0, -4, 0], rotate: [-3, -1.5, -3] }}
                  transition={{ y: { duration: 6.2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }, rotate: { duration: 6.2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' } }}
                  className="pointer-events-none absolute left-0 bottom-3 hidden h-16 w-[52px] rounded-lg border border-[#d9c8e2]/60 bg-gradient-to-br from-[#fbf8fc] via-[#f4edf7] to-[#eadff0] p-1 shadow-[0_8px_18px_rgba(107,91,114,0.1)] sm:block"
                >
                  <div className="h-full w-full rounded-md border border-white/70 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.14),transparent_40%),linear-gradient(180deg,#faf7fb,#f1e8f4)]" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -5, 0], rotate: [2, 3.5, 2] }}
                  transition={{ y: { duration: 6.6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 0.5 }, rotate: { duration: 6.6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 0.5 } }}
                  className="pointer-events-none absolute right-0 top-5 hidden h-[72px] w-14 rounded-lg border border-[#d9c8e2]/60 bg-gradient-to-br from-[#fcfafd] via-[#f6f0f8] to-[#ecdfef] p-1 shadow-[0_8px_18px_rgba(107,91,114,0.1)] sm:block"
                >
                  <div className="h-full w-full rounded-md border border-white/70 bg-[radial-gradient(circle_at_70%_30%,rgba(182,149,192,0.18),transparent_40%),linear-gradient(180deg,#fbf9fc,#f3ebf6)]" />
                </motion.div>
              </div>

              <div className="mt-3 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setGalleryIndex((index) => (index - 1 + GALLERY_SLIDES.length) % GALLERY_SLIDES.length)}
                  aria-label="Ver recuerdo anterior"
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#b695c0]/50 font-serif text-2xl text-[#6b5b72] transition-colors hover:bg-[#b695c0]/10"
                >
                  ‹
                </button>
                <div className="flex items-center justify-center gap-2">
                  {GALLERY_SLIDES.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setGalleryIndex(i)}
                      aria-label={`Ver recuerdo ${i + 1}`}
                      aria-pressed={i === galleryIndex}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        i === galleryIndex
                          ? 'w-7 bg-gradient-to-r from-[#b695c0] to-[#d4af37] shadow-[0_0_8px_rgba(182,149,192,0.4)]'
                          : 'w-2 bg-[#b695c0]/30 hover:bg-[#b695c0]/50'
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setGalleryIndex((index) => (index + 1) % GALLERY_SLIDES.length)}
                  aria-label="Ver siguiente recuerdo"
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#b695c0]/50 font-serif text-2xl text-[#6b5b72] transition-colors hover:bg-[#b695c0]/10"
                >
                  ›
                </button>
              </div>
            </motion.div>
          </section>
        </FadeAway>

        <FadeAway>
          <SectionDivider butterfly={mariposa9} />

          {/* 3️⃣ CUENTA REGRESIVA Y CALENDARIO */}
          <section
            style={{ perspective: 1000 }}
            className="relative w-full max-w-[560px] flex flex-col gap-5 items-center"
          >
            <motion.div {...piece(zoomIn)} className="relative w-full max-w-[560px] px-2 py-3 sm:py-4">
              <div className="pointer-events-none absolute inset-x-10 -top-2 h-px bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent" />
              <div className="pointer-events-none absolute inset-x-10 -bottom-2 h-px bg-gradient-to-r from-transparent via-[#b695c0]/30 to-transparent" />

              <div className="relative z-10 mb-4 flex flex-col items-center gap-1.5">
                <div className="flex items-center justify-center gap-3 text-[#b695c0]/70">
                  <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#b695c0]/40" />
                  <span className="text-sm sm:text-base tracking-[0.35em] uppercase font-serif text-[#6b5b72]/85">
                    {isTodayEventDay() ? 'Una fecha especial' : 'Cuenta regresiva'}
                  </span>
                  <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#b695c0]/40" />
                </div>
                {!isTodayEventDay() && (
                  <span className="font-serif italic text-lg sm:text-xl text-[#6b5b72]/70">Para el gran día</span>
                )}
              </div>

              {isTodayEventDay() ? (
                <div className="relative z-10 flex flex-col items-center justify-center gap-3 py-4">
                  <motion.span {...piece(zoomIn)} className="text-3xl text-[#d4af37]/75">✦</motion.span>
                  <motion.p {...piece(fromBottom)} className="font-serif text-3xl sm:text-4xl font-medium italic text-[#4a3e4d] tracking-wide">
                    Hoy es el gran día
                  </motion.p>
                  <span className="h-px w-24 bg-gradient-to-r from-transparent via-[#b695c0]/40 to-transparent" />
                </div>
              ) : (
                <div className="countdown-row relative z-10 flex items-end justify-center gap-3 sm:gap-6">
                  {[
                    { valor: timeLeft.days, etiqueta: 'Días', anim: fromLeft },
                    { valor: timeLeft.hours, etiqueta: 'Horas', anim: fromTop },
                    { valor: timeLeft.minutes, etiqueta: 'Minutos', anim: fromBottom },
                    { valor: timeLeft.seconds, etiqueta: 'Segundos', anim: fromRight },
                  ].map((item, idx, arr) => (
                    <Fragment key={item.etiqueta}>
                      <motion.div
                        {...piece(item.anim)}
                        className="countdown-unit relative flex min-w-[64px] flex-col items-center sm:min-w-[90px]"
                      >
                        <span className="countdown-number font-serif text-4xl sm:text-5xl font-semibold leading-none text-[#4a3e4d] tabular-nums [text-shadow:0_6px_18px_rgba(182,149,192,0.18)]">
                          {String(item.valor).padStart(2, '0')}
                        </span>
                        <span className="mt-2 h-px w-10 bg-gradient-to-r from-transparent via-[#d4af37]/45 to-transparent" />
                        <span className="countdown-label mt-2 text-xs sm:text-sm tracking-[0.22em] uppercase text-[#6b5b72]/75 font-medium">
                          {item.etiqueta}
                        </span>
                      </motion.div>
                      {idx < arr.length - 1 && (
                        <div className="countdown-separator pb-7 sm:pb-8 flex flex-col items-center gap-1 text-[#b695c0]/45">
                          <span className="h-1 w-1 rounded-full bg-[#d4af37]/50" />
                          <span className="h-1 w-1 rounded-full bg-[#b695c0]/45" />
                        </div>
                      )}
                    </Fragment>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div {...piece(zoomIn)} className="w-full flex justify-center">
              <EventCalendar sectionItem={sectionItem} />
            </motion.div>
          </section>
        </FadeAway>

        <FadeAway>
          {/* 4️⃣ CEREMONIA Y RECEPCIÓN */}
          <section
            style={{ perspective: 1000 }}
            className="w-full max-w-[760px] flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-8 py-2 relative"
          >
            {/* Misa */}
            <div className="flex w-full flex-col items-center gap-1.5 md:flex-1">
              <motion.img
                {...piece(fromLeft)}
                src={itinerario1}
                alt=""
                loading="lazy"
                decoding="async"
                whileHover={{ y: -6, rotate: -4, scale: 1.06 }}
                className="mb-2 h-40 w-40 max-w-full object-contain sm:h-60 sm:w-60 lg:h-64 lg:w-64"
              />
              <motion.h3 {...piece(dropRotate)} className="font-serif text-2xl sm:text-3xl font-medium text-[#4a3e4d] tracking-[0.2em] uppercase">Ceremonia Religiosa</motion.h3>
              <motion.p {...piece(fromLeft)} className="font-serif text-xl sm:text-2xl text-gray-700">Parroquia de San Lorenzo</motion.p>
              <motion.p {...piece(zoomIn)} className="text-xl sm:text-2xl font-semibold text-[#4a3e4d]">🕒 2:00 PM</motion.p>
              <motion.a
                {...piece(fromBottom)}
                href="https://maps.app.goo.gl/jxjubtWWgK2gypZbA"
                onClick={stopMusic}
                target="_blank"
                rel="noreferrer"
                className="mt-2 rounded-full border border-[#b695c0] px-7 py-2.5 text-sm uppercase tracking-wider text-[#4a3e4d] shadow-sm transition-colors hover:bg-[#b695c0] hover:text-white sm:text-base"
              >
                Ver Ubicación
              </motion.a>
            </div>

            <div className="h-px w-16 bg-[#b695c0]/35 md:hidden"></div>
            <div className="hidden h-40 w-px bg-gradient-to-b from-transparent via-[#b695c0]/40 to-transparent md:block"></div>

            {/* Fiesta */}
            <div className="flex w-full flex-col items-center gap-1.5 md:flex-1">
              <motion.img
                {...piece(fromRight)}
                src={itinerario2}
                alt=""
                loading="lazy"
                decoding="async"
                whileHover={{ y: -6, rotate: 4, scale: 1.06 }}
                className="mb-2 h-40 w-40 max-w-full object-contain sm:h-60 sm:w-60 lg:h-64 lg:w-64"
              />
              <motion.h3 {...piece(fromTop)} className="font-serif text-2xl sm:text-3xl font-medium text-[#4a3e4d] tracking-[0.2em] uppercase">Auditorio de San Agustín</motion.h3>
              <motion.p {...piece(fromRight)} className="font-serif text-xl sm:text-2xl text-gray-700">Auditorio de San Agustín</motion.p>
              <motion.p {...piece(zoomIn)} className="text-xl sm:text-2xl font-semibold text-[#4a3e4d]">🕒 4:00 PM</motion.p>
              <motion.a
                {...piece(fromBottom)}
                href="https://maps.app.goo.gl/rTxJs5Jt2Jn4oCTp8"
                onClick={stopMusic}
                target="_blank"
                rel="noreferrer"
                className="mt-2 rounded-full border border-[#b695c0] px-7 py-2.5 text-sm uppercase tracking-wider text-[#4a3e4d] shadow-sm transition-colors hover:bg-[#b695c0] hover:text-white sm:text-base"
              >
                Ver Ubicación
              </motion.a>
            </div>
          </section>
        </FadeAway>

        <FadeAway>
          {/* 5️⃣ ITINERARIO */}
          <section
            style={{ perspective: 1000 }}
            className="relative w-full max-w-[600px] flex flex-col items-center gap-5 py-2"
          >
            <motion.h3 {...piece(fromTop)} className="font-serif text-2xl sm:text-3xl tracking-[0.25em] uppercase text-[#6b5b72] font-semibold">Itinerario</motion.h3>

            <div className="itinerary-list relative my-2 flex w-fit max-w-full mx-auto flex-col gap-7 border-l border-[#b695c0]/40 pl-7 text-left sm:pl-9">
              {[
                { img: itinerario1, hora: '2:00 PM', texto: 'Ceremonia Religiosa', giro: -5, anim: fromLeft },
                { img: itinerario2, hora: '4:00 PM', texto: 'Auditorio de San Agustín', giro: 5, anim: dropRotate },
                { img: itinerario3, hora: '6:00 PM', texto: 'Cena', giro: -5, anim: zoomIn },
                { img: itinerario4, hora: '8:00 PM', texto: 'Vals Principal', giro: 5, anim: fromBottom },
                { img: itinerario5, hora: '10:00 PM', texto: 'Apertura de Pista', giro: -5, anim: fromLeft },
              ].map((item) => (
                <div key={item.hora} className="itinerary-row relative flex items-center gap-4">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1, scale: [0.7, 1.15, 1] }}
                    viewport={pieceViewport}
                    transition={{ duration: 0.9 }}
                    className="absolute -left-[33px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#b695c0] shadow-[0_0_10px_rgba(182,149,192,0.55)] sm:-left-[41px]"
                  />
                  <motion.img
                    {...piece(item.anim)}
                    src={item.img}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    whileHover={{ scale: 1.1, y: -4, rotate: item.giro }}
                    className="itinerary-image h-20 w-20 shrink-0 object-contain sm:h-32 sm:w-32 drop-shadow-[0_10px_18px_rgba(107,91,114,0.12)]"
                  />
                  <motion.div {...piece(fromRight)} className="itinerary-copy flex flex-col gap-0.5">
                    <span className="text-xl font-bold tracking-wide text-[#4a3e4d] sm:text-2xl">{item.hora}</span>
                    <span className="font-serif text-xl text-gray-700 sm:text-2xl">{item.texto}</span>
                  </motion.div>
                </div>
              ))}
            </div>
          </section>
        </FadeAway>

        <FadeAway>
          <SectionDivider butterfly={mariposa4} />

          {/* 6️⃣ MESA DE REGALOS */}
          <section
            style={{ perspective: 1000 }}
            className="relative w-full max-w-[400px] flex flex-col gap-8 py-2"
          >
            <div className="flex flex-col items-center gap-1">
              <motion.img
                {...piece(dropRotate)}
                src={iconoRegalo}
                alt=""
                loading="lazy"
                decoding="async"
                whileHover={{ y: -6, rotate: 4, scale: 1.06 }}
                className="mb-2 h-40 w-40 max-w-full object-contain sm:h-60 sm:w-60 lg:h-64 lg:w-64"
              />
              <motion.h3 {...piece(fromLeft)} className="font-serif text-2xl sm:text-3xl font-medium text-[#4a3e4d] tracking-[0.2em] uppercase">Mesa de Regalos</motion.h3>
              <motion.p {...piece(fromRight)} className="font-serif text-xl sm:text-2xl text-gray-700">Tu presencia es mi mejor regalo.</motion.p>
              <motion.p {...piece(fromBottom)} className="mt-0.5 text-lg italic text-gray-500 sm:text-xl">Si deseas hacerme un detalle, contaremos con lluvia de sobres ✉️</motion.p>
            </div>
          </section>
        </FadeAway>

        <SectionDivider butterfly={mariposa10} />

        {/* 7️⃣ CONFIRMACIÓN RSVP */}
        <section
          style={{ perspective: 1000 }}
          className="snap-section relative isolate w-full max-w-[600px] flex flex-col items-center gap-3 py-2"
        >
          <SectionSparkles />
          <motion.span {...piece(zoomIn)} className="text-2xl text-[#b695c0]">✧</motion.span>
          <motion.h3 {...piece(fromLeft)} className="font-serif text-2xl sm:text-3xl font-medium text-[#4a3e4d] tracking-[0.2em] uppercase">Confirmación de Asistencia</motion.h3>
          <motion.p {...piece(fromRight)} className="text-xl sm:text-2xl text-gray-600 font-serif">Confirma tu asistencia y vive este día especial conmigo</motion.p>
          <motion.a
            {...piece(fromBottom)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(RSVP_MESSAGE)}`}
            onClick={stopMusic}
            target="_blank"
            rel="noreferrer"
            className="mt-1 bg-[#b695c0] text-white text-sm sm:text-base tracking-wider uppercase px-8 py-3 rounded-full shadow-lg hover:bg-[#81638b] transition-colors"
          >
            Confirmar por WhatsApp 💬
          </motion.a>
        </section>

      </div>

      {/* FLORES INFERIORES (en capa z-10 para no tapar texto) */}
      <motion.img initial={{ opacity: 0, y: 12 }} animate={{ opacity: 0, y: 12 }} whileInView={{ opacity: 0.85, y: 0 }} viewport={{ once: false, amount: 0.2 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} src={inferiorIzquierdo} alt="" loading="lazy" decoding="async" className="absolute bottom-0 left-0 w-28 sm:w-36 lg:w-44 pointer-events-none z-10" />
      <motion.img initial={{ opacity: 0, y: 12 }} animate={{ opacity: 0, y: 12 }} whileInView={{ opacity: 0.85, y: 0 }} viewport={{ once: false, amount: 0.2 }} transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }} src={inferiorDerecho} alt="" loading="lazy" decoding="async" className="absolute bottom-0 right-0 w-28 sm:w-36 lg:w-44 pointer-events-none z-10" />
    </div>
  );
}

export default App;
