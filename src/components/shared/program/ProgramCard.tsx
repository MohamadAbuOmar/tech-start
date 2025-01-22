import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProgramCardProps {
  id: string;
  backImage: string;
  programName: string;
  description: string;
}

const ProgramCard = ({ backImage, programName, description }: ProgramCardProps) => {
  return (
    <Card className="w-full max-w-sm mx-auto bg-white/90 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-purple-100/20">
      <div className="relative w-full h-56">
        <Image
          src={backImage}
          fill
          alt={programName}
          className="object-cover object-center hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>

      <CardHeader className="p-5">
        <CardTitle className="text-xl font-bold text-[#1b316e] tracking-tight">
          {programName}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-5 pb-5">
        <p className="text-[#862996] text-sm leading-relaxed">{description}</p>
      </CardContent>

      <CardFooter className="p-5 flex gap-3">
        <Button
          variant="outline"
          className="w-full py-2.5 text-sm font-semibold text-[#1b316e] border-[#1b316e] hover:bg-[#1b316e] hover:text-white transition-all duration-300"
        >
          Learn More
        </Button>
        <Button
          className="w-full py-2.5 text-sm font-semibold bg-gradient-to-r from-[#1b316e] to-[#862996] text-white hover:from-[#152554] hover:to-[#6b2178] transition-all duration-300"
        >
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProgramCard;

