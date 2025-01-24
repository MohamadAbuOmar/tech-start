import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HRServiceContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground p-6">
          <CardTitle className="text-3xl font-bold">HR Service Providers Grant</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-lg text-gray-700 leading-relaxed">
              Enables the launch of new HR providers specializing in IT sector recruitment, 
              bringing modern recruitment practices and tools to address the challenges in 
              finding skilled IT professionals in West Bank and Gaza.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary">
                  <Badge variant="outline" className="mb-2">Required Capabilities</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Modern recruitment practices</li>
                  <li>HR technology and databases</li>
                  <li>Psychological selection tools</li>
                  <li>Candidate management systems</li>
                  <li>International IT recruitment experience</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary">
                  <Badge variant="outline" className="mb-2">Business Requirements</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Local registration/partnership</li>
                  <li>Sustainable business model</li>
                  <li>Proven track record</li>
                  <li>Independent operation capability</li>
                  <li>Market-based approach</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-primary">
                <Badge variant="outline" className="mb-2">Funding Structure</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Standard Funding</h4>
                  <p className="text-blue-700">50/50 co-funding basis</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Women-Led Businesses</h4>
                  <p className="text-purple-700">70/30 split in favor of the business</p>
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
