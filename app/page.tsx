import { ClosingCta } from "@/components/closing-cta";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Journal } from "@/components/sections/journal";
import { Lifecycle } from "@/components/sections/lifecycle";
import { Locations } from "@/components/sections/locations";
import { Partner } from "@/components/sections/partner";
import { Services } from "@/components/sections/services";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Partner />
      <Lifecycle />
      <Locations />
      <Journal />
      <Faq />
      <ClosingCta />
    </>
  );
}
