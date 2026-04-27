import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const PLANT_IMAGE = "https://cdn.poehali.dev/projects/320f395e-a930-4be3-a7e2-938ea802f0dc/files/45723698-daa6-4582-b4d4-c4a88208f09b.jpg";

const plants = [
  { id: 1, name: "Монстера Делициоза", type: "tropical", size: "large", price: 3200, light: "indirect", water: "medium", img: PLANT_IMAGE, tag: "ХИТ" },
  { id: 2, name: "Фикус Лировидный", type: "tropical", size: "large", price: 4500, light: "bright", water: "medium", img: PLANT_IMAGE, tag: "НОВИНКА" },
  { id: 3, name: "Сансевиерия", type: "succulent", size: "small", price: 890, light: "low", water: "rare", img: PLANT_IMAGE, tag: null },
  { id: 4, name: "Калатея Орбифолия", type: "tropical", size: "medium", price: 2100, light: "indirect", water: "frequent", img: PLANT_IMAGE, tag: null },
  { id: 5, name: "Замиокулькас", type: "succulent", size: "medium", price: 1800, light: "low", water: "rare", img: PLANT_IMAGE, tag: "ХИТ" },
  { id: 6, name: "Пальма Арека", type: "palm", size: "large", price: 5900, light: "bright", water: "medium", img: PLANT_IMAGE, tag: "НОВИНКА" },
  { id: 7, name: "Хойя Карноза", type: "hanging", size: "small", price: 1200, light: "indirect", water: "medium", img: PLANT_IMAGE, tag: null },
  { id: 8, name: "Кактус Сагуаро", type: "succulent", size: "small", price: 650, light: "bright", water: "rare", img: PLANT_IMAGE, tag: null },
];

const reviews = [
  { id: 1, name: "Анастасия К.", rating: 5, text: "Монстера пришла огромная и здоровая! Упаковка супер — ни один листочек не пострадал. Буду заказывать ещё!", avatar: "А" },
  { id: 2, name: "Игорь М.", rating: 5, text: "Заказал три растения сразу. Все в идеальном состоянии, корни крепкие. Консультант помог выбрать под мой подоконник.", avatar: "И" },
  { id: 3, name: "Светлана Р.", rating: 5, text: "Фикус стоит уже 2 месяца и растёт как на дрожжах. Очень довольна качеством! Магазин стал моим любимым.", avatar: "С" },
  { id: 4, name: "Дмитрий Л.", rating: 4, text: "Хороший выбор, быстрая доставка. Сансевиерия отлично прижилась в офисе — коллеги в восторге.", avatar: "Д" },
];

const typeLabels: Record<string, string> = {
  all: "Все", tropical: "Тропические", succulent: "Суккуленты", palm: "Пальмы", hanging: "Ампельные"
};
const sizeLabels: Record<string, string> = {
  all: "Все", small: "Маленькие", medium: "Средние", large: "Крупные"
};
const lightLabels: Record<string, string> = {
  all: "Все", bright: "Яркий свет", indirect: "Рассеянный", low: "Тень"
};
const waterLabels: Record<string, string> = {
  all: "Все", frequent: "Частый", medium: "Умеренный", rare: "Редкий"
};

const navLinks = [
  { id: "home", label: "Главная" },
  { id: "catalog", label: "Каталог" },
  { id: "reviews", label: "Отзывы" },
  { id: "contacts", label: "Контакты" },
];

const marqueeTags = ["🌿 Монстеры", "🌵 Суккуленты", "🌴 Пальмы", "🌸 Цветущие", "☀️ Светолюбивые", "🌑 Теневыносливые", "💧 Влагостойкие", "🏠 Для дома", "🏢 Для офиса"];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [filterType, setFilterType] = useState("all");
  const [filterSize, setFilterSize] = useState("all");
  const [filterLight, setFilterLight] = useState("all");
  const [filterWater, setFilterWater] = useState("all");
  const [priceMax, setPriceMax] = useState(6000);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) setVisible(v => ({ ...v, [e.target.id]: true }));
      }),
      { threshold: 0.1 }
    );
    Object.values(refs.current).forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const setRef = (id: string) => (el: HTMLElement | null) => { refs.current[id] = el; };

  const filtered = plants.filter(p =>
    (filterType === "all" || p.type === filterType) &&
    (filterSize === "all" || p.size === filterSize) &&
    (filterLight === "all" || p.light === filterLight) &&
    (filterWater === "all" || p.water === filterWater) &&
    p.price <= priceMax
  );

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#f7f7f2] font-body text-[#1a2010] overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{ background: "rgba(247,247,242,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(163,230,53,0.1)" }}>
        <button onClick={() => scrollTo("home")} className="font-display text-2xl font-bold tracking-widest neon-text neon-text-glow">
          FLORA
        </button>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)}
              className={`font-display text-sm tracking-widest uppercase transition-all duration-300 ${activeSection === l.id ? "neon-text neon-text-glow" : "text-[#1a2010]/60 hover:text-[#1a2010]"}`}>
              {l.label}
            </button>
          ))}
        </div>
        <button className="hidden md:flex items-center gap-2 px-5 py-2 font-display text-sm tracking-widest uppercase neon-bg text-black font-semibold rounded-full transition-all duration-300 hover:opacity-90 hover:scale-105 neon-glow">
          Заказать
        </button>
        <button className="md:hidden neon-text" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8" style={{ background: "rgba(247,247,242,0.98)", backdropFilter: "blur(20px)" }}>
          {navLinks.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)}
              className="font-display text-3xl tracking-widest uppercase neon-text neon-text-glow">
              {l.label}
            </button>
          ))}
          <button className="mt-4 px-8 py-3 neon-bg text-black font-display font-bold text-lg tracking-widest rounded-full neon-glow">
            Заказать
          </button>
        </div>
      )}

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #a3e635 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-5"
            style={{ background: "radial-gradient(circle, #a3e635 0%, transparent 70%)" }} />
          <div className="absolute inset-0" style={{
            backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.01) 0px, rgba(255,255,255,0.01) 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, rgba(255,255,255,0.01) 0px, rgba(255,255,255,0.01) 1px, transparent 1px, transparent 60px)"
          }} />
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 md:gap-0">
          <div className="flex-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 font-body text-xs tracking-widest uppercase neon-text"
              style={{ border: "1px solid rgba(163,230,53,0.3)", background: "rgba(163,230,53,0.08)" }}>
              <span className="w-1.5 h-1.5 rounded-full neon-bg animate-pulse" />
              Живые растения с доставкой
            </div>
            <h1 className="font-display text-6xl md:text-8xl font-bold leading-none tracking-tight mb-6 animate-fade-up"
              style={{ animationFillMode: "forwards" }}>
              ЖИВАЯ<br />
              <span className="neon-text neon-text-glow">ПРИРОДА</span><br />
              В ТВОЁМ<br />ДОМЕ
            </h1>
            <p className="text-[#1a2010]/50 font-body text-lg leading-relaxed mb-8 max-w-md animate-fade-up delay-200"
              style={{ animationFillMode: "forwards" }}>
              Отборные растения из питомников. Упаковка гарантирует сохранность при доставке.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-400" style={{ animationFillMode: "forwards" }}>
              <button onClick={() => scrollTo("catalog")}
                className="px-8 py-4 neon-bg text-black font-display font-bold text-lg tracking-widest uppercase rounded-full transition-all duration-300 hover:opacity-90 hover:scale-105 neon-glow">
                Смотреть каталог
              </button>
              <button onClick={() => scrollTo("contacts")}
                className="px-8 py-4 font-display font-bold text-lg tracking-widest uppercase rounded-full transition-all duration-300 hover:bg-black/10"
                style={{ border: "1px solid rgba(0,0,0,0.15)", color: "#1a2010" }}>
                Связаться с нами
              </button>
            </div>
            <div className="flex items-center gap-8 mt-12 animate-fade-up delay-600" style={{ animationFillMode: "forwards" }}>
              {[["500+", "Видов растений"], ["24ч", "Доставка"], ["98%", "Довольных клиентов"]].map(([val, label]) => (
                <div key={val}>
                  <div className="font-display text-2xl font-bold neon-text">{val}</div>
                  <div className="text-[#1a2010]/40 text-xs font-body">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex justify-center md:justify-end relative">
            <div className="relative w-72 h-72 md:w-96 md:h-96 animate-fade-in delay-300" style={{ animationFillMode: "forwards" }}>
              <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(163,230,53,0.15) 0%, transparent 70%)" }} />
              <img src={PLANT_IMAGE} alt="Растение" className="w-full h-full object-cover rounded-3xl"
                style={{ border: "1px solid rgba(163,230,53,0.2)" }} />
              <div className="absolute -bottom-4 -left-4 px-4 py-3 rounded-2xl card-dark neon-border border">
                <div className="text-xs text-[#1a2010]/50 font-body">Монстера Делициоза</div>
                <div className="font-display font-bold neon-text text-lg">3 200 ₽</div>
              </div>
              <div className="absolute -top-4 -right-4 px-4 py-3 rounded-2xl card-dark neon-border border flex items-center gap-2">
                <Icon name="Leaf" size={16} className="neon-text" />
                <span className="text-xs font-body text-[#1a2010]/70">Живая гарантия</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="py-4 overflow-hidden" style={{ borderTop: "1px solid rgba(163,230,53,0.1)", borderBottom: "1px solid rgba(163,230,53,0.1)", background: "rgba(163,230,53,0.03)" }}>
        <div className="flex animate-marquee whitespace-nowrap gap-12">
          {[...marqueeTags, ...marqueeTags].map((tag, i) => (
            <span key={i} className="font-display text-sm tracking-widest text-[#1a2010]/40 uppercase px-6">{tag}</span>
          ))}
        </div>
      </div>

      {/* CATALOG */}
      <section id="catalog" className="py-24 px-6 md:px-12" ref={setRef("catalog") as React.RefCallback<HTMLElement>}>
        <div className={`transition-all duration-700 ${visible["catalog"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="font-body text-xs tracking-widest uppercase neon-text mb-2">Каталог</div>
              <h2 className="font-display text-5xl md:text-6xl font-bold leading-none">ВЫБЕРИ<br /><span className="neon-text">СВОЁ</span></h2>
            </div>
            <div className="text-[#1a2010]/40 font-body text-sm">
              Найдено: <span className="neon-text font-bold text-base">{filtered.length}</span> растений
            </div>
          </div>

          {/* FILTERS */}
          <div className="rounded-2xl p-6 mb-10 card-dark space-y-5">
            <div className="flex items-center gap-2 text-[#1a2010]/60 font-body text-sm mb-1">
              <Icon name="SlidersHorizontal" size={14} />
              <span>Фильтры</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <div className="text-xs text-[#1a2010]/40 font-body mb-2 uppercase tracking-wider">Вид</div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(typeLabels).map(([val, label]) => (
                    <button key={val} onClick={() => setFilterType(val)}
                      className={`px-3 py-1 rounded-full font-body text-xs transition-all duration-200 ${filterType === val ? "neon-bg text-black font-semibold" : "text-[#1a2010]/50 hover:text-[#1a2010]"}`}
                      style={filterType !== val ? { border: "1px solid rgba(0,0,0,0.08)" } : {}}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#1a2010]/40 font-body mb-2 uppercase tracking-wider">Размер</div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(sizeLabels).map(([val, label]) => (
                    <button key={val} onClick={() => setFilterSize(val)}
                      className={`px-3 py-1 rounded-full font-body text-xs transition-all duration-200 ${filterSize === val ? "neon-bg text-black font-semibold" : "text-[#1a2010]/50 hover:text-[#1a2010]"}`}
                      style={filterSize !== val ? { border: "1px solid rgba(0,0,0,0.08)" } : {}}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#1a2010]/40 font-body mb-2 uppercase tracking-wider">Освещение</div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(lightLabels).map(([val, label]) => (
                    <button key={val} onClick={() => setFilterLight(val)}
                      className={`px-3 py-1 rounded-full font-body text-xs transition-all duration-200 ${filterLight === val ? "neon-bg text-black font-semibold" : "text-[#1a2010]/50 hover:text-[#1a2010]"}`}
                      style={filterLight !== val ? { border: "1px solid rgba(0,0,0,0.08)" } : {}}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#1a2010]/40 font-body mb-2 uppercase tracking-wider">Полив</div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(waterLabels).map(([val, label]) => (
                    <button key={val} onClick={() => setFilterWater(val)}
                      className={`px-3 py-1 rounded-full font-body text-xs transition-all duration-200 ${filterWater === val ? "neon-bg text-black font-semibold" : "text-[#1a2010]/50 hover:text-[#1a2010]"}`}
                      style={filterWater !== val ? { border: "1px solid rgba(0,0,0,0.08)" } : {}}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="text-xs text-[#1a2010]/40 font-body uppercase tracking-wider">Цена до</div>
                <div className="font-display font-bold neon-text text-lg">{priceMax.toLocaleString()} ₽</div>
              </div>
              <input type="range" min={500} max={6000} step={100} value={priceMax} onChange={e => setPriceMax(Number(e.target.value))}
                className="w-full h-1 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: "#4d9400", background: `linear-gradient(to right, #4d9400 0%, #4d9400 ${((priceMax - 500) / 5500) * 100}%, rgba(0,0,0,0.08) ${((priceMax - 500) / 5500) * 100}%, rgba(0,0,0,0.08) 100%)` }} />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-[#1a2010]/30 font-body">
              <Icon name="Leaf" size={48} className="mx-auto mb-4 opacity-20" />
              <p className="text-lg">Ничего не найдено. Измените фильтры.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filtered.map((plant, idx) => (
                <div key={plant.id} className="group relative rounded-2xl overflow-hidden card-dark transition-all duration-300 hover:scale-[1.02]"
                  style={{ transitionDelay: `${idx * 50}ms` }}>
                  {plant.tag && (
                    <div className="absolute top-3 left-3 z-10 px-2.5 py-1 neon-bg text-black font-display font-bold text-xs rounded-full tracking-wider">
                      {plant.tag}
                    </div>
                  )}
                  <div className="relative overflow-hidden h-52">
                    <img src={plant.img} alt={plant.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(247,247,242,0.6) 0%, transparent 60%)" }} />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-semibold text-base mb-1 leading-tight">{plant.name}</h3>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className="px-2 py-0.5 rounded-full text-xs font-body text-[#1a2010]/40" style={{ background: "rgba(0,0,0,0.06)" }}>
                        {sizeLabels[plant.size]}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-body text-[#1a2010]/40" style={{ background: "rgba(0,0,0,0.06)" }}>
                        {lightLabels[plant.light]}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="font-display font-bold text-xl neon-text">{plant.price.toLocaleString()} ₽</div>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 neon-bg text-black font-display font-bold text-xs rounded-full transition-all hover:opacity-90 tracking-wider">
                        <Icon name="ShoppingBag" size={12} />
                        В корзину
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 px-6 md:px-12 relative" ref={setRef("reviews") as React.RefCallback<HTMLElement>}
        style={{ background: "rgba(163,230,53,0.05)", borderTop: "1px solid rgba(163,230,53,0.08)", borderBottom: "1px solid rgba(163,230,53,0.08)" }}>
        <div className={`transition-all duration-700 ${visible["reviews"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="mb-12">
            <div className="font-body text-xs tracking-widest uppercase neon-text mb-2">Отзывы</div>
            <h2 className="font-display text-5xl md:text-6xl font-bold leading-none">ЧТО<br /><span className="neon-text">ГОВОРЯТ</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {reviews.map((r, i) => (
              <div key={r.id} className="p-6 rounded-2xl card-dark relative overflow-hidden group transition-all duration-300"
                style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(circle, rgba(163,230,53,0.05) 0%, transparent 70%)" }} />
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full neon-bg flex items-center justify-center font-display font-bold text-black flex-shrink-0">
                    {r.avatar}
                  </div>
                  <div>
                    <div className="font-display font-semibold text-sm">{r.name}</div>
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: r.rating }).map((_, j) => (
                        <span key={j} className="neon-text text-xs">★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-[#1a2010]/60 font-body text-sm leading-relaxed">"{r.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6 md:px-12" ref={setRef("contacts") as React.RefCallback<HTMLElement>}>
        <div className={`transition-all duration-700 ${visible["contacts"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="mb-12">
            <div className="font-body text-xs tracking-widest uppercase neon-text mb-2">Контакты</div>
            <h2 className="font-display text-5xl md:text-6xl font-bold leading-none">ЕСТЬ<br /><span className="neon-text">ВОПРОСЫ?</span></h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl card-dark">
              <h3 className="font-display text-xl font-semibold mb-6 tracking-wide">Оставить заявку</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Ваше имя"
                  className="w-full px-4 py-3 rounded-xl font-body text-sm text-[#1a2010] placeholder-[#1a2010]/30 bg-black/5 border border-black/10 outline-none focus:border-[#4d9400] transition-colors" />
                <input type="tel" placeholder="Телефон"
                  className="w-full px-4 py-3 rounded-xl font-body text-sm text-[#1a2010] placeholder-[#1a2010]/30 bg-black/5 border border-black/10 outline-none focus:border-[#4d9400] transition-colors" />
                <textarea placeholder="Что вас интересует?" rows={4}
                  className="w-full px-4 py-3 rounded-xl font-body text-sm text-[#1a2010] placeholder-[#1a2010]/30 bg-black/5 border border-black/10 outline-none focus:border-[#4d9400] transition-colors resize-none" />
                <button className="w-full py-4 neon-bg text-black font-display font-bold text-base tracking-widest uppercase rounded-xl transition-all hover:opacity-90 neon-glow">
                  Отправить заявку
                </button>
              </div>
            </div>
            <div className="space-y-5">
              {[
                { icon: "MapPin", title: "Адрес", val: "Москва, ул. Садовая, 12", sub: "Пн–Вс, 10:00–20:00" },
                { icon: "Phone", title: "Телефон", val: "+7 (999) 123-45-67", sub: "Звонки и WhatsApp" },
                { icon: "Mail", title: "Email", val: "hello@flora-shop.ru", sub: "Ответим в течение часа" },
                { icon: "Instagram", title: "Instagram", val: "@flora_plants", sub: "Фото новинок каждый день" },
              ].map(item => (
                <div key={item.icon} className="flex gap-4 p-5 rounded-2xl card-dark group transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(163,230,53,0.1)" }}>
                    <Icon name={item.icon as "MapPin"} size={18} className="neon-text" />
                  </div>
                  <div>
                    <div className="text-xs text-[#1a2010]/40 font-body uppercase tracking-widest mb-0.5">{item.title}</div>
                    <div className="font-display font-semibold text-base">{item.val}</div>
                    <div className="text-xs text-[#1a2010]/40 font-body mt-0.5">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderTop: "1px solid rgba(163,230,53,0.1)" }}>
        <div className="font-display text-xl font-bold tracking-widest neon-text neon-text-glow">FLORA</div>
        <div className="text-[#1a2010]/40 font-body text-xs text-center">© 2024 FLORA. Живые растения с гарантией.</div>
        <div className="flex gap-6">
          {["Instagram", "MessageCircle", "Send"].map(icon => (
            <button key={icon} className="text-[#1a2010]/40 hover:neon-text transition-colors duration-200">
              <Icon name={icon as "Instagram"} size={18} />
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}