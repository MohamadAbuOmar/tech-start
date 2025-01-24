import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function TrainToHireContent() {
  const selectionCriteria = {
    company: [
      "Evidence of growth potential and business plan",
      "Experienced leadership and management team",
      "Solid training plan and scope of work",
      "Pre-approved trainee list",
      "Aligned with required skills/technologies"
    ],
    trainee: [
      "IT/STEM degree or IT certification/diploma",
      "No current full-time employment",
      "Training on new/advanced technology",
      "No previous Student Internship funding",
      "No immediate family relation to management"
    ]
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground p-6">
          <CardTitle className="text-3xl font-bold">Train-to-hire Stipends Grant</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-lg text-gray-700 leading-relaxed">
              Available to University Graduates, IT Diploma and IT related certificates holders who need to gain 
              practical skills in advanced IT services. Valid for six months with monthly evaluations.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary">
                  <Badge variant="outline" className="mb-2">Program Details</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Stipend up to $1,200 based on position and skills</li>
                  <li>Six-month maximum duration</li>
                  <li>Full-time employment contract required</li>
                  <li>Monthly trainee evaluations</li>
                  <li>Business/R&D activities contribution</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary">
                  <Badge variant="outline" className="mb-2">Company Contribution</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Standard Companies</h4>
                    <p className="text-blue-700">30% contribution to trainee remuneration</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Special Categories</h4>
                    <p className="text-purple-700">20% contribution for smaller firms, Gaza firms, female-managed firms, and women trainees</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-primary">
                <Badge variant="outline" className="mb-2">Selection Criteria</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-3 text-primary">Company Requirements</h4>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    {selectionCriteria.company.map((criterion, index) => (
                      <li key={index}>{criterion}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-primary">Trainee Requirements</h4>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    {selectionCriteria.trainee.map((criterion, index) => (
                      <li key={index}>{criterion}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="#">View Guidelines</Link>
            </Button>
            <Button asChild>
              <Link href="#">Apply Now</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

