import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./index.css";

gsap.registerPlugin(ScrollTrigger);

const cenas = [
  { img: "/cena1.jpg", titulo: "Gelada. No tempo certo.", desc: "Bebidas, gelo e combos com entrega rápida." },
  { img: "/cena2.jpg", titulo: "Direto para sua resenha.", desc: "Tudo pronto para o seu brinde." },
  { img: "/cena3.jpg", titulo: "O som da experiência.", desc: "A abertura perfeita para qualquer momento." },
  { img: "/cena4.jpg", titulo: "Sirva. Brinde. Celebre.", desc: "Cervejas e combos na temperatura ideal." },
  { img: "/cena5.jpg", titulo: "O copo vai enchendo.", desc: "Sua festa começa no primeiro pedido." },
  { img: "/cena6.jpg", titulo: "Whisky premium.", desc: "Para quem quer elevar a noite." },
];

export default function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const imagens = gsap.utils.toArray(".cinematic-img");
      const cards = gsap.utils.toArray(".cinematic-card");

      gsap.set(imagens, { opacity: 0, scale: 1.08 });
      gsap.set(cards, { opacity: 0, y: 40 });

      gsap.set(imagens[0], { opacity: 1, scale: 1 });
      gsap.set(cards[0], { opacity: 1, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".cinematic",
          start: "top top",
          end: `+=${cenas.length * 900}`,
          scrub: 1.4,
          pin: true,
        },
      });

      cenas.forEach((_, index) => {
        if (index === 0) return;

        tl.to(imagens[index - 1], { opacity: 0, scale: 1.12, duration: 1 }, index);
        tl.to(cards[index - 1], { opacity: 0, y: -40, duration: 0.7 }, index);

        tl.to(imagens[index], { opacity: 1, scale: 1, duration: 1 }, index);
        tl.to(cards[index], { opacity: 1, y: 0, duration: 0.7 }, index + 0.15);
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

 return (
  <main ref={containerRef}>
    <header className="topbar">
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
  <img
    src="/logo.png"
    alt="Depósito Premium"
    style={{
      width: "42px",
      height: "42px",
      borderRadius: "50%"
    }}
  />
  <strong>Depósito Premium</strong>
</div>
      <a href="https://wa.me/5522988211079" target="_blank">
        Pedir agora
      </a>
    </header>

    <section className="cinematic">
      {cenas.map((cena, index) => (
        <img
          key={index}
          src={cena.img}
          className="cinematic-img"
          alt={cena.titulo}
        />
      ))}

      <div className="overlay" />

      {cenas.map((cena, index) => (
        <div key={index} className="content-card cinematic-card">
          <span>0{index + 1}</span>
          <h1>{cena.titulo}</h1>
          <p>{cena.desc}</p>

          {index === cenas.length - 1 && (
            <a
              className="cta"
              href="https://wa.me/5522988211079"
              target="_blank"
            >
              Fazer pedido no WhatsApp
            </a>
          )}
        </div>
      ))}
    </section>

    <section className="products-section">
      <h2>Nossas Marcas</h2>

      <div className="products-grid">
        {[
          {
             img: "/heineken.jpg",
    nome: "Heineken",
    desc: "Cerveja puro malte premium, reconhecida mundialmente pelo sabor equilibrado e refrescante."
          },
          {
            img: "/brahma.jpg",
            nome: "Brahma",
            desc: "Cerveja leve, refrescante e perfeita para churrascos, festas e resenhas.",
          },
          {
            img: "/antarctica.jpg",
            nome: "Antarctica",
            desc: "Tradição brasileira com sabor suave e refrescante para qualquer ocasião.",
          },
          {
            img: "/chivas.jpg",
            nome: "Chivas Regal",
            desc: "Whisky escocês premium, sofisticado e marcante.",
          },
          {
            img: "/redlabel.jpg",
            nome: "Red Label",
            desc: "Whisky intenso e versátil, ideal para drinks e momentos especiais.",
          },
          {
            img: "/buchanans.jpg",
            nome: "Buchanan's",
            desc: "Whisky elegante, reconhecido pelo sabor equilibrado e presença premium.",
          },
        ].map((produto, index) => (
          <div className="product-card" key={index}>
            <img src={produto.img} alt={produto.nome} />

            <div>
              <h3>{produto.nome}</h3>
              <p>{produto.desc}</p>
              <a href="https://wa.me/5522988211079" target="_blank">
                Pedir agora →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>

    <a
      className="whatsapp"
      href="https://wa.me/5522988211079"
      target="_blank"
    >
      WhatsApp
    </a>
  </main>
);
}