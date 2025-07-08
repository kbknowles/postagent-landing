// pages/_app.js
import '../styles/globals.css'; // or '../styles/globals.css' depending on setup

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
