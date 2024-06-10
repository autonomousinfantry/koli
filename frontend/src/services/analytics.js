import ReactGA from 'react-ga';

const initGA = () => {
  ReactGA.initialize('YOUR_GA_TRACKING_ID');
};

const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

const analytics = { initGA, logPageView };

export default analytics;
