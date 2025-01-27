"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { ProgramForm } from "./ProgramForm";
import { ProgramFormValues, programFormSchema } from "./types";

interface ProgramFormWrapperProps {
  initialData?: ProgramFormValues;
  onSubmit: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
  buttonText?: string;
  mode?: "create" | "edit";
}

export function ProgramFormWrapper({ 
  initialData, 
  onSubmit, 
  buttonText = "Create Program", 
  mode = "create" 
}: ProgramFormWrapperProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: ProgramFormValues) => {
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
    
    Object.entries(data).forEach(([key, value]) => {
      if (value === null) return;
      
      if (key === 'features') {
        formData.append(key, JSON.stringify(value));
      } else if (typeof value === 'object') {
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
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save program",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProgramForm
      initialData={initialData}
      onSubmit={handleSubmit}
      buttonText={buttonText}
      mode={mode}
      isSubmitting={isSubmitting}
    />
  );
}
