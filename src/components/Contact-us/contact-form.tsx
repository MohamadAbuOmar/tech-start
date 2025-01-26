/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Send } from "lucide-react";
import { submitContactForm, getContactInfo } from "@/app/actions/pages/contact";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState as useStateEffect } from "react";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  language: 'en' | 'ar';
}

export function ContactForm({ language }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [translations, setTranslations] = useState<Awaited<ReturnType<typeof getContactInfo>>['data']>();

  useEffect(() => {
    const fetchTranslations = async () => {
      const response = await getContactInfo(language);
      if (response.success) {
        setTranslations(response.data);
      }
    };
    fetchTranslations();
  }, [language]);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await submitContactForm(data);
      toast({
        title: translations?.successMessage || "Message sent successfully",
        description:
          "Thank you for your submission. We'll get back to you soon!",
        duration: 5000,
        className: "bg-gradient-to-r from-[#24386F] to-[#872996] text-white",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 rounded-lg p-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{translations?.formLabels.name || "Name"}</FormLabel>
              <FormControl>
                <Input placeholder={translations?.formPlaceholders.name || "Your name"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{translations?.formLabels.email || "Email"}</FormLabel>
              <FormControl>
                <Input type="email" placeholder={translations?.formPlaceholders.email || "your@email.com"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{translations?.formLabels.subject || "Subject"}</FormLabel>
              <FormControl>
                <Input placeholder={translations?.formPlaceholders.subject || "How can we help?"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{translations?.formLabels.message || "Message"}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={translations?.formPlaceholders.message || "Your message here..."}
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-[#24386F] to-[#872996] hover:from-[#1c2d59] hover:to-[#6e217a] text-white rounded-lg py-3 transition-all duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : translations?.submitButton || "Send Message"}
          <Send className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
}
