import { getEnv } from 'config/runtimeEnv';

/* eslint-disable */
export default function googleAnalytics() {
  const gaId = getEnv('REACT_APP_GA_ID');
  if (process.env.NODE_ENV === 'production' && gaId) {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    
    ga('create', gaId, 'auto');
    ga('send', 'pageview');
  }
}
