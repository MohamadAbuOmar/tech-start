import { useState, FormEvent } from "react"
import { motion } from "framer-motion"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { PreviousComplaintData } from "@/types/complaint"
import { toast } from "@/hooks/use-toast"

interface PreviousComplaintsProps {
  onNext: (data: PreviousComplaintData) => void;
  onPrevious: () => void;
  data?: PreviousComplaintData;
}

export function PreviousComplaints({ onNext, onPrevious, data }: PreviousComplaintsProps) {
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
          title: "Error",
          description: "Previous complaint entity is required",
          variant: "destructive",
        });
        return false;
      }
      if (!formData.previousComplaintDate?.trim()) {
        toast({
          title: "Error",
          description: "Previous complaint date is required",
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
        <Label>Have you filed a similar complaint before?</Label>
        <RadioGroup
          defaultValue={formData.hasPreviousComplaint.toString()}
          onValueChange={(value) => setFormData({ ...formData, hasPreviousComplaint: value === "true" })}
          className="flex space-x-4 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="hasPreviousYes" />
            <Label htmlFor="hasPreviousYes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="hasPreviousNo" />
            <Label htmlFor="hasPreviousNo">No</Label>
          </div>
        </RadioGroup>
      </div>

      {formData.hasPreviousComplaint && (
        <>
          <div className="space-y-2">
            <Label htmlFor="previousEntity">Previous Entity</Label>
            <Input
              id="previousEntity"
              value={formData.previousComplaintEntity}
              onChange={(e) => setFormData({ ...formData, previousComplaintEntity: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="previousDate">Date of Previous Complaint</Label>
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
        <Button type="button" onClick={onPrevious} variant="outline">Previous</Button>
        <Button type="submit">Next</Button>
      </div>
    </motion.form>
  )
}

