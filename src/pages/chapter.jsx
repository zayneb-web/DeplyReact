import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../components/Loading";
import TopBar from "../components/TopBar";
import Chaptersidebar from "../components/chapters/sidebar";
import { Link } from "react-router-dom";
import CreateButton from "../components/chapters/CreateButton";

const Chapter = () => {
  return (
    <>
      <TopBar />
      <div className="px-0 lg:px-3 pb-20 bg-bgColor lg:rounded-lg overflow-hidden h-screen">
        <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full">
          {/* LEFT */}
          <Chaptersidebar />
        </div>
      </div>
    </>
  );
};

export default Chapter;