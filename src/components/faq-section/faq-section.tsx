import { FAQSectionClient } from "./faq-section-client";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  order: number;
  faqs: FAQ[];
}

interface FAQSectionProps {
  categories: Category[];
}

export function FAQSection({ categories }: FAQSectionProps) {
  return <FAQSectionClient categories={categories} />;
}
