import { useState, FormEvent } from "react"
import { motion } from "framer-motion"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { ComplaintDescriptionData } from "@/types/form-types"
import { toast } from "@/hooks/use-toast"
import { useLanguage } from "@/context/LanguageContext"

export interface ComplaintDescriptionProps {
  onNext: (data: ComplaintDescriptionData) => void;
  onPrevious: () => void;
  data?: ComplaintDescriptionData;
}

export function ComplaintDescription({ onNext, onPrevious, data }: ComplaintDescriptionProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<ComplaintDescriptionData>({
    description: data?.description || "",
    entity: data?.entity || "",
    filedInCourt: data?.filedInCourt || false,
  })

  const validateForm = () => {
    if (!formData.description.trim()) {
      toast({
        title: language === 'en' ? "Error" : "خطأ",
        description: language === 'en' ? "Description of the complaint is required" : "وصف الشكوى مطلوب",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.entity.trim()) {
      toast({
        title: language === 'en' ? "Error" : "خطأ",
        description: language === 'en' ? "Entity against which the complaint is filed is required" : "الجهة المقدم ضدها الشكوى مطلوبة",
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
        <Label htmlFor="description">{language === 'en' ? 'Description of the Complaint' : 'وصف الشكوى'}</Label>
        <Textarea
          id="description"
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="entity">{language === 'en' ? 'The entity against which the complaint is filed' : 'الجهة المقدم ضدها الشكوى'}</Label>
        <Input
          id="entity"
          value={formData.entity}
          onChange={(e) => setFormData({ ...formData, entity: e.target.value })}
          required
        />
      </div>

      <div>
        <Label>{language === 'en' ? 'Was this complaint filed in a court of law?' : 'هل تم تقديم هذه الشكوى في المحكمة؟'}</Label>
        <RadioGroup
          defaultValue={formData.filedInCourt.toString()}
          onValueChange={(value) => setFormData({ ...formData, filedInCourt: value === "true" })}
          className="flex space-x-4 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="filedInCourtYes" />
            <Label htmlFor="filedInCourtYes">{language === 'en' ? 'Yes' : 'نعم'}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="filedInCourtNo" />
            <Label htmlFor="filedInCourtNo">{language === 'en' ? 'No' : 'لا'}</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex justify-between">
        <Button type="button" onClick={onPrevious} variant="outline">{language === 'en' ? 'Previous' : 'السابق'}</Button>
        <Button type="submit">{language === 'en' ? 'Next' : 'التالي'}</Button>
      </div>
    </motion.form>
  )
}

