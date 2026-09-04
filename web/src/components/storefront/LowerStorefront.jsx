import './storefront.css';
import AccessoriesSection from './AccessoriesSection';
import CustomerCare from './CustomerCare';
import Newsletter from './Newsletter';
import SocialCommunity from './SocialCommunity';
import StoreBenefits from './StoreBenefits';
import StoreFooter from './StoreFooter';
import TechnicalService from './TechnicalService';
import Testimonials from './Testimonials';

export default function LowerStorefront() {
  return (
    <>
      <AccessoriesSection />
      <StoreBenefits />
      <TechnicalService />
      <CustomerCare />
      <Testimonials />
      <SocialCommunity />
      <Newsletter />
      <StoreFooter />
    </>
  );
}
