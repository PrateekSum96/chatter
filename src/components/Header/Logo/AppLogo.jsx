import "./AppLogo.css";
import img1 from "../../../asset/chatter-logo.png";
import img2 from "../../../asset/chatter-only-logo.png";

const AppLogo = () => {
  return (
    <div className="app-logo-container">
      <img src={img1} alt="app-logo" className="app-logo" />
      <img src={img2} alt="app-logo-only" className="app-logo-only" />
    </div>
  );
};

export default AppLogo;
