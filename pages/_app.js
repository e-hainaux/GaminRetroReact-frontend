import "@/styles/globals.css";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../redux/store";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>GaminRetro App</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
