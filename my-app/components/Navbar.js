import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export default function Navbar() {
  return (
    <div class="float-right mr-20 mt-5">
      <Breadcrumb spacing="20px">
        <BreadcrumbItem>
          <ConnectButton />
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href="/issuecredentials">
              <a class="no-underline">Issue Credential</a>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href="/verifycredentials">
              <a class="no-underline">Verify Credential</a>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href="/profile">
              <a class="no-underline">Profile</a>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
}
