import React from "react";
import Image from "next/image";
import vol2 from "../../assets/vol2.png";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Organization, type User } from "@prisma/client";

type ActivityProps = {
  activity: {
    id: string;
    name: string;
    details: string;
    date: string;
    createdAt: string;
    location: string;
    organization: Organization;

    hasOrganizations: boolean;
    hasVolunteers: boolean;
    hasParticipants: boolean;
    organizationId: string;
  };
};

const ActivitiesCard = ({ activity }: ActivityProps) => {
  const { data: sessionData, status: sessionStatus } = useSession();

  return (
    <Link
      href={`/homepage/activities/${activity.id}`}
      className=" relative h-72 w-72  cursor-pointer  flex-col  overflow-hidden  rounded-md  object-fill shadow-2xl"
    >
      <Image src={vol2} className="h-2/5 w-full object-cover" alt="sunset " />
      <div className="mx-4 mt-7 h-3/5 max-w-[300px] font-custom-lexend text-customBlack-100">
        <p className="text-gradient mb-3 overflow-hidden  text-ellipsis whitespace-nowrap font-custom-epilogue text-sm font-bold">
          {/* {activity.organizedBy.toLocaleUpperCase()} */}
        </p>
        <p className="overflow-hidden text-ellipsis  whitespace-nowrap  text-sm font-bold">
          {activity.name}
        </p>
        <p className=" italic" style={{ fontSize: "10px" }}>
          {activity.date.toLocaleString()}
        </p>
        <hr className="my-1 flex  w-full border-t-2 border-customBlack-75" />
        <p className=" overflow-hidden  overflow-ellipsis   text-sm ">
          {activity.details}
        </p>
      </div>

      <Image
        className="absolute left-4 top-20 rounded-md"
        src={`${activity.organization.user.image}`}
        height={60}
        width={60}
        alt="user image role"
      />
    </Link>
  );
};

export default ActivitiesCard;