// pages/homepage/organization/[id].js

import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Image from "next/image";

import {
  LinearTextGradient,
  RadialTextGradient,
  ConicTextGradient,
} from "react-text-gradients-and-animations";
import Navbar from "~/components/navbar";
import { useSession } from "next-auth/react";
import OrgCard from "~/components/orgcard";
import { useEffect } from "react";
import EventCard from "~/components/eventCard";

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

const OrganizationPage = () => {
  // const { id } = router.query;

  const { data: sessionData, status: sessionStatus } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Check authentication status when the component mounts
    if (sessionStatus === "unauthenticated") {
      // Redirect to /homepage if not authenticated
      void router.push("/homepage");
    }
  }, [router, sessionStatus]);

  const organizationsQuery = api.organization.getOne.useQuery({
    userId: sessionData?.user.id,
  });

  const organization = organizationsQuery.data;

  const eventsQuery = api.event.getEvents.useQuery({
    take: 4,
    orgId: organization?.id,
  });

  const events = eventsQuery.data;

  // if (!id) {
  //   return <div>No organization ID provided</div>;
  // }

  if (organizationsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (organizationsQuery.error ?? !organizationsQuery.data) {
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
              src={organization?.user.image ?? ""}
              alt="Organization Image"
              height={300}
              width={300}
            />
            <p className="text-xs">
              <span className="font-bold">Email Address:</span>{" "}
              {organization?.user?.email}
            </p>

            <p className=" text-xs">
              <span className="font-bold">Contact Number:</span>{" "}
              {organization?.phoneNumber}
            </p>
          </div>

          <div className="flex-start  ml-16 flex flex-col">
            <h1 className="text-gradient mb-3  font-custom-epilogue text-4xl font-extrabold">
              {organization?.orgName}
            </h1>

            <p className="mb-6 mr-20 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in
              tortor urna. Fusce in ante at purus rhoncus auctor. In tincidunt
              ipsum vel tortor malesuada, et ti Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed in tortor urna. Fusce in ante at
              purus rhoncus auctor. In tincidunt ipsum vel tortor malesuada, et
              tincidunt tellus tempus. Vivamus a posuere ipsum. Sed convallis
              odio non sagittis lacinia. Nullam mattis tincidunt felis ac
              vehicula.
            </p>

            <div className="flex gap-5  text-center">
              <button className="btn-outline w-1/2 border  px-8 py-2 font-normal">
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

        {/* MISSION, VISION, OBJECTIVES */}
        <div className="mb-20 flex flex-col gap-6">
          {/* Mission Vision */}
          <div className="mb-6 flex gap-4">
            <div className="flex w-1/2 flex-col">
              <h1 className="text-gradient mb-2 flex font-custom-epilogue text-2xl font-semibold">
                Mission
              </h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in
                tortor urna. Fusce in ante at purus rhoncus auctor. In tincidunt
                ipsum vel tortor malesuada, et tincidunt tellus tempus. Vivamus
                a posuere ipsum. Sed convallis odio non sagittis lacinia. Nullam
                mattis tincidunt felis ac vehicula.
              </p>
            </div>

            <div className="flex w-1/2 flex-col">
              <h1 className="text-gradient mb-2 flex font-custom-epilogue text-2xl font-semibold">
                Vision
              </h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in
                tortor urna. Fusce in ante at purus rhoncus auctor. In tincidunt
                ipsum vel tortor malesuada, et tincidunt tellus tempus. Vivamus
                a posuere ipsum. Sed convallis odio non sagittis lacinia. Nullam
                mattis tincidunt felis ac vehicula.
              </p>
            </div>
          </div>

          {/* Goals */}
          <div className="mb-4 flex gap-4">
            <div className="flex w-1/2 flex-col">
              <h1 className="text-gradient mb-2 flex font-custom-epilogue text-2xl font-semibold">
                Goals
              </h1>
              <p>
                {/* {organization.objectives} */}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in
                tortor urna. Fusce in ante at purus rhoncus auctor. In tincidunt
                ipsum vel tortor malesuada, et tincidunt tellus tempus. Vivamus
                a posuere ipsum. Sed convallis odio non sagittis lacinia. Nullam
                mattis tincidunt felis ac vehicula.
              </p>
            </div>

            <div className="flex w-1/2 flex-col"></div>
          </div>
        </div>

        {/* EVENTS ORGANIZED */}

        <div className=" mb-24 flex flex-col gap-6">
          <h1 className="text-gradient flex  font-custom-epilogue text-4xl font-semibold">
            Events Organized
          </h1>
          <div className="flex gap-4 ">
            {events?.map((eventQuery) => (
              <EventCard key={eventQuery.id} event={eventQuery} />
            ))}
          </div>
        </div>

        {/* ALL ACTIVITIES */}
        <div className="mb-24 flex flex-col gap-6">
          <h1 className="text-gradient flex   font-custom-epilogue text-4xl font-semibold">
            All Activities
          </h1>
          <div className="flex gap-4">
            {/* <OrgCard key={organization?.id} organization={organization} />
            <OrgCard key={organization?.id} organization={organization} />
            <OrgCard key={organization?.id} organization={organization} />
            <OrgCard key={organization?.id} organization={organization} /> */}
          </div>
        </div>

        {/* POOL OF SPEAKERS */}
        <div className="flex flex-col gap-6">
          <h1 className="text-gradient flex  font-custom-epilogue text-4xl font-semibold">
            Pool of Speakers
          </h1>
          <div className="flex gap-4"></div>
        </div>
      </div>
    </>
  );
};

export default OrganizationPage;