"use client"

import { useState, useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { Loader2, Upload, X, Film, Youtube, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import type { VideoUpload } from "@/types/video-gallery"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

interface MultiVideoUploadProps {
  onUpload: (videos: VideoUpload[]) => void
  defaultVideos?: VideoUpload[]
}

export function MultiVideoUpload({ onUpload, defaultVideos = [] }: MultiVideoUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [videos, setVideos] = useState<VideoUpload[]>(defaultVideos)
  const [youtubeLink, setYoutubeLink] = useState("")
  const { toast } = useToast()
  const [playingStates, setPlayingStates] = useState<boolean[]>(new Array(videos.length).fill(false))

  useEffect(() => {
    setPlayingStates(new Array(videos.length).fill(false))
  }, [videos])

  const handleInputChange = (index: number, field: "title" | "description", value: string, lang: "en" | "ar") => {
    const fieldKey = `${field}_${lang}` as keyof VideoUpload
    const updatedVideos = videos.map((video, i) => (i === index ? { ...video, [fieldKey]: value } : video))
    setVideos(updatedVideos)
    onUpload(updatedVideos)
  }

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setUploading(true)
      const newVideos: VideoUpload[] = []

      for (const file of acceptedFiles) {
        const formData = new FormData()
        formData.append("file", file)

        try {
          const response = await fetch("/api/upload-video", {
            method: "POST",
            body: formData,
          })

          if (!response.ok) {
            throw new Error("Upload failed")
          }

          const data = await response.json()
          if (data.success && data.url) {
            const videoData: VideoUpload = {
              url: data.url,
              title_en: file.name.replace(/\.[^/.]+$/, ""),
              title_ar: "",
              description_en: null,
              description_ar: null,
              type: "local",
            }
            newVideos.push(videoData)
          }
        } catch (error) {
          console.error("Upload error:", error)
          toast({
            title: "Error",
            description: error instanceof Error ? error.message : "Failed to upload video",
            variant: "destructive",
          })
        }
      }

      const updatedVideos = [...videos, ...newVideos]
      setVideos(updatedVideos)
      onUpload(updatedVideos)
      setUploading(false)
    },
    [videos, onUpload, toast],
  )

  const handleYoutubeUpload = () => {
    if (youtubeLink) {
      const youtubeVideo: VideoUpload = {
        url: youtubeLink,
        title_en: "YouTube Video",
        title_ar: "",
        description_en: null,
        description_ar: null,
        type: "youtube",
      }
      const updatedVideos = [...videos, youtubeVideo]
      setVideos(updatedVideos)
      onUpload(updatedVideos)
      setYoutubeLink("")
    }
  }

  const handleRemove = async (index: number) => {
    const videoToRemove = videos[index]
    if (videoToRemove.type === "local") {
      try {
        const response = await fetch("/api/delete-video", {
          method: "POST",
          headers: {
            "Content-Security-Policy": "default-src 'self'; connect-src 'self' https:;",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: videoToRemove.url }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to delete video from server")
        }

        if (data.success) {
          const newVideos = videos.filter((_, i) => i !== index)
          setVideos(newVideos)
          onUpload(newVideos)

          toast({
            title: "Success",
            description: "Video deleted successfully",
          })
        } else {
          throw new Error(data.error || "Failed to delete video")
        }
      } catch (error) {
        console.error("Delete error:", error)
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to delete video",
          variant: "destructive",
        })
      }
    } else {
      // For YouTube videos, just remove from the list
      const newVideos = videos.filter((_, i) => i !== index)
      setVideos(newVideos)
      onUpload(newVideos)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".webm", ".ogg"],
    },
    multiple: true,
  })

  const handleVideoClick = (index: number) => {
    const videoElement = document.getElementById(`video-${index}`) as HTMLVideoElement
    if (videoElement) {
      if (videoElement.paused) {
        videoElement
          .play()
          .then(() => {
            const newPlayingStates = [...playingStates]
            newPlayingStates[index] = true
            setPlayingStates(newPlayingStates)
          })
          .catch((error) => {
            console.error("Error playing video:", error)
            toast({
              title: "Error",
              description: "Failed to play video. Please try again.",
              variant: "destructive",
            })
          })
      } else {
        videoElement.pause()
        const newPlayingStates = [...playingStates]
        newPlayingStates[index] = false
        setPlayingStates(newPlayingStates)
      }
    }
  }

  return (
    <div className="w-full space-y-6">
      <Tabs defaultValue="local" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="local">Local Upload</TabsTrigger>
          <TabsTrigger value="youtube">YouTube Link</TabsTrigger>
        </TabsList>
        <TabsContent value="local">
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
              isDragActive ? "border-primary bg-primary/10" : "border-gray-300 hover:bg-gray-50",
            )}
          >
            <input {...getInputProps()} />
            {uploading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-2 text-lg">Uploading...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6">
                <Upload className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg text-gray-600 mb-2">Drag &apos;n&apos; drop videos here, or click to select</p>
                <p className="text-sm text-gray-500">Supports: MP4, WebM, OGG</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="youtube">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Enter YouTube video URL"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
            />
            <Button onClick={handleYoutubeUpload} disabled={!youtubeLink}>
              <Youtube className="h-4 w-4 mr-2" />
              Add YouTube Video
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      {videos.length > 0 && (
        <div className="space-y-6">
          {videos.map((video, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative aspect-video min-h-[300px]">
                    {video.type === "local" ? (
                      <>
                        <video
                          id={`video-${index}`}
                          src={video.url}
                          className="w-full h-full object-contain bg-black"
                          playsInline
                          preload="metadata"
                          controlsList="nodownload"
                        />
                        <Button
                          className="absolute bottom-2 right-2 z-10"
                          size="sm"
                          onClick={() => handleVideoClick(index)}
                        >
                          {playingStates[index] ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                      </>
                    ) : (
                      <>
                        <iframe
                          src={`https://www.youtube.com/embed/${getYoutubeVideoId(video.url)}`}
                          className="w-full h-full absolute inset-0"
                          allowFullScreen
                          title={`YouTube video ${index + 1}`}
                        />
                        <Button
                          className="absolute bottom-2 right-2 z-10"
                          size="sm"
                          onClick={() => window.open(video.url, "_blank")}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded z-10">
                      {video.type === "local" ? (
                        <Film className="h-4 w-4 inline-block mr-1" />
                      ) : (
                        <Youtube className="h-4 w-4 inline-block mr-1" />
                      )}
                      Video {index + 1}
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <Tabs defaultValue="english" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="english">English</TabsTrigger>
                        <TabsTrigger value="arabic">Arabic</TabsTrigger>
                      </TabsList>
                      <TabsContent value="english" className="space-y-4">
                        <div>
                          <label className="text-sm font-medium block mb-1">Title (English)</label>
                          <Input
                            value={video.title_en}
                            onChange={(e) => handleInputChange(index, "title", e.target.value, "en")}
                            placeholder="Enter video title in English"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium block mb-1">Description (English)</label>
                          <Textarea
                            value={video.description_en || ""}
                            onChange={(e) => handleInputChange(index, "description", e.target.value, "en")}
                            placeholder="Enter video description in English"
                            rows={3}
                          />
                        </div>
                      </TabsContent>
                      <TabsContent value="arabic" className="space-y-4">
                        <div>
                          <label className="text-sm font-medium block mb-1">Title (Arabic)</label>
                          <Input
                            value={video.title_ar}
                            onChange={(e) => handleInputChange(index, "title", e.target.value, "ar")}
                            placeholder="Enter video title in Arabic"
                            className="text-right"
                            dir="rtl"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium block mb-1">Description (Arabic)</label>
                          <Textarea
                            value={video.description_ar || ""}
                            onChange={(e) => handleInputChange(index, "description", e.target.value, "ar")}
                            placeholder="Enter video description in Arabic"
                            className="text-right"
                            dir="rtl"
                            rows={3}
                          />
                        </div>
                      </TabsContent>
                    </Tabs>
                    <div className="flex justify-end">
                      <Button variant="destructive" size="sm" onClick={() => handleRemove(index)}>
                        <X className="h-4 w-4 mr-2" />
                        Remove Video
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function getYoutubeVideoId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

