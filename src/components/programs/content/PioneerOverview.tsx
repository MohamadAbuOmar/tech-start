import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function PioneerOverview() {
  const grants = [
    {
      title: "New IT Service Operations",
      description: "Launch emerging IT services companies in West Bank and Gaza",
      icon: "💼",
      highlight: "50/50 co-funding"
    },
    {
      title: "IT Training Providers",
      description: "Establish new IT training services and bootcamp providers",
      icon: "🎓",
      highlight: "Performance-based funding"
    },
    {
      title: "HR Service Providers",
      description: "Launch HR providers specialized in IT sector recruitment",
      icon: "👥",
      highlight: "70/30 split for women-led"
    },
    {
      title: "Business Infrastructure",
      description: "Upgrade IT infrastructure with focus on Gaza",
      icon: "🏢",
      highlight: "Up to 80% co-financing"
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
          <CardTitle className="text-3xl font-bold">PIONEER PROGRAM (OPEN)</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-lg text-gray-700 leading-relaxed">
              The Pioneer program focuses on strengthening the competitiveness of the Palestinian IT sector 
              through financing initial costs for establishment in West Bank and Gaza.
            </p>
          </div>

          <div className="prose max-w-none text-gray-700">
            <p className="text-lg">
              Pioneer provides matching grants to new business establishments that increase global competitiveness 
              by building new capabilities in the local IT ecosystem. The program aims to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Broaden service offerings in the Palestinian IT sector</li>
              <li>Generate more revenue and create new jobs</li>
              <li>Improve access to skilled workers through training providers</li>
              <li>Support essential business infrastructure development</li>
            </ul>
          </div>

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
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-4">{grant.description}</p>
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                    {grant.highlight}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
