import React, { useState } from "react";
import Navbar from "../../../components/navbar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import ActivitiesCard from "~/components/ActivitiesCard";
import SpeakersCard from "~/components/SpeakersCard";

const Speakers = () => {
  const { data: sessionData, status: sessionStatus } = useSession();

  const speakers = api.speaker.getSpeakers.useQuery({});

  const router = useRouter();

  const [searchText, setSearchText] = useState("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="flex flex-col font-custom-lexend text-customBlack-100">
      <Navbar />
      {/* ADD SPEAKERS AND SEARCH BAR */}
      <div className="mx-10  flex flex-col">
        <div className=" my-4 flex h-12 flex-col justify-between  ">
          <h1 className="mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text font-custom-epilogue text-2xl font-extrabold text-transparent ">
            Pool of Speakers
          </h1>
        </div>

        <div className=" flex items-center justify-between">
          {/* SEARCH FUNCTION */}
          <div className="flex w-3/5 items-center">
            <input
              type="text"
              value={searchText}
              name="search"
              onChange={handleSearchChange}
              className="flex-1 rounded-l p-2  shadow-lg"
              placeholder="Search"
            />
            <button className="bg-gradient mr-7 flex rounded-r border-gray-300 p-2 shadow-lg ">
              <SearchIcon style={{ color: "white" }} />
            </button>

            <IconButton className="flex">
              <TuneIcon />
            </IconButton>
          </div>

          {/* ADD SPEAKERS */}
          {sessionData && sessionData?.user.role !== "VOLUNTEER" && (
            <button
              className="btn-active w-1/4 px-2 py-2"
              onClick={() => router.push("/homepage/speakers/add")}
            >
              Add Speaker
            </button>
          )}
        </div>
      </div>

      {/* SPEAKERS CARD */}
      <div className="mb-5 mt-10 flex flex-wrap justify-center gap-5">
        {speakers?.data?.map((querySpeaker) => (
          <SpeakersCard key={querySpeaker.id} speaker={querySpeaker} />
        ))}
      </div>
    </div>
  );
};

export default Speakers;