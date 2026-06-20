import About from "@/component/home/About";
import Banner from "@/component/home/Banner";
import FeaturedDoctors from "@/component/home/FeaturedDoctors";
import Specializations from "@/component/home/Specializations";
import WhyChooseUs from "@/component/home/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner />
      <About />
      <Specializations />
      <FeaturedDoctors />
      <WhyChooseUs />
    </div>
  );
}
