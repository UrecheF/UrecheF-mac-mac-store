import React from 'react';

export default class StorefrontErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { failed: false }; }
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error) { console.error('Storefront expansion error', error); }
  render() {
    if (this.state.failed) return <section className="storefront-fallback"><strong>Mac & Mac Store</strong><p>Esta sección no pudo cargarse. Puedes continuar navegando por la tienda.</p></section>;
    return this.props.children;
  }
}
