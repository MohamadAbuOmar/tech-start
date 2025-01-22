import { FaqCategoryForm } from '@/components/admin/faq/faq-category-form'

export default function CreateFaqCategoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create FAQ Category</h1>
      <FaqCategoryForm />
    </div>
  )
}
