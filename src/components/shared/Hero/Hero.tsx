import { LocalizedHeroStep } from "@/app/actions/pages/hero";
import ClientHero from './ClientHero';

const Hero = ({ steps }: { steps: LocalizedHeroStep[] }) => {
  return <ClientHero steps={steps} />;
};

export default Hero;

