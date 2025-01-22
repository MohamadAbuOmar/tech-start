import { notFound } from 'next/navigation'
import { getFaqCategoryById } from '@/app/actions/pages/faqActions'
import { FaqItemForm } from '@/components/admin/faq/faq-item-form'

export default async function CreateFaqItemPage({ params }: { params: { id: string } }) {
  const category = await getFaqCategoryById(params.id)

  if (!category) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add Question to {category.nameEn}</h1>
      <FaqItemForm categoryId={category.id} />
    </div>
  )
}
