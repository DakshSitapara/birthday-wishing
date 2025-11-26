'use client';

import Image from "next/image";
import ColourfulText from "@/components/ui/colourful-text";
import { ConfettiEmoji } from "@/components/ConfettiEffect";
import { useParams } from "next/navigation";

export default function Home() {
    const params = useParams();
  return (
    <div className="relative w-full h-screen overflow-hidden font-sans">

      <Image
        src="/background.jpg"
        alt="background"
        fill
        priority
        className="object-cover -z-10"
      />

      <div className="flex flex-col absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-4 z-20">
        <div className="relative w-[400px] h-[450px]">
          <Image
            src="/hbd1.png"
            alt="Birthday Message"
            fill
            className="object-contain"
          />
        </div>

        <div className="text-5xl">
        <ColourfulText text={params.name as string} />
        </div>
      </div>

      <div className="absolute left-1/2 bottom-10 -translate-x-1/2 z-30">
      <ConfettiEmoji />
        <Image
          src="/hbd.png"
          alt="Cake"
          width={180}
          height={180}
        />
      </div>

    </div>
  );
}
