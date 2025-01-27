"use client";

import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IconSelector } from "@/components/admin/shared/IconSelector";
import { ProgramFormValues } from "./types";
import { useCallback } from "react";

interface DynamicFeatureListProps {
  form: UseFormReturn<ProgramFormValues>;
}

export function DynamicFeatureList({ form }: DynamicFeatureListProps) {
  const features = form.watch('features') || [];

  const handleAddFeature = useCallback(() => {
    const newFeatures = [...features, {
      icon: "Activity",
      title_en: "",
      title_ar: "",
      description_en: "",
      description_ar: ""
    }];
    form.setValue('features', newFeatures);
  }, [features, form]);

  const handleRemoveFeature = useCallback((index: number) => {
    const newFeatures = features.filter((_, i) => i !== index);
    form.setValue('features', newFeatures);
  }, [features, form]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Program Features</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddFeature}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Feature
        </Button>
      </div>

      {features.map((feature, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="text-sm font-medium">Feature {index + 1}</h4>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveFeature(index)}
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>

          <FormField
            control={form.control}
            name={`features.${index}.icon`}
            defaultValue={feature.icon}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Feature Icon</FormLabel>
                <FormControl>
                  <IconSelector 
                    value={field.value || "Activity"}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name={`features.${index}.title_en`}
                defaultValue={feature.title_en}
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
                name={`features.${index}.description_en`}
                defaultValue={feature.description_en}
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
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name={`features.${index}.title_ar`}
                defaultValue={feature.title_ar}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title (Arabic)</FormLabel>
                    <FormControl>
                      <Input {...field} dir="rtl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`features.${index}.description_ar`}
                defaultValue={feature.description_ar}
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
