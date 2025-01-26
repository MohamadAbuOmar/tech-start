import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"

interface ExpatriateContentProps {
  data: {
    title: string;
    description: string;
    stipendOptions: Array<{
      title: string;
      description: string;
    }>;
    criteria: {
      company: string[];
      individual: string[];
    };
    buttons: {
      guidelines: string;
      apply: string;
    };
  };
}

export function ExpatriateContent({ data }: ExpatriateContentProps) {
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
                    {language === 'en' ? 'Coverage' : 'التغطية'}
                  </Badge>
                  {language === 'en' ? 'Stipend Options' : 'خيارات المنحة'}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                {data.stipendOptions.map((option, index) => (
                  <Card key={index} className="bg-gray-50">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-primary">{option.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{option.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                    <Badge variant="outline" className="text-sm font-normal">
                      {language === 'en' ? 'Selection' : 'الاختيار'}
                    </Badge>
                    {language === 'en' ? 'Company Criteria' : 'معايير الشركة'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    {data.criteria.company.map((criterion, index) => (
                      <li key={index}>{criterion}</li>
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
                    {language === 'en' ? 'Individual Criteria' : 'المعايير الفردية'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    {data.criteria.individual.map((criterion, index) => (
                      <li key={index}>{criterion}</li>
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

