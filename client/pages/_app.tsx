import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout.component";
import { SWRConfig } from "swr";
import axios from "axios";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource) =>
          axios.get(resource).then((res) => res?.data || null),
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}
export default MyApp;
