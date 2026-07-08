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
  
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-4">
              <a href="#services" className="text-white hover:text-orange-500 transition-colors"> </a>
              <a href="#contacts" className="text-white hover:text-orange-500 transition-colors"> </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+77772824263" className="flex items-center gap-1 text-white hover:text-orange-500 transition-colors">
                <IconPhone className="h-4 w-4" />
                <span className="hidden sm:inline">+7 777 282-42-63</span>
              </a>
              <a href="tel:+77471644880" className="flex items-center gap-1 text-white hover:text-orange-500 transition-colors">
                <IconPhone className="h-4 w-4" />
                <span className="hidden sm:inline">+7 747 164-48-80</span>
              </a>
            </div>
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
   БЛОК УСЛУГ: сетка карточек с анимацией появления при скролле
   (whileInView + viewport once:true — анимация срабатывает один раз,
   не пересчитывается при каждом повторном скролле)
   ========================================================================== */

function ServiceCard({ code, title, description, Icon }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.div
      variants={cardVariants}
      className="group flex flex-col border-2 border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-orange-500"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center border-2 border-zinc-700 text-zinc-300 transition-colors group-hover:border-orange-500 group-hover:text-orange-500">
          <Icon className="h-6 w-6" />
        </div>
        <span className="font-mono text-xs font-bold text-zinc-600">{`CODE: ${code}`}</span>
      </div>

      <h3 className="mb-2 text-xl font-black uppercase tracking-tight text-zinc-50">
        {title}
      </h3>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-zinc-300">
        {description}
      </p>

      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center border-2 border-zinc-700 bg-zinc-950 px-5 py-3 font-mono text-sm font-bold uppercase tracking-wide text-zinc-100 transition-all hover:border-orange-500 hover:bg-orange-500 hover:text-zinc-950 active:translate-x-px active:translate-y-px"
      >
        Узнать стоимость
      </a>
    </motion.div>
  );
}

function Services() {
  const gridVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <section className="bg-zinc-950 px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-end justify-between border-b-2 border-zinc-800 pb-6">
          <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-50 sm:text-4xl">
            Услуги
          </h2>
          <span className="hidden font-mono text-xs font-bold uppercase tracking-widest text-zinc-600 sm:block">
            {'// 4 направления работ'}
          </span>
        </div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
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
    <div className="min-h-screen bg-zinc-950 font-sans antialiased">
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