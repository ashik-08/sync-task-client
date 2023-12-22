import PropTypes from "prop-types";

const Container = ({ children }) => {
  return (
    <section className="max-w-[1600px] mx-auto xl:px-20 lg:px-10 md:px-5 px-2">
      {children}
    </section>
  );
};

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;
