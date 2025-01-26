"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/context/LanguageContext"
import { ComplainantInfo } from "./form-steps/complainant-info"
import { ComplaintDescription } from "./form-steps/complaint-description"
import { PreviousComplaints } from "./form-steps/previous-complaints"
import { ComplaintDetails } from "./form-steps/complaint-details"
import { Attachments } from "./form-steps/attachments"
import { Confirmation } from "./form-steps/confirmation"
import { AnonymousComplaintForm } from "./anonymous-complaint-form"
import type { FormDataType } from "@/types/form-types"
import { toast } from "@/hooks/use-toast"

const steps = [
  "Complainant Info",
  "Complaint Description",
  "Previous Complaints",
  "Complaint Details",
  "Attachments",
  "Confirmation",
]

export function ComplaintForm() {
  const { language } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormDataType>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNext = (stepData: Partial<FormDataType>) => {
    setFormData((prevData) => ({ ...prevData, ...stepData }))
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleSubmit = async (data: FormDataType & { confirmed: boolean }) => {
    setIsSubmitting(true)
    const finalData = { ...formData, ...data }
    try {
      const response = await fetch("/api/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit complaint")
      }

      const result = await response.json()
      if (result.success) {
        toast({
          title: language === 'en' ? "Complaint Submitted" : "تم تقديم الشكوى",
          description: language === 'en' 
            ? `Your complaint has been successfully submitted. Complaint number: ${result.complaintNumber}`
            : `تم تقديم شكواك بنجاح. رقم الشكوى: ${result.complaintNumber}`,
        })
        // Reset form or redirect to a success page
        setFormData({})
        setCurrentStep(0)
      } else {
        throw new Error(result.error || "Failed to submit complaint")
      }
    } catch (error) {
      console.error("Error submitting complaint:", error)
      toast({
        title: language === 'en' ? "Error" : "خطأ",
        description: language === 'en' 
          ? "Failed to submit complaint. Please try again."
          : "فشل في تقديم الشكوى. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <Tabs defaultValue="regular" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="regular">{language === 'en' ? 'Regular Complaint' : 'شكوى عادية'}</TabsTrigger>
              <TabsTrigger value="anonymous">{language === 'en' ? 'Anonymous Complaint' : 'شكوى مجهولة'}</TabsTrigger>
            </TabsList>

            <TabsContent value="regular">
              <div className="mb-8">
                <div className="relative">
                  <div className="overflow-hidden h-2 mb-4 flex rounded bg-gray-200">
                    {steps.map((step, idx) => (
                      <motion.div
                        key={step}
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(idx <= currentStep ? 100 : 0) / steps.length}%`,
                        }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                      />
                    ))}
                  </div>
                  <div className="flex justify-between">
                    {steps.map((step, idx) => (
                      <div
                        key={step}
                        className={`flex flex-col items-center ${
                          idx <= currentStep ? "text-primary" : "text-gray-400"
                        }`}
                      >
                        <div
                          className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${
                            idx <= currentStep ? "border-primary bg-primary text-white" : "border-gray-300"
                          } flex items-center justify-center`}
                        >
                          {idx + 1}
                        </div>
                        <div className="text-xs mt-2">{step}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep === 0 && <ComplainantInfo onNext={handleNext} data={formData} />}
                  {currentStep === 1 && (
                    <ComplaintDescription
                      onNext={(data) => handleNext({ complaintDescription: data })}
                      onPrevious={handlePrevious}
                      data={formData.complaintDescription}
                    />
                  )}
                  {currentStep === 2 && (
                    <PreviousComplaints
                      onNext={(data) => handleNext({ previousComplaints: data })}
                      onPrevious={handlePrevious}
                      data={formData.previousComplaints}
                    />
                  )}
                  {currentStep === 3 && (
                    <ComplaintDetails
                      onNext={(data) => handleNext({ complaintDetails: data })}
                      onPrevious={handlePrevious}
                      data={formData.complaintDetails}
                    />
                  )}
                  {currentStep === 4 && (
                    <Attachments
                      onNext={(data) => handleNext({ attachments: data.attachments })}
                      onPrevious={handlePrevious}
                      data={{ attachments: formData.attachments || [] }}
                    />
                  )}
                  {currentStep === 5 && (
                    <Confirmation
                      onSubmit={handleSubmit}
                      onPrevious={handlePrevious}
                      data={formData}
                      isSubmitting={isSubmitting}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </TabsContent>

            <TabsContent value="anonymous">
              <AnonymousComplaintForm />
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </div>
  )
}

