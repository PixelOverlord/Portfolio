import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MyApps = () => {
  const [apps, setApps] = useState([]);
  useEffect(() => {
    const getMyApps = async () => {
      const { data } = await axios.get(
        "https://portfolio-backend-6hxj.onrender.com/api/v1/softwareApplication/getall",
        {
          withCredentials: true,
        }
      );
      setApps(data.softwareApplications);
    };
    getMyApps();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  return (
    <>
      <div className="w-full flex flex-col gap-8 sm:gap-12">
        <h1 className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] tracking-[15px] dancing_text flex items-center justify-center w-fit">
          My Softwares
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {apps &&
            apps.map((element, index) => (
              <motion.div
                key={element._id}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={cardVariants}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-fit p-7 flex flex-col justify-center items-center gap-3 cursor-pointer">
                  <img src={element.svg?.url} alt="softwares" className="h-12 sm:h-24 w-auto" />
                  <p className="text-muted-foreground text-center">{element.name}</p>
                </Card>
              </motion.div>
            ))}
        </div>
      </div>
    </>
  );
};

export default MyApps;