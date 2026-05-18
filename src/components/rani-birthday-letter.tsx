"use client"

import { AnimatePresence, motion } from "motion/react"
import { Flower, Volume2, VolumeX } from "lucide-react"
import { useRef, useState } from "react"

const SERIF = "'Cormorant Garamond', Georgia, serif"
const SCRIPT = "'Dancing Script', cursive"
const YOUTUBE_VIDEO_ID = "o4dJGT7S9Jc"

type LetterItem = {
  kind: "letter"
  kicker?: string
  heading: string
  body: string
}

type PhotoItem = {
  kind: "photo"
  src?: string
  alt?: string
  caption?: string
  rotate?: number
}

type Item = LetterItem | PhotoItem

const items: Item[] = [
  {
    kind: "letter",
    kicker: "Pembuka",
    heading: "Sebelum dunia bangun",
    body: "Aku menulis ini saat langit masih ragu\nantara malam dan pagi,\nsaat hanya doa yang berani bersuara.\n\nAku ingin menjadi yang pertama,\nsebelum dunia menyentuh harimu,\nmengucap: selamat datang\ndi usiamu yang baru.",
  },
  {
    kind: "letter",
    kicker: "Tentang kebaikanmu",
    heading: "Hatimu yang lembut",
    body: "Kamu memperlakukan orang\nseperti hujan memperlakukan tanah:\ntidak memilih, tidak menghakimi,\nhanya menyiram apa yang membutuhkan.\n\nAku belajar dari caramu,\nbahwa kelembutan bukan kelemahan,\nia hanya bahasa\nyang lebih sunyi.",
  },
  {
    kind: "letter",
    kicker: "Tentang tawamu",
    heading: "Suara yang menenangkan",
    body: "Tawamu adalah jendela\nyang dibuka di siang yang pengap.\n\nKalau Tuhan memberiku satu suara\nuntuk kubawa ke mana pun aku pergi,\naku tidak akan ragu memilih:\nsuara tawamu.",
  },
  {
    kind: "letter",
    kicker: "Tentang kekuatanmu",
    heading: "Yang diam-diam kamu pikul",
    body: "Ada hal-hal yang kamu pikul\ntanpa pernah meletakkannya\ndi pundak orang lain.\n\nAku tahu, sayang.\nAku selalu tahu.\n\nDan setiap kali kamu tersenyum\ndi balik beban itu,\naku belajar tentang keberanian\nyang tidak ditulis di buku mana pun.",
  },
  {
    kind: "photo",
    src: "https://r2.ilzam.dev/rani-imut.jpeg",
    caption: "foto kamu ter-favorit",
    rotate: -2,
  },
  {
    kind: "letter",
    kicker: "Tentang kita",
    heading: "Hal-hal kecil yang kuingat",
    body: "Caramu menggenggam tanganku saat menyeberang.\nCaramu memilih lagu di perjalanan.\nCaramu menatap saat aku bercerita\ntentang yang tidak penting.\n\nBagi orang lain, mungkin biasa.\nBagiku, mereka adalah seluruh dunia\nyang kubawa pulang setiap malam.",
  },
  {
    kind: "letter",
    kicker: "Yang aku syukuri",
    heading: "Jalan yang membawamu padaku",
    body: "Dari semua jalan yang mungkin kuambil,\nTuhan memilihkanku satu,\nyang berakhir di pertemuan denganmu.\n\nAku tidak pernah cukup berterima kasih\nuntuk takdir yang terdengar seperti puisi:\nkamu, ada, di hidupku.",
  },
  {
    kind: "letter",
    kicker: "Janjiku untuk tahun ini",
    heading: "Janji yang sederhana",
    body: "Aku tidak akan menjanjikan kesempurnaan,\nsebab janji semacam itu\nhanya retak di tengah jalan.\n\nTapi aku berjanji:\nuntuk lebih hadir saat kamu lelah,\nlebih diam saat kamu butuh didengar,\nlebih berani saat kamu butuh sandaran.\n\nKamu pantas mendapatkan\nyang terbaik dari diriku,\ndan aku akan terus belajar\nmenjadi itu.",
  },
  {
    kind: "letter",
    kicker: "Doaku untukmu",
    heading: "Doa yang kutitipkan langit",
    body: "Semoga Allah lapangkan dadamu\nseluas langit di pagi yang baru.\n\nSemoga Ia jaga hatimu dari yang melukai,\ndan dekatkan kamu\npada apa yang membuatmu tumbuh.\n\nSemoga setiap doa baik\nyang pernah kamu ucapkan untuk orang lain,\nkembali padamu,\nberlipat, berlipat, berlipat ganda.",
  },
]

const totalLetters = items.filter((i) => i.kind === "letter").length + 1

export function RaniBirthdayLetter() {
  const [opened, setOpened] = useState(false)
  const [muted, setMuted] = useState(false)
  const audioRef = useRef<HTMLIFrameElement>(null)

  const handleOpen = () => {
    if (opened) return
    setOpened(true)
    setTimeout(() => {
      document.getElementById("letter-start")?.scrollIntoView({ behavior: "smooth" })
    }, 1400)
  }

  const toggleMute = () => {
    const next = !muted
    setMuted(next)
    audioRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: next ? "mute" : "unMute", args: "" }),
      "*"
    )
  }

  let letterIdx = 0

  return (
    <main className="bg-amber-50 text-stone-800">
      <Envelope opened={opened} onOpen={handleOpen} />
      <BackgroundMusic opened={opened} audioRef={audioRef} />
      <MuteToggle opened={opened} muted={muted} onToggle={toggleMute} />
      <AnimatePresence>
        {opened && (
          <motion.div
            id="letter-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            {items.map((item, i) => {
              if (item.kind === "letter") {
                letterIdx += 1
                return (
                  <LetterSection
                    key={i}
                    section={item}
                    index={letterIdx}
                    total={totalLetters}
                  />
                )
              }
              return <PhotoSection key={i} photo={item} />
            })}
            <Closing />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

function BackgroundMusic({
  opened,
  audioRef,
}: {
  opened: boolean
  audioRef: React.RefObject<HTMLIFrameElement | null>
}) {
  if (!opened) return null
  const src = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&playsinline=1&rel=0&loop=1&playlist=${YOUTUBE_VIDEO_ID}&enablejsapi=1`
  return (
    <iframe
      ref={audioRef}
      src={src}
      title="background music"
      allow="autoplay; encrypted-media"
      className="pointer-events-none fixed bottom-0 right-0 h-px w-px opacity-0"
      aria-hidden="true"
    />
  )
}

function MuteToggle({
  opened,
  muted,
  onToggle,
}: {
  opened: boolean
  muted: boolean
  onToggle: () => void
}) {
  return (
    <AnimatePresence>
      {opened && (
        <motion.button
          onClick={onToggle}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-rose-200 bg-amber-50/90 text-rose-700 shadow-md backdrop-blur transition-colors hover:bg-amber-100"
          aria-label={muted ? "Nyalakan musik" : "Matikan musik"}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </motion.button>
      )}
    </AnimatePresence>
  )
}

function Envelope({ opened, onOpen }: { opened: boolean; onOpen: () => void }) {
  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center px-6 py-12">
      <Petals />

      <motion.div
        className="z-10 mb-10 text-center md:mb-12"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <p className="text-xs uppercase tracking-widest text-rose-400/80">Sebuah surat</p>
        <p
          className="mt-3 text-4xl text-rose-700 md:text-5xl"
          style={{ fontFamily: SCRIPT }}
        >
          Untuk Rani
        </p>
      </motion.div>

      <motion.button
        onClick={onOpen}
        whileHover={{ scale: opened ? 1 : 1.02 }}
        whileTap={{ scale: opened ? 1 : 0.98 }}
        className="relative z-10 h-48 w-72 cursor-pointer select-none focus:outline-none md:h-64 md:w-96"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        aria-label="Buka surat"
        style={{ perspective: 1200 }}
      >
        <div
          className="absolute inset-0 rounded-sm shadow-xl"
          style={{
            background:
              "linear-gradient(180deg, #fef3c7 0%, #fde9b8 60%, #f7d99a 100%)",
          }}
        />

        <div
          className="absolute inset-x-0 bottom-0 top-1/2"
          style={{
            background:
              "linear-gradient(180deg, rgba(180,120,80,0.06) 0%, rgba(180,120,80,0.12) 100%)",
          }}
        />

        <div
          className="absolute inset-x-0 bottom-0 top-1/2 opacity-50"
          style={{
            background:
              "linear-gradient(135deg, transparent 49%, rgba(180,120,80,0.18) 50%, transparent 51%), linear-gradient(45deg, transparent 49%, rgba(180,120,80,0.18) 50%, transparent 51%)",
          }}
        />

        <motion.div
          className="absolute inset-x-0 top-0 z-20 origin-top"
          animate={
            opened
              ? { rotateX: -180 }
              : { rotateX: 0, y: [0, -2, 0] }
          }
          transition={
            opened
              ? { duration: 1.2, ease: [0.65, 0, 0.35, 1] }
              : { y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } }
          }
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="h-24 w-full md:h-32"
            style={{
              background:
                "linear-gradient(180deg, #fde9b8 0%, #f7d99a 100%)",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            }}
          />
        </motion.div>

        <AnimatePresence>
          {!opened && (
            <motion.div
              className="absolute left-1/2 top-16 z-30 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full shadow-md md:top-24 md:h-14 md:w-14"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, #d97766 0%, #b03b3b 80%)",
              }}
              initial={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0, rotate: -30 }}
              transition={{ duration: 0.5 }}
            >
              <span
                className="text-amber-50"
                style={{ fontFamily: SCRIPT, fontSize: "1.5rem" }}
              >
                R
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {!opened && (
          <motion.p
            className="z-10 mt-10 text-xs uppercase tracking-widest text-stone-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            Sentuh untuk membuka
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {opened && (
          <motion.div
            className="z-10 mt-10 flex flex-col items-center text-stone-500"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <p className="text-xs uppercase tracking-widest">Gulir untuk membaca</p>
            <motion.div
              className="mt-3 h-8 w-px bg-stone-400"
              animate={{ scaleY: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ transformOrigin: "top" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function LetterSection({
  section,
  index,
  total,
}: {
  section: LetterItem
  index: number
  total: number
}) {
  return (
    <section className="relative flex flex-col items-center justify-center px-6 py-12 md:px-12 md:py-16">
      <motion.div
        className="max-w-xl text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Flourish />

        {section.kicker && (
          <motion.p
            className="mb-5 text-xs uppercase tracking-widest text-rose-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {section.kicker}
          </motion.p>
        )}

        <motion.h2
          className="mb-8 text-4xl leading-tight text-rose-700 md:text-6xl"
          style={{ fontFamily: SCRIPT }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {section.heading}
        </motion.h2>

        <motion.p
          className="whitespace-pre-line text-lg leading-loose text-stone-700 md:text-xl md:leading-loose"
          style={{ fontFamily: SERIF }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          {section.body}
        </motion.p>

        <motion.div
          className="mt-12 text-xs tracking-widest text-stone-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </motion.div>
      </motion.div>
    </section>
  )
}

function PhotoSection({ photo }: { photo: PhotoItem }) {
  const rotate = photo.rotate ?? -2

  return (
    <section className="relative flex flex-col items-center justify-center px-6 py-16 md:px-12 md:py-20">
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 30, rotate: rotate - 4 }}
        whileInView={{ opacity: 1, y: 0, rotate }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      >
        <div className="bg-white p-4 shadow-2xl md:p-5">
          <div className="relative h-80 w-64 overflow-hidden bg-stone-200 md:h-96 md:w-80">
            {photo.src ? (
              <img
                src={photo.src}
                alt={photo.alt ?? photo.caption ?? "Foto"}
                className="h-full w-full object-cover"
              />
            ) : (
              <PhotoPlaceholder />
            )}
          </div>
          {photo.caption && (
            <p
              className="mt-4 text-center text-xl text-stone-600 md:text-2xl"
              style={{ fontFamily: SCRIPT }}
            >
              {photo.caption}
            </p>
          )}
        </div>

        <div
          className="absolute left-1/2 top-0 h-6 w-20 -translate-x-1/2 -translate-y-4 rounded-sm opacity-60 shadow-sm md:h-7 md:w-24"
          style={{
            background:
              "linear-gradient(135deg, rgba(244,200,180,0.85) 0%, rgba(232,170,150,0.7) 100%)",
            transform: `translateX(-50%) translateY(-50%) rotate(${-rotate * 1.5}deg)`,
          }}
        />
      </motion.div>
    </section>
  )
}

function PhotoPlaceholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-rose-100 via-amber-100 to-rose-200 text-stone-500">
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        className="mb-3 opacity-60"
      >
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <circle cx="9" cy="11" r="2" />
        <path d="M21 17l-5-5-9 9" />
      </svg>
      <p className="text-xs uppercase tracking-widest opacity-70">Letakkan foto di sini</p>
    </div>
  )
}

function Closing() {
  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center px-6 py-20 md:px-12">
      <motion.div
        className="max-w-xl text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Flourish />

        <motion.h2
          className="text-4xl leading-tight text-rose-700 md:text-5xl"
          style={{ fontFamily: SCRIPT }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Selamat ulang tahun, Rani.
        </motion.h2>

        <motion.p
          className="mt-8 whitespace-pre-line text-lg italic leading-loose text-stone-600 md:text-xl md:leading-loose"
          style={{ fontFamily: SERIF }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          {"Aku menyayangimu,\nhari ini, esok,\ndan setiap hari\nyang Tuhan masih berkenan\nmenulis namamu\ndi sebelah namaku."}
        </motion.p>

        <motion.div
          className="mt-16 flex flex-col items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1 }}
        >
          <div className="mb-3 h-px w-12 bg-rose-300" />
          <p
            className="text-5xl text-rose-700 md:text-6xl"
            style={{ fontFamily: SCRIPT, fontWeight: 700 }}
          >
            Ilzam
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}

function Flourish() {
  return (
    <div className="mb-8 flex justify-center">
      <svg
        width="64"
        height="20"
        viewBox="0 0 64 20"
        fill="none"
        className="text-rose-300"
      >
        <path
          d="M2 10 Q14 2 22 10 T42 10"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="48" cy="10" r="2" fill="currentColor" />
        <path
          d="M52 10 L62 10"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

function Petals() {
  const petals = Array.from({ length: 12 })
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((_, i) => {
        const left = (i * 37) % 100
        const delay = (i % 6) * 0.8
        const duration = 9 + (i % 5)
        const size = 16 + (i % 4) * 6
        const tone = i % 3 === 0 ? "text-rose-300/70" : i % 3 === 1 ? "text-rose-400/60" : "text-amber-300/70"
        return (
          <motion.div
            key={i}
            className={`absolute -top-6 ${tone}`}
            style={{ left: `${left}%` }}
            initial={{ y: -20, opacity: 0 }}
            animate={{
              y: ["-5%", "110vh"],
              x: [0, 20, -10, 15, 0],
              opacity: [0, 0.9, 0.9, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Flower size={size} strokeWidth={1.2} />
          </motion.div>
        )
      })}
    </div>
  )
}
