'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Loader2, Upload, X, Film } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { useToast } from "@/hooks/use-toast"
import { VideoUpload } from '@/types/video-gallery'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

interface MultiVideoUploadProps {
  onUpload: (videos: VideoUpload[]) => void
  defaultVideos?: VideoUpload[]
}

export function MultiVideoUpload({ onUpload, defaultVideos = [] }: MultiVideoUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [videos, setVideos] = useState<VideoUpload[]>(defaultVideos)
  const { toast } = useToast()

  const handleInputChange = (index: number, field: 'title' | 'description', value: string, lang: 'en' | 'ar') => {
    const fieldKey = `${field}_${lang}` as keyof VideoUpload
    const updatedVideos = videos.map((video, i) => 
      i === index ? { ...video, [fieldKey]: value } : video
    )
    setVideos(updatedVideos)
    onUpload(updatedVideos)
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true)
    const newVideos: VideoUpload[] = []

    for (const file of acceptedFiles) {
      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await fetch('/api/upload-video', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error('Upload failed')
        }

        const data = await response.json()
        if (data.success && data.url) {
          const videoData: VideoUpload = {
            url: data.url,
            title_en: file.name.replace(/\.[^/.]+$/, ""),
            title_ar: '',
            description_en: null,
            description_ar: null
          }
          newVideos.push(videoData)
        }
      } catch (error) {
        console.error('Upload error:', error)
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
  }, [videos, onUpload, toast])

  const handleRemove = async (index: number) => {
    const videoToRemove = videos[index]
    try {
      const response = await fetch('/api/delete-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: videoToRemove.url }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete video from server')
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
        throw new Error(data.error || 'Failed to delete video')
      }
    } catch (error) {
      console.error('Delete error:', error)
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
      'video/*': ['.mp4', '.webm', '.ogg']
    },
    multiple: true
  })

  return (
    <div className="w-full space-y-6">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive ? "border-primary bg-primary/10" : "border-gray-300 hover:bg-gray-50"
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
            <p className="text-lg text-gray-600 mb-2">
              Drag &apos;n&apos; drop videos here, or click to select
            </p>
            <p className="text-sm text-gray-500">
              Supports: MP4, WebM, OGG
            </p>
          </div>
        )}
      </div>
      {videos.length > 0 && (
        <div className="space-y-6">
          {videos.map((video, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative">
                    <video
                      src={video.url}
                      className="w-full h-full object-cover"
                      controls
                    />
                    <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                      <Film className="h-4 w-4 inline-block mr-1" />
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
                            onChange={(e) => handleInputChange(index, 'title', e.target.value, 'en')}
                            placeholder="Enter video title in English"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium block mb-1">Description (English)</label>
                          <Textarea
                            value={video.description_en || ''}
                            onChange={(e) => handleInputChange(index, 'description', e.target.value, 'en')}
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
                            onChange={(e) => handleInputChange(index, 'title', e.target.value, 'ar')}
                            placeholder="Enter video title in Arabic"
                            className="text-right"
                            dir="rtl"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium block mb-1">Description (Arabic)</label>
                          <Textarea
                            value={video.description_ar || ''}
                            onChange={(e) => handleInputChange(index, 'description', e.target.value, 'ar')}
                            placeholder="Enter video description in Arabic"
                            className="text-right"
                            dir="rtl"
                            rows={3}
                          />
                        </div>
                      </TabsContent>
                    </Tabs>
                    <div className="flex justify-end">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemove(index)}
                      >
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

