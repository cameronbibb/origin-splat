import { useNavigate } from "react-router-dom";
import helpers from "../../services";
import logo from "../../assets/origin_logo.svg";
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
        <p className="info-box">
          Create a HTTP request bin. Capture your requests. View the data.
        </p>
        <button className="create-btn" onClick={newBinHandler}>
          create a bin
        </button>
      </div>
    </>
  );
};

export default Home;
