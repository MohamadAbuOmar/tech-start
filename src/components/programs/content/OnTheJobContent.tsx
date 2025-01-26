import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"

interface OnTheJobContentProps {
  data: {
    title: string;
    description: string;
    overview: {
      duration: string[];
      training: string[];
    };
    requirements: {
      company: string[];
      trainee: string[];
    };
    buttons: {
      guidelines: string;
      apply: string;
    };
  };
}

export function OnTheJobContent({ data }: OnTheJobContentProps) {
  const { language } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground p-6">
          <CardTitle className="text-3xl font-bold">{data.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 leading-relaxed">
              {data.description}
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                  <Badge variant="outline" className="text-sm font-normal">
                    {language === 'en' ? 'Overview' : 'نظرة عامة'}
                  </Badge>
                  {language === 'en' ? 'Key Features' : 'الميزات الرئيسية'}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{language === 'en' ? 'Duration and Requirements' : 'المدة والمتطلبات'}</h4>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    {data.overview.duration.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{language === 'en' ? 'Training and Costs' : 'التدريب والتكاليف'}</h4>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    {data.overview.training.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                    <Badge variant="outline" className="text-sm font-normal">
                      {language === 'en' ? 'Requirements' : 'المتطلبات'}
                    </Badge>
                    {language === 'en' ? 'Company Criteria' : 'معايير الشركة'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    {data.requirements.company.map((requirement, index) => (
                      <li key={index}>{requirement}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                    <Badge variant="outline" className="text-sm font-normal">
                      {language === 'en' ? 'Eligibility' : 'الأهلية'}
                    </Badge>
                    {language === 'en' ? 'Trainee Criteria' : 'معايير المتدرب'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    {data.requirements.trainee.map((requirement, index) => (
                      <li key={index}>{requirement}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="#">{data.buttons.guidelines}</Link>
            </Button>
            <Button asChild>
              <Link href="#">{data.buttons.apply}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

