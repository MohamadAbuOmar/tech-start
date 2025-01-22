"use client";

import { useState } from "react";
import { ContentCard, type ContentCardProps } from "./content-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface ContentGridProps {
  title: string;
  subtitle?: string;
  items: ContentCardProps[];
}

export function ContentGrid({ title, subtitle, items }: ContentGridProps) {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const types = ["all", ...new Set(items.map((item) => item.type))];

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase()) ||
      item.tags?.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase())
      );
    const matchesType = selectedType === "all" || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <section className="py-16 px-5 bg-gradient-to-b from-background to-secondary/10 min-h-screen">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              {subtitle}
            </p>
          )}

          <div className="flex flex-col gap-6 max-w-xl mx-auto">
            <Input
              placeholder="Search by title, description, or tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-center"
            />

            <div className="flex flex-wrap gap-3 justify-center">
              {types.map((type) => (
                <Badge
                  key={type}
                  variant={selectedType === type ? "default" : "secondary"}
                  className="cursor-pointer text-sm capitalize px-4 py-1.5"
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <p className="text-center text-muted-foreground text-lg">
            No items found matching your criteria.
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {filteredItems.map((item) => (
              <ContentCard key={item.slug} {...item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
