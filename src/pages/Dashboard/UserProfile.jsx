import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Provider/AuthProvider";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Helmet>
        <title>SyncTask | Dashboard</title>
      </Helmet>
      <section>
        {user && (
          <div
            className="text-lg md:text-2xl fond-bold italic text-center mt-6 md:mt-16 space-y-5"
            data-aos="zoom-in-up"
            data-aos-offset="300"
            data-aos-easing="ease-in-out-sine"
            data-aos-duration="1200"
          >
            <h2>
              Hello <span className="text-special">{user?.displayName}!</span>
            </h2>
            <h2>Welcome to your profile!</h2>
            <figure className="flex justify-center">
              <img
                className="h-60 w-60 rounded-full object-cover mt-5"
                src={
                  user?.photoURL ||
                  "https://img.icons8.com/ios-filled/50/user-male-circle.png"
                }
                alt="user-image"
              />
            </figure>
            <h2>Name: {user?.displayName}</h2>
            <h2>Email: {user?.email}</h2>
            <button className="bg-special text-white text-sm font-medium md:text-lg md:font-semibold px-5 py-2 rounded">
              Update Profile
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default UserProfile;
