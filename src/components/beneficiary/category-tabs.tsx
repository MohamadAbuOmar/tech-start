import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, activeCategory, onCategoryChange }) => {
  const { language, isRTL } = useLanguage();

  const getCategoryLabel = (category: string) => {
    if (category === 'all') {
      return language === 'en' ? 'All' : 'الكل';
    }
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className={`flex flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          onClick={() => onCategoryChange(category)}
          className={isRTL ? 'font-[Noto Sans Arabic]' : ''}
        >
          {getCategoryLabel(category)}
        </Button>
      ))}
    </div>
  );
};
