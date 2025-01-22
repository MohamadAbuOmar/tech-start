'use client'

import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, BriefcaseIcon, UserIcon, TrendingUpIcon } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
}

const procurements = [
  {
    id: 1,
    title: "IT Infrastructure Upgrade",
    description: "Seeking proposals for upgrading our IT infrastructure to support remote work capabilities.",
    deadline: "2024-03-15",
    category: "IT Services",
    icon: <BriefcaseIcon className="h-5 w-5" />,
  },
  {
    id: 2,
    title: "Digital Skills Training Program",
    description: "Looking for experienced trainers to conduct a comprehensive digital skills program for youth.",
    deadline: "2024-03-20",
    category: "Training",
    icon: <UserIcon className="h-5 w-5" />,
  },
  {
    id: 3,
    title: "Market Research: IT Sector Growth",
    description: "Requesting proposals for a detailed market research study on IT sector growth in Palestine.",
    deadline: "2024-03-25",
    category: "Research",
    icon: <TrendingUpIcon className="h-5 w-5" />,
  },
]

const vocalnessOpportunities = [
  {
    id: 1,
    title: "Tech Talk Series Speaker",
    description: "Share your expertise in AI and machine learning at our upcoming Tech Talk series.",
    date: "2024-04-10",
    type: "Speaking Engagement",
    icon: <UserIcon className="h-5 w-5" />,
  },
  {
    id: 2,
    title: "IT Success Story Feature",
    description: "We're looking for inspiring IT professionals to feature in our monthly success story blog.",
    date: "Ongoing",
    type: "Content Creation",
    icon: <TrendingUpIcon className="h-5 w-5" />,
  },
  {
    id: 3,
    title: "Youth Mentorship Program",
    description: "Mentor aspiring IT professionals and help shape the future of Palestine's tech industry.",
    date: "2024-05-01",
    type: "Mentorship",
    icon: <BriefcaseIcon className="h-5 w-5" />,
  },
]

export function WorkWithUs() {
  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-green-50 py-24">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full mb-4">JOIN US</span>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Work With Us</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore opportunities to collaborate and grow with TechStart. We offer various ways to engage with our project and contribute to the Palestinian IT sector&apos;s development.
          </p>
        </motion.div>

        <Tabs defaultValue="procurements" className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-12 p-1 bg-blue-100 rounded-full">
            <TabsTrigger
              value="procurements"
              className="w-1/2 py-3 text-lg transition-all rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Procurement
            </TabsTrigger>
            <TabsTrigger
              value="vocalness"
              className="w-1/2 py-3 text-lg transition-all rounded-full data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              Recruitment
            </TabsTrigger>
          </TabsList>
          <TabsContent value="procurements">
            <motion.div variants={itemVariants} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {procurements.map((procurement) => (
                <Card key={procurement.id} className="overflow-hidden transition-all hover:shadow-lg hover:scale-105">
                  <CardHeader className="bg-blue-50 flex flex-row items-center space-y-0 gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      {procurement.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold text-blue-800">{procurement.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-600 mb-4">{procurement.description}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Deadline: {procurement.deadline}
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {procurement.category}
                    </Badge>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                      Apply Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </motion.div>
          </TabsContent>
          <TabsContent value="vocalness">
            <motion.div variants={itemVariants} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {vocalnessOpportunities.map((opportunity) => (
                <Card key={opportunity.id} className="overflow-hidden transition-all hover:shadow-lg hover:scale-105">
                  <CardHeader className="bg-green-50 flex flex-row items-center space-y-0 gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      {opportunity.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold text-green-800">{opportunity.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-600 mb-4">{opportunity.description}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Date: {opportunity.date}
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {opportunity.type}
                    </Badge>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors">
                      Get Involved
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

