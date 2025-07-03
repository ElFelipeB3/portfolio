"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Hammer,
  Castle,
  Mountain,
  Zap,
  Star,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Users,
  Award,
  Clock,
  ChevronDown,
  Settings,
  Video,
  MessageSquare,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface PageConfig {
  personalInfo: {
    name: string
    title: string
    email: string
    discord: string
    discordUsername: string // NUEVO: nombre de usuario de Discord
    description: string
  }
  hero: {
    title: string
    subtitle: string
    description: string
  }
  about: {
    title: string
    description1: string
    description2: string
    image?: string
  }
  services: Array<{
    icon: string
    iconFile?: string
    title: string
    description: string
    price: string
  }>
  stats: Array<{
    value: string
    label: string
    color: string
    icon: string
    iconFile?: string
  }>
  contact: {
    title: string
    description: string
    availability: string
    whyChooseMe: Array<string>
    icons: {
      email: string
      emailFile?: string
      discord: string
      discordFile?: string
      availability: string
      availabilityFile?: string
    }
  }
  footer: {
    tagline: string
    copyright: string
  }
  pagesTitles: {
    portfolio: {
      title: string
      description: string
    }
    cinematograficas: {
      title: string
      description: string
    }
    testimonials: {
      title: string
      description: string
    }
  }
}

export default function MinecraftPortfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const [pageConfig, setPageConfig] = useState<PageConfig | null>(null)
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    setIsVisible(true)

    // Cargar configuración de la página
    const savedConfig = localStorage.getItem("page-config")
    if (savedConfig) {
      const parsed = JSON.parse(savedConfig)

      // Asegurar que tiene el nuevo campo discordUsername
      if (!parsed.personalInfo.discordUsername) {
        parsed.personalInfo.discordUsername = "420felipeot"
      }

      setPageConfig(parsed)
    } else {
      // Configuración por defecto
      const defaultConfig: PageConfig = {
        personalInfo: {
          name: "ElFelipeB3",
          title: "Constructor Profesional de Minecraft",
          email: "andresler12345@gmail.com",
          discord: "https://discord.gg/invite/#464139874480685066",
          discordUsername: "420felipeot", // NUEVO CAMPO
          description:
            "Transformo tus ideas en realidades pixeladas. Constructor profesional de Minecraft con más de 5 años de experiencia creando mundos extraordinarios.",
        },
        hero: {
          title: "PORTFOLIO",
          subtitle: "ElFelipeB3",
          description:
            "Transformo tus ideas en realidades pixeladas. Constructor profesional de Minecraft con más de 5 años de experiencia creando mundos extraordinarios.",
        },
        about: {
          title: "Sobre Mí",
          description1:
            "Soy ElFelipeB3, un constructor profesional de Minecraft con una pasión inquebrantable por crear mundos extraordinarios. Durante más de 5 años, he perfeccionado mi arte transformando ideas simples en construcciones épicas que superan las expectativas.",
          description2:
            "Mi especialidad incluye desde castillos medievales hasta ciudades futuristas, siempre con un enfoque en los detalles y la calidad que hace que cada proyecto sea único y memorable.",
        },
        services: [
          {
            icon: "Castle",
            title: "Construcciones Personalizadas",
            description: "Diseño y construcción de estructuras únicas según tus especificaciones",
            price: "Desde $50",
          },
          {
            icon: "Mountain",
            title: "Terraforming",
            description: "Modificación completa del terreno para crear paisajes espectaculares",
            price: "Desde $30",
          },
          {
            icon: "Hammer",
            title: "Renovaciones",
            description: "Mejora y modernización de construcciones existentes",
            price: "Desde $25",
          },
          {
            icon: "Zap",
            title: "Redstone Engineering",
            description: "Sistemas complejos de redstone y automatización",
            price: "Desde $40",
          },
        ],
        stats: [
          { value: "500+", label: "Proyectos Completados", color: "emerald", icon: "Castle" },
          { value: "5+", label: "Años de Experiencia", color: "blue", icon: "Clock" },
          { value: "100%", label: "Satisfacción Cliente", color: "purple", icon: "Star" },
        ],
        contact: {
          title: "¿Listo Para Tu Proyecto?",
          description: "Contacta conmigo en Discord y hagamos realidad tu visión en Minecraft. Respondo rápidamente.",
          availability: "24/7 - Respuesta rápida",
          whyChooseMe: [
            "Calidad garantizada",
            "Precios competitivos",
            "Comunicación constante",
            "Revisiones ilimitadas",
          ],
          icons: {
            email: "Mail",
            discord: "MessageSquare",
            availability: "Clock",
          },
        },
        footer: {
          tagline: "Transformando ideas en realidades pixeladas desde 2019",
          copyright: "© 2024 ElFelipeB3. Todos los derechos reservados.",
        },
        pagesTitles: {
          portfolio: {
            title: "Mi Portfolio",
            description:
              "Explora mi colección completa de construcciones épicas en Minecraft. Cada proyecto representa horas de dedicación y atención al detalle.",
          },
          cinematograficas: {
            title: "Cinematográficas",
            description:
              "Explora mis videos cinematográficos épicos que muestran cada detalle y la magia de mis construcciones de Minecraft en movimiento.",
          },
          testimonials: {
            title: "Testimonios",
            description:
              "Comparte tu experiencia trabajando conmigo. Autentícate con tu cuenta de Minecraft para dejar tu testimonio.",
          },
        },
      }
      setPageConfig(defaultConfig)
      localStorage.setItem("page-config", JSON.stringify(defaultConfig))
    }

    // Agregar estilos CSS personalizados
    const style = document.createElement("style")
    style.textContent = `
      @keyframes reverse-spin {
        from { transform: rotate(360deg); }
        to { transform: rotate(0deg); }
      }
      .animate-reverse-spin {
        animation: reverse-spin 3s linear infinite;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  useEffect(() => {
    const savedTestimonials = localStorage.getItem("portfolio-testimonials")
    if (savedTestimonials) {
      const allTestimonials = JSON.parse(savedTestimonials)
      setTestimonials(allTestimonials.filter((t) => t.approved).slice(0, 3))
    }
  }, [])

  if (!pageConfig) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white">Cargando...</div>
      </div>
    )
  }

  const getColorClass = (color: string) => {
    const colors = {
      emerald: "text-emerald-400",
      blue: "text-blue-400",
      purple: "text-purple-400",
    }
    return colors[color as keyof typeof colors] || "text-emerald-400"
  }

  const getIcon = (iconName: string) => {
    const icons = { Castle, Mountain, Hammer, Zap, Mail, Phone, MapPin, Clock, Star, Award, Users }
    return icons[iconName as keyof typeof icons] || Castle
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%239C92AC fillOpacity=0.1%3E%3Cpath d=M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

        {/* Admin Button */}
        <Link href="/admin" className="absolute top-4 left-4 z-20">
          <Button
            size="sm"
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 bg-transparent backdrop-blur-sm"
          >
            <Settings className="w-4 h-4 mr-2" />
            Admin
          </Button>
        </Link>

        <div
          className={`container mx-auto px-4 text-center z-10 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="mb-8">
            <div className="relative mb-8">
              {/* Efectos de fondo animados */}
              <div className="absolute -inset-8 bg-gradient-to-r from-emerald-500/30 via-blue-500/30 to-purple-500/30 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -inset-6 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-emerald-500/20 rounded-full blur-xl animate-ping"></div>

              {/* Anillos orbitales */}
              <div className="absolute -inset-4 border-2 border-emerald-500/30 rounded-full animate-spin"></div>
              <div className="absolute -inset-2 border border-purple-500/40 rounded-full animate-reverse-spin"></div>

              {/* Foto de perfil principal */}
              <div className="relative w-32 h-32 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-full p-1 animate-pulse">
                  <div className="w-full h-full bg-slate-900 rounded-full p-1">
                    <Image
                      src="/images/perfil.png"
                      alt={`${pageConfig.personalInfo.name} Profile`}
                      width={120}
                      height={120}
                      className="w-full h-full object-cover rounded-full shadow-2xl"
                    />
                  </div>
                </div>

                {/* Destellos flotantes */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce opacity-80"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-emerald-400 rounded-full animate-bounce delay-300 opacity-80"></div>
                <div className="absolute top-1/2 -right-4 w-2 h-2 bg-purple-400 rounded-full animate-ping delay-500"></div>
                <div className="absolute top-1/4 -left-4 w-2 h-2 bg-blue-400 rounded-full animate-ping delay-700"></div>

                {/* Indicador de estado */}
                <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full p-2 animate-pulse">
                  <Castle className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              {pageConfig.hero.title}
            </h1>
            <div className="mb-4">
              <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {pageConfig.hero.subtitle}
              </span>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">{pageConfig.hero.description}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/portfolio">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Ver Mi Trabajo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/cinematograficas">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Video className="mr-2 w-5 h-5" />
                Cinematográficas
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {pageConfig.stats.map((stat, index) => {
              const IconComponent = getIcon(stat.icon)
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 text-center"
                >
                  {stat.iconFile ? (
                    <div className="w-8 h-8 mx-auto mb-3">
                      <Image
                        src={stat.iconFile || "/placeholder.svg"}
                        alt={stat.label}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <IconComponent className={`w-8 h-8 ${getColorClass(stat.color)} mx-auto mb-3`} />
                  )}
                  <div className={`text-3xl font-bold ${getColorClass(stat.color)} mb-2`}>{stat.value}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/60" />
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                {pageConfig.about.title}
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">{pageConfig.about.description1}</p>
              <p className="text-lg text-gray-300 leading-relaxed">{pageConfig.about.description2}</p>

              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="flex items-center space-x-3">
                  <Award className="w-6 h-6 text-emerald-400" />
                  <span className="text-gray-300">Certificado Profesional</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-300">Entrega Puntual</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-purple-400" />
                  <span className="text-gray-300">200+ Clientes Felices</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <span className="text-gray-300">5 Estrellas Promedio</span>
                </div>
              </div>
            </div>

            {pageConfig.about.image && (
              <div className="relative">
                <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                  <Image
                    src={pageConfig.about.image || "/placeholder.svg"}
                    alt={`${pageConfig.personalInfo.name} at work`}
                    width={500}
                    height={400}
                    className="rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-6">
              Mis Servicios
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ofrezco una amplia gama de servicios de construcción en Minecraft, adaptados a tus necesidades
              específicas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pageConfig.services.map((service, index) => {
              const Icon = getIcon(service.icon)
              return (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border-white/10 hover:from-white/10 hover:to-white/20 transition-all duration-300 transform hover:scale-105 text-center group"
                >
                  <CardHeader>
                    <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full w-fit group-hover:animate-pulse">
                      {service.iconFile ? (
                        <Image
                          src={service.iconFile || "/placeholder.svg"}
                          alt={service.title}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      ) : (
                        <Icon className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <CardTitle className="text-white text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-gray-300">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                      {service.price}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              Lo Que Dicen Mis Clientes
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              La satisfacción de mis clientes es mi mayor recompensa. Aquí tienes algunas de sus experiencias.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.length > 0
              ? testimonials.map((testimonial, index) => (
                  <Card
                    key={testimonial.id}
                    className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                          <Image
                            src={testimonial.playerSkin || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-white font-semibold">{testimonial.name}</div>
                          <Badge variant="outline" className="text-xs">
                            Minecraft Verificado
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <CardDescription className="text-gray-300 text-lg italic">"{testimonial.text}"</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-gray-400 text-sm">Proyecto: {testimonial.project}</div>
                    </CardContent>
                  </Card>
                ))
              : [
                  {
                    name: "Alex_Builder",
                    text: "Increíble trabajo en mi servidor. La calidad es excepcional y superó todas mis expectativas.",
                    rating: 5,
                    project: "Castillo Medieval",
                  },
                  {
                    name: "ServerOwner_Pro",
                    text: "Profesional, rápido y con una atención al detalle impresionante. Totalmente recomendado.",
                    rating: 5,
                    project: "Ciudad Spawn",
                  },
                  {
                    name: "MinecraftFan_2024",
                    text: "El mejor constructor con el que he trabajado. Entendió perfectamente mi visión.",
                    rating: 5,
                    project: "Base Futurista",
                  },
                ].map((testimonial, index) => (
                  <Card
                    key={index}
                    className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <CardDescription className="text-gray-300 text-lg italic">"{testimonial.text}"</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-white font-semibold">{testimonial.name}</div>
                          <div className="text-gray-400 text-sm">{testimonial.project}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/testimonials">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full"
              >
                Dejar Mi Testimonio
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section - MEJORADA */}
      <section className="py-20 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-6">
              {pageConfig.contact.title}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">{pageConfig.contact.description}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Información de contacto */}
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full">
                    {pageConfig.contact.icons.emailFile ? (
                      <Image
                        src={pageConfig.contact.icons.emailFile || "/placeholder.svg"}
                        alt="Email"
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    ) : (
                      <Mail className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <div className="text-white font-semibold">Email</div>
                    <div className="text-gray-300">{pageConfig.personalInfo.email}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                    {pageConfig.contact.icons.discordFile ? (
                      <Image
                        src={pageConfig.contact.icons.discordFile || "/placeholder.svg"}
                        alt="Discord"
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    ) : (
                      <MessageSquare className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <div className="text-white font-semibold">Discord</div>
                    <div className="text-purple-400">@{pageConfig.personalInfo.discordUsername}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-emerald-500 to-purple-500 rounded-full">
                    {pageConfig.contact.icons.availabilityFile ? (
                      <Image
                        src={pageConfig.contact.icons.availabilityFile || "/placeholder.svg"}
                        alt="Availability"
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    ) : (
                      <MapPin className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <div className="text-white font-semibold">Disponibilidad</div>
                    <div className="text-gray-300">{pageConfig.contact.availability}</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4">¿Por qué elegirme?</h3>
                  <ul className="space-y-2 text-gray-300">
                    {pageConfig.contact.whyChooseMe.map((reason, index) => (
                      <li key={index} className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-2" /> {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Botón directo a Discord - NUEVO */}
              <div className="text-center">
                <Card className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm border-purple-500/30">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <MessageSquare className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">¡Hablemos en Discord!</h3>
                      <p className="text-gray-300">
                        La forma más rápida de contactarme es a través de Discord. ¡Te respondo al instante!
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="text-white font-semibold mb-1">Mi Discord:</div>
                        <div className="text-purple-400 text-lg font-mono">
                          @{pageConfig.personalInfo.discordUsername}
                        </div>
                      </div>

                      <a
                        href={pageConfig.personalInfo.discord}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button
                          size="lg"
                          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                          <MessageSquare className="mr-3 w-6 h-6" />
                          Ir a Discord Ahora
                          <ArrowRight className="ml-3 w-6 h-6" />
                        </Button>
                      </a>

                      <p className="text-gray-400 text-sm">🚀 Respuesta garantizada en menos de 1 hora</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gradient-to-r from-slate-900 to-black border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Castle className="w-8 h-8 text-emerald-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                {pageConfig.personalInfo.name}
              </span>
            </div>
            <p className="text-gray-400 mb-6">{pageConfig.footer.tagline}</p>
            <div className="text-gray-500 text-sm">{pageConfig.footer.copyright}</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
