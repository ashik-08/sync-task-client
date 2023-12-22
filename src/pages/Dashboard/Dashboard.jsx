import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>SyncTask | Dashboard</title>
      </Helmet>
      <section>
        <img
        className="mx-auto"
          src="https://i.ibb.co/YLnJmWC/Data-analysis.gif"
          alt="dashboard-image"
        />
      </section>
    </>
  );
};

export default Dashboard;
