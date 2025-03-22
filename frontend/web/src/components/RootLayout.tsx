import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

import { ThemeProvider } from "@/components/theme/ThemeProvider";

import Header from "./Header";

const queryClient = new QueryClient();

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className="w-full h-screen flex flex-col gap-4">
            <Header />
            <main className="w-full h-full flex flex-col justify-center items-center">
              {children}
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default RootLayout;
