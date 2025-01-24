import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function UpskillContent() {
  const grants = [
    {
      title: "Student Internship",
      description: "For students in last 2 years of university studies",
      icon: "🎓",
      highlight: "Up to $500 stipend"
    },
    {
      title: "Train-to-hire",
      description: "For graduates and new hires needing practical skills",
      icon: "💼",
      highlight: "Up to $1,200 stipend"
    },
    {
      title: "On-the-job Training",
      description: "For new IT staff working on international projects",
      icon: "🌐",
      highlight: "International buyer focused"
    },
    {
      title: "Expatriate & Diaspora",
      description: "For international staff and Palestinian diaspora",
      icon: "🌍",
      highlight: "Up to 70% salary coverage"
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
          <CardTitle className="text-3xl font-bold">UPSKILL PROGRAM (OPEN)</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-lg text-gray-700 leading-relaxed">
              The Upskill Program focuses on helping IT firms (including tech and tech enabled startups) 
              upskill their workforce to scale up their business, increase their opportunities for growth, 
              and to attract new local and international clients.
            </p>
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

