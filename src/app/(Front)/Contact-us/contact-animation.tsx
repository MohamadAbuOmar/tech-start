"use client"

import Lottie from "lottie-react"
import ContactSvg from "../../../../public/svg/Contact.json"

export function ContactAnimation() {
  return <Lottie animationData={ContactSvg} loop={true} className="w-full max-w-xs mx-auto" />
}

