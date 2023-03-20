import BaseLayout from "@/layouts/base";
import "@/styles/globals.css";
import "@/styles/custom.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
  );
}
