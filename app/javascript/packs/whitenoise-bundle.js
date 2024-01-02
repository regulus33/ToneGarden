import ReactOnRails from 'react-on-rails';

import Whitenoise from '../bundles/Whitenoise/components/Whitenoise';
import App from '../bundles/App/components/App';
// This is how react_on_rails can see the component in the browser.
ReactOnRails.register({
  Whitenoise,
});
