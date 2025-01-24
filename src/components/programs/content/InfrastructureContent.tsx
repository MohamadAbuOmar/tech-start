import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function InfrastructureContent() {
  const coveredItems = [
    { icon: "🖥️", name: "IT Equipment", description: "Computers and technology equipment" },
    { icon: "🌐", name: "Connectivity", description: "High-speed internet connections" },
    { icon: "🏢", name: "Office Setup", description: "Furniture and basic infrastructure" },
    { icon: "💻", name: "Remote Work", description: "Technology to facilitate remote work" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground p-6">
          <CardTitle className="text-3xl font-bold">IT Business Infrastructure Grant</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-lg text-gray-700 leading-relaxed">
              Provides matching grants to eligible IT service firms to finance upgrading of business 
              infrastructure, with a special focus on Gaza while remaining accessible to West Bank companies.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {coveredItems.map((item, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <span className="text-4xl mb-4 block">{item.icon}</span>
                  <h3 className="font-semibold text-primary mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-primary">
                <Badge variant="outline" className="mb-2">Co-Financing Options</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Standard Companies</h4>
                  <p className="text-blue-700">Up to 70% co-financing</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Special Categories</h4>
                  <p className="text-purple-700">Up to 80% for women-led & smaller firms</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Gaza-Based</h4>
                  <p className="text-green-700">Up to 80% co-financing</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-primary">
                <Badge variant="outline" className="mb-2">Important Notes</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Asset tagging required for equipment tracking</li>
                <li>Physical inventory checks at midterm and project end</li>
                <li>Grant repayment required for missing equipment</li>
                <li>Rolling basis applications</li>
                <li>Business plan must demonstrate infrastructure needs</li>
              </ul>
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
