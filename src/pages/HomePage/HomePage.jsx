import Banner from "../../components/Banner/Banner";
import Container from "../../components/Container/Container";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

const HomePage = () => {
  return (
    <section>
      <NavBar />
      <Container>
        <Banner />
      </Container>
      <Footer />
    </section>
  );
};

export default HomePage;
