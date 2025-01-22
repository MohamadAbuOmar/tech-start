/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Facebook, Instagram, Linkedin, Twitter, MapPin, Phone, Mail, Send } from "lucide-react"
import Lottie from "lottie-react"
import ContactSvg from "../../../public/svg/Contact.json";
import { submitContactForm } from "@/app/actions/pages/contact-actions"
import { useToast } from "@/hooks/use-toast"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true)
    try {
      await submitContactForm(data)
      toast({
        title: "Message sent successfully",
        description: "Thank you for your submission. We'll get back to you soon!",
        duration: 5000,
        className: "bg-gradient-to-r from-[#24386F] to-[#872996] text-white",
      })
      form.reset()
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-screen-xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        <motion.h1 className="text-4xl sm:text-5xl font-bold text-center mb-4" variants={fadeIn}>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1b316e] to-[#1b316e]">
            Get in Touch
          </span>
        </motion.h1>
        <motion.p className="text-lg sm:text-xl text-center text-gray-600 mb-12" variants={fadeIn}>
          We&apos;re here to help and answer any question you might have
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <motion.div variants={fadeIn} className="lg:col-span-3 space-y-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 rounded-lg p-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} />
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
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="How can we help?" {...field} />
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
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your message here..." className="min-h-[150px]" {...field} />
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
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>
          </motion.div>

          <motion.div variants={fadeIn} className="lg:col-span-2 space-y-8">
            <Lottie animationData={ContactSvg} loop={true} className="w-full max-w-xs mx-auto" />
            <div className="space-y-4">
              {[
                {
                  icon: MapPin,
                  text: "Haifa Building 4th floor, Al Irsal, Ramallah-AlBireh, Palestine",
                },
                { icon: Phone, text: "+970 2 296 4840" },
                { icon: Mail, text: "info@techstart.ps" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center p-4 bg-gradient-to-r from-[#24386F] to-[#872996] text-white rounded-lg shadow-md"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="text-sm">{item.text}</span>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center space-x-4">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Twitter, label: "Twitter" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href="#"
                  className="p-2 bg-gradient-to-r from-[#24386F] to-[#872996] text-white rounded-full hover:from-[#1c2d59] hover:to-[#6e217a] transition-all duration-300"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

