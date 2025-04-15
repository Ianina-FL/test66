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
  FeaturesDesigns,
  TestimonialsDesigns,
  AboutUsDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

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

  const features_points = [
    {
      name: 'Inventory Management',
      description:
        'Effortlessly track and manage your coffee blends. Keep stock levels in check and ensure your customers always get their favorite brews.',
      icon: 'mdiWarehouse',
    },
    {
      name: 'Order Processing',
      description:
        'Simplify order management from start to finish. Handle customer orders with ease, from grind selection to shipment tracking.',
      icon: 'mdiCart',
    },
    {
      name: 'Customer Insights',
      description:
        'Gain valuable insights into customer preferences and behaviors. Tailor your offerings to meet their needs and boost satisfaction.',
      icon: 'mdiAccountCircle',
    },
  ];

  const testimonials = [
    {
      text: '${projectName} has transformed our coffee business. The intuitive interface and robust features make managing orders and inventory a breeze.',
      company: 'BrewMasters Inc.',
      user_name: 'John Brewster, CEO',
    },
    {
      text: "Thanks to ${projectName}, we've seen a significant increase in customer satisfaction. The insights provided are invaluable for tailoring our offerings.",
      company: 'Coffee Haven',
      user_name: 'Emily Beans, Marketing Director',
    },
    {
      text: 'The seamless integration of payment processing and order management has saved us countless hours. Highly recommend ${projectName} to any coffee business.',
      company: 'Caffeine Dreams',
      user_name: 'Michael Roast, Operations Manager',
    },
    {
      text: "Our team loves the user-friendly design of ${projectName}. It's made managing our coffee blends and customer interactions so much easier.",
      company: 'Java Junction',
      user_name: 'Sarah Latte, Product Manager',
    },
    {
      text: "With ${projectName}, we can focus more on brewing great coffee and less on administrative tasks. It's a game-changer for our business.",
      company: 'Espresso Express',
      user_name: 'David Cappuccino, Owner',
    },
    {
      text: 'The real-time analytics provided by ${projectName} have been crucial in making data-driven decisions. Our sales have never been better.',
      company: 'Bean Scene',
      user_name: 'Laura Mocha, Sales Analyst',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Manage Your Online Coffee Business with Ease`}</title>
        <meta
          name='description'
          content={`Discover the ultimate toolkit for managing your online coffee business. From inventory to customer management, streamline your operations and boost sales with our comprehensive solution.`}
        />
      </Head>
      <WebSiteHeader projectName={'test66'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'test66'}
          image={['Coffee beans and laptop']}
          mainText={`Elevate Your Coffee Business with ${projectName}`}
          subTitle={`Streamline your online coffee operations with ${projectName}. Manage inventory, orders, and customer interactions effortlessly to boost your sales and customer satisfaction.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Get Started Now`}
        />

        <FeaturesSection
          projectName={'test66'}
          image={['Coffee shop management tools']}
          withBg={1}
          features={features_points}
          mainText={`Discover Key Features of ${projectName}`}
          subTitle={`Unlock the full potential of your coffee business with ${projectName}'s powerful features designed to streamline operations and enhance customer experience.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <TestimonialsSection
          projectName={'test66'}
          design={TestimonialsDesigns.HORIZONTAL_CAROUSEL || ''}
          testimonials={testimonials}
          mainText={`What Our Users Say About ${projectName} `}
        />

        <AboutUsSection
          projectName={'test66'}
          image={['Team collaborating over coffee']}
          mainText={`Meet the Vision Behind ${projectName}`}
          subTitle={`At ${projectName}, we are passionate about empowering coffee businesses to thrive. Our mission is to provide innovative tools that simplify operations and enhance customer experiences, ensuring your coffee business reaches new heights.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More About Us`}
        />

        <ContactFormSection
          projectName={'test66'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person typing on a laptop']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`We're here to help! Reach out to us anytime with your questions or feedback. Our team at ${projectName} is committed to responding promptly to ensure your coffee business thrives.`}
        />
      </main>
      <WebSiteFooter projectName={'test66'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
