import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";
import { initializeApp } from "firebase/app";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

import { Navigation } from "./src/infrastructure/navigation";

const firebaseConfig = {
  apiKey: "AIzaSyAs_lCZ7ZpPL8mvIceaQdPnG4K5zSHmaEs",
  authDomain: "mealtogo-3baa1.firebaseapp.com",
  projectId: "mealtogo-3baa1",
  storageBucket: "mealtogo-3baa1.firebasestorage.app",
  messagingSenderId: "1023292776248",
  appId: "1:1023292776248:web:2bd82535e3f7e56ab1abcd",
};

initializeApp(firebaseConfig);

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
