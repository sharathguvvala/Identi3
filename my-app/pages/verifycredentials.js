import Navbar from "../components/Navbar";
import Email from "../components/Verify/Email";
import Phone from "../components/Verify/Phone";
import Aadhaar from "../components/Verify/Aadhaar";
import Pan from "../components/Verify/Pan";

export default function VerifyCredentials() {
  return (
    <div>
      <Navbar />
      <Email />
      <Phone />
      <Aadhaar />
      <Pan />
    </div>
  );
}
