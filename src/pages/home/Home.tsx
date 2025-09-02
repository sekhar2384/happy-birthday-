import "./Home.css";
import mainImage from "../../assets/sally.webp";

import Marquee from "../../components/Marquee/Marquee";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import formatAmPm from "../../utils/formatAmPm";

const transition = { duration: 0.65, ease: [0.43, 0.13, 0.23, 0.96] };

const FloatingHearts = () => {
  const hearts = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 3,
    scale: 0.5 + Math.random() * 0.5
  }));

  return (
    <>
      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          className="floating-heart"
          initial={{ scale: 0, y: '100vh' }}
          animate={{
            scale: heart.scale,
            y: '-100vh',
          }}
          transition={{
            duration: 4,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ left: heart.left }}
        >
          💗
        </motion.div>
      ))}
    </>
  );
};

const Home = () => {
  return (
    <main className="main-wrapper h-screen w-screen flex flex-col justify-center items-center overflow-hidden">
      <FloatingHearts />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute top-0 mt-12 text-center text-content"
      >
        <p className="text-xl font-semibold">"Be your own way of being beautiful"</p>
        <p className="text-lg font-bold mt-2">CHATURA PEKETI</p>
      </motion.div>
      {/* Mobile */}
      <Link
        className="w-48 md:w-72 overflow-hidden rounded-xl md:hidden"
        to={"/judy"}
      >
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          transition={transition}
          src={mainImage}
          alt="Birthday person"
          className="select-none cursor-pointer rounded-x1"
        />
      </Link>
      {/* Mobile */}
      <Link
        className="w-48 md:w-72 overflow-hidden rounded-xl hidden md:block"
        to={"/judy"}
      >
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={transition}
          src={mainImage}
          alt="Birthday person"
          className="select-none cursor-pointer rounded-xl"
        />
      </Link>
      <Marquee
        transition={{ ...transition }}
        message="Happy Birthday ✨"
        small={false}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute bottom-0 mb-12 text-center text-content"
      >
        <p className="text-md font-medium">{formatAmPm(new Date())}</p>
        <p className="text-md font-medium mt-1">03.09.2025</p>
      </motion.div>
    </main>
  );
};

export default Home;
