"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

const NAV_ITEMS = [
  { href: "#services", label: "Услуги" },
  { href: "#portfolio", label: "Портфолио" },
  { href: "#about", label: "О компании" },
  { href: "#advantages", label: "Преимущества" },
  { href: "#process", label: "Этапы" },
] as const;

const STATS = [
  {
    value: "10+",
    label: "лет на рынке",
  },
  {
    value: "100%",
    label: "соблюдение сроков по договору",
  },
  {
    value: "100+",
    label: "реализованных объектов",
  },
] as const;

const SERVICES = [
  {
    title: "Ремонт квартир",
    description:
      "Черновые работы, предчистовая отделка (White Box), капитальный и премиальный ремонт по индивидуальному дизайн-проекту.",
  },
  {
    title: "Отделка частных домов",
    description:
      "Полный комплекс работ по внутренней отделке коттеджей и загородных домов под ключ.",
  },
  {
    title: "Коммерческие помещения",
    description:
      "Отделка офисов, магазинов, ресторанов и складов точно в оговоренный срок с учетом всех технических требований бизнеса.",
  },
] as const;

const ADVANTAGES = [
  {
    title: "Фиксированная смета",
    description:
      "Стоимость всех этапов закрепляется в официальном договоре и не увеличивается в процессе ремонта.",
  },
  {
    title: "Гарантия качества",
    description:
      "Предоставляем официальную гарантию на все выполненные отделочные и инженерные работы.",
  },
  {
    title: "Абсолютная прозрачность",
    description:
      "Регулярные фото- и видеоотчеты с объекта от закрепленного прораба.",
  },
  {
    title: "Комплексный подход",
    description:
      "Берем на себя всю рутину: закупку и доставку черновых материалов, вывоз мусора и финальный клининг.",
  },
] as const;

const STEPS = [
  {
    title: "Заявка и замер",
    description:
      "Наш специалист бесплатно выезжает на объект для замеров и технической консультации.",
  },
  {
    title: "Смета и договор",
    description:
      "Составляем детализированную прозрачную смету и подписываем договор.",
  },
  {
    title: "Материалы и старт",
    description:
      "Завозим необходимые черновые материалы на объект и приступаем к работе.",
  },
  {
    title: "Производство работ",
    description:
      "Выполнение всех этапов профильными мастерами под жестким контролем.",
  },
  {
    title: "Сдача объекта",
    description:
      "Делаем финальную уборку и подписываем акт приема-передачи.",
  },
] as const;

const MARQUEE_ITEMS = [
  "Ремонт квартир",
  "Отделка домов",
  "Коммерческие помещения",
  "White Box",
  "Фиксированная смета",
  "Гарантия качества",
] as const;

const WORKS = [
  { src: "/works/work-01.jpg", alt: "Пример выполненных работ — фото 1", width: 1200, height: 1600 },
  { src: "/works/work-02.jpg", alt: "Пример выполненных работ — фото 2", width: 1200, height: 1600 },
  { src: "/works/work-03.jpg", alt: "Пример выполненных работ — фото 3", width: 1600, height: 1200 },
  { src: "/works/work-04.jpg", alt: "Пример выполненных работ — фото 4", width: 1200, height: 1600 },
  { src: "/works/work-05.jpg", alt: "Пример выполненных работ — фото 5", width: 1200, height: 1600 },
  { src: "/works/work-06.jpg", alt: "Пример выполненных работ — фото 6", width: 1200, height: 1600 },
  { src: "/works/work-07.jpg", alt: "Пример выполненных работ — фото 7", width: 1200, height: 1600 },
  { src: "/works/work-08.jpg", alt: "Пример выполненных работ — фото 8", width: 1200, height: 1600 },
  { src: "/works/work-09.jpg", alt: "Пример выполненных работ — фото 9", width: 1200, height: 1600 },
  { src: "/works/work-10.jpg", alt: "Пример выполненных работ — фото 10", width: 1600, height: 1200 },
  { src: "/works/work-11.jpg", alt: "Пример выполненных работ — фото 11", width: 1200, height: 1600 },
  { src: "/works/work-12.jpg", alt: "Пример выполненных работ — фото 12", width: 1600, height: 1200 },
  { src: "/works/work-13.jpg", alt: "Пример выполненных работ — фото 13", width: 1200, height: 1600 },
  { src: "/works/work-14.jpg", alt: "Пример выполненных работ — фото 14", width: 1200, height: 1600 },
  { src: "/works/work-15.jpg", alt: "Пример выполненных работ — фото 15", width: 1200, height: 1600 },
  { src: "/works/work-16.jpg", alt: "Пример выполненных работ — фото 16", width: 1200, height: 1600 },
  { src: "/works/work-17.jpg", alt: "Пример выполненных работ — фото 17", width: 1600, height: 1200 },
  { src: "/works/work-18.jpg", alt: "Пример выполненных работ — фото 18", width: 1200, height: 1600 },
  { src: "/works/work-19.jpg", alt: "Пример выполненных работ — фото 19", width: 1200, height: 1600 },
  { src: "/works/work-20.jpg", alt: "Пример выполненных работ — фото 20", width: 1200, height: 1600 },
  { src: "/works/work-21.jpg", alt: "Пример выполненных работ — фото 21", width: 1200, height: 1600 },
  { src: "/works/work-22.jpg", alt: "Пример выполненных работ — фото 22", width: 1200, height: 1600 },
  { src: "/works/work-23.jpg", alt: "Пример выполненных работ — фото 23", width: 1200, height: 1600 },
  { src: "/works/work-24.jpg", alt: "Пример выполненных работ — фото 24", width: 1200, height: 1600 },
  { src: "/works/work-25.jpg", alt: "Пример выполненных работ — фото 25", width: 1200, height: 1600 },
  { src: "/works/work-26.jpg", alt: "Пример выполненных работ — фото 26", width: 1200, height: 1600 },
  { src: "/works/work-27.jpg", alt: "Пример выполненных работ — фото 27", width: 1200, height: 1600 },
  { src: "/works/work-28.jpg", alt: "Пример выполненных работ — фото 28", width: 1200, height: 1600 },
  { src: "/works/work-29.jpg", alt: "Пример выполненных работ — фото 29", width: 1200, height: 1600 },
  { src: "/works/work-30.jpg", alt: "Пример выполненных работ — фото 30", width: 1200, height: 1600 },
  { src: "/works/work-31.jpg", alt: "Пример выполненных работ — фото 31", width: 1200, height: 1600 },
  { src: "/works/work-32.jpg", alt: "Пример выполненных работ — фото 32", width: 1200, height: 1600 },
  { src: "/works/work-33.jpg", alt: "Пример выполненных работ — фото 33", width: 1200, height: 1600 },
  { src: "/works/work-34.jpg", alt: "Пример выполненных работ — фото 34", width: 1200, height: 1600 },
  { src: "/works/work-35.jpg", alt: "Пример выполненных работ — фото 35", width: 1200, height: 1600 },
  { src: "/works/work-36.jpg", alt: "Пример выполненных работ — фото 36", width: 1200, height: 1600 },
  { src: "/works/work-37.jpg", alt: "Пример выполненных работ — фото 37", width: 1200, height: 1600 },
  { src: "/works/work-38.jpg", alt: "Пример выполненных работ — фото 38", width: 1600, height: 1200 },
  { src: "/works/work-39.jpg", alt: "Пример выполненных работ — фото 39", width: 1600, height: 1200 },
  { src: "/works/work-40.jpg", alt: "Пример выполненных работ — фото 40", width: 1280, height: 960 },
  { src: "/works/work-41.jpg", alt: "Пример выполненных работ — фото 41", width: 1600, height: 1200 },
  { src: "/works/work-42.jpg", alt: "Пример выполненных работ — фото 42", width: 1600, height: 1200 },
  { src: "/works/work-43.jpg", alt: "Пример выполненных работ — фото 43", width: 1280, height: 960 },
  { src: "/works/work-44.jpg", alt: "Пример выполненных работ — фото 44", width: 1200, height: 1600 },
  { src: "/works/work-45.jpg", alt: "Пример выполненных работ — фото 45", width: 1200, height: 1600 },
  { src: "/works/work-46.jpg", alt: "Пример выполненных работ — фото 46", width: 1200, height: 1600 },
  { src: "/works/work-47.jpg", alt: "Пример выполненных работ — фото 47", width: 1600, height: 738 },
  { src: "/works/work-48.jpg", alt: "Пример выполненных работ — фото 48", width: 1200, height: 1600 },
  { src: "/works/work-49.jpg", alt: "Пример выполненных работ — фото 49", width: 1600, height: 1200 },
] as const;

const PORTFOLIO_COLLAGE = [
  { index: 0, className: "relative col-span-2 row-span-2" },
  { index: 2, className: "relative col-span-1 row-span-1" },
  { index: 9, className: "relative col-span-1 row-span-1" },
  { index: 16, className: "relative col-span-1 row-span-2" },
  { index: 24, className: "relative col-span-1 row-span-2" },
  { index: 46, className: "relative col-span-2 row-span-1" },
] as const;

const CONTACTS = {
  phone: "+7 (996) 029-45-87",
  phoneHref: "tel:+79960294587",
  address: "г. Калининград, ул. Эпроновская, 12",
  mapHref:
    "https://yandex.ru/maps/?text=%D0%9A%D0%B0%D0%BB%D0%B8%D0%BD%D0%B8%D0%BD%D0%B3%D1%80%D0%B0%D0%B4%2C%20%D1%83%D0%BB%D0%B8%D1%86%D0%B0%20%D0%AD%D0%BF%D1%80%D0%BE%D0%BD%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F%2C%2012",
  telegramHref: "https://t.me/favoritstroy",
  whatsappHref: "https://wa.me/79960294587",
  inn: "390103822103",
} as const;

/* -------------------------------------------------------------------------- */
/*                                  PRIMITIVES                                */
/* -------------------------------------------------------------------------- */

function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 ${className}`}
    >
      {children}
    </div>
  );
}

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      className={className}
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      className={className}
    >
      <path d="m4 10.5 4 4L16 6" />
    </svg>
  );
}

function GridLines({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(242,239,232,0.065) 1px, transparent 1px), linear-gradient(to bottom, rgba(242,239,232,0.065) 1px, transparent 1px)",
        backgroundSize: "88px 88px",
      }}
    />
  );
}

function SectionTag({
  index,
  label,
  className = "",
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-bone/55 sm:text-[10px] ${className}`}
    >
      <span aria-hidden="true" className="h-px w-8 bg-wine-light" />
      <span>
        {index} / {label}
      </span>
    </div>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || typeof IntersectionObserver === "undefined") {
      const frame = window.requestAnimationFrame(() => setIsVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -48px 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-[opacity,transform] duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function CtaLink({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
}) {
  const isPrimary = variant === "primary";

  return (
    <a
      href={href}
      onClick={onClick}
      className={`group relative inline-flex min-h-14 items-center justify-between gap-8 overflow-hidden border px-5 py-4 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors duration-300 sm:min-h-[58px] sm:text-[11px] ${
        isPrimary
          ? "border-wine bg-wine text-bone hover:text-ink"
          : "border-bone/25 text-bone hover:border-wine-light"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 ${
          isPrimary ? "bg-bone" : "bg-wine"
        }`}
      />
      <span className="relative z-10">{children}</span>
      <ArrowUpRight className="relative z-10 h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

function Logo({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <a
      href="#top"
      onClick={onNavigate}
      className="group flex shrink-0 items-center gap-3"
    >
      <span className="relative grid h-10 w-10 shrink-0 place-items-center border border-bone/20 bg-wine transition-colors duration-300 group-hover:bg-bone">
        <span className="font-display text-[22px] font-semibold leading-none text-bone transition-colors duration-300 group-hover:text-ink">
          Ф
        </span>
        <span className="absolute -bottom-px -right-px h-2 w-2 bg-bone transition-colors duration-300 group-hover:bg-wine" />
      </span>
      <span className="block">
        <span className="block font-display text-[16px] font-semibold uppercase leading-none tracking-[0.13em] text-bone sm:text-[19px]">
          Фаворит-Строй
        </span>
        <span className="mt-1.5 block font-mono text-[7px] uppercase leading-none tracking-[0.16em] text-bone/55 sm:text-[8px]">
          отделочная компания
        </span>
      </span>
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   HEADER                                   */
/* -------------------------------------------------------------------------- */

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      const root = document.documentElement;
      const maxScroll = root.scrollHeight - root.clientHeight;

      setScrollProgress(maxScroll > 0 ? (root.scrollTop / maxScroll) * 100 : 0);
    };

    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-bone/10 bg-ink/90 backdrop-blur-xl">
        <Container className="flex h-[72px] items-center justify-between gap-4 lg:h-[88px]">
          <Logo onNavigate={closeMenu} />

          <nav
            aria-label="Основная навигация"
            className="hidden items-center gap-7 lg:flex xl:gap-9"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-bone/55 transition-colors hover:text-bone"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-px w-0 bg-wine-light transition-all duration-300 group-hover:w-full"
                />
              </a>
            ))}
            <span aria-hidden="true" className="hidden h-3 w-px bg-bone/15 xl:block" />
            <a
              href={CONTACTS.phoneHref}
              className="hidden font-mono text-[10px] tracking-[0.08em] text-bone/70 transition-colors hover:text-bone xl:block"
            >
              {CONTACTS.phone}
            </a>
            <a
              href="#contact"
              className="group relative hidden items-center gap-2 border border-wine bg-wine px-4 py-3 font-mono text-[9px] uppercase tracking-[0.14em] text-bone transition-colors hover:bg-wine-light lg:inline-flex"
            >
              Обсудить проект
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </nav>

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setIsMenuOpen((current) => !current)}
            className="group flex items-center gap-3 border border-bone/20 px-3 py-2.5 font-mono text-[9px] uppercase tracking-[0.16em] text-bone/75 transition-colors hover:border-bone/45 hover:text-bone lg:hidden"
          >
            <span className="hidden min-[390px]:inline">
              {isMenuOpen ? "Закрыть" : "Меню"}
            </span>
            <span
              aria-hidden="true"
              className="flex h-4 w-4 flex-col items-center justify-center gap-1.5"
            >
              <span
                className={`h-px w-4 bg-current transition-transform duration-300 ${
                  isMenuOpen ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-4 bg-current transition-transform duration-300 ${
                  isMenuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </Container>

        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-px bg-wine-light transition-[width] duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </header>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 overflow-y-auto bg-ink lg:hidden"
        >
          <Container className="flex min-h-full flex-col pb-8 pt-24">
            <nav
              aria-label="Мобильная навигация"
              className="border-t border-bone/15"
            >
              {NAV_ITEMS.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="group flex items-center justify-between gap-6 border-b border-bone/15 py-5"
                >
                  <span className="font-display text-[clamp(2rem,9vw,3.2rem)] uppercase leading-none text-bone transition-colors group-hover:text-wine-light">
                    {item.label}
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.2em] text-bone/50">
                    0{index + 1}
                  </span>
                </a>
              ))}
            </nav>

            <div className="mt-8 space-y-5">
              <a
                href={CONTACTS.phoneHref}
                className="block font-display text-3xl uppercase leading-none text-bone transition-colors hover:text-wine-light"
              >
                {CONTACTS.phone}
              </a>
              <div className="space-y-2">
                <p className="max-w-xs text-sm leading-6 text-bone/55">
                  {CONTACTS.address}
                </p>
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-bone/50">
                  ИНН {CONTACTS.inn}
                </p>
              </div>
              <CtaLink href="#contact" onClick={closeMenu} className="w-full">
                Вызвать инженера на замер
              </CtaLink>
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-bone/15 pt-6 font-mono text-[8px] uppercase tracking-[0.18em] text-bone/50">
              <span>Калининград / РФ</span>
              <span>54.7104° N</span>
            </div>
          </Container>
        </div>
      )}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    HERO                                    */
/* -------------------------------------------------------------------------- */

function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="group relative flex overflow-hidden border-t border-bone/10 bg-graphite py-4"
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {MARQUEE_ITEMS.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="flex items-center gap-7 px-7 font-mono text-[9px] uppercase tracking-[0.2em] text-bone/50 sm:text-[10px]"
              >
                {item}
                <span className="h-1 w-1 bg-wine-light" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden border-b border-bone/10"
    >
      <GridLines className="opacity-40 [mask-image:linear-gradient(to_bottom,black_35%,transparent_95%)]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 -top-56 h-[620px] w-[620px] rounded-full bg-wine/20 blur-[150px]"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-12 gap-y-12 pb-16 pt-10 md:pb-20 md:pt-14 lg:gap-x-10 lg:pb-24 lg:pt-20">
          <div className="col-span-12 lg:col-span-8">
            <Reveal>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-bone/10 py-3 font-mono text-[8px] uppercase tracking-[0.17em] text-bone/55 sm:text-[9px]">
                <span className="flex items-center gap-2 text-bone/65">
                  <span className="h-1.5 w-1.5 animate-cursor-pulse rounded-full bg-wine-light" />
                  Калининград / РФ
                </span>
                <span aria-hidden="true" className="h-3 w-px bg-bone/15" />
                <span>Отделочные работы</span>
                <span className="ml-auto hidden text-bone/50 sm:block">
                  54.7104° N / 20.4522° E
                </span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-8 sm:mt-10">
                <span className="block font-sans text-[9px] font-semibold uppercase tracking-[0.28em] text-bone/50 sm:text-[11px]">
                  Отделочная компания
                </span>{" "}
                <span className="mt-4 block font-display text-[clamp(4rem,13.2vw,11rem)] font-semibold uppercase leading-[0.8] tracking-[-0.025em] text-bone sm:mt-5">
                  <span className="text-wine-light">«</span>Фаворит-
                </span>
                <span className="block font-display text-[clamp(4rem,13.2vw,11rem)] font-semibold uppercase leading-[0.8] tracking-[-0.025em] text-bone">
                  Строй<span className="text-wine-light">»</span>
                </span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-8 max-w-2xl border-l border-wine pl-5 sm:mt-10 sm:pl-6">
                <p className="text-balance text-[15px] leading-7 text-bone/65 sm:text-lg sm:leading-8">
                  Полная и внутренняя отделка квартир, загородных домов и
                  коммерческих помещений.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <CtaLink href="#contact" className="w-full sm:w-auto">
                    Рассчитать стоимость
                  </CtaLink>
                  <CtaLink
                    href="#contact"
                    variant="secondary"
                    className="w-full sm:w-auto"
                  >
                    Вызвать инженера на замер
                  </CtaLink>
                </div>
              </div>
            </Reveal>
          </div>

          <aside className="col-span-12 lg:col-span-4 lg:pl-2">
            <Reveal delay={240}>
              <div className="mb-3 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.2em] text-bone/50 sm:text-[9px]">
                <span>Лист / 01</span>
                <span>Инженерный подход</span>
              </div>

              <div className="overflow-hidden border border-bone/15 bg-surface/80 backdrop-blur-sm">
                <div className="relative aspect-[5/4] overflow-hidden border-b border-bone/15">
                  <GridLines className="opacity-70" />
                  <div
                    aria-hidden="true"
                    className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-wine"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute right-8 top-8 h-20 w-20 rounded-full border border-bone/20"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute right-14 top-14 h-8 w-8 rounded-full border border-bone/25"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-12 -right-2 font-display text-[12rem] leading-none text-bone/[0.055]"
                  >
                    Ф
                  </span>

                  <div className="absolute left-5 top-5 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.19em] text-bone/55">
                    <span className="h-1.5 w-1.5 bg-wine-light" />
                    Объект / 01
                  </div>

                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-bone/50">
                      Точно по проекту
                    </p>
                    <p className="mt-2 max-w-[15rem] font-display text-[clamp(1.55rem,4vw,2.25rem)] uppercase leading-[0.92] text-bone">
                      Отделка точно по проекту
                    </p>
                  </div>
                </div>

                <div>
                  {[
                    "Ремонт квартир",
                    "Отделка частных домов",
                    "Коммерческие помещения",
                  ].map((item, index) => (
                    <a
                      key={item}
                      href="#services"
                      className="group flex items-center justify-between border-b border-bone/10 px-5 py-4 transition-colors last:border-b-0 hover:bg-bone/[0.035]"
                    >
                      <span className="flex items-center gap-4">
                        <span className="font-mono text-[8px] tracking-[0.18em] text-bone/50">
                          0{index + 1}
                        </span>
                        <span className="text-sm text-bone/65 transition-colors group-hover:text-bone">
                          {item}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-bone/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-wine-light" />
                    </a>
                  ))}
                </div>

                <div className="flex items-stretch bg-wine">
                  <div className="flex-1 p-5">
                    <div className="font-display text-6xl font-medium leading-none text-bone">
                      10+
                    </div>
                    <p className="mt-2 max-w-[13rem] font-mono text-[8px] uppercase leading-4 tracking-[0.15em] text-bone/70">
                      лет на рынке
                    </p>
                  </div>
                  <a
                    href="#about"
                    aria-label="Подробнее о компании"
                    className="flex w-16 items-center justify-center border-l border-bone/20 transition-colors duration-300 hover:bg-bone hover:text-ink"
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </Container>

      <Marquee />
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   ABOUT                                    */
/* -------------------------------------------------------------------------- */

function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 border-b border-bone/10 py-20 md:py-28 lg:scroll-mt-24 lg:py-36"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionTag index="01" label="О компании" />
              <div className="mt-12 hidden lg:block">
                <svg
                  aria-hidden="true"
                  role="presentation"
                  viewBox="0 0 220 140"
                  className="h-[8rem] w-auto overflow-visible"
                >
                  <text
                    x="0"
                    y="116"
                    fill="rgba(242,239,232,0.055)"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 128,
                      fontWeight: 500,
                    }}
                  >
                    10+
                  </text>
                </svg>
                <p className="mt-3 max-w-[13rem] font-mono text-[9px] uppercase leading-5 tracking-[0.16em] text-bone/50">
                  лет на рынке
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal>
              <h2 className="max-w-4xl font-display text-[clamp(2.35rem,5.1vw,4.65rem)] font-medium uppercase leading-[0.98] tracking-[-0.02em] text-bone">
                Мы — команда профильных специалистов,{" "}
                <span className="text-bone/40">
                  нацеленных на безупречный результат
                </span>
                <span className="text-wine-light">.</span>
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="mt-8 max-w-3xl text-[15px] leading-8 text-bone/60 sm:text-base sm:leading-9">
                «Фаворит-Строй» успешно работает на рынке отделочных услуг более
                10 лет. Наш подход — это строгий технический надзор, продуманные
                инженерные решения и реализация задач любой сложности точно по
                проекту.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid border-t border-bone/15 md:mt-24 md:grid-cols-3">
          {STATS.map((stat, index) => (
            <div
              key={stat.value}
              className={`group relative px-1 py-9 sm:px-5 md:px-8 md:py-10 lg:px-10 ${
                index < STATS.length - 1
                  ? "border-b border-bone/15 md:border-b-0 md:border-r"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-bone/50">
                  0{index + 1}
                </span>
                <span className="mt-1 h-1.5 w-1.5 bg-wine-light opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <div className="mt-10 font-display text-[clamp(4.8rem,10vw,8.5rem)] font-medium leading-[0.75] tracking-[-0.04em] text-bone transition-colors duration-500 group-hover:text-wine-light sm:mt-14">
                {stat.value}
              </div>
              <p className="mt-6 max-w-[19rem] font-mono text-[9px] uppercase leading-5 tracking-[0.14em] text-bone/55">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  SERVICES                                  */
/* -------------------------------------------------------------------------- */

function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-20 border-b border-bone/10 py-20 md:py-28 lg:scroll-mt-24 lg:py-36"
    >
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
          <div>
            <Reveal>
              <SectionTag index="02" label="Услуги" />
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.5rem,6vw,5.5rem)] font-medium uppercase leading-[0.92] tracking-[-0.02em]">
                Основные
                <br />
                <span className="text-bone/40">услуги</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140} className="md:pb-1">
            <p className="font-mono text-[9px] uppercase leading-5 tracking-[0.14em] text-bone/50 md:text-right">
              03 / направления
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid border-l border-t border-bone/15 md:mt-16 sm:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal
              key={service.title}
              delay={(index % 3) * 80}
              className={
                index === SERVICES.length - 1
                  ? "sm:col-span-2 xl:col-span-1"
                  : ""
              }
            >
              <a
                href="#contact"
                className="group relative flex h-full min-h-[310px] flex-col overflow-hidden border-b border-r border-bone/15 p-6 transition-colors duration-500 hover:bg-wine focus-visible:bg-wine sm:min-h-[340px] sm:p-8 lg:min-h-[390px] lg:p-10"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border border-bone/[0.08] transition-all duration-500 group-hover:scale-110 group-hover:border-bone/20"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-8 right-4 font-display text-[9rem] leading-none text-bone/[0.035] transition-colors duration-500 group-hover:text-bone/[0.085]"
                >
                  0{index + 1}
                </span>

                <div className="relative z-10 flex items-start justify-between gap-6">
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-bone/50 transition-colors duration-300 group-hover:text-bone/65 sm:text-[9px]">
                    Услуга / 0{index + 1}
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center border border-bone/20 transition-all duration-300 group-hover:border-bone group-hover:bg-bone">
                    <ArrowUpRight className="h-4 w-4 transition-colors duration-300 group-hover:text-ink" />
                  </span>
                </div>

                <div className="relative z-10 mt-auto pt-16">
                  <h3 className="max-w-xl font-display text-[clamp(1.75rem,3.8vw,2.85rem)] font-medium uppercase leading-[0.95] tracking-[-0.01em]">
                    {service.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-bone/50 transition-colors duration-300 group-hover:text-bone/75">
                    {service.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.18em] text-bone/0 transition-colors duration-300 group-hover:text-bone/70">
                    Обсудить проект
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 PORTFOLIO                                  */
/* -------------------------------------------------------------------------- */

function Portfolio() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isGalleryOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsGalleryOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      lastTriggerRef.current?.focus();
    };
  }, [isGalleryOpen]);

  return (
    <section
      id="portfolio"
      className="scroll-mt-20 border-b border-bone/10 bg-graphite py-20 md:py-28 lg:scroll-mt-24 lg:py-36"
    >
      <Container>
        <Reveal>
          <SectionTag index="03" label="Портфолио" />
        </Reveal>
        <Reveal delay={80}>
          <button
            type="button"
            onClick={(event) => {
              lastTriggerRef.current = event.currentTarget;
              setIsGalleryOpen(true);
            }}
            aria-label={`Открыть галерею работ: ${WORKS.length} фотографий`}
            className="group relative mt-6 block w-full overflow-hidden border border-bone/15 bg-ink text-left"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-px bg-ink opacity-40 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] group-hover:opacity-60"
            >
              {PORTFOLIO_COLLAGE.map((item) => (
                <div key={item.index} className={item.className}>
                  <Image
                    src={WORKS[item.index].src}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-ink/65 transition-opacity duration-700 group-hover:bg-ink/55"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/20"
            />
            <div className="absolute inset-y-0 left-0 w-px bg-wine-light/70" />

            <div className="relative z-10 flex min-h-[430px] flex-col justify-between p-6 sm:min-h-[500px] sm:p-10 lg:min-h-[590px] lg:p-14">
              <div className="flex items-start justify-between gap-6">
                <p className="font-mono text-[9px] uppercase leading-5 tracking-[0.2em] text-bone/55">
                  {WORKS.length} фото / реальные объекты
                </p>
                <span className="grid h-12 w-12 shrink-0 place-items-center border border-bone/25 transition-colors duration-300 group-hover:border-bone group-hover:bg-bone">
                  <ArrowUpRight className="h-5 w-5 transition-colors duration-300 group-hover:text-ink" />
                </span>
              </div>

              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-wine-light transition-colors duration-300 group-hover:text-bone">
                  Смотреть работы
                </p>
                <h2 className="mt-4 font-display text-[clamp(3.2rem,13vw,11rem)] font-medium uppercase leading-[0.82] tracking-[-0.04em] text-bone">
                  Портфолио
                </h2>
                <p className="mt-6 max-w-md text-sm leading-7 text-bone/55 transition-colors duration-300 group-hover:text-bone/75">
                  Откройте галерею выполненных объектов и посмотрите результаты
                  наших работ.
                </p>
              </div>
            </div>
          </button>
        </Reveal>
      </Container>

      {isGalleryOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Галерея работ"
          className="fixed inset-0 z-[100] flex flex-col bg-ink"
        >
          <div className="flex items-center justify-between gap-4 border-b border-bone/15 px-4 py-4 sm:px-8">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-wine-light">
                Портфолио
              </p>
              <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-bone/45">
                Все фотографии / {WORKS.length}
              </p>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsGalleryOpen(false)}
              aria-label="Закрыть галерею"
              className="grid h-11 w-11 shrink-0 place-items-center border border-bone/25 text-xl leading-none text-bone transition-colors hover:border-bone hover:bg-bone hover:text-ink"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-5 sm:px-6 sm:py-8">
            <div className="columns-2 gap-2 sm:columns-3 sm:gap-3 lg:columns-4 xl:columns-5">
              {WORKS.map((work, index) => (
                <figure
                  key={work.src}
                  className="group relative mb-2 break-inside-avoid overflow-hidden border border-bone/10 bg-surface sm:mb-3"
                >
                  <span
                    className="relative block w-full"
                    style={{ aspectRatio: `${work.width} / ${work.height}` }}
                  >
                    <Image
                      src={work.src}
                      alt={work.alt}
                      fill
                      sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, (max-width: 1279px) 25vw, 20vw"
                      className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                  </span>
                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-2 pb-1.5 pt-6 font-mono text-[8px] uppercase tracking-[0.14em] text-bone/65">
                    {String(index + 1).padStart(2, "0")} / {WORKS.length}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <p className="border-t border-bone/15 px-4 py-4 text-center font-mono text-[8px] uppercase tracking-[0.16em] text-bone/45 sm:text-[9px]">
            Esc — закрыть галерею
          </p>
        </div>
      )}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                ADVANTAGES                                  */
/* -------------------------------------------------------------------------- */

function Advantages() {
  return (
    <section
      id="advantages"
      className="scroll-mt-20 border-b border-bone/10 bg-graphite py-20 md:py-28 lg:scroll-mt-24 lg:py-36"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <SectionTag index="04" label="Преимущества" />
                <h2 className="mt-6 max-w-md font-display text-[clamp(2.5rem,5vw,4.5rem)] font-medium uppercase leading-[0.94] tracking-[-0.02em]">
                  Почему
                  <br />
                  выбирают нас
                </h2>
              </Reveal>

              <Reveal delay={120}>
                <div className="mt-10 hidden border-l border-wine pl-5 lg:block">
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-bone/50">
                    04 / причины
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-bone/15">
              {ADVANTAGES.map((advantage, index) => (
                <Reveal key={advantage.title} delay={index * 60}>
                  <article className="group relative border-b border-bone/15 py-7 transition-[padding] duration-300 hover:pl-3 md:py-9 md:hover:pl-5">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-0 h-px w-0 bg-wine-light transition-[width] duration-500 group-hover:w-full"
                    />
                    <div className="grid gap-4 md:grid-cols-[54px_1fr] md:gap-6">
                      <span className="font-mono text-[9px] tracking-[0.2em] text-bone/50">
                        0{index + 1}
                      </span>
                      <div>
                        <h3 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-medium uppercase leading-none text-bone transition-colors duration-300 group-hover:text-wine-light">
                          {advantage.title}
                        </h3>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-bone/50">
                          {advantage.description}
                        </p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  PROCESS                                   */
/* -------------------------------------------------------------------------- */

function Process() {
  return (
    <section
      id="process"
      className="scroll-mt-20 border-b border-bone/10 py-20 md:py-28 lg:scroll-mt-24 lg:py-36"
    >
      <Container>
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between md:gap-12">
          <div>
            <Reveal>
              <SectionTag index="05" label="Как мы работаем" />
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.5rem,6vw,5.5rem)] font-medium uppercase leading-[0.92] tracking-[-0.02em]">
                Пять шагов
                <br />
                <span className="text-bone/40">до готового объекта</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="max-w-xs font-mono text-[9px] uppercase leading-5 tracking-[0.14em] text-bone/50 md:text-right">
              05 / этапов
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid border-l border-t border-bone/15 sm:grid-cols-2 md:mt-16 xl:grid-cols-5">
          {STEPS.map((step, index) => (
            <Reveal
              key={step.title}
              delay={(index % 5) * 70}
              className="h-full"
            >
              <article className="group relative flex h-full min-h-[300px] flex-col border-b border-r border-bone/15 p-6 transition-colors duration-500 hover:bg-bone/[0.025] sm:min-h-[330px] xl:min-h-[380px] xl:p-7">
                <div className="flex items-start justify-between">
                  <span className="font-display text-[4.2rem] leading-[0.75] text-bone/10 transition-colors duration-500 group-hover:text-wine-light sm:text-[5rem]">
                    0{index + 1}
                  </span>
                  <span className="mt-1 h-1.5 w-1.5 bg-wine-light opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <div className="mt-auto pt-14">
                  <h3 className="font-display text-[clamp(1.45rem,2.4vw,1.9rem)] font-medium uppercase leading-none">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-6 text-bone/55">
                    {step.description}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-px w-0 bg-wine-light transition-[width] duration-500 group-hover:w-full"
                />
              </article>
            </Reveal>
          ))}

          <a
            href="#contact"
            className="group relative hidden min-h-[330px] flex-col justify-between border-b border-r border-bone/15 bg-wine p-6 transition-colors duration-500 hover:bg-bone hover:text-ink sm:flex xl:hidden"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-bone/80 transition-colors group-hover:text-ink/60">
                Следующий шаг
              </span>
              <span className="grid h-10 w-10 place-items-center border border-bone/25 transition-colors group-hover:border-ink/20">
                <ArrowUpRight className="h-4 w-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
            <div className="mt-auto pt-14">
              <p className="max-w-[15rem] font-display text-[clamp(1.8rem,3vw,2.3rem)] font-medium uppercase leading-[0.95]">
                Обсудить ваш объект
              </p>
              <span className="mt-4 inline-flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.18em] text-bone/60 transition-colors group-hover:text-ink/60">
                Оставить заявку
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </a>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  CONTACT                                   */
/* -------------------------------------------------------------------------- */

type LeadForm = {
  name: string;
  phone: string;
  consent: boolean;
};

type LeadErrors = {
  name?: string;
  phone?: string;
  consent?: string;
};

const EMPTY_FORM: LeadForm = {
  name: "",
  phone: "",
  consent: false,
};

function formatPhone(value: string) {
  let digits = value.replace(/\D/g, "");

  if (!digits) return "";
  if (digits.startsWith("8")) digits = `7${digits.slice(1)}`;
  if (digits.startsWith("9")) digits = `7${digits}`;
  if (!digits.startsWith("7")) digits = `7${digits}`;

  digits = digits.slice(0, 11);
  const local = digits.slice(1);

  let result = "+7";
  if (local.length > 0) result += ` (${local.slice(0, 3)}`;
  if (local.length >= 3) result += ")";
  if (local.length > 3) result += ` ${local.slice(3, 6)}`;
  if (local.length > 6) result += `-${local.slice(6, 8)}`;
  if (local.length > 8) result += `-${local.slice(8, 10)}`;

  return result;
}

function validateLead(form: LeadForm): LeadErrors {
  const errors: LeadErrors = {};
  const phoneDigits = form.phone.replace(/\D/g, "");

  if (form.name.trim().length < 2) {
    errors.name = "Укажите имя";
  }

  if (phoneDigits.length !== 11) {
    errors.phone = "Введите номер полностью";
  }

  if (!form.consent) {
    errors.consent = "Необходимо согласие на обработку данных";
  }

  return errors;
}

function ContactForm() {
  const [form, setForm] = useState<LeadForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [formError, setFormError] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateLead(form);
    setErrors(nextErrors);
    setFormError("");

    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone,
          consent: form.consent,
        }),
      });

      if (!response.ok) throw new Error("Lead request failed");

      setSubmittedName(form.name.trim());
      setForm(EMPTY_FORM);
      setStatus("success");
    } catch {
      setStatus("idle");
      setFormError(
        `Не удалось отправить заявку. Позвоните нам по телефону ${CONTACTS.phone}.`,
      );
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setSubmittedName("");
    setErrors({});
    setFormError("");
    setForm(EMPTY_FORM);
  };

  return (
    <div className="relative border border-bone/15 bg-surface/70 p-5 backdrop-blur-sm sm:p-8 lg:p-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-wine via-wine-light to-transparent"
      />

      <div className="flex items-start justify-between gap-6 border-b border-bone/15 pb-5">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-bone/50">
            Заявка / 01
          </p>
          <h3 className="mt-2 font-display text-2xl font-medium uppercase leading-none sm:text-3xl">
            Обратный звонок
          </h3>
        </div>
        <span className="border border-bone/15 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.15em] text-bone/55">
          Связь
        </span>
      </div>

      {status === "success" ? (
        <div
          role="status"
          aria-live="polite"
          className="flex min-h-[430px] flex-col justify-center py-10"
        >
          <span className="grid h-14 w-14 place-items-center border border-wine bg-wine text-bone">
            <CheckIcon className="h-6 w-6" />
          </span>
          <h4 className="mt-8 font-display text-[clamp(2.4rem,5vw,3.8rem)] font-medium uppercase leading-[0.92]">
            Заявка принята
          </h4>
          <p className="mt-5 max-w-md text-sm leading-7 text-bone/55">
            Спасибо{submittedName ? `, ${submittedName}` : ""}! Мы свяжемся с
            вами в ближайшее время.
          </p>
          <button
            type="button"
            onClick={resetForm}
            className="mt-9 inline-flex w-fit items-center gap-3 border border-bone/20 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.16em] text-bone/65 transition-colors hover:border-bone/50 hover:text-bone"
          >
            Отправить ещё одну заявку
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <form
          noValidate
          onSubmit={handleSubmit}
          className="mt-7 space-y-7 sm:mt-8"
        >
          <div>
            <label
              htmlFor="lead-name"
              className="block font-mono text-[9px] uppercase tracking-[0.18em] text-bone/55"
            >
              Имя
            </label>
            <input
              id="lead-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Как к вам обращаться"
              value={form.name}
              onChange={(event) => {
                setForm((current) => ({
                  ...current,
                  name: event.target.value,
                }));
                if (errors.name) {
                  setErrors((current) => ({ ...current, name: undefined }));
                }
              }}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "lead-name-error" : undefined}
              className={`mt-3 w-full border-b bg-transparent pb-3 text-base text-bone outline-none transition-colors placeholder:text-bone/50 focus:border-wine-light ${
                errors.name ? "border-red-400/70" : "border-bone/20"
              }`}
            />
            {errors.name && (
              <p
                id="lead-name-error"
                className="mt-2 font-mono text-[8px] uppercase tracking-[0.12em] text-red-400"
              >
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="lead-phone"
              className="block font-mono text-[9px] uppercase tracking-[0.18em] text-bone/55"
            >
              Номер телефона
            </label>
            <input
              id="lead-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+7 (___) ___-__-__"
              value={form.phone}
              onChange={(event) => {
                setForm((current) => ({
                  ...current,
                  phone: formatPhone(event.target.value),
                }));
                if (errors.phone) {
                  setErrors((current) => ({ ...current, phone: undefined }));
                }
              }}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "lead-phone-error" : undefined}
              className={`mt-3 w-full border-b bg-transparent pb-3 text-base tracking-wide text-bone outline-none transition-colors placeholder:text-bone/50 focus:border-wine-light ${
                errors.phone ? "border-red-400/70" : "border-bone/20"
              }`}
            />
            {errors.phone && (
              <p
                id="lead-phone-error"
                className="mt-2 font-mono text-[8px] uppercase tracking-[0.12em] text-red-400"
              >
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label className="group flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                name="consent"
                checked={form.consent}
                onChange={(event) => {
                  setForm((current) => ({
                    ...current,
                    consent: event.target.checked,
                  }));
                  if (errors.consent) {
                    setErrors((current) => ({
                      ...current,
                      consent: undefined,
                    }));
                  }
                }}
                className="peer sr-only"
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={
                  errors.consent ? "lead-consent-error" : undefined
                }
              />
              <span
                aria-hidden="true"
                className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center border border-bone/25 bg-transparent transition-colors duration-200 peer-checked:border-wine-light peer-checked:bg-wine peer-focus-visible:ring-2 peer-focus-visible:ring-wine-light peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-ink"
              >
                <CheckIcon
                  className={`h-3 w-3 text-bone transition-opacity duration-200 ${
                    form.consent ? "opacity-100" : "opacity-0"
                  }`}
                />
              </span>
              <span className="text-[11px] leading-5 text-bone/55 transition-colors group-hover:text-bone/65 sm:text-xs">
                Согласен на обработку персональных данных
              </span>
            </label>
            {errors.consent && (
              <p
                id="lead-consent-error"
                className="mt-2 font-mono text-[8px] uppercase tracking-[0.12em] text-red-400"
              >
                {errors.consent}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="group relative flex min-h-14 w-full items-center justify-between gap-6 overflow-hidden border border-wine bg-wine px-5 py-4 font-mono text-[10px] uppercase tracking-[0.17em] text-bone transition-colors hover:text-ink disabled:cursor-wait disabled:opacity-70"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 translate-y-full bg-bone transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
            />
            <span className="relative z-10">
              {status === "sending" ? "Отправляем..." : "Жду звонка"}
            </span>
            <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>

          {formError && (
            <p
              role="alert"
              className="border-l border-red-400 pl-3 text-xs leading-5 text-red-400"
            >
              {formError}
            </p>
          )}

          <p className="font-mono text-[8px] uppercase leading-4 tracking-[0.12em] text-bone/50">
            Нажимая кнопку, вы соглашаетесь на обработку персональных данных
          </p>
        </form>
      )}
    </div>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden py-20 md:py-28 lg:scroll-mt-24 lg:py-36"
    >
      <GridLines className="opacity-[0.35] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-64 left-1/4 h-[620px] w-[620px] rounded-full bg-wine/15 blur-[160px]"
      />

      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6 xl:col-span-5">
            <Reveal>
              <SectionTag index="06" label="Контакты" />
              <h2 className="mt-6 max-w-2xl font-display text-[clamp(2.6rem,5.5vw,5rem)] font-medium uppercase leading-[0.92] tracking-[-0.02em]">
                Остались вопросы
                <br />
                <span className="text-bone/40">или готовы начать?</span>
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-7 text-bone/55 sm:text-base">
                Оставьте заявку, и мы свяжемся с вами!
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-10 border-t border-bone/15">
                <div className="grid grid-cols-[92px_1fr] gap-4 border-b border-bone/15 py-5 sm:grid-cols-[110px_1fr]">
                  <span className="pt-1 font-mono text-[8px] uppercase tracking-[0.18em] text-bone/50">
                    Адрес
                  </span>
                  <a
                    href={CONTACTS.mapHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between gap-4 text-sm leading-6 text-bone/75 transition-colors hover:text-bone"
                  >
                    <span>{CONTACTS.address}</span>
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-bone/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-wine-light" />
                  </a>
                </div>

                <div className="grid grid-cols-[92px_1fr] gap-4 border-b border-bone/15 py-5 sm:grid-cols-[110px_1fr]">
                  <span className="pt-1 font-mono text-[8px] uppercase tracking-[0.18em] text-bone/50">
                    Телефон
                  </span>
                  <a
                    href={CONTACTS.phoneHref}
                    className="w-fit font-display text-[clamp(1.45rem,3vw,1.9rem)] uppercase leading-none text-bone transition-colors hover:text-wine-light"
                  >
                    {CONTACTS.phone}
                  </a>
                </div>

                <div className="grid grid-cols-[92px_1fr] gap-4 border-b border-bone/15 py-5 sm:grid-cols-[110px_1fr]">
                  <span className="pt-1 font-mono text-[8px] uppercase tracking-[0.18em] text-bone/50">
                    Мессенджеры
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={CONTACTS.telegramHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 border border-bone/20 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-bone/65 transition-colors hover:border-wine-light hover:text-bone"
                    >
                      Telegram
                      <ArrowUpRight className="h-3.5 w-3.5 text-bone/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-wine-light" />
                    </a>
                    <a
                      href={CONTACTS.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 border border-bone/20 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-bone/65 transition-colors hover:border-wine-light hover:text-bone"
                    >
                      WhatsApp
                      <ArrowUpRight className="h-3.5 w-3.5 text-bone/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-wine-light" />
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-[92px_1fr] gap-4 border-b border-bone/15 py-5 sm:grid-cols-[110px_1fr]">
                  <span className="pt-1 font-mono text-[8px] uppercase tracking-[0.18em] text-bone/50">
                    Реквизиты
                  </span>
                  <p className="text-sm leading-6 text-bone/65">
                    ИНН {CONTACTS.inn}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-8 flex items-center justify-between gap-6 border border-bone/10 bg-bone/[0.02] px-4 py-3">
                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-bone/50">
                  Калининград / РФ
                </span>
                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-bone/50">
                  54.7104° N / 20.4522° E
                </span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 xl:col-span-7 xl:pl-8">
            <Reveal delay={100}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   FOOTER                                   */
/* -------------------------------------------------------------------------- */

function Footer() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setYear(new Date().getFullYear());
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <footer className="relative overflow-hidden border-t border-bone/10 bg-ink">
      <Container className="relative z-10 pt-16 md:pt-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-7 text-bone/55">
              Отделочная компания «Фаворит-Строй». Качественный ремонт
              квартир и коммерческих объектов под ключ.
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-bone/50">
              Навигация
            </p>
            <nav
              aria-label="Навигация в подвале"
              className="mt-5 flex flex-col items-start gap-3"
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-bone/55 transition-colors hover:text-bone"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                className="text-sm text-bone/55 transition-colors hover:text-bone"
              >
                Контакты
              </a>
            </nav>
          </div>

          <div className="lg:col-span-4">
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-bone/50">
              Связаться
            </p>
            <a
              href={CONTACTS.phoneHref}
              className="mt-5 block font-display text-[clamp(1.8rem,3vw,2.5rem)] uppercase leading-none text-bone transition-colors hover:text-wine-light"
            >
              {CONTACTS.phone}
            </a>
            <p className="mt-4 max-w-xs text-sm leading-6 text-bone/55">
              {CONTACTS.address}
            </p>
            <p className="mt-2 max-w-xs font-mono text-[9px] uppercase tracking-[0.14em] text-bone/40">
              ИНН {CONTACTS.inn}
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-bone/10 py-6 font-mono text-[8px] uppercase tracking-[0.16em] text-bone/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} «Фаворит-Строй». Все права защищены.</p>
          <div className="flex items-center gap-5">
            <span>Калининград / РФ</span>
            <a
              href="#top"
              className="group inline-flex items-center gap-2 text-bone/55 transition-colors hover:text-bone"
            >
              Наверх
              <span className="transition-transform duration-300 group-hover:-translate-y-1">
                ↑
              </span>
            </a>
          </div>
        </div>
      </Container>

      <div
        aria-hidden="true"
        className="pointer-events-none relative z-0 -mb-[3vw] select-none overflow-hidden"
      >
        <svg
          role="presentation"
          viewBox="0 0 1200 200"
          className="block h-auto w-full"
        >
          <text
            x="600"
            y="170"
            textAnchor="middle"
            fill="rgba(242,239,232,0.035)"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 205,
              fontWeight: 600,
              letterSpacing: "-0.04em",
            }}
          >
            ФАВОРИТ-СТРОЙ
          </text>
        </svg>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-ink text-bone">
      <a
        href="#main"
        className="sr-only z-[100] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:bg-bone focus:px-4 focus:py-3 focus:font-mono focus:text-[10px] focus:uppercase focus:tracking-[0.15em] focus:text-ink"
      >
        Перейти к содержимому
      </a>

      <Header />

      <main id="main" className="flex-1">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Advantages />
        <Process />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
