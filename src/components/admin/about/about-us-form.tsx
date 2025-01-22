/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createAboutUs, updateAboutUs, deleteAboutUs } from '@/app/actions/pages/about-us-actions'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'
import { ImageUpload } from '@/lib/ImageUpload'
import { IconSelector } from '@/components/shared/icon-selector'

const cardSchema = z.object({
  titleEn: z.string().min(1, 'Title in English is required'),
  titleAr: z.string().min(1, 'Title in Arabic is required'),
  descriptionEn: z.string().min(1, 'Description in English is required'),
  descriptionAr: z.string().min(1, 'Description in Arabic is required'),
  icon: z.string().optional().default(''), // Make icon optional initially
})

const whoWeAreSchema = z.object({
  titleEn: z.string().min(1, 'Title in English is required'),
  titleAr: z.string().min(1, 'Title in Arabic is required'),
  descriptionEn: z.string().min(1, 'Description in English is required'),
  descriptionAr: z.string().min(1, 'Description in Arabic is required'),
})

const aboutUsSchema = z.object({
  titleEn: z.string().min(1, 'Title in English is required'),
  titleAr: z.string().min(1, 'Title in Arabic is required'),
  descriptionEn: z.string().min(1, 'Description in English is required'),
  descriptionAr: z.string().min(1, 'Description in Arabic is required'),
  imageUrl: z.string().nullable(),
  cards: z.array(cardSchema).min(3, 'At least 3 cards are required').max(3, 'Maximum 3 cards are allowed'),
  whoWeAre: z.array(whoWeAreSchema).min(3, 'At least 3 "Who We Are" items are required').max(3, 'Maximum 3 "Who We Are" items are allowed'),
})

type AboutUsFormValues = z.infer<typeof aboutUsSchema>

interface AboutUsFormProps {
  initialData?: AboutUsFormValues & { id: string }
}

export function AboutUsForm({ initialData }: AboutUsFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const defaultCard = {
    titleEn: '',
    titleAr: '',
    descriptionEn: '',
    descriptionAr: '',
    icon: 'Star', // Provide a default icon
  };

  const form = useForm<AboutUsFormValues>({
    resolver: zodResolver(aboutUsSchema),
    defaultValues: initialData || {
      titleEn: '',
      titleAr: '',
      descriptionEn: '',
      descriptionAr: '',
      imageUrl: null,
      cards: [defaultCard, defaultCard, defaultCard],
      whoWeAre: [
        { titleEn: '', titleAr: '', descriptionEn: '', descriptionAr: '' },
        { titleEn: '', titleAr: '', descriptionEn: '', descriptionAr: '' },
        { titleEn: '', titleAr: '', descriptionEn: '', descriptionAr: '' },
      ],
    },
  })

  const { fields: cardFields } = useFieldArray({
    name: 'cards',
    control: form.control,
  })

  const { fields: whoWeAreFields } = useFieldArray({
    name: 'whoWeAre',
    control: form.control,
  })

  async function onSubmit(data: AboutUsFormValues) {
    setIsLoading(true)
    try {
      if (initialData) {
        await updateAboutUs(initialData.id, data)
        toast({ title: 'About Us updated successfully' })
      } else {
        await createAboutUs(data)
        toast({ title: 'About Us created successfully' })
      }
      router.push('/admin/pages/about')
      router.refresh()
    } catch (error) {
      toast({ title: 'An error occurred', description: 'Please try again', variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  async function onDelete() {
    if (!initialData) return
    setIsLoading(true)
    try {
      await deleteAboutUs(initialData.id)
      toast({ title: 'About Us deleted successfully' })
      router.push('/about')
      router.refresh()
    } catch (error) {
      toast({ title: 'An error occurred', description: 'Please try again', variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Main Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="en" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="ar">Arabic</TabsTrigger>
              </TabsList>
              <TabsContent value="en" className="space-y-4">
                <FormField
                  control={form.control}
                  name="titleEn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title (English)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="descriptionEn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (English)</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="ar" className="space-y-4">
                <FormField
                  control={form.control}
                  name="titleAr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title (Arabic)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="descriptionAr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Arabic)</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      onUpload={(url) => field.onChange(url)}
                      defaultImage={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cards</CardTitle>
          </CardHeader>
          <CardContent>
            {cardFields.map((field, index) => (
              <Card key={field.id} className="mb-4">
                <CardHeader>
                  <CardTitle>Card {index + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="en" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="en">English</TabsTrigger>
                      <TabsTrigger value="ar">Arabic</TabsTrigger>
                    </TabsList>
                    <TabsContent value="en" className="space-y-4">
                      <FormField
                        control={form.control}
                        name={`cards.${index}.titleEn`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title (English)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`cards.${index}.descriptionEn`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description (English)</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                    <TabsContent value="ar" className="space-y-4">
                      <FormField
                        control={form.control}
                        name={`cards.${index}.titleAr`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title (Arabic)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`cards.${index}.descriptionAr`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description (Arabic)</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                  </Tabs>
                  <FormField
                    control={form.control}
                    name={`cards.${index}.icon`}
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Icon</FormLabel>
                        <FormControl>
                          <IconSelector 
                            value={field.value}
                            onChange={(value) => field.onChange(value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Who We Are</CardTitle>
          </CardHeader>
          <CardContent>
            {whoWeAreFields.map((field, index) => (
              <Card key={field.id} className="mb-4">
                <CardHeader>
                  <CardTitle>Who We Are {index + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="en" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="en">English</TabsTrigger>
                      <TabsTrigger value="ar">Arabic</TabsTrigger>
                    </TabsList>
                    <TabsContent value="en" className="space-y-4">
                      <FormField
                        control={form.control}
                        name={`whoWeAre.${index}.titleEn`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title (English)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`whoWeAre.${index}.descriptionEn`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description (English)</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                    <TabsContent value="ar" className="space-y-4">
                      <FormField
                        control={form.control}
                        name={`whoWeAre.${index}.titleAr`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title (Arabic)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`whoWeAre.${index}.descriptionAr`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description (Arabic)</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button type="submit" disabled={isLoading}>
            {initialData ? 'Update' : 'Create'} About Us
          </Button>
          {initialData && (
            <Button type="button" variant="destructive" onClick={onDelete} disabled={isLoading}>
              Delete
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}

