import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  ContactFormDesigns,
  HeroDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'Test667';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/products',
      label: 'products',
    },

    {
      href: '/contact',
      label: 'contact',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },

    {
      href: '/pricing',
      label: 'pricing',
    },
  ];

  const faqs = [
    {
      question: 'What features does ${projectName} offer?',
      answer:
        '${projectName} provides a comprehensive toolkit for managing coffee businesses, including inventory management, order processing, customer insights, and real-time analytics.',
    },
    {
      question: 'How can I customize my coffee blends?',
      answer:
        'With ${projectName}, you can easily customize and manage your coffee blends to suit diverse customer preferences, ensuring your offerings stand out.',
    },
    {
      question: 'Is there a free trial available?',
      answer:
        'Yes, ${projectName} offers a 14-day free trial for new users to explore all features and see how it can benefit their coffee business.',
    },
    {
      question: 'How does ${projectName} handle customer data?',
      answer:
        '${projectName} prioritizes data security and privacy. All customer data is encrypted and stored securely, ensuring compliance with industry standards.',
    },
    {
      question: 'Can I integrate ${projectName} with other tools?',
      answer:
        'Yes, ${projectName} supports integration with various third-party tools and platforms, allowing seamless data exchange and enhanced functionality.',
    },
    {
      question: 'What support options are available?',
      answer:
        '${projectName} offers 24/7 customer support via email and chat, ensuring you receive timely assistance whenever needed.',
    },
    {
      question: 'How do I upgrade my plan?',
      answer:
        'You can easily upgrade your plan through the ${projectName} dashboard. Simply navigate to the billing section and select your desired plan.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Get in Touch with Us`}</title>
        <meta
          name='description'
          content={`Reach out to us for any inquiries, support, or feedback. Our team is here to assist you with all your needs.`}
        />
      </Head>
      <WebSiteHeader projectName={'Test667'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'Test667'}
          image={['Customer service representative smiling']}
          mainText={`Connect with ${projectName} Today`}
          subTitle={`We're here to help with any questions or feedback you may have. Reach out to ${projectName} and let us assist you in enhancing your coffee business experience.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Contact Us Now`}
        />

        <FaqSection
          projectName={'Test667'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions about ${projectName} `}
        />

        <ContactFormSection
          projectName={'Test667'}
          design={ContactFormDesigns.SIMPLE_CLEAN || ''}
          image={['Person writing an email']}
          mainText={`Reach Out to ${projectName} `}
          subTitle={`Have questions or need support? Contact us anytime, and our team at ${projectName} will respond promptly to assist you.`}
        />
      </main>
      <WebSiteFooter projectName={'Test667'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
