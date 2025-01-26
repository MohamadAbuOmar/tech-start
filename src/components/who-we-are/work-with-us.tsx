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

import { useLanguage } from "@/context/LanguageContext";
import { LocalizedWorkWithUs } from "@/app/actions/pages/work-with-us";

interface WorkWithUsProps {
  data: LocalizedWorkWithUs[];
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'briefcase':
      return <BriefcaseIcon className="h-5 w-5" />;
    case 'user':
      return <UserIcon className="h-5 w-5" />;
    case 'trending-up':
      return <TrendingUpIcon className="h-5 w-5" />;
    default:
      return <BriefcaseIcon className="h-5 w-5" />;
  }
};

export function WorkWithUs({ data }: WorkWithUsProps) {
  const { language, isRTL } = useLanguage();
  
  const procurements = data.filter(item => item.type === 'Procurement');
  const recruitments = data.filter(item => item.type === 'Recruitment');
  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-green-50 py-24">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <span className={`inline-block px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full mb-4 ${isRTL ? 'font-[Noto Sans Arabic]' : ''}`}>
            {language === 'en' ? 'JOIN US' : 'انضم إلينا'}
          </span>
          <h2 className={`text-4xl font-bold text-gray-900 mb-6 ${isRTL ? 'font-[Noto Sans Arabic]' : ''}`}>
            {language === 'en' ? 'Work With Us' : 'اعمل معنا'}
          </h2>
          <p className={`text-lg text-gray-600 max-w-3xl mx-auto ${isRTL ? 'font-[Noto Sans Arabic]' : ''}`}>
            {language === 'en' 
              ? 'Explore opportunities to collaborate and grow with TechStart. We offer various ways to engage with our project and contribute to the Palestinian IT sector\'s development.'
              : 'اكتشف فرص التعاون والنمو مع تيك ستارت. نقدم طرقًا متنوعة للمشاركة في مشروعنا والمساهمة في تطوير قطاع تكنولوجيا المعلومات الفلسطيني.'}
          </p>
        </motion.div>

        <Tabs defaultValue="procurements" className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-12 p-1 bg-blue-100 rounded-full">
            <TabsTrigger
              value="procurements"
              className="w-1/2 py-3 text-lg transition-all rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              {language === 'en' ? 'Procurement' : 'المشتريات'}
            </TabsTrigger>
            <TabsTrigger
              value="recruitment"
              className="w-1/2 py-3 text-lg transition-all rounded-full data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              {language === 'en' ? 'Recruitment' : 'التوظيف'}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="procurements">
            <motion.div variants={itemVariants} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {procurements.map((procurement) => (
                <Card key={procurement.id} className="overflow-hidden transition-all hover:shadow-lg hover:scale-105">
                  <CardHeader className="bg-blue-50 flex flex-row items-center space-y-0 gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      {getIcon(procurement.iconName)}
                    </div>
                    <CardTitle className={`text-xl font-semibold text-blue-800 ${isRTL ? 'font-[Noto Sans Arabic]' : ''}`}>
                      {procurement.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className={`text-gray-600 mb-4 ${isRTL ? 'font-[Noto Sans Arabic]' : ''}`}>
                      {procurement.description}
                    </p>
                    <div className={`flex items-center text-sm text-gray-500 mb-2 ${isRTL ? 'font-[Noto Sans Arabic]' : ''}`}>
                      <CalendarIcon className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                      {language === 'en' ? 'Deadline: ' : 'الموعد النهائي: '}
                      {new Date(procurement.deadline).toLocaleDateString(language === 'en' ? 'en-US' : 'ar-SA')}
                    </div>
                    <Badge variant="secondary" className={`bg-blue-100 text-blue-800 ${isRTL ? 'font-[Noto Sans Arabic]' : ''}`}>
                      {procurement.tags}
                    </Badge>
                  </CardContent>
                  <CardFooter>
                    <Button className={`w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors ${isRTL ? 'font-[Noto Sans Arabic]' : ''}`}>
                      {language === 'en' ? 'Apply Now' : 'تقدم الآن'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </motion.div>
          </TabsContent>
          <TabsContent value="recruitment">
            <motion.div variants={itemVariants} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {recruitments.map((recruitment) => (
                <Card key={recruitment.id} className="overflow-hidden transition-all hover:shadow-lg hover:scale-105">
                  <CardHeader className="bg-green-50 flex flex-row items-center space-y-0 gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      {getIcon(recruitment.iconName)}
                    </div>
                    <CardTitle className={`text-xl font-semibold text-green-800 ${isRTL ? 'font-[Noto Sans Arabic]' : ''}`}>
                      {recruitment.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className={`text-gray-600 mb-4 ${isRTL ? 'font-[Noto Sans Arabic]' : ''}`}>
                      {recruitment.description}
                    </p>
                    <div className={`flex items-center text-sm text-gray-500 mb-2 ${isRTL ? 'font-[Noto Sans Arabic]' : ''}`}>
                      <CalendarIcon className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                      {language === 'en' ? 'Deadline: ' : 'الموعد النهائي: '}
                      {new Date(recruitment.deadline).toLocaleDateString(language === 'en' ? 'en-US' : 'ar-SA')}
                    </div>
                    <Badge variant="secondary" className={`bg-green-100 text-green-800 ${isRTL ? 'font-[Noto Sans Arabic]' : ''}`}>
                      {recruitment.tags}
                    </Badge>
                  </CardContent>
                  <CardFooter>
                    <Button className={`w-full bg-green-600 hover:bg-green-700 text-white transition-colors ${isRTL ? 'font-[Noto Sans Arabic]' : ''}`}>
                      {language === 'en' ? 'Get Involved' : 'شارك معنا'}
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

