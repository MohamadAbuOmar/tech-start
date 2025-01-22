"use client"

import dynamic from "next/dynamic"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })
import ContactSvg from "../../../public/svg/Contact.json"

export function ContactAnimation() {
  return (
    <div className="w-full max-w-xs mx-auto">
      <Lottie animationData={ContactSvg} loop={true} />
    </div>
  )
}

