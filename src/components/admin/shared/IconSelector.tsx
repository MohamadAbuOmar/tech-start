"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as Icons from "lucide-react";

interface IconSelectorProps {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
}

export function IconSelector({ form, name, label = "Icon" }: IconSelectorProps) {
  const iconNames = Object.keys(Icons).filter(
    (key) => typeof Icons[key as keyof typeof Icons] === "function"
  );

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select an icon" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {iconNames.map((iconName) => {
                const Icon = Icons[iconName as keyof typeof Icons] as React.ComponentType;
                return (
                  <SelectItem key={iconName} value={iconName}>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span>{iconName}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
