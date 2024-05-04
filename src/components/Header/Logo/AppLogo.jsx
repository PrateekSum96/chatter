import "./AppLogo.css";
import img1 from "../../../asset/chatter-logo.png";

const AppLogo = () => {
  return (
    <div className="app-logo-container">
      <img src={img1} alt="app-logo" className="app-logo" />
    </div>
  );
};

export default AppLogo;
