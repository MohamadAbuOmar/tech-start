import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ExpatriateContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground p-6">
          <CardTitle className="text-3xl font-bold">Expatriate and Diaspora Stipends Grant</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 leading-relaxed">
              Supports international staff and Palestinian diaspora with senior expertise to build technical and managerial capacity in Palestinian IT firms. Valid for up to two years with performance-based evaluation.
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                  <Badge variant="outline" className="text-sm font-normal">
                    Coverage
                  </Badge>
                  Stipend Options
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <Card className="bg-gray-50">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-primary">Option 1</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">Up to 70% of basic salary (company covers 30% + bonuses)</p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-50">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-primary">Option 2</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">Expatriate benefits (relocation, housing, health insurance, etc.)</p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                    <Badge variant="outline" className="text-sm font-normal">
                      Selection
                    </Badge>
                    Company Criteria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Growth potential and sound business plan</li>
                    <li>Experienced leadership team</li>
                    <li>Clear technological gaps diagnosis</li>
                    <li>Detailed expatriate utilization plan</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                    <Badge variant="outline" className="text-sm font-normal">
                      Eligibility
                    </Badge>
                    Individual Criteria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Working abroad for 12+ months</li>
                    <li>Senior international experience</li>
                    <li>Physical presence requirement</li>
                    <li>No immediate family relation to management</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

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

