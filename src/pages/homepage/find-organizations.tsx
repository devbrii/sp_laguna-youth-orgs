import Navbar from "~/components/navbar";
import { signIn, signOut, useSession } from "next-auth/react";
import OrgCard from "~/components/orgcard";
import { api } from "~/utils/api";
import Link from "next/link";
import { NextPage } from "next";

const FindOrganizations: NextPage = () => {
  const { data: sessionData, status: sessionStatus } = useSession();

  const organizations = api.organization.getOrganizations.useQuery({});

  const handleFetchOrganizations = () => {
    console.log(organizations.data);
  };

  // interface OrgProps {
  //   id: string;
  //   orgName: string;
  //   phoneNumber: string;
  //   bio: string;
  //   userId: string;
  //   mission: string;
  //   vision: string;
  //   objectives: string;
  //   user: {
  //     id: string;
  //     image: string | null;
  //     role: string;
  //     email: string | null; // Update this line to handle null
  //   };
  //   event: {
  //     id: string;
  //     name: string;
  //     organizedBy: string;
  //     details: string;
  //     location: string;
  //     date: Date; // Update this line to Date
  //     partners: string[];
  //   }[];
  // }

  return (
    <div className="flex flex-col font-custom-lexend text-customBlack-100">
      <Navbar />
      <div className="mx-10 my-4 flex h-12 font-custom-lexend ">
        <h1 className="text-gradient mb-2 h-full  font-custom-epilogue text-2xl font-extrabold   ">
          Find Organizations
        </h1>
      </div>
      <div className=" mx-4 mb-5 flex flex-wrap justify-center gap-5">
        {organizations?.data?.map((organization) => (
          <OrgCard key={organization.id} organization={organization} />
        ))}
      </div>
      {/* <button onClick={() => handleFetchOrganizations()}>button</button> */}
    </div>
  );
};

export default FindOrganizations;
