import FooterBar from "./FooterBar/FooterBar";
import type { ReactNode } from "react";
import NavBar from "./NavBar/NavBar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <FooterBar />
    </>
  );
}
