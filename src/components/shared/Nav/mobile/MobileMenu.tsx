"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, ChevronRight, Home, Book, Users, Newspaper, Shield, HelpCircle, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LogoAnimation } from '../../Hero/LogoAnimation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const getMenuItems = (language: 'en' | 'ar') => [
  { id: 'home', name: language === 'en' ? 'Home' : 'الرئيسية', icon: Home, href: '/' },
  { id: 'programs', name: language === 'en' ? 'Programs' : 'البرامج', icon: Book, subItems: [
    { id: 'program1', name: language === 'en' ? 'Program 1' : 'البرنامج 1', href: '/programs/1' },
    { id: 'program2', name: language === 'en' ? 'Program 2' : 'البرنامج 2', href: '/programs/2' },
    { id: 'program3', name: language === 'en' ? 'Program 3' : 'البرنامج 3', href: '/programs/3' },
  ]},
  { id: 'about', name: language === 'en' ? 'About Us' : 'من نحن', icon: Users, subItems: [
    { id: 'who-we-are', name: language === 'en' ? 'Who We Are' : 'من نحن', href: '/About-us?tab=who-we-are' },
    { id: 'our-team', name: language === 'en' ? 'Our Team' : 'فريقنا', href: '/About-us?tab=our-team' },
    { id: 'work-with-us', name: language === 'en' ? 'Work with us' : 'اعمل معنا', href: '/About-us?tab=work-with-us' },
    { id: 'partners', name: language === 'en' ? 'Our Partners' : 'شركاؤنا', href: '/partners' },
    { id: 'beneficiaries', name: language === 'en' ? 'Our Beneficiaries' : 'المستفيدون', href: '/beneficiaries' },
  ]},
  { id: 'media', name: language === 'en' ? 'Media Center' : 'المركز الإعلامي', icon: Newspaper, href: '/media-center' },
  { id: 'safeguards', name: language === 'en' ? 'Safeguards' : 'الضمانات', icon: Shield, href: '/Safeguards' },
  { id: 'faqs', name: language === 'en' ? 'FAQs' : 'الأسئلة الشائعة', icon: HelpCircle, href: '/FAQs' },
  { id: 'contact', name: language === 'en' ? 'Contact Us' : 'اتصل بنا', icon: Phone, subItems: [
    { id: 'complaints', name: language === 'en' ? 'Complaints' : 'الشكاوى', href: '/submit-complaint' },
    { id: 'contact-faqs', name: language === 'en' ? 'FAQs' : 'الأسئلة الشائعة', href: '/FAQs' },
  ]},
];

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const menuItems = getMenuItems(language);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed inset-0 bg-white z-[1000] overflow-hidden ${language === 'ar' ? 'rtl' : 'ltr'}`}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <div className="relative h-12 w-36 flex items-center justify-center">
                <LogoAnimation />
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <X size={24} />
              </button>
            </div>
            <nav className="flex-grow overflow-y-auto p-4">
              {menuItems.map((item) => (
                <div key={item.id} className="mb-4">
                  {item.subItems ? (
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        <item.icon size={24} className="mr-4 text-gray-600" />
                        <span className="text-lg font-medium">{item.name}</span>
                      </div>
                      <ChevronRight
                        size={24}
                        className={`transform transition-transform ${expandedItems.includes(item.id) ? 'rotate-90' : ''}`}
                      />
                    </button>
                  ) : (
                    <Link href={item.href || '#'} onClick={onClose} className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors">
                      <item.icon size={24} className="mr-4 text-gray-600" />
                      <span className="text-lg font-medium">{item.name}</span>
                    </Link>
                  )}
                  {item.subItems && expandedItems.includes(item.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-12 mt-2 space-y-2"
                    >
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.id}
                          href={subItem.href}
                          onClick={onClose}
                          className="block p-3 rounded-lg hover:bg-gray-100 transition-colors text-base"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;

