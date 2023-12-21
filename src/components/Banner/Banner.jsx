import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="pt-24 md:pt-28 lg:pt-32 xl:pt-36">
      <div className="hero min-h-[83vh] bg-hero-bg bg-cover bg-no-repeat rounded-xl">
        <div className="hero-overlay bg-opacity-40 rounded-xl"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <div className="w-60 md:w-72 mx-auto"></div>
            <h1 className="my-5 text-4xl md:text-5xl font-bold">
              Elevate Your Workflow with SyncTask
            </h1>
            <p className="mb-5">
              Your go-to task management platform for seamless collaboration,
              efficient task tracking, and boosted productivity. Join now for a
              smarter way to work!
            </p>
            <Link to="/dashboard" className="btn glass">
              Let&apos;s Explore
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
