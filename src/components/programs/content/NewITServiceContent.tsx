import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"

interface NewITServiceContentProps {
  data: {
    title: string;
    description: string;
    coveredCosts: string[];
    funding: {
      standard: {
        title: string;
        description: string;
      };
      special: {
        title: string;
        description: string;
      };
    };
    buttons: {
      guidelines: string;
      apply: string;
    };
  };
}

export function NewITServiceContent({ data }: NewITServiceContentProps) {
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
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-lg text-gray-700 leading-relaxed">
              {data.description}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                  <Badge variant="outline">{language === 'en' ? 'Covered Costs' : 'التكاليف المغطاة'}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  {data.coveredCosts.map((cost, index) => (
                    <li key={index}>{cost}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                  <Badge variant="outline">Funding Details</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">{data.funding.standard.title}</h4>
                  <p className="text-blue-700">{data.funding.standard.description}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">{data.funding.special.title}</h4>
                  <p className="text-purple-700">{data.funding.special.description}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4 justify-center pt-6">
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
