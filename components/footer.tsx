'use client';

import { ContributorCard } from "@/components/contributor-card";
import { motion } from "framer-motion";

function AnimatedHeading() {
  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.4, 0.0, 0.2, 1]
      }
    })
  };

  const text = "Team DTD";

  return (
    <motion.h1
      className="text-3xl md:text-5xl lg:text-6xl font-overusedGrotesk font-bold text-white mb-12 md:mb-16 text-center z-50 drop-shadow-lg"
      initial="hidden"
      animate="visible"
      variants={headingVariants as any}
    >
      <span className="inline-block overflow-hidden z-50">
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            custom={index}
            variants={letterVariants as any}
            initial="hidden"
            animate="visible"
            className="inline-block z-50"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    </motion.h1>
  );
}

function UnderlineDemo() {
  const contributors = [
    {
        name: "Vardaan Bhatia",
        imageUrl: "https://media.licdn.com/dms/image/v2/D5603AQHcFSqG5EiKRg/profile-displayphoto-scale_400_400/B56Zkno_i7HAAg-/0/1757306688429?e=1764201600&v=beta&t=E7xhXiMHBTa7J3Zmw5a7fxvVr4ruWVqSBmIlOaRbMJw", // Replace with actual image URL
        linkedinUrl: "https://www.linkedin.com/in/vardaan-bhatia12/",
    },
    {
      name: "Lalith Srinandan",
      imageUrl: "https://media.licdn.com/dms/image/v2/D5603AQF3bMebQAIR5w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1726165580284?e=1764201600&v=beta&t=ku9XDluWxYjyyg4uJPQ1bYxREu9Cbwd6p3zf7YmZD_k", // Replace with actual image URL
      linkedinUrl: "https://www.linkedin.com/in/lalith-srinandan-920540267/",
    },
    {
      name: "Srikar Veluvali",
      imageUrl: "https://media.licdn.com/dms/image/v2/D5603AQGP9tuTieEDVg/profile-displayphoto-scale_400_400/B56Znsl_3HH8Ag-/0/1760611008827?e=1764201600&v=beta&t=tAumPCPEfF23uDzl4k0e5lhsRL2ZyvSRNhNdZu-ufT4", // Replace with actual image URL
      linkedinUrl: "https://www.linkedin.com/in/srikarveluvali/",
    },
    {
      name: "Akuldeep Jakkula",
      imageUrl: "https://media.licdn.com/dms/image/v2/D5603AQEU9lv5rI-e2w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1707924952974?e=1764201600&v=beta&t=PEebPPZCeLR_CT0i9agIWi2O2JXuFYM9XLv5MUNXPrk", // Replace with actual image URL
      linkedinUrl: "https://www.linkedin.com/in/akuldeepj/",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-background">
      <div className="w-full max-w-6xl mx-auto px-4">
        <AnimatedHeading />
        <div className="w-full grid grid-cols-2 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 justify-items-center">
          {contributors.map((contributor) => (
            <ContributorCard key={contributor.name} {...contributor} />
          ))}
        </div>
      </div>
    </div>
  );
}

export { UnderlineDemo };