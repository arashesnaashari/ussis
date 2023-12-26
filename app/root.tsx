// root.tsx
import React, { useContext, useEffect } from "react";
import PinarStyle from "~/assets/pinar.css";

import { withEmotionCache } from "@emotion/react";
import {
  ChakraProvider,
  defineStyleConfig,
  extendTheme,
  Box,
  HStack,
  Text,
} from "@chakra-ui/react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { MetaFunction, LinksFunction } from "@remix-run/node"; // Depends on the runtime you choose
import styles from "~/../public/style.css";

import { ServerStyleContext, theme, ClientStyleContext } from "./context";

export const meta: MetaFunction = () => {
  return [
    {
      charset: "utf-8",
      title: "ussisstant",
      viewport: "width=device-width,initial-scale=1",
    },
  ];
};

export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: PinarStyle },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap",
    },
  ];
};

interface DocumentProps {
  children: React.ReactNode;
}

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();
    }, []);

    return (
      <html lang="en">
        <head>
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(" ")}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
);
export default function App() {
  return (
    <Document>
      <ChakraProvider theme={theme}>
        <HStack
          bg={"white"}
          alignItems={"center"}
          width={"100%"}
          justifyContent={"start"}
          shadow={"sm"}
        >
          <img
            style={{
              paddingLeft: "1rem",
              width: "140px",
              marginBottom: "-2.5rem",
              marginTop: "-2.5rem",
            }}
            src="/ussis.png"
          />
        </HStack>
        <Outlet />
      </ChakraProvider>
    </Document>
  );
}

// url('data:image/svg+xml,%3Csvg width='12' height='16' viewBox='0 0 12 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 .99C4 .445 4.444 0 5 0c.552 0 1 .45 1 .99v4.02C6 5.555 5.556 6 5 6c-.552 0-1-.45-1-.99V.99zm6 8c0-.546.444-.99 1-.99.552 0 1 .45 1 .99v4.02c0 .546-.444.99-1 .99-.552 0-1-.45-1-.99V8.99z' fill='%23583098' fill-opacity='0.54' fill-rule='evenodd'/%3E%3C/svg%3E')
