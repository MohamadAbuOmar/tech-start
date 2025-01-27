"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

interface IconSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function IconSelector({ value, onChange }: IconSelectorProps) {
  const iconList = Object.entries(Icons)
    .filter(([name, icon]) => typeof icon === "function" && icon !== undefined && name !== "default")
    .sort((a, b) => a[0].localeCompare(b[0]));

  const renderIcon = (iconName: string) => {
    const Icon = Icons[iconName as keyof typeof Icons];
    return Icon ? <Icon className="h-4 w-4" /> : null;
  };

  return (
    <Select 
      onValueChange={onChange}
      value={value || ""}
    >
      <SelectTrigger className={cn("w-full", !value && "text-muted-foreground")}>
        <SelectValue>
          {value ? (
            <div className="flex items-center gap-2">
              {renderIcon(value)}
              <span>{value}</span>
            </div>
          ) : (
            "Select an icon"
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {iconList.map(([name]) => (
          <SelectItem key={name} value={name}>
            <div className="flex items-center gap-2">
              {renderIcon(name)}
              <span>{name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
