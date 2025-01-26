import { LocalizedSafeguard } from "@/app/actions/pages/safeguards";
import ClientSafeguardsBanner from "./ClientSafeguardsBanner";

interface SafeguardsBannerProps {
  safeguards: LocalizedSafeguard[];
}

const SafeguardsBanner = ({ safeguards }: SafeguardsBannerProps) => {
  return (
    <div className="relative">
      <ClientSafeguardsBanner safeguards={safeguards} />
    </div>
  );
};

export default SafeguardsBanner;
