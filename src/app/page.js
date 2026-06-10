import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { FeaturedDrops } from "@/components/sections/FeaturedDrops";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Materials } from "@/components/sections/Materials";

import { StudioGrid } from "@/components/sections/StudioGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTABanner } from "@/components/sections/CTABanner";
import Newsletter from "@/components/sections/Newsletter";


const Home = () => {
  return (<div className='min-h-screen'>
    <Hero />
    <Manifesto />

    <FeaturedDrops />
    <ProcessTimeline />
    <Materials />

    <StudioGrid />
    <Testimonials />
    <CTABanner />

    <Newsletter />
  </div>);
}

export default Home;