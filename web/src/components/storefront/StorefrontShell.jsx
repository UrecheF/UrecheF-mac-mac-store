import PromotionalCarousel from './PromotionalCarousel';
import AssistantTeaser from './AssistantTeaser';
import LowerStorefront from './LowerStorefront';

export default function StorefrontShell({ children }) {
  return (
    <>
      <PromotionalCarousel />
      {children}
      <AssistantTeaser />
      <LowerStorefront />
    </>
  );
}
