import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function TrainToHireContent() {
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
        <CardContent className="p-6 space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 leading-relaxed">
              This grant supports individuals with an IT-related degree/STEM degree or IT certification who need to gain practical skills in mid or advanced-level IT services. Valid for up to six months with stipends up to $1,200.
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                  <Badge variant="outline" className="text-sm font-normal">
                    Overview
                  </Badge>
                  Program Details
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Duration and Amount</h4>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Maximum duration: 6 months</li>
                    <li>Stipend amount: Up to $1,200</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Company Contribution</h4>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>30% of trainee remuneration</li>
                    <li>Reduced to 20% for small firms, Gaza-based firms, female-managed firms, and women trainees</li>
                  </ul>
                </div>
              </CardContent>
              <Separator className="my-4" />
              <CardContent>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Requires monthly trainee evaluations</li>
                  <li>Full-time employment contracts required during training period</li>
                </ul>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                    <Badge variant="outline" className="text-sm font-normal">
                      Requirements
                    </Badge>
                    Company Criteria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Evidence of growth potential and sound business plan</li>
                    <li>Experienced leadership team</li>
                    <li>Solid training plan and scope of work</li>
                    <li>List of pre-approved trainees</li>
                    <li>Alignment with required skills/technologies</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                    <Badge variant="outline" className="text-sm font-normal">
                      Eligibility
                    </Badge>
                    Trainee Criteria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>IT-related/STEM degree or IT certification/diploma</li>
                    <li>No current full-time employment</li>
                    <li>New technology or advanced level training required</li>
                    <li>No previous Student Internship Stipend funding</li>
                    <li>No immediate family relation to company management</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

