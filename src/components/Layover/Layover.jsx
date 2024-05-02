import "./Layover.css";

const Layover = ({ showLayover }) => {
  return <div id={`${showLayover ? "layover" : "no-layover"}`}></div>;
};

export default Layover;
