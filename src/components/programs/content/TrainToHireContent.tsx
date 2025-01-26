import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"

interface TrainToHireContentProps {
  data: {
    title: string;
    description: string;
    programDetails: string[];
    contribution: {
      standard: {
        title: string;
        description: string;
      };
      special: {
        title: string;
        description: string;
      };
    };
    selectionCriteria: {
      company: string[];
      trainee: string[];
    };
    buttons: {
      guidelines: string;
      apply: string;
    };
  };
}

export function TrainToHireContent({ data }: TrainToHireContentProps) {
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
        <CardContent className="p-6 space-y-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-lg text-gray-700 leading-relaxed">
              {data.description}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary">
                  <Badge variant="outline" className="mb-2">{language === 'en' ? 'Program Details' : 'تفاصيل البرنامج'}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  {data.programDetails.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary">
                  <Badge variant="outline" className="mb-2">{language === 'en' ? 'Company Contribution' : 'مساهمة الشركة'}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">{data.contribution.standard.title}</h4>
                    <p className="text-blue-700">{data.contribution.standard.description}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">{data.contribution.special.title}</h4>
                    <p className="text-purple-700">{data.contribution.special.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-primary">
                <Badge variant="outline" className="mb-2">{language === 'en' ? 'Selection Criteria' : 'معايير الاختيار'}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-3 text-primary">{language === 'en' ? 'Company Requirements' : 'متطلبات الشركة'}</h4>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    {data.selectionCriteria.company.map((criterion, index) => (
                      <li key={index}>{criterion}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-primary">{language === 'en' ? 'Trainee Requirements' : 'متطلبات المتدرب'}</h4>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    {data.selectionCriteria.trainee.map((criterion, index) => (
                      <li key={index}>{criterion}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

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

