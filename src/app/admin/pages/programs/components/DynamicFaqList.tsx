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
import { ProgramFormValues } from "@/app/actions/pages/programs";

interface DynamicFaqListProps {
  form: UseFormReturn<ProgramFormValues>;
}

export function DynamicFaqList({ form }: DynamicFaqListProps) {
  const { fields, append, remove } = form.useFieldArray({
    name: "faqs",
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Program FAQs</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ question_en: "", question_ar: "", answer_en: "", answer_ar: "", order: fields.length })}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add FAQ
        </Button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="text-sm font-medium">FAQ {index + 1}</h4>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => remove(index)}
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name={`faqs.${index}.question_en`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question (English)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`faqs.${index}.answer_en`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Answer (English)</FormLabel>
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
                name={`faqs.${index}.question_ar`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question (Arabic)</FormLabel>
                    <FormControl>
                      <Input {...field} dir="rtl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`faqs.${index}.answer_ar`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Answer (Arabic)</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={4} dir="rtl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name={`faqs.${index}.order`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Order</FormLabel>
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
      ))}
    </div>
  );
}
