import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  PricingDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import PricingSection from '../../components/WebPageComponents/PricingComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'test66';

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

  const pricing_features = {
    standard: {
      features: [
        'Basic inventory management',
        'Order tracking',
        'Customer database',
      ],
      limited_features: ['Limited customer insights', 'Basic reporting'],
    },
    premium: {
      features: [
        'Advanced inventory management',
        'Comprehensive order processing',
        'Enhanced customer database',
      ],
      also_included: [
        'Detailed customer insights',
        'Advanced reporting',
        'Priority support',
      ],
    },
    business: {
      features: [
        'Full inventory control',
        'Complete order management',
        'Extensive customer database',
        'Custom analytics',
        'Dedicated account manager',
      ],
    },
  };

  const description = {
    standard:
      'Ideal for individual coffee enthusiasts or small home-based businesses looking to manage their coffee inventory and orders efficiently.',
    premium:
      'Perfect for small startups or coffee shops seeking advanced features to streamline operations and gain deeper customer insights.',
    business:
      'Designed for large enterprises or franchises requiring comprehensive management tools, custom analytics, and dedicated support.',
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Flexible Pricing Plans for Every Need`}</title>
        <meta
          name='description'
          content={`Explore our competitive pricing plans designed to suit businesses of all sizes. Choose the plan that best fits your needs and start optimizing your coffee business today.`}
        />
      </Head>
      <WebSiteHeader projectName={'test66'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'test66'}
          image={['Pricing plans on a screen']}
          mainText={`Choose Your Perfect ${projectName} Plan`}
          subTitle={`Explore our flexible pricing options tailored to meet the needs of coffee businesses of all sizes. With ${projectName}, find the plan that fits your budget and start optimizing your operations today.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`View Plans`}
        />

        <PricingSection
          projectName={'test66'}
          withBg={1}
          features={pricing_features}
          description={description}
        />

        <ContactFormSection
          projectName={'test66'}
          design={ContactFormDesigns.HIGHLIGHTED || ''}
          image={['Person typing on laptop']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Have questions about our pricing plans? Contact us anytime, and our team at ${projectName} will respond promptly to assist you.`}
        />
      </main>
      <WebSiteFooter projectName={'test66'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
