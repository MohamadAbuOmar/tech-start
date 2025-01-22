"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

export function AnonymousComplaintForm() {
    interface FormData {
        date: string;
        complaintNumber: string;
        willProvideContact: boolean;
        description: string;
        entityAgainst: string;
        filedInCourt: boolean;
        previousComplaint: boolean;
        previousEntityAgainst: string;
        previousFilingDate: string;
        receivedResponse: boolean;
        responseDate: string;
        factsAndGrounds: string;
        attachments: File[];
        confirmed: boolean;
    }
    
    const [formData, setFormData] = useState<FormData>({
        date: new Date().toISOString().split('T')[0],
        complaintNumber: Math.random().toString(36).substr(2, 9),
        willProvideContact: false,
        description: "",
        entityAgainst: "",
        filedInCourt: false,
        previousComplaint: false,
        previousEntityAgainst: "",
        previousFilingDate: "",
        receivedResponse: false,
        responseDate: "",
        factsAndGrounds: "",
        attachments: [],
        confirmed: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRadioChange = (name: string, value: boolean) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        if (!formData.description.trim()) {
            toast({
                title: "Error",
                description: "Description is required",
                variant: "destructive",
            });
            return false;
        }
        if (!formData.entityAgainst.trim()) {
            toast({
                title: "Error",
                description: "Entity against which the complaint is filed is required",
                variant: "destructive",
            });
            return false;
        }
        if (!formData.factsAndGrounds.trim()) {
            toast({
                title: "Error",
                description: "Facts and grounds are required",
                variant: "destructive",
            });
            return false;
        }
        if (!formData.confirmed) {
            toast({
                title: "Error",
                description: "You must confirm the complaint details",
                variant: "destructive",
            });
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/complaints/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'ANONYMOUS',
                    complaintDescription: {
                        description: formData.description,
                        entity: formData.entityAgainst,
                        filedInCourt: formData.filedInCourt
                    },
                    previousComplaints: {
                        hasPreviousComplaint: formData.previousComplaint,
                        previousComplaintEntity: formData.previousEntityAgainst,
                        previousComplaintDate: formData.previousFilingDate,
                        receivedResponse: formData.receivedResponse,
                        responseDate: formData.responseDate
                    },
                    complaintDetails: {
                        facts: formData.factsAndGrounds
                    },
                    attachments: formData.attachments.map(file => ({
                        fileUrl: URL.createObjectURL(file),
                        fileName: file.name,
                        fileType: file.type,
                        fileSize: file.size
                    })),
                    confirmed: formData.confirmed
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit complaint');
            }

            const result = await response.json();
            if (result.success) {
                toast({
                    title: 'Complaint Submitted',
                    description: `Your complaint has been successfully submitted. Complaint number: ${result.complaintNumber}`,
                });
                // Reset form
                setFormData({
                    date: new Date().toISOString().split('T')[0],
                    complaintNumber: Math.random().toString(36).substr(2, 9),
                    willProvideContact: false,
                    description: "",
                    entityAgainst: "",
                    filedInCourt: false,
                    previousComplaint: false,
                    previousEntityAgainst: "",
                    previousFilingDate: "",
                    receivedResponse: false,
                    responseDate: "",
                    factsAndGrounds: "",
                    attachments: [],
                    confirmed: false,
                });
            } else {
                throw new Error(result.error || 'Failed to submit complaint');
            }
        } catch (error) {
            console.error('Error submitting complaint:', error);
            toast({
                title: 'Error',
                description: error instanceof Error ? error.message : 'Failed to submit complaint. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            <Card>
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="date">Date</Label>
                            <Input type="date" id="date" name="date" value={formData.date} onChange={handleInputChange} required />
                        </div>
                        <div>
                            <Label htmlFor="complaintNumber">Complaint Number</Label>
                            <Input type="text" id="complaintNumber" name="complaintNumber" value={formData.complaintNumber} readOnly />
                        </div>
                    </div>

                    <div className="mt-6">
                        <Label>Are you willing to provide a tool to contact you?</Label>
                        <RadioGroup
                            onValueChange={(value) => handleRadioChange("willProvideContact", value === "yes")}
                            className="flex space-x-4 mt-2"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="willProvideContact-yes" />
                                <Label htmlFor="willProvideContact-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="willProvideContact-no" />
                                <Label htmlFor="willProvideContact-no">No</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="mt-6">
                        <Label htmlFor="description">Description of the Complaint</Label>
                        <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required className="mt-2" />
                    </div>

                    <div className="mt-6">
                        <Label htmlFor="entityAgainst">The entity against which the complaint is filed</Label>
                        <Input type="text" id="entityAgainst" name="entityAgainst" value={formData.entityAgainst} onChange={handleInputChange} required className="mt-2" />
                    </div>

                    <div className="mt-6">
                        <Label>Was this complaint filed in a court of law?</Label>
                        <RadioGroup
                            onValueChange={(value) => handleRadioChange("filedInCourt", value === "yes")}
                            className="flex space-x-4 mt-2"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="filedInCourt-yes" />
                                <Label htmlFor="filedInCourt-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="filedInCourt-no" />
                                <Label htmlFor="filedInCourt-no">No</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="mt-6">
                        <Label>Have you filed a similar complaint in the past?</Label>
                        <RadioGroup
                            onValueChange={(value) => handleRadioChange("previousComplaint", value === "yes")}
                            className="flex space-x-4 mt-2"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="previousComplaint-yes" />
                                <Label htmlFor="previousComplaint-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="previousComplaint-no" />
                                <Label htmlFor="previousComplaint-no">No</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {formData.previousComplaint && (
                        <>
                            <div className="mt-6">
                                <Label htmlFor="previousEntityAgainst">The entity against which the previous complaint was filed</Label>
                                <Input type="text" id="previousEntityAgainst" name="previousEntityAgainst" value={formData.previousEntityAgainst} onChange={handleInputChange} required className="mt-2" />
                            </div>

                            <div className="mt-6">
                                <Label htmlFor="previousFilingDate">Date of filing</Label>
                                <Input type="date" id="previousFilingDate" name="previousFilingDate" value={formData.previousFilingDate} onChange={handleInputChange} required className="mt-2" />
                            </div>

                            <div className="mt-6">
                                <Label>Have you received a response to the previous complaint?</Label>
                                <RadioGroup
                                    onValueChange={(value) => handleRadioChange("receivedResponse", value === "yes")}
                                    className="flex space-x-4 mt-2"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id="receivedResponse-yes" />
                                        <Label htmlFor="receivedResponse-yes">Yes</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="receivedResponse-no" />
                                        <Label htmlFor="receivedResponse-no">No</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {formData.receivedResponse && (
                                <div className="mt-6">
                                    <Label htmlFor="responseDate">Date of the response</Label>
                                    <Input type="date" id="responseDate" name="responseDate" value={formData.responseDate} onChange={handleInputChange} required className="mt-2" />
                                </div>
                            )}
                        </>
                    )}

                    <div className="mt-6">
                        <Label htmlFor="factsAndGrounds">Facts and grounds of the complaint</Label>
                        <Textarea id="factsAndGrounds" name="factsAndGrounds" value={formData.factsAndGrounds} onChange={handleInputChange} required className="mt-2" />
                    </div>

                    <div className="mt-6">
                        <Label>Attachments and documents of the complaint (Optional)</Label>
                        <Input type="file" multiple className="mt-2" onChange={(e) => setFormData(prev => ({ ...prev, attachments: Array.from(e.target.files || []) }))} />
                    </div>

                    <div className="mt-6 flex items-center space-x-2">
                        <Checkbox id="confirmed" checked={formData.confirmed} onCheckedChange={(checked) => setFormData(prev => ({ ...prev, confirmed: checked as boolean }))} />
                        <Label htmlFor="confirmed">
                            I, the complainant (Anonymous), do hereby assert and confirm that the aforementioned information, data and attachments are genuine, legitimate and accurate, and I undertake to bear full legal liability if they were found to be otherwise at any point of time, or if the complaint was found to be filed maliciously or with ill-intention.
                        </Label>
                    </div>

                    <Button 
                type="submit" 
                className="mt-6 w-full" 
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Submitting...' : 'Submit Anonymous Complaint'}
            </Button>
                </CardContent>
            </Card>
        </motion.form>
    );
}

