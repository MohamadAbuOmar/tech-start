import { useState, FormEvent } from "react"
import { motion } from "framer-motion"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { useLanguage } from "@/context/LanguageContext"

interface ComplaintDetailsData {
  facts: string
}

interface ComplaintDetailsProps {
  onNext: (data: ComplaintDetailsData) => void
  onPrevious: () => void
  data?: ComplaintDetailsData
}

export function ComplaintDetails({ onNext, onPrevious, data }: ComplaintDetailsProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<ComplaintDetailsData>({
    facts: data?.facts || "",
  })

  const validateForm = () => {
    if (!formData.facts.trim()) {
      toast({
        title: language === 'en' ? "Error" : "خطأ",
        description: language === 'en' ? "Facts and grounds of the complaint are required" : "الحقائق وأسباب الشكوى مطلوبة",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    onNext(formData);
  }

  return (
    <motion.form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="facts">{language === 'en' ? 'Facts and grounds of the complaint' : 'الحقائق وأسباب الشكوى'}</Label>
        <Textarea
          id="facts"
          rows={6}
          value={formData.facts}
          onChange={(e) => setFormData({ ...formData, facts: e.target.value })}
          required
        />
      </div>

      <div className="flex justify-between">
        <Button type="button" onClick={onPrevious} variant="outline">{language === 'en' ? 'Previous' : 'السابق'}</Button>
        <Button type="submit">{language === 'en' ? 'Next' : 'التالي'}</Button>
      </div>
    </motion.form>
  )
}

