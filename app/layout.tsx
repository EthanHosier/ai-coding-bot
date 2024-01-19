import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import Sidebar from "./_components/sidebar";
import ChatInput from "./_components/chat-input";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "min-h-screen bg-background antialiased"
        )}
      >
        <ResizablePanelGroup direction="horizontal" className="flex-1 h-full">
          <ResizablePanel
            className="h-screen"
            defaultSize={20}
            minSize={10}
            maxSize={30}
          >
            <Sidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={80} className="relative">
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </body>
    </html>
  );
}
