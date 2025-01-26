"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Mail, Phone, MapPin, AlertTriangle, CheckCircle2, Info } from 'lucide-react'
import { useLanguage } from "@/context/LanguageContext"

interface Guideline {
  id: string;
  title: string;
  description: string;
  items: string[];
  locations?: string[];
}

interface GuidelinesProps {
  guidelines: Guideline[];
}

export function Guidelines({ guidelines }: GuidelinesProps) {
  const { language } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="max-w-screen-2xl mx-auto"
    >
      <Card className="mb-8 overflow-hidden shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8">
          <CardTitle className="text-4xl font-bold tracking-tight">
            {content[language].title}
          </CardTitle>
          <p className="mt-4 text-lg text-purple-100">
            {content[language].subtitle}
          </p>
        </CardHeader>
        <CardContent className="space-y-8 p-8 bg-gradient-to-b from-white to-purple-50">
          <section>
            <h2 className="text-2xl font-semibold text-purple-800 mb-4 flex items-center">
              <Info className="mr-2 h-6 w-6" />
              {guidelines[0].title}
            </h2>
            <ul className="space-y-3">
              {[
                ...guidelines[0].items,
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="mr-3 h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl font-semibold text-purple-700 underline hover:text-purple-900 transition-colors">
                {guidelines[1].title}
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="flex items-center space-x-4 p-4 bg-indigo-50 rounded-lg border border-indigo-100 shadow-sm">
                  <Mail className="text-indigo-600 h-8 w-8" />
                  <div>
                    <h3 className="font-semibold text-indigo-900">{guidelines[1].items[0]}</h3>
                    <p className="text-indigo-700">
                      {guidelines[1].description}{" "}
                      <a
                        href="mailto:TechStart_Complaints@dai.com"
                        className="text-indigo-600 hover:underline font-medium"
                      >
                        TechStart_Complaints@dai.com
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg border border-green-100 shadow-sm">
                  <Phone className="text-green-600 h-8 w-8" />
                  <div>
                    <h3 className="font-semibold text-green-900">{guidelines[1].items[1]}</h3>
                    <p className="text-green-700">
                      {guidelines[1].description}{" "}
                      <span className="font-medium">+970-2-298 8530</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-amber-50 rounded-lg border border-amber-100 shadow-sm">
                  <MapPin className="text-amber-600 h-8 w-8 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-amber-900">{guidelines[1].items[2]}</h3>
                    <p className="text-amber-700 mb-2">{guidelines[1].description}</p>
                    <ul className="list-disc pl-5 space-y-1 text-amber-800">
                      {guidelines[1].locations?.map((location, index) => (
                        <li key={index}>{location}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <section className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-100 shadow-inner">
            <h3 className="text-2xl font-semibold text-orange-800 mb-4 flex items-center">
              <AlertTriangle className="mr-2 h-6 w-6 text-orange-600" /> {guidelines[2].title}
            </h3>
            <ul className="space-y-3">
              {[
                ...guidelines[2].items,
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <Info className="mr-3 h-5 w-5 text-orange-600 flex-shrink-0 mt-1" />
                  <span className="text-orange-900">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </CardContent>
      </Card>
    </motion.div>
  )
}

