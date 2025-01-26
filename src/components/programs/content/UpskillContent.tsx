import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/context/LanguageContext"

interface UpskillContentProps {
  data: {
    title: string;
    description: string;
    grants: Array<{
      title: string;
      description: string;
      icon: string;
      highlight: string;
    }>;
  };
}

export function UpskillContent({ data }: UpskillContentProps) {
  const { isRTL } = useLanguage();
  
  // Use language context for dynamic layout
  const containerClasses = `space-y-8 ${isRTL ? 'rtl' : 'ltr'}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={containerClasses}
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
            {data.grants.map((grant, index) => (
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

