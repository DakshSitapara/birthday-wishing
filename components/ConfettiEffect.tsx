"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export function ConfettiEmoji() {
  useEffect(() => {
    const scalar = 3.5;
    const cake = confetti.shapeFromText({ text: "🎂", scalar });
    const balloon = confetti.shapeFromText({ text: "🎈", scalar });
    const newEmoji = confetti.shapeFromText({ text: "✨", scalar });
    const gift = confetti.shapeFromText({ text: "🎁", scalar });

    const defaults = {
      spread: 360,
      ticks: 60,
      gravity: 0,
      decay: 0.96,
      startVelocity: 20,
      shapes: [cake, balloon,newEmoji, gift],
      scalar,
    };

    const shoot = () => {
      confetti({ ...defaults, particleCount: 30 });
      confetti({ ...defaults, particleCount: 5 });
      confetti({ ...defaults, particleCount: 15, scalar: scalar / 2, shapes: ["circle"] });
    };

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  }, []);   

  return <div className="relative w-full h-screen overflow-hidden"></div>;
}
