import "./Loading.css";
import loadingImg from "../../asset/chatter-logo.png";

const Loading = () => {
  return (
    <div className="loading-container">
      <img src={loadingImg} alt="loading-img" id="loading-img" />
    </div>
  );
};

export default Loading;
