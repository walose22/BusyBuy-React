import { ClipLoader } from "react-spinners";

export  function ReactSpinner() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <ClipLoader color="#36d7b7" size={50} />
    </div>
  );
}
