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
import { ProgramFormValues } from "@/app/actions/pages/programs";

interface DynamicFeatureListProps {
  form: UseFormReturn<ProgramFormValues>;
}

export function DynamicFeatureList({ form }: DynamicFeatureListProps) {
  const { fields, append, remove } = form.useFieldArray({
    name: "features",
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Program Features</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ icon: "", title_en: "", title_ar: "", description_en: "", description_ar: "" })}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Feature
        </Button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="text-sm font-medium">Feature {index + 1}</h4>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => remove(index)}
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>

          <IconSelector
            form={form}
            name={`features.${index}.icon`}
            label="Feature Icon"
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name={`features.${index}.title_en`}
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
