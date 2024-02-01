import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { fadeBottom, fadeItem, fadeLogo } from "../../animations";
import { bioPageInfo } from "../../details";
import de from "../../locales/de/translationDe.json";
import en from "../../locales/en/translationEn.json";
import fr from "../../locales/fr/translationFr.json";
import hi from "../../locales/hi/translationHi.json";
import ja from "../../locales/ja/translationJa.json";
import ru from "../../locales/ru/translationRu.json";

const locales = { en, de, fr, hi, ja, ru };

export default function Biology() {
  const router = useRouter();
  const { locale } = router;
  const t = locale ? locales[locale] : locales["en"];

  return (
    <div className="pt-8 md:pt-16 min-h-screen text-white">
      <motion.div
        variants={fadeLogo}
        initial="hidden"
        animate="visible"
        className="grid w-full py-10 place-items-center"
      >
        <h1 className="pb-2 text-5xl text-center font-semibold tracking-wide lg:text-6xl">
          {t.biologyTitle}
        </h1>
        <div className="inline-flex h-1 bg-purple-600 rounded-full w-72"></div>
      </motion.div>

      <motion.div
        variants={fadeBottom}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap flex-col-2 justify-around w-full px-16 mt-8 mb-8"
      >
        {bioPageInfo.map((subject) => (
          <Link
            href={`/subject/biology/${subject.BioSubject}`}
            passHref
            key={subject.Title}
          >
            <motion.div variants={fadeItem} className="ml-8 mr-8 mb-2 mt-2">
              <div className="w-72 h-72 cursor-pointer transition duration-500 transform hover:scale-105">
                <div className="pb-8 border-4  border-purple-600 rounded-lg">
                  <Image
                    width="540"
                    height="320"
                    src={`/biology/${subject.ImgName}`}
                    alt=""
                    className="rounded-t-md"
                  />
                </div>
                <div className="grid -mt-9 place-content-center mx-1 text-xl">
                  {t[subject.Title]}
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
        <Link href="/subject/biology/skull" passHref>
          <motion.div variants={fadeItem} className="ml-8 mr-8 mb-2 mt-2">
            <div className="w-72 h-72 cursor-pointer transition duration-500 transform hover:scale-105">
              <div className="pb-8 border-4  border-purple-600 rounded-lg">
                <Image
                  width="540"
                  height="320"
                  src="/biology/skull.jpeg"
                  alt=""
                  className="rounded-t-md"
                />
              </div>
              <div className="grid -mt-9 place-content-center mx-1 text-xl">
                {t.HumanSkull}
              </div>
            </div>
          </motion.div>
        </Link>

        <motion.div variants={fadeItem} className="ml-8 mr-8 mb-2 mt-2">
          <div className="w-72 h-52 border-4 border-purple-600 rounded-lg">
            <div className="grid place-content-center text-3xl text-center items-center align-middle h-full font-semibold ">
              {t.biologyMore}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export async function getStaticProps() {
  const bioInfo = bioPageInfo;

  return {
    props: { bioInfo },
  };
}
