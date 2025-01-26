"use client";

import { useCallback } from "react";
import debounce from "lodash/debounce";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/context/LanguageContext";

interface GalleryFiltersProps {
    onSearch: (term: string) => void;
    onSort: (order: 'asc' | 'desc') => void;
    title: string;
}

export const GalleryFilters = ({ onSearch, onSort, title }: GalleryFiltersProps) => {
    const { language } = useLanguage();
    const debouncedSearch = useCallback((term: string) => {
        debounce(() => {
            onSearch(term);
        }, 300)();
    }, [onSearch]);

    return (
        <div className="w-full z-10 bg-gray-100 border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex justify-between items-center gap-4">
                    <div>
                        <div className="max-w-7xl mx-auto py-4 px-4">
                            <h1 className="text-3xl font-bold text-[#872996]">
                                {title}
                            </h1>
                        </div>
                    </div>
                    <div className="relative flex-grow max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input
                            className="pl-10 h-10 bg-white/80 hover:bg-white border-gray-200 hover:border-purple-300 focus:border-purple-500 focus:ring-purple-500/20 transition-all rounded-lg"
                            placeholder={language === 'en' ? "Search events..." : "البحث عن الأحداث..."}
                            onChange={(e) => debouncedSearch(e.target.value)}
                        />
                    </div>
                    <Select onValueChange={(value) => onSort(value as 'asc' | 'desc')}>
                        <SelectTrigger className="w-[140px] h-10 bg-white/80 hover:bg-white border-gray-200 hover:border-purple-300 focus:border-purple-500 focus:ring-purple-500/20 transition-all rounded-lg">
                            <SelectValue placeholder={language === 'en' ? "Sort by date" : "الترتيب حسب التاريخ"} />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200">
                            <SelectItem value="desc" className="hover:bg-purple-50">
                                {language === 'en' ? "Newest first" : "الأحدث أولاً"}
                            </SelectItem>
                            <SelectItem value="asc" className="hover:bg-purple-50">
                                {language === 'en' ? "Oldest first" : "الأقدم أولاً"}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};
