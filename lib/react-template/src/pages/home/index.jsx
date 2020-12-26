import React, { memo } from "react";
import { HomeWrap } from "./style";

export default memo(function Home(props) {
  return (
    <HomeWrap>
      <h1>Home</h1>
    </HomeWrap>
  );
});
