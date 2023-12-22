import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Container from "../components/Container/Container";
import { CgProfile } from "react-icons/cg";
import { FaTasks } from "react-icons/fa";
import { MdAddTask } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { FiLogOut } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";

const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    const toastId = toast.loading("Logging Out...");
    logOut()
      .then(() => {
        toast.success("Logged Out Successfully.", { id: toastId });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Something went wrong!", { id: toastId });
      });
  };

  return (
    <section>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content min-h-screen">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-ghost drawer-button lg:hidden flex justify-end mr-4 mt-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <div className="mt-8 lg:mt-12 mb-20">
            <Container>
              <Outlet />
            </Container>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          {/* sidebar content here */}
          <div className="w-72 min-h-screen bg-special py-12">
            <p className="text-2xl font-play font-black uppercase ml-6">
              <Link to="/dashboard">Sync Task</Link>
            </p>
            <p className="text-xl font-play font-medium uppercase tracking-[2px] ml-6 my-5">
              Task <br /> management <br /> dashboard
            </p>
            <div className="w-20 md:w-28 lg:w-40 ml-6">
              {user?.photoURL ? (
                <img
                  className="text-[10px]"
                  src={user?.photoURL}
                  alt="img-error"
                />
              ) : (
                <img
                  className="text-[10px]"
                  src="https://img.icons8.com/ios-filled/50/user-male-circle.png"
                  alt="default"
                />
              )}
            </div>
            <ul className="menu mt-12 space-y-2">
              <>
                <li>
                  <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                      isActive
                        ? "text-white text-lg md:text-xl font-play font-bold uppercase"
                        : "text-lg md:text-xl font-play font-medium uppercase"
                    }
                  >
                    <CgProfile />
                    User Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/my-tasks"
                    className={({ isActive }) =>
                      isActive
                        ? "text-white text-lg md:text-xl font-play font-bold uppercase"
                        : "text-lg md:text-xl font-play font-medium uppercase"
                    }
                  >
                    <FaTasks />
                    My Tasks
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/add-task"
                    className={({ isActive }) =>
                      isActive
                        ? "text-white text-lg md:text-xl font-play font-bold uppercase"
                        : "text-lg md:text-xl font-play font-medium uppercase"
                    }
                  >
                    <MdAddTask />
                    Add Task
                  </NavLink>
                </li>
              </>
            </ul>
            <div className="divider px-5"></div>
            <ul className="menu space-y-2">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white text-lg md:text-xl font-play font-bold uppercase"
                      : "text-lg md:text-xl font-play font-medium uppercase"
                  }
                >
                  <IoHomeOutline />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/customer"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white text-lg md:text-xl font-play font-bold uppercase"
                      : "text-lg md:text-xl font-play font-medium uppercase"
                  }
                >
                  <HiOutlineUserGroup />
                  Customer
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white text-lg md:text-xl font-play font-bold uppercase"
                      : "text-lg md:text-xl font-play font-medium uppercase"
                  }
                >
                  <HiOutlineInformationCircle />
                  About
                </NavLink>
              </li>
              <li>
                <Link
                  onClick={handleLogout}
                  className="text-lg md:text-xl font-play font-medium uppercase"
                >
                  <FiLogOut />
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
