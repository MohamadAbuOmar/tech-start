import { useState, FormEvent } from "react"
import { motion } from "framer-motion"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { PreviousComplaintData } from "@/types/complaint"
import { toast } from "@/hooks/use-toast"
import { useLanguage } from "@/context/LanguageContext"

interface PreviousComplaintsProps {
  onNext: (data: PreviousComplaintData) => void;
  onPrevious: () => void;
  data?: PreviousComplaintData;
}

export function PreviousComplaints({ onNext, onPrevious, data }: PreviousComplaintsProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<PreviousComplaintData>({
    hasPreviousComplaint: data?.hasPreviousComplaint || false,
    previousComplaintEntity: data?.previousComplaintEntity || "",
    previousComplaintDate: data?.previousComplaintDate || "",
    receivedResponse: data?.receivedResponse || false,
    responseDate: data?.responseDate || "",
  })

  const validateForm = () => {
    if (formData.hasPreviousComplaint) {
      if (!formData.previousComplaintEntity?.trim()) {
        toast({
          title: language === 'en' ? "Error" : "خطأ",
          description: language === 'en' ? "Previous complaint entity is required" : "الجهة السابقة للشكوى مطلوبة",
          variant: "destructive",
        });
        return false;
      }
      if (!formData.previousComplaintDate?.trim()) {
        toast({
          title: language === 'en' ? "Error" : "خطأ",
          description: language === 'en' ? "Previous complaint date is required" : "تاريخ الشكوى السابقة مطلوب",
          variant: "destructive",
        });
        return false;
      }
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
      <div>
        <Label>{language === 'en' ? 'Have you filed a similar complaint before?' : 'هل قدمت شكوى مماثلة من قبل؟'}</Label>
        <RadioGroup
          defaultValue={formData.hasPreviousComplaint.toString()}
          onValueChange={(value) => setFormData({ ...formData, hasPreviousComplaint: value === "true" })}
          className="flex space-x-4 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="hasPreviousYes" />
            <Label htmlFor="hasPreviousYes">{language === 'en' ? 'Yes' : 'نعم'}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="hasPreviousNo" />
            <Label htmlFor="hasPreviousNo">{language === 'en' ? 'No' : 'لا'}</Label>
          </div>
        </RadioGroup>
      </div>

      {formData.hasPreviousComplaint && (
        <>
          <div className="space-y-2">
            <Label htmlFor="previousEntity">{language === 'en' ? 'Previous Entity' : 'الجهة السابقة'}</Label>
            <Input
              id="previousEntity"
              value={formData.previousComplaintEntity}
              onChange={(e) => setFormData({ ...formData, previousComplaintEntity: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="previousDate">{language === 'en' ? 'Date of Previous Complaint' : 'تاريخ الشكوى السابقة'}</Label>
            <Input
              id="previousDate"
              type="date"
              value={formData.previousComplaintDate}
              onChange={(e) => setFormData({ ...formData, previousComplaintDate: e.target.value })}
            />
          </div>
        </>
      )}

      <div className="flex justify-between">
        <Button type="button" onClick={onPrevious} variant="outline">{language === 'en' ? 'Previous' : 'السابق'}</Button>
        <Button type="submit">{language === 'en' ? 'Next' : 'التالي'}</Button>
      </div>
    </motion.form>
  )
}

