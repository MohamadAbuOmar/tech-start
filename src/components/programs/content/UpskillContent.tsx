import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function UpskillContent() {
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
          <p className="text-lg text-gray-700 leading-relaxed">
            The Upskill Program focuses on helping IT firms (including tech and tech-enabled startups) 
            upskill their workforce to scale up their business, increase their opportunities for growth, 
            and to attract new local and international clients.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800">The UpSkill Program will help upgrade the skills of the Palestinian IT service workforce through provision of stipends through the following window grants:</h3>
          
          <div className="grid gap-6">
            {[
              {
                number: "01",
                title: "Student Internship Stipends Grant",
                description: "Available to Students in the last 2 years of their university studies."
              },
              {
                number: "02",
                title: "Train-to-hire Stipends Grant",
                description: "Available to University Graduates, IT Diploma and IT related certificates holders, and new hires who need to gain knowledge and practical skills in mid or advanced-level value added IT services."
              },
              {
                number: "03",
                title: "On-the-job Training Stipends Grant",
                description: "Covers new IT staff looking to gain knowledge and practical skills in mid-level or advanced-level value added IT services that cannot be found easily in the Palestinian labor force."
              },
              {
                number: "04",
                title: "Expatriate and Diaspora Stipends Grant",
                description: "Supports international staff, including Arab-Palestinian living in Israel, and Palestinians in the Diaspora with senior technological expertise or leadership experience."
              }
            ].map((item) => (
              <Card key={item.number} className="overflow-hidden border-l-4 border-primary">
                <CardContent className="p-4 flex items-start gap-4">
                  <span className="text-4xl font-bold text-primary/20">{item.number}</span>
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-primary">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
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

