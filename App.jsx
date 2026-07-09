import { motion, useReducedMotion } from 'framer-motion';

/* ==========================================================================
   КОНФИГУРАЦИЯ: WhatsApp и контактные данные СТО.
   Меняйте только эти константы — вся разметка обновится автоматически.
   ========================================================================== */

const WHATSAPP_PHONE = '77772824263'; // без "+" — формат, нужный для ссылки wa.me
const WHATSAPP_TEXT =
  'Здравствуйте! Я с сайта СТО, хочу записаться на ремонт и диагностику';

const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
  WHATSAPP_TEXT
)}`;

const PHONE_DISPLAY = '+7 777 282-42-63';
const PHONE_TEL = `tel:+${WHATSAPP_PHONE}`;

const ADDRESS = 'г. Алматы, ул. Тюлькубасская 4а';
const WORK_HOURS = 'Ежедневно, 10:00 – 18:00'; // TODO: уточните дни работы, если график отличается

const STO_NAME = 'DOSTAR AUTOSERVICE'; // TODO: замените на реальное название вашего СТО

/* ==========================================================================
   ИКОНКИ: минималистичные inline SVG без внешних зависимостей
   (жёсткие углы, strokeLinecap="square" — под брутальный стиль)
   ========================================================================== */

function IconSuspension({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className={className}>
      <path d="M4 20L10 14M14 10L20 4" />
      <rect x="9" y="9" width="6" height="6" transform="rotate(45 12 12)" />
    </svg>
  );
}

function IconDiagnostics({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className={className}>
      <rect x="4" y="4" width="16" height="16" />
      <path d="M8 8h2v2H8zM14 8h2v2h-2zM8 14h2v2H8zM14 14h2v2h-2z" />
    </svg>
  );
}

function IconOil({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className={className}>
      <path d="M12 3L6 12a6 6 0 1 0 12 0L12 3z" />
    </svg>
  );
}

function IconEngine({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className={className}>
      <rect x="3" y="8" width="12" height="10" />
      <path d="M15 11h4v4h-4zM6 8V5h5v3M9 18v2M13 18v2" />
    </svg>
  );
}

function IconTransmission({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className={className}>
      <circle cx="7" cy="7" r="3" />
      <circle cx="17" cy="17" r="3" />
      <path d="M10 7h4M7 10v4M17 14v-4h-4" />
    </svg>
  );
}

function IconAirConditioner({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className={className}>
      <path d="M12 2v20M2 12h20M5.5 5.5l13 13M18.5 5.5l-13 13" />
    </svg>
  );
}

function IconTimingBelt({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className={className}>
      <circle cx="8" cy="8" r="3" />
      <circle cx="16" cy="16" r="3" />
      <path d="M11 8h2M8 11v2M16 13v-2h-2" />
    </svg>
  );
}

function IconTimingChain({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className={className}>
      <rect x="3" y="10" width="5" height="4" />
      <rect x="10" y="10" width="5" height="4" />
      <rect x="17" y="10" width="4" height="4" />
      <path d="M8 12h2M15 12h2" />
    </svg>
  );
}

function IconPhone({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className={className}>
      <path d="M5 4h4l2 5-2.5 2.5a12 12 0 006 6L17 15l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
    </svg>
  );
}

/* ==========================================================================
   ДАННЫЕ УСЛУГ: код в стиле диагностического кода (OBD) — отсылка
   к разделу "Компьютерная диагностика" и общей технической эстетике.
   ========================================================================== */

const SERVICES = [
  {
    code: 'SUS-01',
    title: 'Ремонт ходовой части',
    description:
      'Замена амортизаторов, рычагов и сайлентблоков. Диагностика стуков и вибраций на подъёмнике.',
    Icon: IconSuspension,
  },
  {
    code: 'ECU-02',
    title: 'Компьютерная диагностика',
    description:
      'Полное сканирование электроники автомобиля. Считываем ошибки ЭБУ, ABS и AirBag за 30 минут.',
    Icon: IconDiagnostics,
  },
  {
    code: 'FLU-03',
    title: 'Замена масел и тех. жидкостей',
    description:
      'Моторное масло, тормозная и охлаждающая жидкость — строго по регламенту завода-изготовителя.',
    Icon: IconOil,
  },
  {
    code: 'ENG-04',
    title: 'Ремонт двигателей',
    description:
      'Капитальный и локальный ремонт ДВС любой сложности. Полная дефектовка перед началом работ.',
    Icon: IconEngine,
  },
  {
    code: 'TRM-05',
    title: 'Ремонт АКПП',
    description:
      'Ремонт и обслуживание автоматических коробок, роботов и вариаторов. Диагностика гидроблока и замена изношенных узлов.',
    Icon: IconTransmission,
  },
  {
    code: 'AC-06',
    title: 'Заправка автокондиционера',
    description:
      'Вакуумирование системы, проверка на герметичность, дозаправка качественным фреоном и добавление компрессорного масла.',
    Icon: IconAirConditioner,
  },
  {
    code: 'ENG-07',
    title: 'Замена ремня ГРМ',
    description:
      'Плановая замена приводного ремня, роликов и натяжителей. Предотвращаем обрыв ремня и повреждение клапанов двигателя.',
    Icon: IconTimingBelt,
  },
  {
    code: 'ENG-08',
    title: 'Замена цепи ГРМ',
    description:
      'Комплексная замена изношенной цепи ГРМ, успокоителей, натяжителей и шестерен по регламенту автопроизводителя.',
    Icon: IconTimingChain,
  },
];

/* ==========================================================================
   СИГНАТУРНЫЙ ЭЛЕМЕНТ: полоса "техники безопасности" (hazard tape).
   Статичный CSS-градиент, без анимации — нулевая нагрузка на рендер,
   при этом читается как разметка/лента на полу автосервиса.
   ========================================================================== */

function HazardStripe({ className = '' }) {
  return (
    <div
      className={`h-3 w-full ${className}`}
      style={{
        backgroundImage:
          'repeating-linear-gradient(135deg, #f97316 0px, #f97316 18px, #09090b 18px, #09090b 36px)',
      }}
      aria-hidden="true"
    />
  );
}

/* ==========================================================================
   ШАПКА САЙТА
   ========================================================================== */

   function Header() {
    return (
      <header className="sticky top-0 z-50 border-b-2 border-zinc-800 bg-zinc-900/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          
          {/* Логотип */}
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center border-2 border-zinc-700 text-orange-500 font-bold">
              ⚙️
            </span>
            <span className="font-mono text-lg font-black uppercase tracking-wider text-white">
              {STO_NAME}
            </span>
          </div>
  
          {/* Навигация (скрыта на мобилках для экономии места) */}
          <div className="hidden md:flex gap-4">
            <a href="#services" className="text-white hover:text-orange-500 transition-colors">Услуги</a>
            <a href="#contacts" className="text-white hover:text-orange-500 transition-colors">Контакты</a>
          </div>
  
          {/* Номера телефонов - ИСПРАВЛЕНО ДЛЯ МОБИЛОК */}
          <div className="flex flex-col gap-1 sm:gap-2 items-end sm:items-center">
            <a href="tel:+77772824263" className="flex items-center gap-2 text-white hover:text-orange-500 transition-colors">
              <IconPhone className="h-4 w-4" />
              <span className="text-xs sm:text-sm font-medium">+7 777 282-42-63</span>
            </a>
            <a href="tel:+77471644880" className="flex items-center gap-2 text-white hover:text-orange-500 transition-colors">
              <IconPhone className="h-4 w-4" />
              <span className="text-xs sm:text-sm font-medium">+7 747 164-48-80</span>
            </a>
          </div>
  
        </div>
      </header>
    );
  }

/* ==========================================================================
   ГЛАВНЫЙ ЭКРАН (HERO)
   Все анимации построены только на transform/opacity — эти свойства
   обрабатываются композитором GPU, не вызывают reflow/repaint,
   и держат стабильные 60 FPS даже на слабых мобильных чипах.
   useReducedMotion отключает бесконечные повторы для пользователей
   с настройкой "уменьшить движение" в ОС.
   ========================================================================== */

function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const bullets = [
    'ЛЮБАЯ ДИАГНОСТИКА НА ЛУЧШЕМ СОВРЕМЕННОМ ОБОРУДОВАНИИ',
    'ГАРАНТИЯ НА ВСЕ ВИДЫ РАБОТ',
    'ТОЛЬКО ОРИГИНАЛЬНЫЕ ЗАПЧАСТИ И СЕРТИФИЦИРОВАННЫЕ МАСТЕРА',
  ];

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section className="relative overflow-hidden bg-zinc-950 px-5 pb-20 pt-16 sm:pt-24">
      {/* Фоновая техническая сетка — статичный декор, не анимируется */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-5 inline-block border border-orange-500/60 px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-orange-500"
        >
          {'>> СТАТУС: ГОТОВЫ ПРИНЯТЬ АВТО'}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-4xl font-black uppercase leading-[1.05] tracking-tight text-zinc-50 sm:text-6xl"
        >
          Профессиональный ремонт и диагностика авто в Алматы
        </motion.h1>

        {/* 3 буллита с ключевыми преимуществами */}
        <motion.ul
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-8 flex flex-col gap-3"
        >
          {bullets.map((text) => (
            <motion.li
              key={text}
              variants={item}
              className="flex items-start gap-3 border-l-4 border-orange-500 bg-zinc-900 px-4 py-3 font-mono text-sm font-bold text-zinc-200 sm:text-base"
            >
              {text}
            </motion.li>
          ))}
        </motion.ul>

        {/* Большая пульсирующая кнопка CTA → WhatsApp */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative mt-10 inline-block"
        >
          {/* Свечение под кнопкой: анимируется только opacity (дёшево для GPU) */}
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-orange-500 blur-xl"
            animate={
              shouldReduceMotion ? { opacity: 0.3 } : { opacity: [0.25, 0.55, 0.25] }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            }
          />

          <motion.a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            animate={shouldReduceMotion ? { scale: 1 } : { scale: [1, 1.04, 1] }}
            transition={
              shouldReduceMotion
                ? undefined
                : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
            }
            whileTap={{ scale: 0.96 }}
            className="relative block border-2 border-orange-300 bg-orange-500 px-10 py-5 text-center font-mono text-lg font-black uppercase tracking-wide text-zinc-950 shadow-[6px_6px_0_0_#000] transition-shadow hover:shadow-[3px_3px_0_0_#000] active:shadow-none"
          >
            Записаться на диагностику
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

/* ==========================================================================
   БЛОК УСЛУГ: glassmorphism-карточки с волновой анимацией при скролле
   и микро-интерактивом (hover/tap). Контент SERVICES не изменяется.
   ========================================================================== */

const servicesContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const serviceCardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function ServiceCard({ code, title, description, Icon }) {
  const shouldReduceMotion = useReducedMotion();

  const hoverLift = shouldReduceMotion
    ? undefined
    : { y: -6, transition: { type: 'spring', stiffness: 380, damping: 22 } };

  const tapLift = shouldReduceMotion
    ? undefined
    : { y: -3, scale: 0.995, transition: { type: 'spring', stiffness: 500, damping: 28 } };

  return (
    <motion.article
      variants={serviceCardVariants}
      whileHover={hoverLift}
      whileTap={tapLift}
      className="group relative flex w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/45 p-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-orange-500/40 hover:shadow-[0_16px_48px_-12px_rgba(249,115,22,0.28)] sm:p-5 lg:p-6"
    >
      {/* Мягкий акцентный блик при hover */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/0 to-orange-500/0 opacity-0 transition-opacity duration-300 group-hover:from-orange-500/[0.06] group-hover:via-transparent group-hover:to-transparent group-hover:opacity-100"
        aria-hidden="true"
      />

      <div className="relative mb-3 flex items-center justify-between gap-2 sm:mb-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-300 transition-colors duration-300 group-hover:border-orange-500/50 group-hover:text-orange-400 sm:h-11 sm:w-11">
          <Icon className="h-[1.125rem] w-[1.125rem] sm:h-5 sm:w-5" />
        </div>
        <span className="shrink-0 font-mono text-[0.625rem] font-semibold tracking-wider text-zinc-500 sm:text-[0.6875rem]">
          {`CODE: ${code}`}
        </span>
      </div>

      <h3 className="relative mb-2 break-words text-[clamp(0.8125rem,2.8vw+0.35rem,1.25rem)] font-black uppercase leading-snug tracking-tight text-zinc-50">
        {title}
      </h3>
      <p className="relative mb-4 flex-1 break-words text-[clamp(0.6875rem,1.6vw+0.3rem,0.875rem)] leading-relaxed text-zinc-400 sm:mb-5">
        {description}
      </p>

      <motion.a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
        className="relative inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2.5 text-center font-mono text-[clamp(0.625rem,1.2vw+0.25rem,0.8125rem)] font-bold uppercase tracking-wide text-zinc-100 backdrop-blur-sm transition-colors duration-300 hover:border-orange-500/50 hover:bg-orange-500 hover:text-zinc-950 sm:px-4 sm:py-3"
      >
        Узнать стоимость
      </motion.a>
    </motion.article>
  );
}

function Services() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="services" className="relative overflow-x-hidden bg-zinc-950 px-4 py-12 sm:px-5 sm:py-20">
      {/* Фоновый градиент — подчёркивает эффект матового стекла карточек */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(249,115,22,0.06),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-8 flex items-end justify-between border-b border-white/5 pb-4 sm:mb-12 sm:pb-6"
        >
          <h2 className="text-[clamp(1.375rem,4vw+0.5rem,2.25rem)] font-black uppercase tracking-tight text-zinc-50">
            Услуги
          </h2>
          <span className="hidden font-mono text-xs font-bold uppercase tracking-widest text-zinc-600 sm:block">
            {'// 8 направлений работ'}
          </span>
        </motion.div>

        <motion.div
          variants={servicesContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid w-full grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4"
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.code} {...service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ==========================================================================
   ПОДВАЛ: адрес, график работы, контакты
   ========================================================================== */

function Footer() {
  return (
    <footer className="bg-zinc-950">
      <HazardStripe />
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <h4 className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-orange-500">
              Адрес
            </h4>
            <p className="text-zinc-300">{ADDRESS}</p>
          </div>

          <div>
            <h4 className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-orange-500">
              График работы
            </h4>
            <div className="text-zinc-400 text-sm">
              <span className="text-white font-bold">Пн–Сб:</span> 10:00–18:00 <br />
              <span className="text-orange-500 font-bold">Вс: Выходной</span>
            </div>
          </div>

          <div className="flex flex-col items-end text-right">
            <h4 className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-orange-500">
              Связь
            </h4>
            <div className="flex flex-col items-end gap-1">
              <a href="tel:+77772824263" className="text-zinc-300 hover:text-orange-500 transition-colors">
                +7 777 282-42-63
              </a>
              <a href="tel:+77471644880" className="text-zinc-300 hover:text-orange-500 transition-colors">
                +7 747 164-48-80
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-zinc-300 transition-colors hover:text-orange-500"
              >
                Написать в WhatsApp
              </a>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t-2 border-zinc-800 pt-6 font-mono text-xs text-zinc-600">
          © {new Date().getFullYear()} {STO_NAME}. Все права защищены.
        </p>
      </div>
    </footer>
  );
}

/* ==========================================================================
   ГЛАВНЫЙ КОМПОНЕНТ СТРАНИЦЫ
   ========================================================================== */

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-zinc-950 font-sans antialiased">
      <Header />
      <HazardStripe />
      <main>
        <Hero />
        <Services />
      </main>
      <Footer />
    </div>
  );
}






