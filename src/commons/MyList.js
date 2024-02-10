import React from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";

function MyList() {
  // const history = useHistory();

  // const handleBackButton = () => {
  //   history.goBack()
  // }
  return (
    <div className="fondo">
      <NavBar />
      <div style={{ display: "flex", padding: "1rem" }}>
        <button className="backButton"><IoArrowBackCircleSharp style={{marginRight: "5px"}}/> Back</button>
        <h2 style={{ margin: "auto" }}>My List</h2>
      </div>
    </div>
  );
}

export default MyList;
