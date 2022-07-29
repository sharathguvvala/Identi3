import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
  return (
    <div class="float-right mr-20 mt-5">
      <Breadcrumb spacing="20px">
        <BreadcrumbItem>
          <BreadcrumbLink class="no-underline">
            <ConnectButton />
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink class="no-underline">Profile</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
}
