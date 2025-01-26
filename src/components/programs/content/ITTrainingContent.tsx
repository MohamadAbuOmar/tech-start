import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"

interface ITTrainingContentProps {
  data: {
    title: string;
    description: string;
    services: string[];
    coveredCosts: string[];
    performance: {
      title: string;
      results: Array<{
        percent: string;
        description: string;
      }>;
      note: string;
    };
    buttons: {
      guidelines: string;
      apply: string;
    };
  };
}

export function ITTrainingContent({ data }: ITTrainingContentProps) {
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
                  <Badge variant="outline" className="mb-2">{language === 'en' ? 'Services Can Include' : 'الخدمات المتاحة'}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  {data.services.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary">
                  <Badge variant="outline" className="mb-2">{language === 'en' ? 'Covered Costs' : 'التكاليف المغطاة'}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  {data.coveredCosts.map((cost, index) => (
                    <li key={index}>{cost}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-primary">
                <Badge variant="outline" className="mb-2">{data.performance.title}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {data.performance.results.map((item, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-primary mb-2">{item.percent}</div>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-700">
                  {data.performance.note}
                </p>
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
