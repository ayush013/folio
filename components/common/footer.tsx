import { EMAIL, MENULINKS, SOCIAL_LINKS } from "../../constants";
import Image from "next/image";
import Button from "./button";

const Footer = () => {
  return (
    <footer
      className="w-full relative select-none bg-cover"
      id={MENULINKS[4].ref}
    >
      <img
        src="/footer-curve.svg"
        alt="Footer"
        className="w-full"
        loading="lazy"
        height={290}
        width={1440}
      />
      <div className="h-full w-full">
        <div className="2xl:container mx-auto xl:px-20 md:px-12 px-4 flex-col flex h-full justify-end z-10 items-center py-12">
          <h1 className="font-medium text-3xl md:text-4xl text-center">
            I’m looking for challenges! Feel free to Contact.
          </h1>
          <div className="flex mt-8">
            {Object.keys(SOCIAL_LINKS).map((el) => (
              <a
                href={SOCIAL_LINKS[el]}
                key={el}
                className="link hover:opacity-80 duration-300 md:px-2 px-1"
                rel="noreferrer"
                target="_blank"
              >
                <Image
                  src={`/social/${el}.svg`}
                  alt={el}
                  width={40}
                  height={40}
                />
              </a>
            ))}
          </div>
          <div className="flex mt-8">
            <Button
              classes="mr-3"
              type="outline"
              name="Resume"
              target="_blank"
              rel="noreferrer"
              href="/Ayush_Resume.pdf"
            ></Button>
            <Button
              classes="ml-3"
              type="white"
              name={`Let's Talk`}
              href={"mailto:" + EMAIL}
            ></Button>
          </div>
          <p className="text-center text-sm sm:text-base mt-8">
            Designed and Developed with ❤️ by Ayush
          </p>
        </div>
      </div>
      <style jsx global>{`
        footer {
          background: url(/footer-bg.svg),
            linear-gradient(
              153.86deg,
              #02494c 0%,
              #016877 15.69%,
              #0d576d 48.9%,
              #004865 95.52%
            );
        }
      `}</style>
    </footer>
  );
};

export default Footer;
