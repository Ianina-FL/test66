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
  GalleryPortfolioDesigns,
  PricingDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import GalleryPortfolioSection from '../../components/WebPageComponents/GalleryPortfolioComponent';

import { getMultiplePexelsImages } from '../../helpers/pexels';

import PricingSection from '../../components/WebPageComponents/PricingComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

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

  const features_points = [
    {
      name: 'Blend Customization',
      description:
        'Easily customize and manage your coffee blends to suit diverse customer preferences. Tailor your offerings to stand out in the market.',
      icon: 'mdiCoffee',
    },
    {
      name: 'Real-Time Inventory',
      description:
        'Keep track of your stock levels in real-time. Ensure you never run out of your best-selling blends and maintain optimal inventory.',
      icon: 'mdiChartLine',
    },
    {
      name: 'Customer Preferences',
      description:
        'Gain insights into customer preferences and trends. Use this data to refine your product offerings and enhance customer satisfaction.',
      icon: 'mdiAccountHeart',
    },
  ];

  const [images, setImages] = useState([]);
  const pexelsQueriesWebSite = [
    'Assorted coffee beans display',
    'Barista crafting espresso shot',
    'Coffee cups with latte art',
    'Roasted coffee beans close-up',
    'Coffee brewing equipment setup',
    'Freshly brewed coffee in mug',
  ];
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await getMultiplePexelsImages(pexelsQueriesWebSite);
        const formattedImages = images.map((image) => ({
          src: image.src || undefined,
          photographer: image.photographer || undefined,
          photographer_url: image.photographer_url || undefined,
        }));
        setImages(formattedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

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
        <title>{`Explore Our Premium Coffee Blends`}</title>
        <meta
          name='description'
          content={`Discover a wide range of premium coffee blends tailored to satisfy every palate. From single-origin to espresso mixes, find the perfect brew for your customers.`}
        />
      </Head>
      <WebSiteHeader projectName={'Test667'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'Test667'}
          image={['Assorted coffee beans and cups']}
          mainText={`Discover Exquisite Coffee Blends with ${projectName}`}
          subTitle={`Explore our curated selection of premium coffee blends, crafted to delight every coffee enthusiast. With ${projectName}, find the perfect brew to elevate your offerings and satisfy your customers.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Browse Our Blends`}
        />

        <FeaturesSection
          projectName={'Test667'}
          image={['Coffee beans and digital tools']}
          withBg={1}
          features={features_points}
          mainText={`Unleash the Power of ${projectName}`}
          subTitle={`Discover the unique features of ${projectName} that make managing your coffee products seamless and efficient.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <GalleryPortfolioSection
          projectName={'Test667'}
          images={images}
          mainText={`Explore Our Exquisite Coffee Collection`}
          design={GalleryPortfolioDesigns.OVERLAPPING_CENTRAL_IMAGE || ''}
        />

        <PricingSection
          projectName={'Test667'}
          withBg={0}
          features={pricing_features}
          description={description}
        />

        <ContactFormSection
          projectName={'Test667'}
          design={ContactFormDesigns.HIGHLIGHTED || ''}
          image={['Person typing on keyboard']}
          mainText={`Connect with ${projectName} Today `}
          subTitle={`Reach out to us anytime for inquiries or support. Our team at ${projectName} is ready to assist you with any questions or feedback.`}
        />
      </main>
      <WebSiteFooter projectName={'Test667'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
