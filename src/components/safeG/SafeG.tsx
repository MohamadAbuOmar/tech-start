import Escp from "@/../public/svg/ESCP.json";
import ESMF from "@/../public/svg/ESMF.json";
import LMP from "@/../public/svg/LMP.json";
import SEP from "@/../public/svg/SEP.json";
import { SafeScroll } from "./safe-scroll";

const sections = [
  {
    domain: "ESMF",
    title: "The Environmental and Social Management Framework",
    subtitle:
      "(ESMF) for Technology for Youth and Jobs Project & Additional Financing: Updated version of the ESMF (January 2023) has been prepared in line with the Additional Financing, to scale up activities and provide support to the Palestinian IT sector through the existing components of the project.",
    animation: ESMF,
    bgColor: "from-purple-100 to-purple-200",
    attachmentUrl: "/TechStart-BrandBook-2.pdf",
  },
  {
    domain: "SEP",
    title: "The Stakeholder engagement plan",
    subtitle:
      "defines a plan of action for stakeholder engagement throughout the project life cycle, including appropriate approaches for public consultation, information disclosure, and grievance redress. The goal of the SEP is to improve and facilitate decision making and actively involve project-affected people and other stakeholders in a timely manner, and to ensure that vulnerable groups are provided sufficient opportunity to voice their opinions and concerns, that may influence Project decisions.",
    animation: SEP,
    bgColor: "from-pink-100 to-pink-200",
    attachmentUrl: "/documents/SEP.pdf",
  },
  {
    domain: "LMP",
    title: "The Labor Management Procedure",
    subtitle:
      "for Technology for Youth and Jobs Project and Additional Financing: Updated version of the LMP (January 2023) has been prepared in line with the Additional Financing, to scale up activities and provide support to the Palestinian IT sector through the existing components of the project.",
    animation: LMP,
    bgColor: "from-blue-100 to-blue-200",
    attachmentUrl: "/documents/LMP.pdf",
  },
  {
    domain: "ESCP",
    title: "The Environmental and Social Commitment Plan",
    subtitle:
      "for Technology for Youth and Jobs Project & Additional Financing: Updated version of the ESCP (January 2023) has been prepared in line with the Additional Financing, to scale up activities and provide support to the Palestinian IT sector through the existing components of the project. The ESCP sets out a summary of the required environmental and social material measures and actions under TechStart project, as well as timelines for implementation.",
    animation: Escp,
    bgColor: "from-orange-100 to-orange-200",
    attachmentUrl: "/documents/ESCP.pdf",
  },
];

export default function SafeG() {
  return (
    <>
      <div className="text-center space-y-3 mb-12 md:mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent">
          Our Safety Guidelines
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
        <p className="mt-4 text-lg md:text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
          Commitment to ensuring a safe and secure environment for everyone.
        </p>
      </div>
      <SafeScroll sections={sections} />
    </>
  );
}
