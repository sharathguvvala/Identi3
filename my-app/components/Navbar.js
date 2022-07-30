import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-center items-center space-x-4 mt-10">
      <Link href="/">
        <a className="no-underline">Home</a>
      </Link>
      <Link href="/verifycredentials">
        <a className="no-underline">Verify Credential</a>
      </Link>
      <Link href="/profile">
        <a className="no-underline">Profile</a>
      </Link>
      <ConnectButton />
    </nav>
  );
}
