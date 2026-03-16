import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type Card = {
  image: string | StaticImageData;
  title: string;
  description: string;
  href: string;
};

const CardWrapper = ({ image, title, description, href }: Card) => {
  return (
    <div className=" text-black dark:bg-black dark:text-white transition-colors overflow-hidden flex flex-col">
      <div className="w-full">
        <div className="relative w-full aspect-square overflow-hidden rounded-md">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
      </div>

      <div className="flex flex-col py-6">
        <h3 className="font-semibold leading-none tracking-tight">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>

      <Link
        href={href}
        className="w-full flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-black/90 h-10 px-4 py-2 dark:bg-white dark:text-black dark:hover:bg-white/90"
      >
        View
      </Link>
    </div>
  );
};

export default CardWrapper;
