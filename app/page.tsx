"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Code, FileText, Lightbulb, Users, Calendar, Globe, Menu, X, ChevronDown, Linkedin, Mail, Trophy, Star, Rocket } from "lucide-react"
import { AnimatedText } from "@/components/animated-text"
import { WorldMap } from "@/components/world-map"
import { experiences } from "@/lib/experience-data"

function AnimatedCounter({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState("0")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const numericStr = value.replace(/[^0-9.]/g, "")
          const targetNum = Number.parseFloat(numericStr)
          const unit = value.replace(/[0-9.]/g, "")

          let current = 0
          const increment = targetNum / 60
          const interval = setInterval(() => {
            current += increment
            if (current >= targetNum) {
              setDisplayValue(`${targetNum}${unit}`)
              clearInterval(interval)
            } else {
              setDisplayValue(`${current.toFixed(1)}${unit}`.replace(".0", ""))
            }
          }, 16)

          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div className="text-4xl md:text-5xl" ref={ref}>
      {displayValue}
    </div>
  )
}

const partnerLogos = [
  { src: "/logos/frame-2.png", alt: "Partner 1" },
  { src: "/logos/frame-3.png", alt: "Partner 2" },
  { src: "/logos/frame-4.png", alt: "Partner 3" },
  { src: "/logos/frame-6.png", alt: "Partner 4" },
  { src: "/logos/frame-7.png", alt: "Partner 5" },
  { src: "/logos/frame-8.png", alt: "Partner 6" },
  { src: "/logos/frame-11.png", alt: "Partner 7" },
  { src: "/logos/frame-55.png", alt: "Partner 8" },
]

export default function EurekathonPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [selectedTrack, setSelectedTrack] = useState(0)
  const [dynamicWordIndex, setDynamicWordIndex] = useState(0)
  const [wordFade, setWordFade] = useState(true)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [selectedExperience, setSelectedExperience] = useState(experiences[0])
  const heroRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver>(null)

  const dynamicWords = ["ideas", "solutions", "innovations", "projects", "discoveries", "breakthroughs"]

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordFade(false)
      setTimeout(() => {
        setDynamicWordIndex((prev) => (prev + 1) % dynamicWords.length)
        setWordFade(true)
      }, 300)
    }, 3000)

    return () => clearInterval(wordInterval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsLoaded(true)

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedTrack((prev) => (prev + 1) % 2)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const categories = [
    { name: "Computer Science + AI", icon: Code },
    { name: "Biology/Medical & Environmental", icon: FileText },
    { name: "Math & Physics", icon: Lightbulb },
    { name: "Economics", icon: Globe },
    { name: "Problem in the Community", icon: Users },
    { name: "Other", icon: Lightbulb },
  ]

  return (
    <div className="relative min-h-screen bg-[#0B0C0F] text-[#F2F3F5] overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-6 left-6 md:w-auto md:right-auto right-6 z-40 border border-white/10 backdrop-blur-md bg-[#0B0C0F]/80 rounded-[16px]">
        <div className="w-full mx-auto px-6">
          <div className="flex items-center gap-6 md:h-14 h-14">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-lg md:text-xl font-semibold font-mono hover:text-[#1e90ff] transition-colors duration-300"
            >
              EUREKATHON
            </button>

            <nav className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection("about")} className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors duration-300">About</button>
              <button onClick={() => scrollToSection("tracks")} className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors duration-300">Tracks</button>
              <button onClick={() => scrollToSection("schedule")} className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors duration-300">Schedule</button>
              <button onClick={() => scrollToSection("faq")} className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors duration-300">FAQ</button>
              <a href="https://discord.gg/wECtZ3csKb" target="_blank" rel="noopener noreferrer" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors duration-300">Discord</a>
            </nav>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden ml-auto p-2 hover:bg-white/5 rounded-lg transition-colors duration-300" aria-label="Toggle menu">
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#0B0C0F]/95 backdrop-blur-md z-50 flex flex-col items-start justify-end pb-20 pt-20 px-6">
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-lg transition-colors duration-300" aria-label="Close menu">
            <X className="w-6 h-6" />
          </button>
          <div className="flex flex-col gap-8 items-start text-left w-full">
            <button onClick={() => scrollToSection("about")} className="font-serif text-5xl md:text-7xl font-light text-[#F2F3F5] hover:text-[#1e90ff] transition-colors duration-300">About</button>
            <button onClick={() => scrollToSection("tracks")} className="font-serif text-5xl md:text-7xl font-light text-[#F2F3F5] hover:text-[#1e90ff] transition-colors duration-300">Tracks</button>
            <button onClick={() => scrollToSection("schedule")} className="font-serif text-5xl md:text-7xl font-light text-[#F2F3F5] hover:text-[#1e90ff] transition-colors duration-300">Schedule</button>
            <button onClick={() => scrollToSection("faq")} className="font-serif text-5xl md:text-7xl font-light text-[#F2F3F5] hover:text-[#1e90ff] transition-colors duration-300">FAQ</button>
            <a href="https://discord.gg/wECtZ3csKb" target="_blank" rel="noopener noreferrer" className="font-serif text-5xl md:text-7xl font-light text-[#F2F3F5] hover:text-[#1e90ff] transition-colors duration-300">Discord</a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section ref={heroRef} className={`relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 md:pt-32 md:pb-24 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${isLoaded ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"}`} style={{ backgroundImage: `url('https://thumbs.dreamstime.com/b/programming-code-abstract-technology-background-software-deve-developer-computer-script-96434780.jpg')`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ transform: `translateY(${scrollY * 0.5}px)`, backgroundImage: `url('https://thumbs.dreamstime.com/b/programming-code-abstract-technology-background-software-deve-developer-computer-script-96434780.jpg')`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-[#0B0C0F]/70 pointer-events-none" />

        <div className="max-w-[1120px] w-full mx-auto relative z-10" style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-[#1a1d24] border border-white/[0.07] px-4 py-2 rounded-full mb-6 text-xs md:text-sm text-[#A7ABB3] stagger-reveal">
                            September 27 - October 25, 2025
            </div>
            <h1 className="font-serif text-[44px] leading-[1.1] md:text-[72px] md:leading-[1.05] font-medium mb-6 text-balance">
              <span className={`block stagger-reveal text-5xl font-light transition-all duration-500 md:text-7xl ${wordFade ? "opacity-100 blur-0" : "opacity-0 blur-lg"}`}>
                Transform <AnimatedText key={dynamicWordIndex} text={dynamicWords[dynamicWordIndex]} delay={0} />
              </span>
              <span className="block stagger-reveal text-5xl font-light md:text-7xl" style={{ animationDelay: "90ms" }}>
                into <span className="text-[#1e90ff]">impact</span>
              </span>
            </h1>
            <p className="text-[#A7ABB3] text-base md:text-lg max-w-[600px] mx-auto mb-8 leading-relaxed stagger-reveal text-white" style={{ animationDelay: "180ms" }}>
              A 5-week global innovation challenge blending science fairs and hackathons. Research or code your way to innovation across multiple STEM tracks!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center stagger-reveal" style={{ animationDelay: "270ms" }}>
              <a href="https://discord.gg/wECtZ3csKb" target="_blank" rel="noopener noreferrer">
                <Button className="px-8 py-6 text-base rounded-full bg-[#1e90ff] hover:bg-[#1a7fe0] text-white font-medium transition-colors duration-200">Join Discord</Button>
              </a>
              <Button onClick={() => scrollToSection("about")} className="px-8 py-6 text-base rounded-full bg-transparent border border-white/20 hover:bg-white/[0.06] hover:border-white/30 transition-all duration-200 text-white">Learn More</Button>
            </div>
          </div>

          <div className="mt-12 md:mt-16 stagger-reveal grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6" style={{ animationDelay: "360ms" }}>
            {[{ icon: Globe, label: "Online Event" }, { icon: Users, label: "Ages 13-19" }, { icon: Calendar, label: "5 Weeks" }, { icon: Lightbulb, label: "Beginner Friendly" }].map((item, i) => (
              <div key={i} className="bg-[#1a1d24] border border-white/[0.07] rounded-xl p-4 md:p-6 text-center hover:bg-[#1f2330] transition-colors duration-200">
                <item.icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-[#1e90ff]" />
                <span className="text-xs md:text-sm text-[#A7ABB3]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="relative py-12 md:py-20 px-4 animate-on-scroll">
        <div className="max-w-[1200px] w-full mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl dashboard-image">
            <Image
              src="https://thumbs.dreamstime.com/b/programming-code-abstract-technology-background-software-deve-developer-computer-script-96434780.jpg"
              alt="Eurekathon Platform Preview"
              width={1200}
              height={675}
              className="w-full h-auto"
            />
          </div>
          <p className="text-center text-[#A7ABB3] text-sm mt-6">Platform preview - Track your progress and connect with mentors</p>
        </div>
      </section>

      {/* Partner Logos Marquee */}
      <section className="relative py-12 md:py-16 px-4 animate-on-scroll border-y border-white/5">
        <div className="max-w-[1120px] w-full mx-auto">
          <p className="text-center text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-8">Trusted by leading organizations</p>
          <div className="logo-marquee">
            <div className="logo-marquee-content">
              {[...partnerLogos, ...partnerLogos].map((logo, i) => (
                <div key={i} className="flex items-center justify-center mx-8 md:mx-12">
                  <Image src="https://univadev.com/univadev.svg" alt={logo.alt} width={120} height={40} className="h-8 md:h-10 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section with Stats */}
      <section id="about" className="relative py-20 md:py-32 px-4 animate-on-scroll md:pt-24 md:pb-20">
        <div className="max-w-[1120px] w-full mx-auto">
          <h2 className="font-serif text-[32px] leading-[1.15] md:text-[48px] md:leading-[1.1] font-medium mb-6 md:mb-8 text-center text-balance">
            Innovation <span className="text-[#1e90ff]">Without Limits</span>
          </h2>
          <p className="text-[#A7ABB3] text-sm md:text-base mb-12 md:mb-16 text-center max-w-[700px] mx-auto leading-relaxed">
            Eurekathon combines the spirit of a science fair with the creativity of a hackathon. Whether you want to code, research, or both - this is your chance to innovate across multiple categories and share your vision with a global community.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-[900px] mx-auto">
            {[
              { label: "PARTICIPANTS", value: "237+", desc: "from around the world", color: "#1e90ff" },
              { label: "CATEGORIES", value: "6", desc: "STEM subject areas", color: "#f5a623" },
              { label: "TRACKS", value: "2", desc: "Coding & Research", color: "#22c55e" },
            ].map((metric, i) => (
              <div key={i} className="p-6 md:p-8 text-center bg-[#1a1d24] border border-white/[0.07] rounded-2xl hover:bg-[#1f2330] transition-all duration-200" style={{ borderColor: `${metric.color}22` }}>
                <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] mb-3 flex items-center justify-center gap-2" style={{ color: metric.color }}>
                  {metric.label}
                </div>
                <div className="font-serif leading-none font-medium" style={{ color: metric.color }}><AnimatedCounter value={metric.value} /></div>
                <div className="text-[11px] md:text-xs text-[#A7ABB3] mt-3">{metric.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section 1 - Coding Track with Image */}
      <section className="relative py-20 md:py-32 px-4 animate-on-scroll">
        <div className="max-w-[1120px] w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#1e90ff] mb-4 flex items-center gap-2">
                <Code className="w-4 h-4" />
                CODING TRACK
              </div>
              <h3 className="font-serif text-[28px] leading-[1.15] md:text-[40px] md:leading-[1.1] font-medium mb-6 text-balance">
                Build real solutions with <span className="text-[#1e90ff]">code</span>
              </h3>
              <p className="text-[#A7ABB3] text-sm md:text-base mb-8 leading-relaxed">
                Create functional prototypes, apps, websites, AI models, or simulations. Perfect for developers and aspiring engineers who want to turn their ideas into working software.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {["Web Apps", "AI/ML Models", "Mobile Apps", "Simulations"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-[#A7ABB3]">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.07]">
                <Image
                  src="https://thumbs.dreamstime.com/b/programming-code-abstract-technology-background-software-deve-developer-computer-script-96434780.jpg"
                  alt="Coding Track - Build apps and technical solutions"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 2 - Research Track with Image */}
      <section className="relative py-20 md:py-32 px-4 animate-on-scroll">
        <div className="max-w-[1120px] w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.07]">
                <Image
                  src="https://thumbs.dreamstime.com/b/programming-code-abstract-technology-background-software-deve-developer-computer-script-96434780.jpg"
                  alt="Research Track - Scientific research and analysis"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#f5a623] mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                RESEARCH TRACK
              </div>
              <h3 className="font-serif text-[28px] leading-[1.15] md:text-[40px] md:leading-[1.1] font-medium mb-6 text-balance">
                Explore ideas through <span className="text-[#f5a623]">research</span>
              </h3>
              <p className="text-[#A7ABB3] text-sm md:text-base mb-8 leading-relaxed">
                Conduct background research and create literature reviews, theoretical frameworks, or experimental designs. Ideal for those who love deep analysis and scientific inquiry.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {["Literature Reviews", "Data Analysis", "Experimental Design", "Theoretical Framework"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-[#A7ABB3]">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 3 - Workshops with Image */}
      <section className="relative py-20 md:py-32 px-4 animate-on-scroll">
        <div className="max-w-[1120px] w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#22c55e] mb-4 flex items-center gap-2">
                <Star className="w-4 h-4" />
                WORKSHOPS & MENTORSHIP
              </div>
              <h3 className="font-serif text-[28px] leading-[1.15] md:text-[40px] md:leading-[1.1] font-medium mb-6 text-balance">
                Learn from <span className="text-[#22c55e]">industry experts</span>
              </h3>
              <p className="text-[#A7ABB3] text-sm md:text-base mb-8 leading-relaxed">
                Attend weekly workshops on AI, computer science, medicine, and more. Get guidance from mentors and hear from guest speakers who are leaders in their fields.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {["Weekly Workshops", "Expert Mentors", "Guest Speakers", "Office Hours"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-[#A7ABB3]">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.07]">
                <Image
                  src="https://thumbs.dreamstime.com/b/programming-code-abstract-technology-background-software-deve-developer-computer-script-96434780.jpg"
                  alt="Workshop Sessions - Learn from experts"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach Section with World Map */}
      <section className="relative py-20 md:py-32 px-4 animate-on-scroll">
        <div className="max-w-[1120px] w-full mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-6 flex items-center justify-center gap-2">
                            GLOBAL COMMUNITY
            </div>
            <h2 className="font-serif text-[32px] leading-[1.15] md:text-[48px] md:leading-[1.1] font-medium mb-6 text-balance">
              Innovators from <span className="text-[#1e90ff]">around the world</span>
            </h2>
            <p className="text-[#A7ABB3] text-sm md:text-base max-w-[600px] mx-auto leading-relaxed">
              Join 237+ participants from across the globe in a truly international innovation challenge
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.07] p-4 md:p-8 bg-[#1a1d24]">
            <WorldMap 
              experiences={experiences} 
              selectedExperience={selectedExperience} 
              onSelectExperience={setSelectedExperience} 
            />
          </div>
        </div>
      </section>

      {/* Tracks Section */}
      <section id="tracks" className="relative py-20 md:py-32 px-4 animate-on-scroll">
        <div className="max-w-[1120px] w-full mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-6 flex items-center justify-center gap-2">
              TWO PATHS TO INNOVATION
            </div>
            <h2 className="font-serif text-[32px] leading-[1.15] md:text-[48px] md:leading-[1.1] font-medium mb-6 text-balance">
              Choose Your <span className="text-[#1e90ff]">Track</span>
            </h2>
            <p className="text-[#A7ABB3] text-sm md:text-base max-w-[600px] mx-auto leading-relaxed">We offer two tracks so participants can showcase their strengths</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[{ title: "Coding Track", icon: Code, desc: "Build a functional prototype, app, website, simulation, or other coded solution. Perfect for developers and aspiring engineers.", items: ["Apps & websites", "AI models", "Simulations", "Technical solutions"] }, { title: "Research Track", icon: FileText, desc: "Conduct background research and create a literature review, theoretical framework, or experimental design around your chosen problem.", items: ["Literature reviews", "Experimental designs", "Theoretical frameworks", "Data analysis"] }].map((track, i) => (
              <div key={i} className={`rounded-2xl p-8 md:p-10 border transition-all duration-200 ${selectedTrack === i ? "bg-[#1f2330] border-[#1e90ff]/30" : "bg-[#1a1d24] border-white/[0.07] hover:bg-[#1f2330] hover:border-white/15"}`}>
                <track.icon className={`w-10 h-10 mb-6 ${selectedTrack === i ? "text-[#1e90ff]" : "text-[#1e90ff]/60"}`} />
                <h3 className="text-xl md:text-2xl font-medium mb-4">{track.title}</h3>
                <p className="text-[#A7ABB3] text-sm md:text-base leading-relaxed mb-6">{track.desc}</p>
                <ul className="space-y-2">
                  {track.items.map((item, j) => (<li key={j} className="flex items-center gap-2 text-sm text-[#A7ABB3]">{item}</li>))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-medium mb-4">Subject Categories</h3>
            <p className="text-[#A7ABB3] text-sm md:text-base max-w-[500px] mx-auto">Within each track, participants can choose from 6 categories</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((cat, i) => {
              const catColor = i % 3 === 0 ? "#1e90ff" : i % 3 === 1 ? "#f5a623" : "#22c55e"
              return (
              <div key={i} className="bg-[#1a1d24] rounded-xl p-4 md:p-6 flex items-center gap-3 border border-white/[0.07] hover:bg-[#1f2330] transition-all duration-200" style={{ borderColor: `${catColor}22` }}>
                <cat.icon className="w-5 h-5 flex-shrink-0" style={{ color: catColor }} />
                <span className="text-sm md:text-base">{cat.name}</span>
              </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section className="relative py-20 md:py-32 px-4 animate-on-scroll">
        <div className="max-w-[1120px] w-full mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-6 flex items-center justify-center gap-2">
                            WIN AMAZING PRIZES
            </div>
            <h2 className="font-serif text-[32px] leading-[1.15] md:text-[48px] md:leading-[1.1] font-medium mb-6 text-balance">
              Prizes for <span className="text-[#f5a623]">all participants</span>
            </h2>
            <p className="text-[#A7ABB3] text-sm md:text-base max-w-[600px] mx-auto leading-relaxed">
              Compete for awesome prizes and scholarships to research programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Trophy, title: "Grand Prize", desc: "Scholarships to prestigious research programs and exclusive mentorship opportunities", color: "#1e90ff" },
              { icon: Star, title: "Track Winners", desc: "Category-specific prizes for top performers in Coding and Research tracks", color: "#f5a623" },
              { icon: Rocket, title: "All Participants", desc: "Certificates, exclusive swag, and networking opportunities for everyone who submits", color: "#22c55e" },
            ].map((prize, i) => (
              <div key={i} className="bg-[#1a1d24] rounded-2xl p-8 border border-white/[0.07] hover:bg-[#1f2330] transition-all duration-200 text-center" style={{ borderColor: `${prize.color}22` }}>
                <prize.icon className="w-10 h-10 mx-auto mb-6" style={{ color: prize.color }} />
                <h3 className="text-xl font-medium mb-3">{prize.title}</h3>
                <p className="text-[#A7ABB3] text-sm leading-relaxed">{prize.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="relative py-20 md:py-32 px-4 animate-on-scroll bg-[#0B0C0F]">
        <div className="max-w-[900px] w-full mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-6 flex items-center justify-center gap-2">
              5 WEEKS OF INNOVATION
            </div>
            <h2 className="font-serif text-[32px] leading-[1.15] md:text-[48px] md:leading-[1.1] font-medium mb-6 text-balance">
              Program <span className="text-[#f5a623]">Schedule</span>
            </h2>
          </div>

          <div className="space-y-6">
            {[{ week: "Week 1", title: "Opening Ceremony & Ideation", items: ["Opening Ceremony", "Mission & Goals", "Design Thinking & Idea Selection", "Subject Workshops (CS, AI, Medical)"] }, { week: "Week 2", title: "Workshops & Team Development", items: ["Continued workshops", "Team development", "Mentorship sessions"] }, { week: "Week 3", title: "Presentation Prep", items: ["How to Pitch Workshop", "Presentation Prep Workshop", "Project feedback sessions"] }, { week: "Week 4", title: "Solution Development", items: ["Asynchronous work time", "Office hours", "One-on-one mentoring"] }, { week: "Week 5", title: "Submissions & Awards", items: ["Project Submissions (max 4-min video)", "Judging", "Award & Closing Ceremony", "Guest Speaker Panel"] }].map((week, i) => (
              <div key={i} className="bg-[#1a1d24] rounded-2xl p-6 md:p-8 border border-white/[0.07] hover:bg-[#1f2330] hover:border-[#1e90ff]/20 transition-all duration-200">
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                  <div className="flex-shrink-0"><span className="inline-block px-4 py-2 rounded-full border border-[#f5a623]/30 text-[#f5a623] text-sm font-medium">{week.week}</span></div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-medium mb-3">{week.title}</h3>
                    <ul className="flex flex-wrap gap-2">{week.items.map((item, j) => (<li key={j} className="text-xs md:text-sm text-[#A7ABB3] bg-[#1f2330] border border-white/[0.06] px-3 py-1 rounded-full">{item}</li>))}</ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative py-20 md:py-32 px-4 animate-on-scroll">
        <div className="max-w-[800px] w-full mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-6 flex items-center justify-center gap-2">
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="font-serif text-[32px] leading-[1.15] md:text-[48px] md:leading-[1.1] font-medium mb-6 text-balance">
              Got <span className="text-[#22c55e]">questions</span>?
            </h2>
            <p className="text-[#A7ABB3] text-sm md:text-base max-w-[600px] mx-auto leading-relaxed">Everything you need to know about Eurekathon 2025</p>
          </div>

          <div className="space-y-4">
            {[{ question: "Who can participate in Eurekathon?", answer: "Eurekathon is open to high school students aged 13-19 from all countries worldwide. You can compete individually or with a team of up to 4 members." }, { question: "Do I need coding experience to participate?", answer: "Not at all! We offer two tracks - a Coding Track for those who want to build technical solutions, and a Research Track for those who prefer literature reviews, theoretical frameworks, or experimental designs. We also provide workshops throughout the competition to help beginners learn." }, { question: "What do I need to submit?", answer: "You need to submit a project video (max 4 minutes), a written project description, and either code documentation (for Coding Track with a GitHub repo link) or a research PDF (for Research Track). Live demos are recommended but not required for coding projects." }, { question: "Can I use AI tools in my project?", answer: "AI use for writing code/research documents is allowed but discouraged. AI use for ideation and support is encouraged. Quality is a judging criteria, so make sure your work demonstrates genuine understanding and effort." }, { question: "Are projects created before the hackathon permitted?", answer: "Yes, projects created before the hackathon timeframe are permitted, however they will receive a point deduction during judging." }, { question: "How do I join and stay updated?", answer: "Join our Discord server for announcements, workshops, and updates. You can also follow us on Instagram. For any questions, email us at eureka.institute.contact@gmail.com or ask in the Questions channel on Discord." }].map((faq, i) => (
              <div key={i} className="bg-[#1a1d24] border border-white/[0.07] rounded-xl overflow-hidden transition-all duration-200 hover:bg-[#1f2330] hover:border-white/15">
                <button onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left">
                  <span className="text-base md:text-lg font-medium pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 text-[#A7ABB3] transition-transform duration-300 ${openFaqIndex === i ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                  <p className="px-6 pb-6 text-sm md:text-base text-[#A7ABB3] leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="relative py-24 md:py-40 px-4 animate-on-scroll overflow-hidden bg-[#0B0C0F]">
        <div className="max-w-[800px] w-full mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#1a1d24] border border-white/[0.07] px-4 py-2 rounded-full mb-8 text-xs md:text-sm text-[#A7ABB3]">
            Ready to innovate?
          </div>
          <h2 className="font-serif text-[40px] leading-[1.15] md:text-[64px] md:leading-[1.1] font-medium mb-6 text-balance">Join the global innovation movement</h2>
          <p className="text-[#A7ABB3] text-base md:text-lg mb-10 leading-relaxed max-w-[560px] mx-auto">Code, research, and win prizes. Join hundreds of students from around the world in Eurekathon 2025.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://discord.gg/wECtZ3csKb" target="_blank" rel="noopener noreferrer">
              <Button className="text-base rounded-full bg-[#1e90ff] hover:bg-[#1a7fe0] text-white font-medium transition-colors duration-200 px-8 py-6">Join Discord Server</Button>
            </a>
            <a href="https://www.eurekainstitute.xyz/" target="_blank" rel="noopener noreferrer">
              <Button className="text-base rounded-full bg-transparent border border-white/20 hover:bg-white/[0.06] hover:border-white/30 transition-all duration-200 text-white px-8 py-6">Visit Eureka Institute</Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-4 border-t border-white/5 py-8">
        <div className="max-w-[1120px] w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
            <div className="flex flex-col gap-4">
              <div className="text-lg font-semibold font-mono">EUREKATHON 2025</div>
              <p className="text-xs text-[#A7ABB3] leading-relaxed">A 5-week global innovation challenge by Eureka Institute and Ignite STEAM Club.</p>
              <div className="flex items-center gap-4 mt-2">
                <a href="https://www.instagram.com/eureka.institute.npo/" target="_blank" rel="noopener noreferrer" className="text-[#A7ABB3] hover:text-[#1e90ff] transition-colors" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://discord.gg/wECtZ3csKb" target="_blank" rel="noopener noreferrer" className="text-[#A7ABB3] hover:text-[#1e90ff] transition-colors" aria-label="Discord">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
                </a>
                <a href="https://www.youtube.com/@eurekainstitute0" target="_blank" rel="noopener noreferrer" className="text-[#A7ABB3] hover:text-[#1e90ff] transition-colors" aria-label="YouTube">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="https://www.linkedin.com/company/eureka-institute-npo/" target="_blank" rel="noopener noreferrer" className="text-[#A7ABB3] hover:text-[#1e90ff] transition-colors" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-xs uppercase tracking-[0.15em] text-[#F2F3F5] font-semibold mb-2">Quick Links</div>
              <div className="flex flex-col gap-3">
                <button onClick={() => scrollToSection("about")} className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors text-left">About</button>
                <button onClick={() => scrollToSection("tracks")} className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors text-left">Tracks</button>
                <button onClick={() => scrollToSection("schedule")} className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors text-left">Schedule</button>
                <button onClick={() => scrollToSection("faq")} className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors text-left">FAQ</button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-xs uppercase tracking-[0.15em] text-[#F2F3F5] font-semibold mb-2">Resources</div>
              <div className="flex flex-col gap-3">
                <a href="https://www.eurekainstitute.xyz/" target="_blank" rel="noopener noreferrer" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">Eureka Institute</a>
                <a href="https://discord.gg/wECtZ3csKb" target="_blank" rel="noopener noreferrer" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">Discord Server</a>
                <a href="https://docs.google.com/document/d/1Y7UJF9GO88y6imqEjcE2kyPyv6QwieMmWFFdpY8GVAM/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">Research Template</a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-xs uppercase tracking-[0.15em] text-[#F2F3F5] font-semibold mb-2">Contact</div>
              <p className="text-xs text-[#A7ABB3] mb-3">Questions? Reach out to us!</p>
              <a href="mailto:eureka.institute.contact@gmail.com" className="flex items-center gap-2 text-sm text-[#A7ABB3] hover:text-[#1e90ff] transition-colors"><Mail className="w-4 h-4" />eureka.institute.contact@gmail.com</a>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#A7ABB3]">
            <div>2025 Eureka Institute. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="https://www.eurekainstitute.xyz/" target="_blank" rel="noopener noreferrer" className="hover:text-[#F2F3F5] transition-colors">Eureka Institute</a>
              <a href="https://www.instagram.com/eureka.institute.npo/" target="_blank" rel="noopener noreferrer" className="hover:text-[#F2F3F5] transition-colors">Instagram</a>
              <a href="https://discord.gg/wECtZ3csKb" target="_blank" rel="noopener noreferrer" className="hover:text-[#F2F3F5] transition-colors">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
