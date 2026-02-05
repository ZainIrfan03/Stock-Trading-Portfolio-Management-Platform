import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 p-5">
          <img src={imageURL} style={{ width: "100%" }} />
        </div>
        <div className="col-6 p-5 mt-5">
          <h1>{productName}</h1>
          <p>{productDescription}</p>
          <div mt-3>
            <a href={tryDemo}>Try Demo</a> 
            <a href={learnMore} style={{ marginLeft: "50px" }}>
              learnMore
            </a>
          </div>
          <div className="mt-3">
            <a href={googlePlay}>
              <img src="media/images/appstoreBadge.svg" />
            </a>
            <a href={appStore}>
              <img
                src="media/images/googlePlayBadge.svg"
                style={{ marginLeft: "50px" }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
