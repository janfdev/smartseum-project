"use client";
import Lukisan from "@/public/assets/lukisan-1.jpg";
import CardWrapper from "../ui/CardWrapper";
import { motion } from "framer-motion";

const data = [
  {
    image: Lukisan,
    title: "The Modern Abstract",
    description: "An exploration into geometric shapes and minimalist colors.",
    href: "/artwork/modern-abstract",
  },
  {
    image: Lukisan,
    title: "Classic Portraiture",
    description: "Reimagined views on traditional portrait painting techniques.",
    href: "/artwork/classic-portraiture",
  },
  {
    image: Lukisan,
    title: "Nature Silhouette",
    description: "Finding tranquility in raw organic forms and subtle lighting.",
    href: "/artwork/nature-silhouette",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const SectionCard = () => {
  return (
    <section className="w-full py-20 px-6 md:px-12 lg:px-24 bg-white dark:bg-black transition-colors">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {data.map((item) => {
          return (
            <motion.div key={item.title} variants={itemVariants}>
              <CardWrapper
                image={item.image}
                title={item.title}
                description={item.description}
                href={item.href}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default SectionCard;
