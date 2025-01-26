import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"

interface InfrastructureContentProps {
  data: {
    title: string;
    description: string;
    coveredItems: Array<{
      icon: string;
      name: string;
      description: string;
    }>;
    funding: {
      standard: {
        title: string;
        description: string;
      };
      special: {
        title: string;
        description: string;
      };
      gaza: {
        title: string;
        description: string;
      };
    };
    notes: string[];
    buttons: {
      guidelines: string;
      apply: string;
    };
  };
}

export function InfrastructureContent({ data }: InfrastructureContentProps) {
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

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {data.coveredItems.map((item, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <span className="text-4xl mb-4 block">{item.icon}</span>
                  <h3 className="font-semibold text-primary mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-primary">
                <Badge variant="outline" className="mb-2">Co-Financing Options</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">{data.funding.standard.title}</h4>
                  <p className="text-blue-700">{data.funding.standard.description}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">{data.funding.special.title}</h4>
                  <p className="text-purple-700">{data.funding.special.description}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">{data.funding.gaza.title}</h4>
                  <p className="text-green-700">{data.funding.gaza.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-primary">
                <Badge variant="outline" className="mb-2">{language === 'en' ? 'Important Notes' : 'ملاحظات مهمة'}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                {data.notes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
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
