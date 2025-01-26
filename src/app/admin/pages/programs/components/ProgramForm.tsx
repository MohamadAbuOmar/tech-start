"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ImageUpload } from "@/lib/ImageUpload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { DynamicFeatureList } from "./DynamicFeatureList";
import { DynamicFaqList } from "./DynamicFaqList";
import { ProgramType } from "@prisma/client";
import { ImageUploader } from "@/components/admin/shared/ImageUploader";

const programFormSchema = z.object({
  type: z.enum(["PIONEER", "UPSKILL"]),
  name_en: z.string().min(3, "Name must be at least 3 characters"),
  name_ar: z.string().min(3, "Name must be at least 3 characters"),
  description_en: z.string().min(10, "Description must be at least 10 characters"),
  description_ar: z.string().min(10, "Description must be at least 10 characters"),
  nameColor: z.string().min(4),
  descColor: z.string().min(4),
  order: z.coerce.number().min(0),
  imageUrl: z.string().nullable(),
  badge_en: z.string().min(2, "Badge text must be at least 2 characters"),
  badge_ar: z.string().min(2, "Badge text must be at least 2 characters"),
  heroTitle_en: z.string().min(3, "Hero title must be at least 3 characters"),
  heroTitle_ar: z.string().min(3, "Hero title must be at least 3 characters"),
  heroDesc_en: z.string().min(10, "Hero description must be at least 10 characters"),
  heroDesc_ar: z.string().min(10, "Hero description must be at least 10 characters"),
  heroImage: z.string().nullable(),
  overview_en: z.string().min(10, "Overview must be at least 10 characters"),
  overview_ar: z.string().min(10, "Overview must be at least 10 characters"),
  features: z.array(z.object({
    icon: z.string(),
    title_en: z.string().min(3),
    title_ar: z.string().min(3),
    description_en: z.string().min(10),
    description_ar: z.string().min(10),
  })),
  faqs: z.array(z.object({
    question_en: z.string().min(5),
    question_ar: z.string().min(5),
    answer_en: z.string().min(10),
    answer_ar: z.string().min(10),
    order: z.number().min(0),
  })),
});

type ProgramFormValues = z.infer<typeof programFormSchema>;

interface ProgramFormProps {
  initialData?: ProgramFormValues;
  onSubmit: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
  buttonText?: string;
  mode?: "create" | "edit";
}

export function ProgramForm({ initialData, onSubmit, buttonText = "Create Program", mode = "create" }: ProgramFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProgramFormValues>({
    resolver: zodResolver(programFormSchema),
    defaultValues: initialData || {
      type: "PIONEER",
      name_en: "",
      name_ar: "",
      description_en: "",
      description_ar: "",
      nameColor: "#1b316e",
      descColor: "#862996",
      order: 0,
      imageUrl: null,
      badge_en: "",
      badge_ar: "",
      heroTitle_en: "",
      heroTitle_ar: "",
      heroDesc_en: "",
      heroDesc_ar: "",
      heroImage: null,
      overview_en: "",
      overview_ar: "",
      features: [],
      faqs: [],
    },
  });

  async function handleSubmit(data: ProgramFormValues) {
    if (!data.imageUrl || !data.heroImage) {
      toast({
        title: "Error",
        description: "Please upload both program image and hero image",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    
    // Handle arrays and complex objects separately
    Object.entries(data).forEach(([key, value]) => {
      if (value === null) return;
      
      if (key === 'features' || key === 'faqs') {
        formData.append(key, JSON.stringify(value));
      } else if (typeof value === 'object') {
        // Handle other potential object values
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value.toString());
      }
    });

    try {
      const result = await onSubmit(formData);
      if (result.success) {
        toast({
          title: "Success",
          description: "Program saved successfully",
          variant: "default",
        });
        router.push(`/admin/pages/programs/${data.type.toLowerCase()}`);
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: result.error || "Something went wrong",
          variant: "destructive",
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save program",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Program Details</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program Image</FormLabel>
                  <FormControl>
                    <ImageUploader
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
              name="heroImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hero Image</FormLabel>
                  <FormControl>
                    <ImageUploader
                      onUpload={(url) => field.onChange(url)}
                      defaultImage={field.value || undefined}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Tabs defaultValue="english" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="english">English</TabsTrigger>
                <TabsTrigger value="arabic">Arabic</TabsTrigger>
              </TabsList>
              
              <TabsContent value="english" className="space-y-4">
                <FormField
                  control={form.control}
                  name="name_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name (English)</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                        <Textarea {...field} rows={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="badge_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Badge Text (English)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="heroTitle_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hero Title (English)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="heroDesc_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hero Description (English)</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="overview_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Overview (English)</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="arabic" className="space-y-4">
                <FormField
                  control={form.control}
                  name="name_ar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name (Arabic)</FormLabel>
                      <FormControl>
                        <Input {...field} dir="rtl" />
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
                        <Textarea {...field} rows={4} dir="rtl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="badge_ar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Badge Text (Arabic)</FormLabel>
                      <FormControl>
                        <Input {...field} dir="rtl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="heroTitle_ar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hero Title (Arabic)</FormLabel>
                      <FormControl>
                        <Input {...field} dir="rtl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="heroDesc_ar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hero Description (Arabic)</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={4} dir="rtl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="overview_ar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Overview (Arabic)</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={4} dir="rtl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nameColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name Color</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input type="color" {...field} className="w-20" />
                        <Input {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="descColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description Color</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input type="color" {...field} className="w-20" />
                        <Input {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="w-32" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DynamicFeatureList form={form} />
            <DynamicFaqList form={form} />
          </CardContent>
          <CardFooter className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {buttonText}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
