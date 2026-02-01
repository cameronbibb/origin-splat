import { useNavigate } from "react-router-dom";
import helpers from "../services";
import logo from "../assets/origin_logo.svg";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const newBinHandler = async () => {
    const binPath = await helpers.createBin();
    navigate(`/display/${binPath}`);
  };

  return (
    <>
      <div className="home-page">
        <img src={logo} alt="Origin*" className="logo" />
        <button onClick={newBinHandler}>Create a bin</button>
      </div>
    </>
  );
};

export default Home;
