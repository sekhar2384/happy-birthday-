import "./Wishes.css";

import { useNavigate, useParams } from "react-router-dom";

import { motion } from "framer-motion";
import { usePalette } from "@roylee1997/react-palette";

import Progress from "../../components/Progress/Progress";
import MusicCard from "../../components/MusicCard/MusicCard";
import TMessagesData from "../../typings/MessagesData";

// albumArts
import firstAlbumArt from "../../assets/sampleData/first-album-art.webp";
import secondAlbumArt from "../../assets/sampleData/second-art.jpg";

// musicFilePaths
import firstMusic from "../../assets/sampleData/music/first-album.mp3";
import secondMusic from "../../assets/sampleData/music/second-album.mp3";

// framer transition and variants
const commonTransition = {
  ease: [0.43, 0.13, 0.23, 0.96],
  duration: 0.5,
};

const messageContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96],
      duration: 0.5,
    },
  },
};

const messages = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

/* Each message must have music details (can be fetched through an API) with Album Art to be must) and message itself in multiple p tags (if possible) */
// Sample Data
const sampleMessagesDataArray: TMessagesData[] = [
  {
    albumArt: firstAlbumArt,
    musicName: "The Night we met - R E L's Version",
    messageInParas: [
      "Many more happy returns of the day Ma'am 🥳! May this year brings you lots of peace, Luck and Health. Next year ee time ki ekkada unna nuvvu hAAppy ga undali ani korukuntunnanu not only next year but for years to come 😁.",
      "Almost 3 years ipotundi kada since we met..? Maybe our last time together on your day :) So I wanted make this one count for you 💕.",
      "Ee 3 years nannu naa gola ni barinchinanduku chaala Thanks ra 🤦‍♀️. Boledu Rollercoaster rides ipoyayi ee span lo I'm really sorry for my mistakes and troubles I caused.",
      "Konchem Cringe anipinchochu yet neeku something special ga ivvalanpinchindi!",
    ],
    musicFilePath: firstMusic,
  },
  {
    albumArt: secondAlbumArt,
    musicName: 'Finding her - Bharat & Khushagara',
    messageInParas: [
      "I know nuv konni saarlu chaala worry avutuu untavvu regd. few things but Don't stress em out just konchem ala chinna smile icchi 😁 positve ga aalochinchu. konchem Navvey parledu..😂, You're a true Gem endukante contemporary world lo you've stood still on your PRINCIPLES and nee hardwork ki Hats-off 🫡 , Eventully I hope you find the success you've been working for. Sarle inatku minchi cheptey sollu la untadi kani, All I want to say is Eppuduu ila ne navvutuu.. navvistuu.. undalani naa vinnapam 😇. Kudirithey call cheyandi 📞, Nacchite Whatsapp lo comment drop cheyandi 💬, mee fan abhimanam ni gurtinchandi 😁"
    ],
    musicFilePath: secondMusic,
  },
];

const Wishes = () => {
  const navigate = useNavigate();
  const { id = 0 } = useParams();

  if (Number(id) < 0 || sampleMessagesDataArray[Number(id)] == undefined) {
    return <p>Invalid Wish Message Id</p>;
  }

  const {
    data: colorData,
    loading: colorDataIsLoading,
    error,
  } = usePalette(sampleMessagesDataArray[Number(id)].albumArt);

  if (error) {
    return <h1>Invalid Wish Message Id</h1>;
  }

  return (
    <motion.main
      initial="initial"
      animate="animate"
      exit="exit"
      className="wishes-wrapper h-screen w-screen flex flex-col justify-between items-center"
    >
      <Progress
        primaryColor={colorData?.vibrant}
        secondaryColor={colorData?.darkVibrant}
        messageDataArrayLength={sampleMessagesDataArray.length}
      />
      <motion.div
        className="lg:w-11/12 rounded-t-2xl md:rounded-t-xl flex md:flex-row flex-col-reverse"
        style={{
          backgroundColor: colorDataIsLoading ? "#fff" : colorData?.vibrant,
        }}
        initial={{ y: "1000px" }}
        animate={{ y: "0px" }}
        exit={{ y: "1000px" }}
        transition={commonTransition}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={(_, info) => {
          if (info.offset.x > 50) {
            if (Number(id) > 0 && Number(id) < sampleMessagesDataArray.length) {
              navigate(`/wishes/${Number(id) - 1}`);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }
          } else if (info.offset.x < -50) {
            if (
              Number(id) >= 0 &&
              Number(id) < sampleMessagesDataArray.length - 1
            ) {
              navigate(`/wishes/${Number(id) + 1}`);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }
          } else {
            console.log(null);
          }
        }}
      >
        <motion.div
          className="md:w-1/2"
          initial="hidden"
          animate="show"
          variants={messageContainer}
        >
          {sampleMessagesDataArray[Number(id)].messageInParas.map(
            (eachPara, index) => {
              return (
                <motion.p
                  className="p-8 message text-3xl"
                  variants={messages}
                  key={index + 2045}
                >
                  {eachPara}
                </motion.p>
              );
            }
          )}
        </motion.div>
        <div className="md:w-1/2 h-1/2 md:h-auto flex justify-center items-center">
          <MusicCard
            albumArt={sampleMessagesDataArray[Number(id)].albumArt}
            primaryColor={colorData?.vibrant}
            musicName={sampleMessagesDataArray[Number(id)].musicName}
            musicFilePath={sampleMessagesDataArray[Number(id)].musicFilePath}
          />
        </div>
      </motion.div>
    </motion.main>
  );
};

export default Wishes;
