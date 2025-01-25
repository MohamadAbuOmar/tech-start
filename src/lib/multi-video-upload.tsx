"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Loader2, Upload, X, Film } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import type { VideoUpload } from "@/types/video-gallery"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

function getVideoId(url: string) {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

interface MultiVideoUploadProps {
  onUpload: (videos: VideoUpload[]) => void
  defaultVideos?: VideoUpload[]
}

export function MultiVideoUpload({ onUpload, defaultVideos = [] }: MultiVideoUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [videos, setVideos] = useState<VideoUpload[]>(defaultVideos)
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const { toast } = useToast()

  const handleInputChange = (index: number, field: "title" | "description", value: string, lang: "en" | "ar") => {
    const fieldKey = `${field}_${lang}` as keyof VideoUpload
    const updatedVideos = videos.map((video, i) => (i === index ? { ...video, [fieldKey]: value } : video))
    setVideos(updatedVideos)
    onUpload(updatedVideos)
  }

  const handleAddYoutubeVideo = () => {
    if (!youtubeUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a YouTube URL",
        variant: "destructive",
      })
      return
    }

    const videoId = getVideoId(youtubeUrl)
    if (!videoId) {
      toast({
        title: "Error",
        description: "Invalid YouTube URL",
        variant: "destructive",
      })
      return
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`

    const newVideo: VideoUpload = {
      url: embedUrl,
      title_en: "",
      title_ar: "",
      description_en: null,
      description_ar: null,
      type: "youtube",
    }

    const updatedVideos = [...videos, newVideo]
    setVideos(updatedVideos)
    onUpload(updatedVideos)
    setYoutubeUrl("")

    toast({
      title: "Success",
      description: "YouTube video added successfully",
    })
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

  const handleRemove = async (index: number) => {
    const videoToRemove = videos[index]
    try {
      const response = await fetch("/api/delete-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: videoToRemove.url,
          type: videoToRemove.type,
        }),
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
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".webm", ".ogg"],
    },
    multiple: true,
  })

  const renderVideo = (video: VideoUpload) => {
    if (video.type === "youtube") {
      return (
        <div className="relative w-full pt-[56.25%]">
          <iframe
            src={video.url}
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )
    }

    return <video src={video.url} className="w-full h-full object-cover" controls preload="metadata" playsInline />
  }

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="youtube-url" className="block text-sm font-medium">
            Add YouTube Video
          </label>
          <div className="flex gap-2">
            <Input
              id="youtube-url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="Paste YouTube video URL here"
              className="flex-grow"
            />
            <Button onClick={handleAddYoutubeVideo} type="button">
              Add
            </Button>
          </div>
        </div>

        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors",
            isDragActive ? "border-primary bg-primary/10" : "border-gray-300 hover:bg-gray-50",
          )}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <p className="ml-2">Uploading...</p>
            </div>
          ) : (
            <div>
              <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Drag & drop videos or click to select</p>
            </div>
          )}
        </div>
      </div>

      {videos.length > 0 && (
        <div className="space-y-4">
          {videos.map((video, index) => (
            <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative rounded-lg overflow-hidden bg-black">
                    {renderVideo(video)}
                    <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                      <Film className="h-3 w-3 inline-block mr-1" />
                      {video.type === "youtube" ? "YouTube" : "Local"} Video {index + 1}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Tabs defaultValue="english" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="english">English</TabsTrigger>
                        <TabsTrigger value="arabic">Arabic</TabsTrigger>
                      </TabsList>
                      <TabsContent value="english" className="space-y-2">
                        <Input
                          value={video.title_en}
                          onChange={(e) => handleInputChange(index, "title", e.target.value, "en")}
                          placeholder="Enter video title in English"
                        />
                        <Textarea
                          value={video.description_en || ""}
                          onChange={(e) => handleInputChange(index, "description", e.target.value, "en")}
                          placeholder="Enter video description in English"
                          rows={3}
                        />
                      </TabsContent>
                      <TabsContent value="arabic" className="space-y-2">
                        <Input
                          value={video.title_ar}
                          onChange={(e) => handleInputChange(index, "title", e.target.value, "ar")}
                          placeholder="Enter video title in Arabic"
                          className="text-right"
                          dir="rtl"
                        />
                        <Textarea
                          value={video.description_ar || ""}
                          onChange={(e) => handleInputChange(index, "description", e.target.value, "ar")}
                          placeholder="Enter video description in Arabic"
                          className="text-right"
                          dir="rtl"
                          rows={3}
                        />
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

