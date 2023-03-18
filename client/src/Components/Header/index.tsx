import React from "react";
import tmpImage from "../../utils/images/twitter.png";

export const Header = () => {
  return (
    <header>
      <div className="flex flex-row p-4">
        <img className="w-6 h-6 rounded-full" src={tmpImage} />
        <img className="w-6 h-6 mx-auto" src={tmpImage} />
      </div>
      <nav>
        <h1>Sana Özel</h1>
        <h1>Takip Edilenler</h1>
      </nav>
    </header>
  );
};
