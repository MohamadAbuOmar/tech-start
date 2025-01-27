"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Loader2, Upload, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ImageUploaderProps {
  onUpload: (url: string) => void;
  defaultImage?: string;
  galleryId?: string;
}

export function ImageUploader({ onUpload, defaultImage, galleryId }: ImageUploaderProps) {
  const { language } = useLanguage();
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(defaultImage);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const validateFile = useCallback((file: File) => {
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error(
        language === 'en' 
          ? 'Invalid file type. Please upload a JPG, PNG, GIF, or WebP image.'
          : 'نوع الملف غير صالح. يرجى تحميل صورة بتنسيق JPG أو PNG أو GIF أو WebP.'
      );
    }

    if (file.size > MAX_SIZE) {
      throw new Error(
        language === 'en'
          ? 'File size exceeds 10MB limit.'
          : 'حجم الملف يتجاوز الحد المسموح به (10 ميجابايت).'
      );
    }
  }, [language]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsUploading(true);
    setImageError(false);

    try {
      validateFile(file);

      const formData = new FormData();
      formData.append("file", file);
      if (galleryId) {
        formData.append("galleryId", galleryId);
      }

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        throw new Error(
          language === 'en'
            ? 'Invalid server response'
            : 'استجابة خاطئة من الخادم'
        );
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || (
            language === 'en'
              ? 'Upload failed. Please try again.'
              : 'فشل التحميل. يرجى المحاولة مرة أخرى.'
          )
        );
      }

      if (!data.url) {
        throw new Error(
          language === 'en'
            ? 'Invalid response: missing image URL'
            : 'استجابة غير صالحة: رابط الصورة مفقود'
        );
      }

      setPreviewUrl(data.url);
      onUpload(data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
      setError(
        error instanceof Error 
          ? error.message 
          : (language === 'en' 
              ? 'Failed to upload image. Please try again.'
              : 'فشل في تحميل الصورة. يرجى المحاولة مرة أخرى.')
      );
    } finally {
      setIsUploading(false);
      if (e.target) {
        e.target.value = ''; // Reset input
      }
    }
  };

  const handleImageError = () => {
    setImageError(true);
    setError(
      language === 'en'
        ? 'Failed to load image preview'
        : 'فشل في تحميل معاينة الصورة'
    );
  };

  const retryUpload = () => {
    setError(null);
    setImageError(false);
    document.getElementById("imageInput")?.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          disabled={isUploading}
          onClick={() => document.getElementById("imageInput")?.click()}
        >
          {isUploading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Upload className="h-4 w-4 mr-2" />
          )}
          {language === 'en' ? 'Upload Image' : 'تحميل صورة'}
        </Button>
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {error && (
        <div className="mt-2 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={retryUpload}
          >
            {language === 'en' ? 'Try Again' : 'حاول مرة أخرى'}
          </Button>
        </div>
      )}

      {previewUrl && !imageError && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={previewUrl}
            alt={language === 'en' ? "Preview" : "معاينة"}
            fill
            className="object-cover"
            onError={handleImageError}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
      )}
    </div>
  );
}
