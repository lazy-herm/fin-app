import '../css/Graph.css'
const Bar = (props) => {
  return (
    <div
      className={props.className}
      style={{ height: props.height / 10 + "px" }}
    ></div>
  );
};

export default Bar;
