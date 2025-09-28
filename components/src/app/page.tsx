import FAQ from "@/components/FAQ";
import GetInTouch from "@/components/GetInTouch";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" w-full  min-h-dvh bg-gray-100">
      <FAQ />
      <GetInTouch />
    </div>
  );
}
