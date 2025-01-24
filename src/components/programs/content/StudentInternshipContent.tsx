import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function StudentInternshipContent() {
  const selectionCriteria = {
    company: [
      "Evidence of potential growth and sound business plan",
      "Experienced and complementary leadership team",
      "Solid training/internship plan",
      "Pre-approved student intern list",
      "Alignment with required skills/technologies"
    ],
    student: [
      "Enrolled in final two years at Palestinian University",
      "IT-related degree program",
      "Sufficient training time before graduation",
      "No immediate family relation to company management",
      "Must be currently enrolled student"
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
          <CardTitle className="text-3xl font-bold">Student Internship Stipends Grant</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-lg text-gray-700 leading-relaxed">
              This stipend supports students in their last 2 years of university studies to gain practical 
              skills in mid-level or advanced-level value added IT services through local companies.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary">
                  <Badge variant="outline" className="mb-2">Program Details</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Valid for maximum two years</li>
                  <li>Stipend up to $500</li>
                  <li>Covers transportation and allowances</li>
                  <li>Part-time employment contract required</li>
                  <li>Monthly evaluations mandatory</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary">
                  <Badge variant="outline" className="mb-2">Expected Outcomes</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Full-time employment opportunities</li>
                  <li>Practical knowledge and experience</li>
                  <li>Enhanced employability</li>
                  <li>Increased IT sector human capital</li>
                </ul>
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
                  <h4 className="font-semibold mb-3 text-primary">Student Requirements</h4>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    {selectionCriteria.student.map((criterion, index) => (
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

