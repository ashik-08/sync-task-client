import Banner from "../../components/Banner/Banner";
import Container from "../../components/Container/Container";
import NavBar from "../../components/NavBar/NavBar";

const HomePage = () => {
  return (
    <section>
      <NavBar />
      <Container>
        <Banner />
      </Container>
    </section>
  );
};

export default HomePage;
