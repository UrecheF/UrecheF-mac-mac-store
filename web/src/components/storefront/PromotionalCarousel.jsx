import './banner.css';
import { getActiveBanners } from '../../data/banners';
import BannerCarousel from './BannerCarousel';

export default function PromotionalCarousel() {
  return <BannerCarousel banners={getActiveBanners()} />;
}
