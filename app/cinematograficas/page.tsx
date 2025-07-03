"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Castle, ArrowLeft, Search, Grid, List, Star, Eye, Video, Play, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

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

export default function CinematograficasPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [videos, setVideos] = useState<VideoContent[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedVideo, setSelectedVideo] = useState<VideoContent | null>(null)
  const [pageConfig, setPageConfig] = useState(null)

  useEffect(() => {
    const savedConfig = localStorage.getItem("page-config")
    if (savedConfig) {
      const parsed = JSON.parse(savedConfig)
      setPageConfig(parsed)
    }
  }, [])

  // Load videos from localStorage - SIN LÍMITES
  useEffect(() => {
    const savedVideos = localStorage.getItem("portfolio-videos")
    if (savedVideos) {
      setVideos(JSON.parse(savedVideos)) // TODOS los videos
    }
  }, [])

  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-slate-800 to-slate-900 border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <Link href="/">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Inicio
              </Button>
            </Link>

            <div className="flex items-center space-x-2">
              <Castle className="w-8 h-8 text-emerald-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                ElFelipeB3
              </span>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-4">
              {pageConfig?.pagesTitles?.cinematograficas?.title || "Cinematográficas"}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              {pageConfig?.pagesTitles?.cinematograficas?.description ||
                "Explora mis videos cinematográficos épicos que muestran cada detalle y la magia de mis construcciones de Minecraft en movimiento."}
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Controls - MEJORADO PARA MÓVIL */}
      <section className="py-6 sm:py-8 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 items-stretch sm:items-center sm:justify-between sm:flex-row">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 w-full sm:w-64"
                />
              </div>
            </div>

            <div className="flex items-center justify-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="border-white/20 flex-1 sm:flex-none"
              >
                <Grid className="w-4 h-4" />
                <span className="ml-2 sm:hidden">Cuadrícula</span>
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="border-white/20 flex-1 sm:flex-none"
              >
                <List className="w-4 h-4" />
                <span className="ml-2 sm:hidden">Lista</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Videos Grid - MEJORADO PARA MÓVIL */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          {/* Contador de resultados */}
          <div className="mb-6 text-center">
            <p className="text-gray-400">
              Mostrando {filteredVideos.length} de {videos.length} videos
            </p>
          </div>

          <div
            className={`grid gap-4 sm:gap-6 md:gap-8 ${
              viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            }`}
          >
            {filteredVideos.map((video) => (
              <Card
                key={video.id}
                className={`bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 group overflow-hidden cursor-pointer ${
                  video.featured ? "ring-2 ring-purple-500/50" : ""
                } ${viewMode === "list" ? "flex flex-col sm:flex-row" : ""}`}
                onClick={() => setSelectedVideo(video)}
              >
                <div className={`relative overflow-hidden ${viewMode === "list" ? "sm:w-1/3" : ""}`}>
                  <Image
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    width={600}
                    height={400}
                    className={`object-cover transition-transform duration-300 group-hover:scale-110 ${
                      viewMode === "list" ? "h-48 sm:h-full w-full" : "w-full h-48 sm:h-64"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-red-500/80 backdrop-blur-sm rounded-full p-3 sm:p-4">
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                  </div>

                  {video.featured && (
                    <Badge className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                      Destacado
                    </Badge>
                  )}

                  <Badge className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs">
                    Video
                  </Badge>

                  <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 flex space-x-1 sm:space-x-2">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {video.views}
                    </div>
                    <div className="bg-red-500/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white flex items-center">
                      <Video className="w-3 h-3 mr-1" />
                      HD
                    </div>
                  </div>
                </div>

                <div className={`p-4 sm:p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-white text-lg sm:text-xl line-clamp-2">{video.title}</CardTitle>
                    <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <CardDescription className="text-gray-300 text-sm sm:text-base line-clamp-3">
                    {video.description}
                  </CardDescription>
                </div>
              </Card>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-12">
              <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No se encontraron videos</h3>
              <p className="text-gray-400">
                {videos.length === 0
                  ? "Aún no hay videos cinematográficos. Ve al panel de administración para agregar algunos."
                  : "Intenta ajustar tu búsqueda."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal - MEJORADO PARA MÓVIL */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white pr-4">{selectedVideo.title}</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedVideo(null)}
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Video Player - MEJORADO PARA MÓVIL */}
              <div className="relative aspect-video rounded-lg overflow-hidden mb-4 sm:mb-6 bg-black">
                {selectedVideo.videoFile ? (
                  <video controls className="w-full h-full" poster={selectedVideo.thumbnail}>
                    <source src={selectedVideo.videoFile} type="video/mp4" />
                    Tu navegador no soporta el elemento de video.
                  </video>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-white">Video no disponible</p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <p className="text-gray-300 text-base sm:text-lg">{selectedVideo.description}</p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                  <Badge variant="outline" className="border-white/20 text-white">
                    Cinematográfico
                  </Badge>
                  <span className="text-gray-400">{selectedVideo.views} visualizaciones</span>
                  {selectedVideo.featured && <Badge className="bg-purple-500">Destacado</Badge>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            ¿Te Inspiraron Mis Videos?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Estos videos muestran la calidad cinematográfica de mis construcciones. ¡Contacta conmigo para crear algo
            épico juntos!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://discord.gg/invite/#464139874480685066" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full"
              >
                Contactar por Discord
              </Button>
            </a>
            <Link href="/">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-transparent"
              >
                Volver al Inicio
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
