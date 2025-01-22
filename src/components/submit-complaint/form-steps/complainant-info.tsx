import { useState } from "react"
import { motion } from "framer-motion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormEvent } from "react"
import { ComplainantData } from "@/types/form-types"
import { toast } from "@/hooks/use-toast"

interface ComplainantInfoProps {
  onNext: (data: { complainantInfo: ComplainantData }) => void;
  data: { complainantInfo?: ComplainantData };
}

export function ComplainantInfo({ onNext, data }: ComplainantInfoProps) {
  const [complainantType, setComplainantType] = useState<'individual' | 'firm'>(data.complainantInfo?.complainantType || "individual")
  const [formData, setFormData] = useState<ComplainantData>({
    name: data.complainantInfo?.name || "",
    gender: data.complainantInfo?.gender || "",
    phone: data.complainantInfo?.phone || "",
    email: data.complainantInfo?.email || "",
    firmName: data.complainantInfo?.firmName || "",
    firmPhone: data.complainantInfo?.firmPhone || "",
    firmEmail: data.complainantInfo?.firmEmail || "",
  })

  const validateForm = () => {
    if (complainantType === "individual") {
      if (!formData.name?.trim()) {
        toast({
          title: "Error",
          description: "Name is required",
          variant: "destructive",
        });
        return false;
      }
      if (!formData.phone?.trim()) {
        toast({
          title: "Error",
          description: "Phone number is required",
          variant: "destructive",
        });
        return false;
      }
      if (!formData.email?.trim()) {
        toast({
          title: "Error",
          description: "Email is required",
          variant: "destructive",
        });
        return false;
      }
    } else {
      if (!formData.firmName?.trim()) {
        toast({
          title: "Error",
          description: "Firm name is required",
          variant: "destructive",
        });
        return false;
      }
      if (!formData.firmPhone?.trim()) {
        toast({
          title: "Error",
          description: "Firm phone number is required",
          variant: "destructive",
        });
        return false;
      }
      if (!formData.firmEmail?.trim()) {
        toast({
          title: "Error",
          description: "Firm email is required",
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
    onNext({ complainantInfo: { ...formData, complainantType } });
  }

  return (
    <motion.form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label>Complainant Type</Label>
        <RadioGroup
          defaultValue={complainantType}
          onValueChange={(value) => setComplainantType(value as 'individual' | 'firm')}
          className="flex space-x-4 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="individual" id="individual" />
            <Label htmlFor="individual">Individual</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="firm" id="firm" />
            <Label htmlFor="firm">Firm</Label>
          </div>
        </RadioGroup>
      </div>

      {complainantType === "individual" ? (
        <>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>Gender</Label>
            <RadioGroup
              defaultValue={formData.gender}
              onValueChange={(value) => setFormData({ ...formData, gender: value })}
              className="flex space-x-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
            </RadioGroup>
          </div>
        </>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="firmName">Firm Name</Label>
          <Input
            id="firmName"
            value={formData.firmName}
            onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
            required
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor={complainantType === "individual" ? "phone" : "firmPhone"}>Phone Number</Label>
        <Input
          id={complainantType === "individual" ? "phone" : "firmPhone"}
          type="tel"
          value={complainantType === "individual" ? formData.phone : formData.firmPhone}
          onChange={(e) =>
            setFormData(
              complainantType === "individual"
                ? { ...formData, phone: e.target.value }
                : { ...formData, firmPhone: e.target.value }
            )
          }
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={complainantType === "individual" ? "email" : "firmEmail"}>Email Address</Label>
        <Input
          id={complainantType === "individual" ? "email" : "firmEmail"}
          type="email"
          value={complainantType === "individual" ? formData.email : formData.firmEmail}
          onChange={(e) =>
            setFormData(
              complainantType === "individual"
                ? { ...formData, email: e.target.value }
                : { ...formData, firmEmail: e.target.value }
            )
          }
          required
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Next</Button>
      </div>
    </motion.form>
  )
}

