import { useState, FormEvent } from "react"
import { motion } from "framer-motion"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { ComplaintDescriptionData } from "@/types/form-types"
import { toast } from "@/hooks/use-toast"

export interface ComplaintDescriptionProps {
  onNext: (data: ComplaintDescriptionData) => void;
  onPrevious: () => void;
  data?: ComplaintDescriptionData;
}

export function ComplaintDescription({ onNext, onPrevious, data }: ComplaintDescriptionProps) {
  const [formData, setFormData] = useState<ComplaintDescriptionData>({
    description: data?.description || "",
    entity: data?.entity || "",
    filedInCourt: data?.filedInCourt || false,
  })

  const validateForm = () => {
    if (!formData.description.trim()) {
      toast({
        title: "Error",
        description: "Description of the complaint is required",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.entity.trim()) {
      toast({
        title: "Error",
        description: "Entity against which the complaint is filed is required",
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
        <Label htmlFor="description">Description of the Complaint</Label>
        <Textarea
          id="description"
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="entity">The entity against which the complaint is filed</Label>
        <Input
          id="entity"
          value={formData.entity}
          onChange={(e) => setFormData({ ...formData, entity: e.target.value })}
          required
        />
      </div>

      <div>
        <Label>Was this complaint filed in a court of law?</Label>
        <RadioGroup
          defaultValue={formData.filedInCourt.toString()}
          onValueChange={(value) => setFormData({ ...formData, filedInCourt: value === "true" })}
          className="flex space-x-4 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="filedInCourtYes" />
            <Label htmlFor="filedInCourtYes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="filedInCourtNo" />
            <Label htmlFor="filedInCourtNo">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex justify-between">
        <Button type="button" onClick={onPrevious} variant="outline">Previous</Button>
        <Button type="submit">Next</Button>
      </div>
    </motion.form>
  )
}

