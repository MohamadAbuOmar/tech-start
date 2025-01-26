'use client'

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion } from 'framer-motion'
import { PioneerOverview } from './content/PioneerOverview'
import { PioneerFAQClient } from '@/components/faq-section/pioneer-faq-client'
import { NewITServiceContent } from './content/NewITServiceContent'
import { ITTrainingContent } from './content/ITTrainingContent'
import { HRServiceContent } from './content/HRServiceContent'
import { InfrastructureContent } from './content/InfrastructureContent'
import { useLanguage } from "@/context/LanguageContext"

interface PioneerTabsProps {
  data: {
    overview: Record<string, string>;
    itService: Record<string, string>;
    training: Record<string, string>;
    hrService: Record<string, string>;
    infrastructure: Record<string, string>;
    faq: {
      id: string;
      name: string;
      slug: string;
      order: number;
      faqs: Array<{
        id: string;
        question: string;
        answer: string;
        order: number;
      }>;
    }[];
  };
  defaultTab?: string;
}

export default function PioneerTabs({ defaultTab = "overview" }: Omit<PioneerTabsProps, 'data'>) {
  const { language } = useLanguage();
    const [activeTab, setActiveTab] = React.useState(defaultTab)

    React.useEffect(() => {
        const hash = window.location.hash.replace('#', '')
        if (hash) {
            setActiveTab(hash)
            setTimeout(() => {
                const element = document.getElementById(hash)
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                }
            }, 100)
        }
    }, [])

    const tabs = [
        { value: "overview", label: language === 'en' ? "Overview" : "نظرة عامة" },
        { value: "it-service", label: language === 'en' ? "New IT Service Operations" : "عمليات خدمة تكنولوجيا المعلومات الجديدة" },
        { value: "training", label: language === 'en' ? "IT Training Providers" : "مزودي التدريب على تكنولوجيا المعلومات" },
        { value: "hr-service", label: language === 'en' ? "HR Service Providers" : "مزودي خدمات الموارد البشرية" },
        { value: "infrastructure", label: language === 'en' ? "Business Infrastructure" : "البنية التحتية للأعمال" },
        { value: "faq", label: language === 'en' ? "FAQ" : "الأسئلة الشائعة" },
    ]

    return (
        <div className='flex-grow bg-gray-50'>
            <motion.div
                className='container mx-auto h-full'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex md:flex-row flex-col items-baseline h-full">
                    <div className="md:w-64 w-full sticky top-20">
                        <TabsList className='flex md:flex-col flex-row md:items-stretch items-center md:justify-start justify-start md:space-y-2 md:space-x-0 space-x-2 p-4 min-w-max md:min-w-0 bg-white/80 backdrop-blur-sm'>
                            {tabs.map((tab) => (
                                <TabsTrigger 
                                    key={tab.value}
                                    value={tab.value}
                                    className="flex-shrink-0 md:w-full px-4 py-2 md:py-3 text-center transition-all duration-200 ease-in-out
                                             text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900
                                             data-[state=active]:bg-primary data-[state=active]:text-primary-foreground
                                             data-[state=active]:shadow-md rounded-md whitespace-nowrap md:whitespace-normal"
                                >
                                    {tab.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    <div className='flex-grow overflow-auto p-4 md:p-6'>
                        <TabsContent value="overview">
                            <PioneerOverview />
                        </TabsContent>
                        <TabsContent value="it-service">
                            <NewITServiceContent />
                        </TabsContent>
                        <TabsContent value="training">
                            <ITTrainingContent />
                        </TabsContent>
                        <TabsContent value="hr-service">
                            <HRServiceContent />
                        </TabsContent>
                        <TabsContent value="infrastructure">
                            <InfrastructureContent />
                        </TabsContent>
                        <TabsContent value="faq">
                            <PioneerFAQClient categories={data?.faq || []} />
                        </TabsContent>
                    </div>
                </Tabs>
            </motion.div>
        </div>
    )
}
