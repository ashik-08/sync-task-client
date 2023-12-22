import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/task-64.png";
import Container from "../Container/Container";

const NavBar = () => {
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-special text-sm md:text-lg font-bold"
              : "text-sm md:text-lg"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "text-special text-sm md:text-lg font-bold"
              : "text-sm md:text-lg"
          }
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/customer"
          className={({ isActive }) =>
            isActive
              ? "text-special text-sm md:text-lg font-bold"
              : "text-sm md:text-lg"
          }
        >
          Customer
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-special text-sm md:text-lg font-bold"
              : "text-sm md:text-lg"
          }
        >
          About
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="fixed z-10 w-screen">
      <nav className="bg-gray-50">
        <Container>
          <div className="navbar">
            <div className="navbar-start">
              {/* logo & name */}
              <div className="flex justify-center items-center gap-2 md:gap-4">
                <img
                  className="w-10 md:w-12 lg:w-14 xl:w-16"
                  src={logo}
                  alt="logo-img"
                />
                <Link
                  to="/"
                  className="text-head md:text-3xl xl:text-4xl font-play font-bold italic"
                >
                  SyncTask
                </Link>
              </div>
            </div>
            <div className="navbar-end">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-5 z-[1] p-2 drop-shadow-lg bg-base-100 rounded-box w-max"
                >
                  {links}
                </ul>
              </div>
              <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal">{links}</ul>
              </div>
            </div>
          </div>
        </Container>
      </nav>
    </div>
  );
};

export default NavBar;
