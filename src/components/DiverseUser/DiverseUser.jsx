// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

import user1 from "../../assets/home/user-1.jpg";
import user2 from "../../assets/home/user-2.jpg";
import user3 from "../../assets/home/user-3.jpg";
import user4 from "../../assets/home/user-4.jpg";
import user5 from "../../assets/home/user-5.jpg";

const DiverseUser = () => {
  return (
    <section className="mt-24 md:mt-32 lg:mt-36 xl:mt-40">
      <h1 className="text-center text-head text-2xl md:text-4xl font-play font-bold italic mb-8 md:mb-12 lg:mb-14 xl:mb-16">
        Diverse User
      </h1>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={40}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="space-y-1 md:space-y-1.5 lg:space-y-2.5 xl:space-y-4 p-5 md:pl-16 lg:pl-28 xl:pl-36 mb-10 border rounded-lg shadow-sm">
            <img
              className="w-12 md:w-20 xl:w-28 rounded-md drop-shadow-md"
              src={user1}
              alt="user-img"
            />
            <p className="text-head text-sm md:text-base lg:text-xl xl:text-2xl font-semibold">
              Emily W.
            </p>
            <p className="text-sub-head text-sm md:text-base font-semibold">
              Review 1 - From a Developer
            </p>
            <p className="max-w-xs lg:max-w-sm text-details md:text-sm lg:text-base md:font-medium">
              Developers manage coding tasks, project timelines, and
              collaboration with SyncTask. <br /> <br />
              <i>
                {" "}
                &quot;SyncTask is a game-changer for our development team. It
                keeps us organized and on track. A must-have for any
                project!&quot;{" "}
              </i>
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="space-y-1 md:space-y-1.5 lg:space-y-2.5 xl:space-y-4 p-5 md:pl-16 lg:pl-28 xl:pl-36 mb-10 border rounded-lg shadow-sm">
            <img
              className="w-12 md:w-20 xl:w-28 rounded-md drop-shadow-md"
              src={user2}
              alt="user-img"
            />
            <p className="text-head text-sm md:text-base lg:text-xl xl:text-2xl font-semibold">
              James C.
            </p>
            <p className="text-sub-head text-sm md:text-base font-semibold">
              Review 2 - From a Corporate professional
            </p>
            <p className="max-w-xs lg:max-w-sm text-details md:text-sm lg:text-base md:font-medium">
              Corporate professionals streamline tasks, manage projects, and
              enhance team collaboration with SyncTask. <br /> <br />
              <i>
                &quot;SyncTask is integral to our workflow. It&apos;s
                user-friendly and boosts our team&apos;s efficiency. A powerful
                tool for professionals.&quot;
              </i>
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="space-y-1 md:space-y-1.5 lg:space-y-2.5 xl:space-y-4 p-5 md:pl-16 lg:pl-28 xl:pl-36 mb-10 border rounded-lg shadow-sm">
            <img
              className="w-12 md:w-20 xl:w-28 rounded-md drop-shadow-md"
              src={user3}
              alt="user-img"
            />
            <p className="text-head text-sm md:text-base lg:text-xl xl:text-2xl font-semibold">
              Sarah L.
            </p>
            <p className="text-sub-head text-sm md:text-base font-semibold">
              Review 3 - From a Banker
            </p>
            <p className="max-w-xs lg:max-w-sm text-details md:text-sm lg:text-base md:font-medium">
              Bankers efficiently manage tasks, appointments, and deadlines with
              SyncTask. <br /> <br />
              <i>
                &quot;SyncTask streamlines our banking operations. It&apos;s a
                lifesaver for managing appointments and tracking financial
                tasks.&quot;
              </i>
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="space-y-1 md:space-y-1.5 lg:space-y-2.5 xl:space-y-4 p-5 md:pl-16 lg:pl-28 xl:pl-36 mb-10 border rounded-lg shadow-sm">
            <img
              className="w-12 md:w-20 xl:w-28 rounded-md drop-shadow-md"
              src={user4}
              alt="user-img"
            />
            <p className="text-head text-sm md:text-base lg:text-xl xl:text-2xl font-semibold">
              Diego M.
            </p>
            <p className="text-sub-head text-sm md:text-base font-semibold">
              Review 4 - From a Entrepreneur
            </p>
            <p className="max-w-xs lg:max-w-sm text-details md:text-sm lg:text-base md:font-medium">
              Entrepreneurs manage business tasks, client meetings, and projects
              effortlessly with SyncTask. <br /> <br />
              <i>
                &quot;SyncTask is the entrepreneur&apos;s best friend. It keeps
                everything organized and is essential for business owners.&quot;
              </i>
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="space-y-1 md:space-y-1.5 lg:space-y-2.5 xl:space-y-4 p-5 md:pl-16 lg:pl-28 xl:pl-36 mb-10 border rounded-lg shadow-sm">
            <img
              className="w-12 md:w-20 xl:w-28 rounded-md drop-shadow-md"
              src={user5}
              alt="user-img"
            />
            <p className="text-head text-sm md:text-base lg:text-xl xl:text-2xl font-semibold">
              Isabella R.
            </p>
            <p className="text-sub-head text-sm md:text-base font-semibold">
              Review 5 - From a Freelancer
            </p>
            <p className="max-w-xs lg:max-w-sm text-details md:text-sm lg:text-base md:font-medium">
              Freelancers organize client tasks, track project progress, and
              meet deadlines seamlessly with SyncTask. <br /> <br />
              <i>
                &quot;SyncTask brings order to freelancing chaos. I can
                efficiently manage tasks and ensure timely delivery. A
                game-changer.&quot;
              </i>
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default DiverseUser;
