import ReactOnRails from 'react-on-rails';

import Whitenoise from '../bundles/Whitenoise/components/Whitenoise';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  Whitenoise,
});
