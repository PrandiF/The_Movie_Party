import React from "react";

function MyList() {
  // const history = useHistory();

  // const handleBackButton = () => {
  //   history.goBack()
  // }
  return (
    <div className="fondo">
      <NavBar />
      <div style={{ display: "flex", padding: "1rem" }}>
        <button className="backButton">⬅ Back</button>
        <h2 style={{ margin: "auto" }}>My List</h2>
      </div>
    </div>
  );
}

export default MyList;
