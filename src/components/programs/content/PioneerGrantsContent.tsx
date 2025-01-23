import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export function PioneerGrantsContent() {
  const grants = [
    {
      title: "New IT Service Operations Grant",
      description: "De-risk and enable the launch of emerging IT services companies in the West Bank and Gaza IT services market.",
      coFunding: "50/50 co-funding basis (70/30 for women-led businesses)",
      icon: "💼"
    },
    {
      title: "New IT Training Service Providers Grant",
      description: "Enable establishment of new IT training services providers in the West Bank and Gaza.",
      coFunding: "50/50 co-funding basis with performance-based incentives",
      icon: "🎓"
    },
    {
      title: "New HR Service Providers Grant",
      description: "Support launch of new HR providers for IT sector in West Bank and Gaza.",
      coFunding: "50/50 co-funding basis (70/30 for women-led businesses)",
      icon: "👥"
    },
    {
      title: "Upgrading IT Business Infrastructure Grant",
      description: "Finance upgrading of business infrastructure, focusing on Gaza.",
      coFunding: "Up to 80% co-financing for eligible companies",
      icon: "🏢"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground p-6">
          <CardTitle className="text-3xl font-bold">Available Pioneer Grants</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            {grants.map((grant, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gray-50">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{grant.icon}</span>
                    <CardTitle className="text-xl font-semibold text-primary">
                      {grant.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <p className="text-gray-700">{grant.description}</p>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-700 font-medium">
                      {grant.coFunding}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" asChild>
                      <Link href="#">Learn More</Link>
                    </Button>
                    <Button asChild>
                      <Link href="#">Apply Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
