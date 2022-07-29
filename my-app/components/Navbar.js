import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav class="flex justify-center items-center space-x-4 mt-10">
      <ConnectButton />
      <Link href="/issuecredentials">
        <a class="no-underline">Issue Credential</a>
      </Link>
      <Link href="/verifycredentials">
        <a class="no-underline">Verify Credential</a>
      </Link>
      <Link href="/profile">
        <a class="no-underline">Profile</a>
      </Link>
    </nav>
  );
}
