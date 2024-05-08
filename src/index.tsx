import React from "react";
import ReactDOM from "react-dom/client";
import styled from "styled-components";

await new Promise(resolve => (window.onload = resolve));

const AppRootDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  flex-direction: row;
  @media screen and (orientation: portrait) {
    flex-direction: column;
  }
  font-family: 'Arial', sans-serif;
`;

function Root(): React.JSX.Element {
    return (
        <AppRootDiv>
      sans
        </AppRootDiv>
    );
}

const rootDiv = document.createElement("div");
rootDiv.style.width = "100%";
rootDiv.style.height = "100%";
rootDiv.style.margin = "0";
rootDiv.style.padding = "0";
document.body.appendChild(rootDiv);

const reactRoot = ReactDOM.createRoot(rootDiv);
reactRoot.render(
    // <StrictMode>
    <Root />
    // </StrictMode>
);
