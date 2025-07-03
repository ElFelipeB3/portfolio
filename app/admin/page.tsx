"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Castle,
  Plus,
  Edit,
  ArrowLeft,
  Video,
  Star,
  LogOut,
  Users,
  MessageSquare,
  Settings,
  Globe,
  Mail,
  Phone,
  MapPin,
  Hammer,
  Mountain,
  Zap,
  Award,
  Clock,
  Eye,
  Heart,
  Shield,
  Rocket,
  Crown,
  Gem,
  Palette,
  Camera,
  Code,
  Gamepad2,
  Headphones,
  Monitor,
  Smartphone,
  Wifi,
  Database,
  Server,
  Cloud,
  Search,
  Filter,
  Download,
  Upload,
  Share,
  Link,
  Home,
  Building,
  TreePine,
  Waves,
  Sun,
  Moon,
  Sparkles,
  Flame,
  Snowflake,
  Leaf,
  Flower,
  Fish,
  Bird,
  Cat,
  Dog,
  Rabbit,
  Turtle,
  FlowerIcon as Butterfly,
  Compass,
  Map,
  Trophy,
  Target,
  Pickaxe,
  Wrench,
  WrenchIcon as Screwdriver,
  Drill,
  Ruler,
  PaintBucket,
  Brush,
  Gift,
  TrendingUp,
  BarChart,
  PieChart,
  Activity,
  Satellite,
  Lightbulb,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Diamond,
  Shapes,
} from "lucide-react"
import NextLink from "next/link"
import { useRouter } from "next/navigation"

interface Project {
  id: string
  title: string
  description: string
  images: string[]
  category: string
  rating: number
  views: string
  featured: boolean
  createdAt: string
}

interface VideoContent {
  id: string
  title: string
  description: string
  videoFile: string
  thumbnail: string
  views: string
  featured: boolean
  createdAt: string
}

interface Testimonial {
  id: string
  name: string
  text: string
  rating: number
  project: string
  minecraftUuid: string
  playerSkin: string
  createdAt: string
  approved: boolean
}

interface PageConfig {
  personalInfo: {
    name: string
    title: string
    email: string
    discord: string
    discordUsername: string // NUEVO CAMPO
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

// Lista completa de iconos disponibles
const availableIcons = {
  // Construcción y herramientas
  Castle,
  Hammer,
  Mountain,
  Zap,
  Pickaxe,
  Wrench,
  Screwdriver,
  Drill,
  Ruler,
  PaintBucket,
  Brush,
  // Comunicación
  Mail,
  Phone,
  MessageSquare,
  Headphones,
  Smartphone,
  Wifi,
  // Ubicación y tiempo
  MapPin,
  Clock,
  Compass,
  Map,
  Home,
  Building,
  // Logros y calidad
  Award,
  Trophy,
  Star,
  Crown,
  Gem,
  Target,
  Shield,
  // Tecnología
  Monitor,
  Database,
  Server,
  Cloud,
  Code,
  Gamepad2,
  Rocket,
  Satellite,
  // Naturaleza
  TreePine,
  Waves,
  Sun,
  Moon,
  Leaf,
  Flower,
  Snowflake,
  Flame,
  // Animales
  Fish,
  Bird,
  Cat,
  Dog,
  Rabbit,
  Turtle,
  Butterfly,
  // Formas y diseño
  Circle,
  Square,
  Triangle,
  Hexagon,
  Diamond,
  Shapes,
  Palette,
  Camera,
  // Estadísticas y datos
  TrendingUp,
  BarChart,
  PieChart,
  Activity,
  Eye,
  Users,
  // Otros útiles
  Settings,
  Globe,
  Search,
  Filter,
  Upload,
  Download,
  Share,
  Link,
  Gift,
  Lightbulb,
  Heart,
  Sparkles,
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [videos, setVideos] = useState<VideoContent[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [pageConfig, setPageConfig] = useState<PageConfig | null>(null)
  const [activeTab, setActiveTab] = useState("projects")
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)

  // Estados para proyectos
  const [isEditingProject, setIsEditingProject] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [projectFormData, setProjectFormData] = useState({
    title: "",
    description: "",
    images: [] as string[],
    category: "Medieval",
    rating: 5,
    views: "0",
    featured: false,
  })

  // Estados para videos
  const [isEditingVideo, setIsEditingVideo] = useState(false)
  const [editingVideo, setEditingVideo] = useState<VideoContent | null>(null)
  const [videoFormData, setVideoFormData] = useState({
    title: "",
    description: "",
    videoFile: "",
    thumbnail: "",
    views: "0",
    featured: false,
  })

  const categories = ["Medieval", "Futurista", "Oriental", "Sci-Fi", "Moderno", "Fantasia", "Realista"]

  // Función para generar thumbnail automático del video
  const generateVideoThumbnail = (videoFile: string): Promise<string> => {
    return new Promise((resolve) => {
      const video = document.createElement("video")
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      video.addEventListener("loadedmetadata", () => {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        video.currentTime = 2
      })

      video.addEventListener("seeked", () => {
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
          const thumbnail = canvas.toDataURL("image/jpeg", 0.8)
          resolve(thumbnail)
        }
      })

      video.src = videoFile
    })
  }

  // Función para manejar múltiples imágenes - SIN LÍMITES
  const handleMultipleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const fileArray = Array.from(files)

      const invalidFiles = fileArray.filter((file) => !file.type.startsWith("image/"))
      if (invalidFiles.length > 0) {
        alert("Por favor selecciona solo archivos de imagen")
        return
      }

      const oversizedFiles = fileArray.filter((file) => file.size > 10 * 1024 * 1024) // Aumentado a 10MB
      if (oversizedFiles.length > 0) {
        alert("Algunas imágenes son muy grandes. Máximo 10MB por imagen.")
        return
      }

      const promises = fileArray.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onload = (e) => resolve(e.target?.result as string)
          reader.readAsDataURL(file)
        })
      })

      Promise.all(promises).then((results) => {
        setProjectFormData({
          ...projectFormData,
          images: [...projectFormData.images, ...results],
        })
      })
    }
  }

  // Función para manejar videos con thumbnail automático - SIN LÍMITES
  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("video/")) {
        alert("Por favor selecciona un archivo de video válido")
        return
      }

      if (file.size > 500 * 1024 * 1024) {
        // Aumentado a 500MB
        alert("El video es muy grande. Máximo 500MB permitido.")
        return
      }

      const reader = new FileReader()
      reader.onload = async (e) => {
        const videoFile = e.target?.result as string

        try {
          const thumbnail = await generateVideoThumbnail(videoFile)
          setVideoFormData({
            ...videoFormData,
            videoFile: videoFile,
            thumbnail: thumbnail,
          })
        } catch (error) {
          console.error("Error generando thumbnail:", error)
          setVideoFormData({ ...videoFormData, videoFile: videoFile })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Función para manejar thumbnail manual de video
  const handleVideoThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Por favor selecciona una imagen para el thumbnail")
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("La imagen es muy grande. Máximo 5MB permitido.")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setVideoFormData({ ...videoFormData, thumbnail: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  // Función para manejar imagen de "Sobre Mí"
  const handleAboutImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Por favor selecciona una imagen válida")
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("La imagen es muy grande. Máximo 5MB permitido.")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        if (pageConfig) {
          setPageConfig({
            ...pageConfig,
            about: {
              ...pageConfig.about,
              image: e.target?.result as string,
            },
          })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Función para manejar iconos personalizados
  const handleIconUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "service" | "stat" | "contact",
    index?: number,
    contactType?: "email" | "discord" | "availability",
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Por favor selecciona una imagen válida para el icono")
        return
      }

      if (file.size > 1 * 1024 * 1024) {
        alert("El icono es muy grande. Máximo 1MB permitido.")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const iconFile = e.target?.result as string

        if (!pageConfig) return

        if (type === "service" && typeof index === "number") {
          const newServices = [...pageConfig.services]
          newServices[index].iconFile = iconFile
          setPageConfig({ ...pageConfig, services: newServices })
        } else if (type === "stat" && typeof index === "number") {
          const newStats = [...pageConfig.stats]
          newStats[index].iconFile = iconFile
          setPageConfig({ ...pageConfig, stats: newStats })
        } else if (type === "contact" && contactType) {
          setPageConfig({
            ...pageConfig,
            contact: {
              ...pageConfig.contact,
              icons: {
                ...pageConfig.contact.icons,
                [`${contactType}File`]: iconFile,
              },
            },
          })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Verificar autenticación
  useEffect(() => {
    const session = localStorage.getItem("admin-session")
    if (session) {
      const sessionData = JSON.parse(session)
      const isValid =
        sessionData.authenticated &&
        sessionData.user === "1005484303" &&
        Date.now() - sessionData.timestamp < 24 * 60 * 60 * 1000

      if (isValid) {
        setIsAuthenticated(true)
      } else {
        localStorage.removeItem("admin-session")
        router.push("/admin/login")
      }
    } else {
      router.push("/admin/login")
    }
  }, [router])

  // Cargar datos - SIN LÍMITES
  useEffect(() => {
    if (isAuthenticated) {
      // Cargar TODOS los proyectos
      const savedProjects = localStorage.getItem("portfolio-projects")
      if (savedProjects) {
        const loadedProjects = JSON.parse(savedProjects)
        const migratedProjects = loadedProjects.map((project: any) => ({
          ...project,
          images: project.images || (project.image ? [project.image] : []),
        }))
        setProjects(migratedProjects) // TODOS los proyectos
      }

      // Cargar TODOS los videos
      const savedVideos = localStorage.getItem("portfolio-videos")
      if (savedVideos) {
        setVideos(JSON.parse(savedVideos)) // TODOS los videos
      }

      // Cargar testimonios
      const savedTestimonials = localStorage.getItem("portfolio-testimonials")
      if (savedTestimonials) {
        setTestimonials(JSON.parse(savedTestimonials))
      }

      // Cargar configuración de página
      const savedConfig = localStorage.getItem("page-config")

      const defaultExtra = {
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
        contact: {
          icons: { email: "Mail", discord: "MessageSquare", availability: "Clock" },
        },
      }

      if (savedConfig) {
        const parsed = JSON.parse(savedConfig)

        // Asegurar que tiene el nuevo campo discordUsername
        if (!parsed.personalInfo.discordUsername) {
          parsed.personalInfo.discordUsername = "420felipeot"
        }

        if (!parsed.pagesTitles) parsed.pagesTitles = defaultExtra.pagesTitles
        if (!parsed.contact) parsed.contact = { ...defaultExtra.contact, ...(parsed.contact || {}) }
        if (!parsed.contact.icons) parsed.contact.icons = defaultExtra.contact.icons
        if (!parsed.about) parsed.about = { image: "", title: "", description1: "", description2: "" }

        localStorage.setItem("page-config", JSON.stringify(parsed))
        setPageConfig(parsed)
      } else {
        // Configuración por defecto expandida
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
            image: "",
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
            { value: "500+", label: "Proyectos Completados", color: "emerald", icon: "Trophy" },
            { value: "5+", label: "Años de Experiencia", color: "blue", icon: "Clock" },
            { value: "100%", label: "Satisfacción Cliente", color: "purple", icon: "Heart" },
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
    }
  }, [isAuthenticated])

  const handleLogout = () => {
    localStorage.removeItem("admin-session")
    router.push("/admin/login")
  }

  // Funciones para proyectos
  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newProject: Project = {
      id: editingProject?.id || Date.now().toString(),
      ...projectFormData,
      createdAt: editingProject?.createdAt || new Date().toISOString(),
    }

    let updatedProjects
    if (editingProject) {
      updatedProjects = projects.map((p) => (p.id === editingProject.id ? newProject : p))
    } else {
      updatedProjects = [newProject, ...projects]
    }

    setProjects(updatedProjects)
    localStorage.setItem("portfolio-projects", JSON.stringify(updatedProjects))
    resetProjectForm()
  }

  const resetProjectForm = () => {
    setProjectFormData({
      title: "",
      description: "",
      images: [],
      category: "Medieval",
      rating: 5,
      views: "0",
      featured: false,
    })
    setIsEditingProject(false)
    setEditingProject(null)
  }

  // Funciones para videos
  const handleVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newVideo: VideoContent = {
      id: editingVideo?.id || Date.now().toString(),
      ...videoFormData,
      createdAt: editingVideo?.createdAt || new Date().toISOString(),
    }

    let updatedVideos
    if (editingVideo) {
      updatedVideos = videos.map((v) => (v.id === editingVideo.id ? newVideo : v))
    } else {
      updatedVideos = [newVideo, ...videos]
    }

    setVideos(updatedVideos)
    localStorage.setItem("portfolio-videos", JSON.stringify(updatedVideos))
    resetVideoForm()
  }

  const resetVideoForm = () => {
    setVideoFormData({
      title: "",
      description: "",
      videoFile: "",
      thumbnail: "",
      views: "0",
      featured: false,
    })
    setIsEditingVideo(false)
    setEditingVideo(null)
  }

  const handleEditVideo = (video: VideoContent) => {
    setEditingVideo(video)
    setVideoFormData({
      title: video.title,
      description: video.description,
      videoFile: video.videoFile,
      thumbnail: video.thumbnail,
      views: video.views,
      featured: video.featured,
    })
    setIsEditingVideo(true)
  }

  const handleDeleteVideo = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este video?")) {
      const updatedVideos = videos.filter((v) => v.id !== id)
      setVideos(updatedVideos)
      localStorage.setItem("portfolio-videos", JSON.stringify(updatedVideos))
    }
  }

  const handleApproveTestimonial = (id: string) => {
    const updatedTestimonials = testimonials.map((t) => (t.id === id ? { ...t, approved: !t.approved } : t))
    setTestimonials(updatedTestimonials)
    localStorage.setItem("portfolio-testimonials", JSON.stringify(updatedTestimonials))
  }

  const handleDeleteTestimonial = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este testimonio?")) {
      const updatedTestimonials = testimonials.filter((t) => t.id !== id)
      setTestimonials(updatedTestimonials)
      localStorage.setItem("portfolio-testimonials", JSON.stringify(updatedTestimonials))
    }
  }

  const removeImage = (index: number) => {
    const newImages = projectFormData.images.filter((_, i) => i !== index)
    setProjectFormData({ ...projectFormData, images: newImages })
  }

  // Función para guardar configuración de página
  const handleSavePageConfig = () => {
    if (pageConfig) {
      localStorage.setItem("page-config", JSON.stringify(pageConfig))
      alert("Configuración guardada exitosamente")
    }
  }

  // Función para obtener el componente de icono
  const getIconComponent = (iconName: string) => {
    return availableIcons[iconName as keyof typeof availableIcons] || Castle
  }

  // Función para agregar nuevo servicio
  const addService = () => {
    if (pageConfig) {
      const newService = {
        icon: "Castle",
        title: "Nuevo Servicio",
        description: "Descripción del servicio",
        price: "Desde $0",
      }
      setPageConfig({
        ...pageConfig,
        services: [...pageConfig.services, newService],
      })
    }
  }

  // Función para eliminar servicio
  const removeService = (index: number) => {
    if (pageConfig) {
      const newServices = pageConfig.services.filter((_, i) => i !== index)
      setPageConfig({
        ...pageConfig,
        services: newServices,
      })
    }
  }

  // Función para agregar nueva estadística
  const addStat = () => {
    if (pageConfig) {
      const newStat = {
        value: "0",
        label: "Nueva Estadística",
        color: "emerald",
        icon: "Trophy",
      }
      setPageConfig({
        ...pageConfig,
        stats: [...pageConfig.stats, newStat],
      })
    }
  }

  // Función para eliminar estadística
  const removeStat = (index: number) => {
    if (pageConfig) {
      const newStats = pageConfig.stats.filter((_, i) => i !== index)
      setPageConfig({
        ...pageConfig,
        stats: newStats,
      })
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white">Verificando autenticación...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <section className="py-8 bg-gradient-to-r from-slate-800 to-slate-900 border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <NextLink href="/">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Portfolio
              </Button>
            </NextLink>

            <div className="flex items-center space-x-2">
              <Castle className="w-8 h-8 text-emerald-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Panel de Administración
              </span>
            </div>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-500/20 text-red-400 hover:bg-red-500/10 bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Proyectos</p>
                  <p className="text-2xl font-bold text-white">{projects.length}</p>
                </div>
                <Castle className="w-8 h-8 text-emerald-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Videos</p>
                  <p className="text-2xl font-bold text-white">{videos.length}</p>
                </div>
                <Video className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Testimonios</p>
                  <p className="text-2xl font-bold text-white">{testimonials.length}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pendientes</p>
                  <p className="text-2xl font-bold text-white">{testimonials.filter((t) => !t.approved).length}</p>
                </div>
                <Users className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/5 border-white/10">
            <TabsTrigger value="projects" className="data-[state=active]:bg-white/10">
              <Castle className="w-4 h-4 mr-2" />
              Proyectos
            </TabsTrigger>
            <TabsTrigger value="videos" className="data-[state=active]:bg-white/10">
              <Video className="w-4 h-4 mr-2" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="data-[state=active]:bg-white/10">
              <MessageSquare className="w-4 h-4 mr-2" />
              Testimonios
            </TabsTrigger>
            <TabsTrigger value="website" className="data-[state=active]:bg-white/10">
              <Globe className="w-4 h-4 mr-2" />
              Sitio Web
            </TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Project Form */}
              <div className="lg:col-span-1">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 sticky top-8">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      {isEditingProject ? <Edit className="w-5 h-5 mr-2" /> : <Plus className="w-5 h-5 mr-2" />}
                      {isEditingProject ? "Editar Proyecto" : "Nuevo Proyecto"}
                    </CardTitle>
                    <CardDescription className="text-green-400">
                      ✨ Ahora puedes subir MILES de proyectos sin límites
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProjectSubmit} className="space-y-4">
                      <Input
                        value={projectFormData.title}
                        onChange={(e) => setProjectFormData({ ...projectFormData, title: e.target.value })}
                        placeholder="Título del proyecto"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        required
                      />
                      <Textarea
                        value={projectFormData.description}
                        onChange={(e) => setProjectFormData({ ...projectFormData, description: e.target.value })}
                        placeholder="Descripción..."
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
