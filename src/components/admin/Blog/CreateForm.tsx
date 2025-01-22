'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { createPost } from "@/app/actions/create-post"
import { useToast } from "@/hooks/use-toast"
import { CreatePostInput, createPostSchema } from "@/lib/schema/schema"
import { ImageUpload } from "@/lib/ImageUpload"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"

export default function CreateBlog() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
    const router = useRouter()

  const form = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      slug: "",
      type: "",
      title_en: "",
      title_ar: "",
      description_en: "",
      description_ar: "",
      content_en: "",
      content_ar: "",
      imageUrl: null,
      readTime: "",
      published: false,
      featured: false,
      tags: [],
    },
  })

  async function onSubmit(data: CreatePostInput) {
    setIsSubmitting(true)
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item))
      } else if (value !== null && value !== undefined) {
        formData.append(key, value.toString())
      }
    })

    try {
      const result = await createPost(formData)
      if (result.success) {
        toast({
          title: "Blog post created",
          description: "Your blog post has been created successfully.",
        })
        form.reset()
        router.push('/admin/blog')
      } else if (result.error) {
        toast({
          title: "Error",
          description: typeof result.error === 'object' ? JSON.stringify(result.error) : result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Unexpected error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-screen-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Create Blog Post</CardTitle>
          <CardDescription>Fill out the form below to create a new blog post in English and Arabic.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter post slug" {...field} className="w-full" />
                      </FormControl>
                      <FormDescription>
                        This will be used in the URL of your post.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter post type" {...field} className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Tabs defaultValue="english" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="english">English</TabsTrigger>
                  <TabsTrigger value="arabic">Arabic</TabsTrigger>
                </TabsList>
                <TabsContent value="english">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title_en"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title (English)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter English title" {...field} className="w-full" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description_en"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (English)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter English description"
                              {...field}
                              className="w-full min-h-[100px] resize-y"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="content_en"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content (English)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter English content"
                              {...field}
                              className="w-full min-h-[200px] resize-y"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="arabic">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title_ar"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title (Arabic)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Arabic title" {...field} className="w-full text-right" dir="rtl" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description_ar"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (Arabic)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter Arabic description"
                              {...field}
                              className="w-full min-h-[100px] resize-y text-right"
                              dir="rtl"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="content_ar"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content (Arabic)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter Arabic content"
                              {...field}
                              className="w-full min-h-[200px] resize-y text-right"
                              dir="rtl"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Image</FormLabel>
                    <FormControl>
                      <ImageUpload
                        onUpload={(url) => field.onChange(url)}
                        defaultImage={field.value || undefined}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="readTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Read Time</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter read time" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex space-x-4">
                <FormField
                  control={form.control}
                  name="published"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Published</FormLabel>
                        <FormDescription>
                          This post will be visible to readers if checked.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Featured</FormLabel>
                        <FormDescription>
                          This post will be highlighted if checked.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter tags (comma-separated)"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value.split(',').map(tag => tag.trim()))}
                        className="w-full"
                      />
                    </FormControl>
                    <FormDescription>
                      Enter tags separated by commas.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Creating...' : 'Create Post'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

