import React from 'react';
import { Button } from "@/components/ui/button";

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, activeCategory, onCategoryChange }) => (
  <div className="flex flex-wrap gap-2">
    {categories.map((category) => (
      <Button
        key={category}
        variant={activeCategory === category ? "default" : "outline"}
        onClick={() => onCategoryChange(category)}
      >
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Button>
    ))}
  </div>
);
