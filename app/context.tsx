import { createContext } from "react";
import createCache from "@emotion/cache";
import { defineStyleConfig, extendTheme } from "@chakra-ui/react";

export interface ServerStyleContextData {
  key: string;
  ids: Array<string>;
  css: string;
}

export const ServerStyleContext = createContext<
  ServerStyleContextData[] | null
>(null);

export interface ClientStyleContextData {
  reset: () => void;
}

export const ClientStyleContext = createContext<ClientStyleContextData | null>(
  null
);

export function createEmotionCache() {
  return createCache({ key: "css" });
}

export const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  components: {
    Input: defineStyleConfig({
      sizes: {
        lg: {
          borderRadius: "14",
          fontSize: "sm",
        },
      },
      defaultProps: {
        size: "lg",
      },
    }),
    Button: defineStyleConfig({
      baseStyle: {
        fontFamily: "pinar",
      },
      sizes: {
        lg: {
          borderRadius: "14",
          fontSize: "md",
        },
      },
      defaultProps: {
        size: "lg",
      },
    }),
    FormLabel: defineStyleConfig({
      baseStyle: {
        fontFamily: "pinar",
      },
    }),
  },
  styles: {
    global: {
      "html, body": {
        height: "var(--chakra-vh)",
        backgroundColor: "#F0F1F5",
      },
    },
  },
  fonts: {
    heading: "'pinar', sans-serif;",
    body: "'yekan', sans-serif;",
  },
  colors: {
    gray: {
      50: "#fbfbfb",
      100: "#f6f6f6",
      200: "#f1f1f1",
      300: "#e5e5e5",
      400: "#c2c2c2",
      500: "#a4a4a4",
      600: "#7a7a7a",
      700: "#666666",
      800: "#474747",
      900: "#252525",
    },
    brand: {
      50: "#ffeef1",
      100: "#ffd5d9",
      200: "#f8a8a5",
      300: "#f18782",
      400: "#FE6F61",
      500: "#ff6247",
      600: "#f65b48",
      700: "#e35141",
      800: "#d64b3b",
      900: "#c7412f",
    },
    // brand: "#f18782",
  },
  breakpoints: {
    sm: "480px", // 480px
    md: "768px", // 768px
    lg: "992px", // 992px
    xl: "1280px", // 1280px
    "2xl": "1536px", // 1536px
  },
});
