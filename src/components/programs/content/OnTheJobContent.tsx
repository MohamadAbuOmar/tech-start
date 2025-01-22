import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function OnTheJobContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground p-6">
          <CardTitle className="text-3xl font-bold">On-the-Job Training Stipend Grant</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 leading-relaxed">
              Supports new IT staff gaining knowledge in advanced services, specifically for projects with international buyers. Requires a signed employment contract and letter of intent from international buyers.
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                  <Badge variant="outline" className="text-sm font-normal">
                    Overview
                  </Badge>
                  Key Features
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Duration and Requirements</h4>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Maximum duration: 1 year</li>
                    <li>Requires international buyer approval</li>
                    <li>Full-time employment contract required</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Training and Costs</h4>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Practical training and mentoring provided</li>
                    <li>Companies cover overhead costs</li>
                  </ul>
                </div>
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
                    <li>Growth potential evidence</li>
                    <li>Letter of Intent from international client</li>
                    <li>Detailed training plan</li>
                    <li>Resource commitment details</li>
                    <li>Business case for workforce stipend</li>
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
                    <li>IT/STEM degree or certification</li>
                    <li>No current full-time employment</li>
                    <li>New/advanced technology training</li>
                    <li>No previous grant funding</li>
                    <li>No family relations restriction</li>
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

