import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function PioneerOverviewContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground p-6">
          <CardTitle className="text-3xl font-bold">Pioneer Program Overview</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-lg text-gray-700 leading-relaxed">
              The Pioneer program focuses on strengthening the competitiveness of the Palestinian IT sector 
              through financing initial costs for establishment in West Bank and Gaza.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                  <Badge variant="outline" className="text-sm font-normal">
                    Focus Areas
                  </Badge>
                  Program Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Strengthen IT sector competitiveness</li>
                  <li>Support new business establishments</li>
                  <li>Generate more revenue opportunities</li>
                  <li>Create new jobs in the IT sector</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                  <Badge variant="outline" className="text-sm font-normal">
                    Benefits
                  </Badge>
                  Key Advantages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Access to better skilled worker pool</li>
                  <li>Enhanced business infrastructure</li>
                  <li>Support for IT equipment and facilities</li>
                  <li>International standards compliance</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
