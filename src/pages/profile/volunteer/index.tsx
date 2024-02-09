// pages/homepage/organization/[id].js

import router, { useRouter } from "next/router";
import { api } from "~/utils/api";
import Image from "next/image";

import Navbar from "~/components/navbar";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import EventCard from "~/components/eventCard";
import ActivitiesCard from "~/components/ActivitiesCard";

type OrganizationProps = {
  id: string;
  orgName: string;
  phoneNumber: string;
  mission: string;
  bio: string;
  vision: string;
  objectives: string;
  user: {
    id: string;
    role: string;
    image: string | null;
    email: string | null;
  };
  userId: string;
};

const VolunteerPage = () => {
  const { data: sessionData, status: sessionStatus } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Check authentication status when the component mounts
    if (sessionStatus === "unauthenticated") {
      // Redirect to /homepage if not authenticated
      void router.push("/homepage");
    }
  }, [router, sessionStatus]);

  // ! Organization Query
  const volunteerQuery = api.volunteer.getOne.useQuery({
    userId: sessionData?.user.id,
  });

  const volunteer = volunteerQuery.data;

  if (volunteerQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (volunteerQuery.error ?? !volunteerQuery.data) {
    return <div>Error loading organization data</div>;
  }

  return (
    <>
      <Navbar />
      <div className="mx-16  my-10 flex  flex-col justify-evenly font-custom-lexend  text-customBlack-100">
        {/* CONTACT INFO AND DETAILS */}
        <div className="mb-16 grid grid-flow-col">
          <div className="flex-flex-col">
            <Image
              src={volunteer?.user?.image ?? ""}
              alt="Volunteer Image"
              height={300}
              width={300}
            />
            <p className="text-xs">
              <span className="font-bold">Email Address:</span>{" "}
              {volunteer?.user?.email}
            </p>

            <p className=" text-xs">
              <span className="font-bold">Contact Number:</span>{" "}
              {volunteer?.phoneNumber}
            </p>
          </div>

          <div className="flex-start  ml-16 flex flex-col">
            <h1 className="text-gradient mb-3  font-custom-epilogue text-4xl font-extrabold">
              {volunteer?.firstName} {volunteer?.middleInitial}{" "}
              {volunteer?.lastName} {volunteer?.suffix}
            </h1>

            <p className="mb-6 mr-20 text-sm">{volunteer?.bio}</p>

            <div className="flex gap-5  text-center">
              <button
                className="btn-outline w-1/2 border  px-8 py-2 font-normal"
                onClick={() => handleVolunteerUpdate()}
              >
                Update Information
              </button>

              <button
                className="btn-outline w-1/2 border px-8 py-2 font-normal"
                style={{ color: "var(--red)", borderColor: "var(--red)" }}
              >
                Deactivate Account
              </button>
            </div>
          </div>
        </div>

        {/* ORGANIZATIONS JOINED */}
        <div className=" mb-24 flex flex-col gap-6">
          <h1 className="text-gradient flex  font-custom-epilogue text-4xl font-semibold">
            My Organizations
          </h1>
          {/* <div className="flex gap-4 ">
            {events?.map((eventQuery) => (
              <EventCard key={eventQuery.id} event={eventQuery} />
            ))}
          </div> */}
        </div>

        {/* ACTIVITIES JOINED */}
        <div className="mb-24 flex flex-col gap-6">
          <h1 className="text-gradient flex   font-custom-epilogue text-4xl font-semibold">
            Activities Attended
          </h1>
          {/* <div className="flex gap-4">
            {activities?.map((activityQuery) => (
              <ActivitiesCard key={activityQuery.id} activity={activityQuery} />
            ))}
          </div> */}
        </div>
      </div>
    </>
  );
};

const handleVolunteerUpdate = () => {
  void router.push("/profile/volunteer/edit");
};

export default VolunteerPage;