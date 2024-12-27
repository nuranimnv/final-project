import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ShopLayout from './components/ShopPopcorn/ShopLayout';
import Main from './components/MainPage/Main';
import Create from './components/CreatePages/Create';
import Create2 from './components/CreatePages/Create2';
import Create3 from './components/CreatePages/Create3';
import ShopMain from './components/ShopPopcorn/ShopMain';
import DoubleDrizzle from './components/ShopPopcorn/DoubleDrizzle';
import CustomerCare from './components/FooterContent/CustomerCare';
import About from './components/FooterContent/About';
import Faq from './components/FooterContent/Faq';
import Tastings from './components/FooterContent/Tastings';
import BulkOrders from './components/FooterContent/BulkOrders';
import Shipping from './components/FooterContent/Shipping';
import Contact from './components/FooterContent/Contact';
import CaSupply from './components/FooterContent/CaSupply';
import Preferences from './components/FooterContent/Preferences';
import Ads from './components/FooterContent/Ads';
import Accessibility from './components/FooterContent/Accessibility';
import Covid from './components/FooterContent/Covid';
import Page1 from './components/Page1';
import Page2 from './components/Page2';
import Page3 from './components/Page3';
import Fundraising from './components/MainPage/Fundraising';
import AllFlavors from './components/MainPage/AllFlavors';
import CorporateGift from './components/MainPage/CorporateGift';
import ContextProvider from './context/ContextProvider';
import Edit from './components/Edit';
import Checkout from './components/ShopPopcorn/Checkout';
import TermsOfUse from './components/FooterContent/TermsOfUse';
import PrivacyPolicy from './components/FooterContent/PrivacyPolicy';
import Loading from './Loading';
import Layout from './Layout';

const router = createBrowserRouter([
  {
    path: "/", element: <Layout />, children: [
      { path: "/", element: <Main /> },
      { path: "/create-your-own", element: <Create /> },
      { path: "/create-your-own/build-quantity/:pathName", element: <Create2 /> },
      { path: "/shop/build-your-own-mini/:pathName/:quantity", element: <Create3 /> },
      {
        path: "/shop",
        element: <ShopLayout />,
        children: [
          { path: "", element: <ShopMain /> },
          { path: "product-flavor/:pathName", element: <Page1 /> },
          { path: "product/:names", element: <Page2 /> },
          { path: ":name", element: <Page3 /> },
          { path: "bagged-popcorn/double-drizzle-popcorn-bag/", element: <DoubleDrizzle /> },
        ]
      },
      { path: "/cart/", element: <Edit /> },
      { path: "/checkout/", element: <Checkout /> },
      { path: "/fundraising/", element: <Fundraising /> },
      { path: "/terms-of-use/", element: <TermsOfUse /> },
      { path: "privacy-policy/", element: <PrivacyPolicy /> },
      { path: "/corporate-gifts/", element: <CorporateGift /> },
      { path: "popcorn-flavors/", element: <AllFlavors /> },
      { path: "customer-care/", element: <CustomerCare /> },
      { path: "about/", element: <About /> },
      { path: "faq/", element: <Faq /> },
      { path: "tastings/", element: <Tastings /> },
      { path: "bulk-orders/", element: <BulkOrders /> },
      { path: "shipping-information/", element: <Shipping /> },
      { path: "contact-us/", element: <Contact /> },
      { path: "ca-supply-chain/", element: <CaSupply /> },
      { path: "privacy-preferences/", element: <Preferences /> },
      { path: "about-our-ads/", element: <Ads /> },
      { path: "accessibility/", element: <Accessibility /> },
      { path: "/covid-19-response/", element: <Covid /> },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>
);
