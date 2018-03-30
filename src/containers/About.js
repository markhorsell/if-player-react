
import React from "react";

const About = props => (
  <React.StrictMode>
    <div>
      <h2>About</h2>
      <p>A game engine for Interactive fiction</p>
      <p>An editor is available here ------</p>
      <p>React Version : {React.version} </p>
      <p>Strict mode wraps Home and About - Wrapping App will create warnings as either Provider or Router Libraries are not Strict as yet</p>
      <p>{React.About}</p>
    </div>
    </React.StrictMode>
  );

  export default About;