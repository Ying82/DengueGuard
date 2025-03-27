import About from "@/sections/About";
import Hero from "@/sections/Hero";
import Viewmorebtn from "@/components/viewmorebtn";
import Image from "next/image";
import Map from "@/sections/Map";
import Report from "@/sections/Report";

export default function Home() {
  return (
    <>
      <section className="min-w-full flex items-center min-h-screen bg-gray-100 p-0">
        <div className="bg-white shadow-lg overflow-hidden min-h-screen min-w-full grid grid-cols-7">
          <div className="border-20 border-[#1CDAE6] relative h-full md:h-auto col-span-4">
            <Image
              src="/picture/breeding-site.jpg"
              alt="Dengue Awareness"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="bg-[#030D19] text-white p-10 pt-55 flex flex-col items-center justify-center col-span-3">
            <div>
              <p className="text-7xl font-bold uppercase">
                STAY <span className="text-[#1CDAE6]">INFORMED</span>
              </p>
              <p className="text-7xl font-bold uppercase pl-0 pb-20">
                STAY <span className="text-[#1CDAE6]">PROTECTED</span>
              </p>
              <div className="text-2xl flex w-full justify-end">
                <Viewmorebtn name="View More" target="about" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <main id="main">
        <Hero />
        <Map />
        <Report />
        <About />
      </main>
    </>
  );
}
