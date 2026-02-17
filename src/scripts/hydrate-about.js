/**
 * About Page Hydration Script
 *
 * Hydrates the React component for dynamic GenUI experience
 */

import { createRoot } from 'react-dom/client';
import { AboutDynamic } from '../components/AboutDynamic';
import avatar from '../assets/cheese-avatar.jpg';

// Render the AboutDynamic component
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<AboutDynamic avatar={avatar.src} />);
}
