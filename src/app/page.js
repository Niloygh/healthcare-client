import About from "@/component/home/About";
import Banner from "@/component/home/Banner";
import FeaturedDoctors from "@/component/home/FeaturedDoctors";
import Specializations from "@/component/home/Specializations";
import SuccessFull from "@/component/home/SuccessFull";
import WhyChooseUs from "@/component/home/WhyChooseUs";
 
export default function Home() {
  return (
    <div>
      <Banner />
      <About />
      <Specializations />
      <FeaturedDoctors />
      <WhyChooseUs />
      <SuccessFull />
    </div>
  );
}
