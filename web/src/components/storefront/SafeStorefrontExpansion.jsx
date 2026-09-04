import './error-boundary.css';
import StorefrontErrorBoundary from './StorefrontErrorBoundary';
import StorefrontExpansion from './StorefrontExpansion';

export default function SafeStorefrontExpansion() {
  return <StorefrontErrorBoundary><StorefrontExpansion /></StorefrontErrorBoundary>;
}
