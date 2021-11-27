import { AppProps } from 'next/app';
import '../styles/globals.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default CustomApp;
