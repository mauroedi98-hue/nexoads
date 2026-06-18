import { useState, useEffect, useRef } from "react";

const BRAND = "NexoAds";
const PRODUCT = "Sistema 3 en 1 para pauta";
const CTA_LINK = "#precio";
const CTA_TEXT = "Generar mis primeros 100 creativos";
const PRICE = "$49.99";
const CUPOS = 7;

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimatedSection({ children, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function NavBar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "producto", label: "Producto" },
    { id: "ejemplos", label: "Ejemplos" },
    { id: "precio", label: "Precio" },
    { id: "faq", label: "FAQ" },
  ];

  const handleNav = (id) => {
    setActive(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(5,5,10,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
        transition: "all 0.3s ease",
        padding: "0 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
            fontSize: 26,
            letterSpacing: 3,
            color: "#f8fafc",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span style={{ color: "#00d4ff" }}>◈</span>
          {BRAND}
        </div>

        {/* Desktop Links */}
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
          className="desktop-nav"
        >
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => handleNav(l.id)}
              style={{
                background: "none",
                border: "none",
                color: active === l.id ? "#00d4ff" : "rgba(248,250,252,0.7)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                fontWeight: 500,
                cursor: "pointer",
                padding: "8px 14px",
                borderRadius: 8,
                transition: "color 0.2s, background 0.2s",
                letterSpacing: 0.3,
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#00d4ff";
                e.target.style.background = "rgba(0,212,255,0.07)";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = active === l.id ? "#00d4ff" : "rgba(248,250,252,0.7)";
                e.target.style.background = "none";
              }}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("precio")}
            style={{
              background: "linear-gradient(135deg, #00d4ff, #7B2FFF)",
              border: "none",
              color: "#fff",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              padding: "9px 20px",
              borderRadius: 8,
              cursor: "pointer",
              marginLeft: 8,
              letterSpacing: 0.5,
              transition: "opacity 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = "0.85";
              e.target.style.transform = "scale(1.04)";
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = "1";
              e.target.style.transform = "scale(1)";
            }}
          >
            Acceder
          </button>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "#f8fafc",
            fontSize: 26,
            cursor: "pointer",
            padding: 4,
          }}
          className="hamburger"
          aria-label="Menú"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(5,5,10,0.98)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            padding: "12px 24px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => handleNav(l.id)}
              style={{
                background: "none",
                border: "none",
                color: active === l.id ? "#00d4ff" : "rgba(248,250,252,0.8)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16,
                fontWeight: 500,
                cursor: "pointer",
                padding: "12px 0",
                textAlign: "left",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("precio")}
            style={{
              background: "linear-gradient(135deg, #00d4ff, #7B2FFF)",
              border: "none",
              color: "#fff",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              padding: "12px",
              borderRadius: 8,
              cursor: "pointer",
              marginTop: 8,
            }}
          >
            Acceder
          </button>
        </div>
      )}
    </nav>
  );
}

function HeroBadge() {
  const [count, setCount] = useState(CUPOS);
  useEffect(() => {
    const int = setInterval(() => {
      setCount((c) => (c > 1 ? c - 1 : c));
    }, 45000);
    return () => clearInterval(int);
  }, []);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: "rgba(255,58,58,0.12)",
        border: "1px solid rgba(255,58,58,0.35)",
        borderRadius: 100,
        padding: "6px 16px",
        marginBottom: 24,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#ff3a3a",
          display: "inline-block",
          animation: "pulse 1.5s infinite",
        }}
      />
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          fontWeight: 600,
          color: "#ff6b6b",
          letterSpacing: 0.5,
        }}
      >
        ⚡ Quedan solo {count} cupos — Oferta de lanzamiento
      </span>
    </div>
  );
}

function GlowButton({ children, onClick, style = {}, large = false }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover
          ? "linear-gradient(135deg, #00e5ff, #8b3fff)"
          : "linear-gradient(135deg, #00d4ff, #7B2FFF)",
        border: "none",
        color: "#fff",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 700,
        fontSize: large ? 18 : 16,
        padding: large ? "18px 44px" : "14px 32px",
        borderRadius: 10,
        cursor: "pointer",
        letterSpacing: 0.4,
        transform: hover ? "scale(1.04)" : "scale(1)",
        boxShadow: hover
          ? "0 0 40px rgba(0,212,255,0.45), 0 0 80px rgba(123,47,255,0.2)"
          : "0 0 20px rgba(0,212,255,0.2)",
        transition: "all 0.25s ease",
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function FeatureCard({ icon, title, desc }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
        border: hover ? "1px solid rgba(0,212,255,0.3)" : "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: "28px 24px",
        transition: "all 0.3s ease",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        cursor: "default",
      }}
    >
      <div
        style={{
          fontSize: 36,
          marginBottom: 16,
          display: "block",
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700,
          fontSize: 18,
          color: "#f8fafc",
          marginBottom: 10,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 15,
          color: "rgba(248,250,252,0.6)",
          lineHeight: 1.6,
        }}
      >
        {desc}
      </p>
    </div>
  );
}

function StatCard({ value, label, color = "#00d4ff" }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "24px 16px",
        background: "rgba(255,255,255,0.03)",
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        style={{
          fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
          fontSize: 48,
          color,
          letterSpacing: 2,
          lineHeight: 1,
          marginBottom: 8,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          color: "rgba(248,250,252,0.55)",
          letterSpacing: 0.5,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function ExampleCard({ title, tag, color, mockIcon }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: hover ? `1px solid ${color}55` : "1px solid rgba(255,255,255,0.07)",
        borderRadius: 14,
        overflow: "hidden",
        transition: "all 0.3s ease",
        transform: hover ? "scale(1.02)" : "scale(1)",
        cursor: "pointer",
      }}
    >
      {/* Mock creative preview */}
      <div
        style={{
          height: 180,
          background: `linear-gradient(135deg, ${color}22, ${color}08)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 56,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 50% 50%, ${color}15, transparent 70%)`,
          }}
        />
        {mockIcon}
        {/* TODO: Reemplazar con capturas reales de los creativos */}
      </div>
      <div style={{ padding: "16px 18px" }}>
        <div
          style={{
            display: "inline-block",
            background: `${color}22`,
            color,
            fontSize: 11,
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: 100,
            marginBottom: 8,
            letterSpacing: 0.8,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {tag}
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: 15,
            color: "#f8fafc",
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
}

function PriceCard() {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover
          ? "rgba(0,212,255,0.06)"
          : "rgba(255,255,255,0.03)",
        border: "1px solid rgba(0,212,255,0.3)",
        borderRadius: 20,
        padding: "40px 36px",
        maxWidth: 460,
        margin: "0 auto",
        transition: "all 0.3s ease",
        boxShadow: hover
          ? "0 0 60px rgba(0,212,255,0.12)"
          : "0 0 30px rgba(0,212,255,0.05)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow decoration */}
      <div
        style={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(123,47,255,0.15), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(240,180,41,0.15)",
          border: "1px solid rgba(240,180,41,0.4)",
          borderRadius: 100,
          padding: "5px 14px",
          marginBottom: 24,
        }}
      >
        <span style={{ fontSize: 12 }}>⭐</span>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            fontWeight: 700,
            color: "#f0b429",
            letterSpacing: 0.8,
          }}
        >
          OFERTA DE LANZAMIENTO
        </span>
      </div>

      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 15,
          color: "rgba(248,250,252,0.5)",
          marginBottom: 8,
          textDecoration: "line-through",
        }}
      >
        $99.99/mes
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 8,
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
            fontSize: 64,
            color: "#f8fafc",
            lineHeight: 1,
            letterSpacing: 2,
          }}
        >
          {PRICE}
        </span>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            color: "rgba(248,250,252,0.5)",
            marginBottom: 10,
          }}
        >
          /mes
        </span>
      </div>

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(0,170,0,0.12)",
          border: "1px solid rgba(0,170,0,0.3)",
          borderRadius: 100,
          padding: "5px 14px",
          marginBottom: 28,
        }}
      >
        <span style={{ fontSize: 12 }}>🔒</span>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            fontWeight: 700,
            color: "#00aa00",
            letterSpacing: 0.5,
          }}
        >
          ACCESO VITALICIO — Solo primeras 100 personas
        </span>
      </div>

      {/* Features list */}
      <div style={{ marginBottom: 32 }}>
        {[
          "✅ Imágenes de alta conversión (ilimitadas)",
          "✅ Videos para Meta Ads optimizados",
          "✅ Landings pages que venden",
          "✅ Sistema 3 en 1 integrado",
          "✅ Actualizaciones incluidas",
          "✅ Soporte prioritario",
        ].map((item, i) => (
          <div
            key={i}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              color: "rgba(248,250,252,0.85)",
              padding: "8px 0",
              borderBottom: i < 5 ? "1px solid rgba(255,255,255,0.05)" : "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {item}
          </div>
        ))}
      </div>

      <GlowButton
        large
        onClick={() => {
          /* TODO: Conectar con link de pago real */
          alert("Redirigiendo al checkout...");
        }}
        style={{ width: "100%", justifyContent: "center" }}
      >
        {CTA_TEXT} →
      </GlowButton>

      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12,
          color: "rgba(248,250,252,0.35)",
          textAlign: "center",
          marginTop: 14,
        }}
      >
        🔒 Pago seguro · Cancela cuando quieras
      </p>
    </div>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: "none",
          border: "none",
          width: "100%",
          textAlign: "left",
          padding: "20px 0",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: 16,
            color: "#f8fafc",
          }}
        >
          {q}
        </span>
        <span
          style={{
            color: "#00d4ff",
            fontSize: 20,
            transform: open ? "rotate(45deg)" : "rotate(0)",
            transition: "transform 0.3s ease",
            flexShrink: 0,
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? 300 : 0,
          overflow: "hidden",
          transition: "max-height 0.35s ease",
        }}
      >
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            color: "rgba(248,250,252,0.62)",
            lineHeight: 1.7,
            paddingBottom: 20,
          }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("producto");

  useEffect(() => {
    const sections = ["producto", "ejemplos", "precio", "faq"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const features = [
    {
      icon: "🎨",
      title: "Imágenes de Alta Conversión",
      desc: "Creativos visuales diseñados con psicología de conversión para capturar atención en el feed de Meta Ads en menos de 2 segundos.",
    },
    {
      icon: "🎬",
      title: "Videos que Venden",
      desc: "Videos cortos y directos optimizados para Facebook e Instagram Ads. Formatos Reels, Stories y Feed listos para lanzar.",
    },
    {
      icon: "🚀",
      title: "Landing Pages que Convierten",
      desc: "Páginas de destino con estructura probada: hook, beneficios, prueba social y CTA. Cero fricción, máxima conversión.",
    },
  ];

  const examples = [
    { title: "Creativo para e-commerce de moda", tag: "IMAGEN", color: "#00d4ff", mockIcon: "👗" },
    { title: "Video ad para curso online", tag: "VIDEO", color: "#7B2FFF", mockIcon: "🎓" },
    { title: "Landing para servicio local", tag: "LANDING", color: "#f0b429", mockIcon: "📍" },
    { title: "Carrusel para producto físico", tag: "IMAGEN", color: "#00d4ff", mockIcon: "📦" },
    { title: "Story ad para infoproducto", tag: "VIDEO", color: "#7B2FFF", mockIcon: "💡" },
    { title: "Landing para consultoría", tag: "LANDING", color: "#f0b429", mockIcon: "🤝" },
  ];

  const faqs = [
    {
      q: "¿Qué incluye el Sistema 3 en 1?",
      a: "Incluye acceso completo a plantillas y generación de imágenes de alta conversión, videos optimizados para Meta Ads y landing pages con estructura probada. Todo integrado en una sola plataforma para que puedas lanzar campañas completas sin depender de diseñadores ni desarrolladores.",
    },
    {
      q: "¿Funciona para cualquier tipo de negocio?",
      a: "Sí. El sistema fue diseñado para funcionar con e-commerce, servicios, infoproductos, negocios locales y agencias. Los formatos y estructuras están validados en decenas de industrias diferentes.",
    },
    {
      q: "¿Necesito saber de diseño o programación?",
      a: "Para nada. El sistema está hecho para que cualquier persona pueda generar creativos profesionales en minutos, sin conocimientos técnicos previos. Interfaz simple, resultados profesionales.",
    },
    {
      q: "¿Qué significa acceso vitalicio?",
      a: "Pagas una sola vez y tienes acceso permanente a la plataforma, incluyendo todas las actualizaciones futuras. Sin sorpresas ni pagos ocultos. Es una oferta exclusiva de lanzamiento para las primeras 100 personas.",
    },
    {
      q: "¿Puedo cancelar en cualquier momento?",
      a: "Absolutamente. No hay contratos ni compromisos de permanencia. Si en algún momento decides cancelar, lo puedes hacer desde tu panel en menos de un minuto.",
    },
    {
      q: "¿Cuándo puedo empezar a usar el sistema?",
      a: "Inmediatamente después de completar tu registro tendrás acceso total a la plataforma. Sin esperas, sin onboarding complicado. En menos de 10 minutos ya puedes estar generando tus primeros creativos.",
    },
  ];

  return (
    <div
      style={{
        background: "#05050a",
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
        color: "#f8fafc",
        overflowX: "hidden",
      }}
    >
      {/* Global styles via style tag */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        .desktop-nav { display: flex !important; }
        .hamburger { display: none !important; }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
          .hero-title { font-size: 52px !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .examples-grid { grid-template-columns: 1fr 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .hero-title { font-size: 40px !important; }
          .examples-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #05050a; }
        ::-webkit-scrollbar-thumb { background: rgba(0,212,255,0.3); border-radius: 3px; }
      `}</style>

      <NavBar active={activeSection} setActive={setActiveSection} />

      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "100px 24px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glows */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 400,
            background:
              "radial-gradient(ellipse at center, rgba(0,212,255,0.08) 0%, rgba(123,47,255,0.06) 40%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            left: "10%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(123,47,255,0.07), transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            pointerEvents: "none",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          }}
        />

        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          <HeroBadge />

          <h1
            className="hero-title"
            style={{
              fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
              fontSize: 72,
              lineHeight: 1.0,
              letterSpacing: 3,
              color: "#f8fafc",
              marginBottom: 24,
              background: "linear-gradient(135deg, #f8fafc 30%, rgba(248,250,252,0.7) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            DEJA DE PERDER DINERO
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #00d4ff, #7B2FFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              EN ADS QUE NO CONVIERTEN
            </span>
          </h1>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 19,
              color: "rgba(248,250,252,0.65)",
              lineHeight: 1.7,
              maxWidth: 600,
              margin: "0 auto 16px",
            }}
          >
            Imágenes, Videos y Landings de alta conversión generados en minutos.
            El{" "}
            <strong style={{ color: "#f8fafc" }}>{PRODUCT}</strong>{" "}
            que convierte clics en clientes reales.
          </p>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              color: "rgba(248,250,252,0.4)",
              marginBottom: 40,
            }}
          >
            Sin diseñadores · Sin código · Sin excusas
          </p>

          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 56,
            }}
          >
            <GlowButton
              large
              onClick={() =>
                document.getElementById("precio")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              ⚡ {CTA_TEXT}
            </GlowButton>
            <button
              onClick={() =>
                document.getElementById("ejemplos")?.scrollIntoView({ behavior: "smooth" })
              }
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(248,250,252,0.8)",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: 16,
                padding: "18px 32px",
                borderRadius: 10,
                cursor: "pointer",
                transition: "all 0.25s",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255,255,255,0.09)";
                e.target.style.borderColor = "rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255,255,255,0.05)";
                e.target.style.borderColor = "rgba(255,255,255,0.12)";
              }}
            >
              Ver ejemplos →
            </button>
          </div>

          {/* Social proof strip */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", gap: -8 }}>
              {["👤", "👤", "👤", "👤", "👤"].map((u, i) => (
                <div
                  key={i}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: `hsl(${200 + i * 30}, 70%, 30%)`,
                    border: "2px solid #05050a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    marginLeft: i > 0 ? -8 : 0,
                  }}
                >
                  {u}
                </div>
              ))}
            </div>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: "rgba(248,250,252,0.5)",
              }}
            >
              +93 anunciantes ya usan {BRAND}
            </span>
            <span style={{ color: "#f0b429", fontSize: 13 }}>★★★★★</span>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section
        style={{
          padding: "60px 24px",
          background: "rgba(255,255,255,0.015)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <AnimatedSection>
          <div
            className="stats-grid"
            style={{
              maxWidth: 900,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16,
            }}
          >
            <StatCard value="3X" label="Más conversiones promedio" color="#00d4ff" />
            <StatCard value="+100" label="Creativos en minutos" color="#7B2FFF" />
            <StatCard value="93+" label="Anunciantes activos" color="#f0b429" />
            <StatCard value="7" label="Cupos disponibles" color="#ff3a3a" />
          </div>
        </AnimatedSection>
      </section>

      {/* ── PRODUCTO ── */}
      <section id="producto" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(0,212,255,0.08)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  borderRadius: 100,
                  padding: "6px 18px",
                  marginBottom: 20,
                }}
              >
                <span style={{ fontSize: 12, color: "#00d4ff", fontWeight: 700, letterSpacing: 1 }}>
                  ◈ EL SISTEMA
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
                  fontSize: 52,
                  letterSpacing: 3,
                  color: "#f8fafc",
                  marginBottom: 16,
                }}
              >
                {PRODUCT.toUpperCase()}
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 18,
                  color: "rgba(248,250,252,0.6)",
                  maxWidth: 560,
                  margin: "0 auto",
                  lineHeight: 1.7,
                }}
              >
                Todo lo que necesitas para crear campañas de Meta Ads que realmente
                generan resultados, integrado en un solo lugar.
              </p>
            </div>
          </AnimatedSection>

          <div
            className="features-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
              marginBottom: 80,
            }}
          >
            {features.map((f, i) => (
              <AnimatedSection key={i} style={{ transitionDelay: `${i * 0.12}s` }}>
                <FeatureCard {...f} />
              </AnimatedSection>
            ))}
          </div>

          {/* How it works */}
          <AnimatedSection>
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 20,
                padding: "48px 40px",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
                  fontSize: 36,
                  letterSpacing: 2,
                  color: "#f8fafc",
                  textAlign: "center",
                  marginBottom: 48,
                }}
              >
                CÓMO FUNCIONA
              </h3>
              <div
                className="hero-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 32,
                  position: "relative",
                }}
              >
                {[
                  {
                    step: "01",
                    title: "Describe tu oferta",
                    desc: "Ingresa los detalles de tu producto o servicio. El sistema entiende tu mercado y objetivo.",
                    color: "#00d4ff",
                  },
                  {
                    step: "02",
                    title: "Genera tus creativos",
                    desc: "En segundos obtienes imágenes, videos y landing pages listos para publicar en Meta Ads.",
                    color: "#7B2FFF",
                  },
                  {
                    step: "03",
                    title: "Publica y convierte",
                    desc: "Lanza tus campañas con creativos optimizados para maximizar el ROAS desde el primer día.",
                    color: "#f0b429",
                  },
                ].map((item, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
                        fontSize: 64,
                        color: item.color,
                        opacity: 0.3,
                        lineHeight: 1,
                        marginBottom: 12,
                        letterSpacing: 4,
                      }}
                    >
                      {item.step}
                    </div>
                    <h4
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 700,
                        fontSize: 17,
                        color: "#f8fafc",
                        marginBottom: 10,
                      }}
                    >
                      {item.title}
                    </h4>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 14,
                        color: "rgba(248,250,252,0.55)",
                        lineHeight: 1.6,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── EJEMPLOS ── */}
      <section
        id="ejemplos"
        style={{
          padding: "100px 24px",
          background: "rgba(255,255,255,0.015)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(123,47,255,0.1)",
                  border: "1px solid rgba(123,47,255,0.25)",
                  borderRadius: 100,
                  padding: "6px 18px",
                  marginBottom: 20,
                }}
              >
                <span style={{ fontSize: 12, color: "#7B2FFF", fontWeight: 700, letterSpacing: 1 }}>
                  ◈ EJEMPLOS REALES
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
                  fontSize: 52,
                  letterSpacing: 3,
                  color: "#f8fafc",
                  marginBottom: 16,
                }}
              >
                CREATIVOS QUE CONVIERTEN
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 17,
                  color: "rgba(248,250,252,0.55)",
                  maxWidth: 520,
                  margin: "0 auto",
                }}
              >
                Muestras de los 3 tipos de creativos generados por el sistema.
                {/* TODO: Reemplazar con capturas y videos reales de la plataforma */}
              </p>
            </div>
          </AnimatedSection>

          <div
            className="examples-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
              marginBottom: 48,
            }}
          >
            {examples.map((ex, i) => (
              <AnimatedSection key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <ExampleCard {...ex} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div style={{ textAlign: "center" }}>
              <GlowButton
                onClick={() =>
                  document.getElementById("precio")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                ⚡ Quiero generar los míos →
              </GlowButton>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── PRECIO ── */}
      <section id="precio" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(240,180,41,0.1)",
                  border: "1px solid rgba(240,180,41,0.25)",
                  borderRadius: 100,
                  padding: "6px 18px",
                  marginBottom: 20,
                }}
              >
                <span style={{ fontSize: 12, color: "#f0b429", fontWeight: 700, letterSpacing: 1 }}>
                  ◈ PRECIO
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
                  fontSize: 52,
                  letterSpacing: 3,
                  color: "#f8fafc",
                  marginBottom: 16,
                }}
              >
                ACCEDE HOY
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 17,
                  color: "rgba(248,250,252,0.55)",
                  maxWidth: 480,
                  margin: "0 auto",
                }}
              >
                Precio especial de lanzamiento para las primeras 100 personas.
                Quedan solo{" "}
                <strong style={{ color: "#ff3a3a" }}>{CUPOS} cupos</strong>.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <PriceCard />
          </AnimatedSection>

          {/* Guarantee */}
          <AnimatedSection>
            <div
              style={{
                textAlign: "center",
                marginTop: 48,
                padding: "32px",
                background: "rgba(0,170,0,0.05)",
                border: "1px solid rgba(0,170,0,0.15)",
                borderRadius: 16,
                maxWidth: 560,
                margin: "48px auto 0",
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>🛡️</div>
              <h4
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  color: "#f8fafc",
                  marginBottom: 10,
                }}
              >
                Garantía de satisfacción
              </h4>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  color: "rgba(248,250,252,0.6)",
                  lineHeight: 1.6,
                }}
              >
                Si en los primeros 7 días no estás satisfecho con los resultados,
                te devolvemos el 100% de tu inversión. Sin preguntas.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        id="faq"
        style={{
          padding: "100px 24px",
          background: "rgba(255,255,255,0.015)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(0,212,255,0.08)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  borderRadius: 100,
                  padding: "6px 18px",
                  marginBottom: 20,
                }}
              >
                <span style={{ fontSize: 12, color: "#00d4ff", fontWeight: 700, letterSpacing: 1 }}>
                  ◈ PREGUNTAS FRECUENTES
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
                  fontSize: 52,
                  letterSpacing: 3,
                  color: "#f8fafc",
                }}
              >
                FAQ
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div>
              {faqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div style={{ textAlign: "center", marginTop: 56 }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 16,
                  color: "rgba(248,250,252,0.5)",
                  marginBottom: 20,
                }}
              >
                ¿Tienes más preguntas?
              </p>
              <a
                href="mailto:soporte@nexoads.com"
                style={{
                  color: "#00d4ff",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 16,
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(0,212,255,0.3)",
                  paddingBottom: 2,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
              >
                {/* TODO: Reemplazar con email real de soporte */}
                soporte@nexoads.com
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section
        style={{
          padding: "100px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, rgba(0,212,255,0.08) 0%, rgba(123,47,255,0.06) 40%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <AnimatedSection>
          <div
            style={{
              maxWidth: 700,
              margin: "0 auto",
              textAlign: "center",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,58,58,0.1)",
                border: "1px solid rgba(255,58,58,0.3)",
                borderRadius: 100,
                padding: "6px 18px",
                marginBottom: 28,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#ff3a3a",
                  display: "inline-block",
                  animation: "pulse 1.5s infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#ff6b6b",
                  letterSpacing: 0.5,
                }}
              >
                ⚡ Solo quedan {CUPOS} cupos al precio de lanzamiento
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
                fontSize: 56,
                letterSpacing: 3,
                color: "#f8fafc",
                marginBottom: 20,
                lineHeight: 1.05,
              }}
            >
              ¿LISTO PARA CREAR ADS QUE
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #00d4ff, #7B2FFF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                SÍ CONVIERTEN?
              </span>
            </h2>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 17,
                color: "rgba(248,250,252,0.6)",
                marginBottom: 40,
                lineHeight: 1.7,
              }}
            >
              Únete a los {93} anunciantes que ya generan creativos de alta conversión
              con {BRAND}. Accede hoy al precio especial.
            </p>

            <GlowButton
              large
              onClick={() =>
                document.getElementById("precio")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              ⚡ {CTA_TEXT}
            </GlowButton>
          </div>
        </AnimatedSection>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          padding: "40px 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
            fontSize: 22,
            letterSpacing: 3,
            color: "#f8fafc",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <span style={{ color: "#00d4ff" }}>◈</span>
          {BRAND}
        </div>
        <div
          style={{
            display: "flex",
            gap: 24,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 20,
          }}
        >
          {["Términos de servicio", "Política de privacidad", "Soporte"].map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: "rgba(248,250,252,0.4)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#00d4ff")}
              onMouseLeave={(e) => (e.target.style.color = "rgba(248,250,252,0.4)")}
            >
              {/* TODO: Agregar links reales de páginas legales */}
              {link}
            </a>
          ))}
        </div>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: "rgba(248,250,252,0.2)",
          }}
        >
          © 2024 {BRAND}. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}