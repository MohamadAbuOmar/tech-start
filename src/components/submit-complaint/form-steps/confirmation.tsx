import { useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import type { FormDataType } from "@/types/form-types"
import { toast } from "@/hooks/use-toast"

interface ConfirmationProps {
  onSubmit: (data: FormDataType & { confirmed: boolean }) => void
  onPrevious: () => void
  data: FormDataType
  isSubmitting: boolean
}

export function Confirmation({ onSubmit, onPrevious, data, isSubmitting }: ConfirmationProps) {
  const [confirmed, setConfirmed] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!confirmed) {
      toast({
        title: "Error",
        description: "You must confirm the complaint details before submitting",
        variant: "destructive",
      });
      return;
    }
    onSubmit({ ...data, confirmed });
  }

  return (
    <motion.form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="confirmation"
          checked={confirmed}
          onCheckedChange={(checked) => setConfirmed(checked as boolean)}
        />
        <Label htmlFor="confirmation" className="text-sm">
          I, the complainant, do hereby assert and confirm that the aforementioned information, data and attachments are
          genuine, legitimate and accurate, and I undertake to bear full legal liability if they were found to be
          otherwise at any point of time, or if the complaint was found to be filed maliciously or with ill-intention.
        </Label>
      </div>

      <div className="flex justify-between">
        <Button type="button" onClick={onPrevious} variant="outline" disabled={isSubmitting}>
          Previous
        </Button>
        <Button type="submit" disabled={!confirmed || isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Complaint"}
        </Button>
      </div>
    </motion.form>
  )
}

