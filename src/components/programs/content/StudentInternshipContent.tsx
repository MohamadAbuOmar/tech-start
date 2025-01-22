import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function StudentInternshipContent() {
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
        <CardContent className="p-6 space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 leading-relaxed">
              This stipend is available for students in their last 2 years of university studies, 
              who need to gain knowledge and practical skills in mid-level or advanced-level value-added IT services.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                  <Badge variant="outline" className="text-sm font-normal">
                    Key Details
                  </Badge>
                  Program Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Valid for a maximum of two years</li>
                  <li>Stipend amount up to $500</li>
                  <li>Covers local and international client-related work</li>
                  <li>Companies must present training/work plan</li>
                  <li>Monthly evaluation of interns required</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                  <Badge variant="outline" className="text-sm font-normal">
                    Criteria
                  </Badge>
                  Company Selection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Evidence of growth potential and sound business plan</li>
                  <li>Experienced leadership team</li>
                  <li>Clear technological gaps diagnosis</li>
                  <li>Detailed intern utilization plan</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                  <Badge variant="outline" className="text-sm font-normal">
                    Eligibility
                  </Badge>
                  Trainee Selection Criteria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Enrolled in last two years of IT-related or STEM degree</li>
                  <li>Strong academic performance</li>
                  <li>Demonstrated interest in IT field</li>
                  <li>No immediate family relation to company management</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

