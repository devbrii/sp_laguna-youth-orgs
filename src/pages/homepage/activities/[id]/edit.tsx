import React, { useEffect, useState } from "react";
import Navbar from "~/components/navbar";
import { useSession } from "next-auth/react";
import { userRouter } from "~/server/api/routers/user";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

interface ActivityProps {
  name: string;
  details: string;
  date: string;
  createdAt: string;
  location: string;

  hasOrganizations: boolean;
  hasVolunteers: boolean;
  hasParticipants: boolean;
  organizationId: string;
}

const EditActivity = () => {
  const editActivity = api.activity.updateActivity.useMutation();

  const router = useRouter();

  const { id } = router.query;

  const { data: sessionData } = useSession();

  const user = api.user.getUser.useQuery({
    userId: sessionData?.user.id ?? "",
  });

  const activityQuery = api.activity.getOne.useQuery({
    id: id as string,
  });

  const activityQueryData = activityQuery.data;

  const orgId = user.data?.organization?.id ?? ""; // Ensure to handle potential undefined

  const activityQueryDataForm = {
    name: activityQueryData?.name ?? "",
    details: activityQueryData?.details ?? "",
    date: activityQueryData?.date?.toLocaleDateString() ?? "",
    createdAt: activityQueryData?.createdAt?.toLocaleString() ?? "",
    location: activityQueryData?.location ?? "",
    organizationId: orgId,

    hasOrganizations: activityQueryData?.hasOrganizations ?? false,
    hasVolunteers: activityQueryData?.hasVolunteers ?? false,
    hasParticipants: activityQueryData?.hasParticipants ?? false,
  };

  const [activitiesData, setActivitiesData] = useState<ActivityProps>({
    name: "",
    details: "",
    date: "",
    createdAt: "",
    location: "",

    hasOrganizations: false,
    hasVolunteers: false,
    hasParticipants: false,
    organizationId: orgId,
  });

  useEffect(() => {
    if (activityQueryData) {
      setActivitiesData(activityQueryDataForm);
    }
  }, [activityQueryData]);

  useEffect(() => {
    setActivitiesData((prevActivityData) => ({
      ...prevActivityData,
      organizationId: orgId,
    }));
  }, [orgId]);

  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  if (user.error ?? !user.data?.organization) {
    return <div>Error loading user data</div>;
  }

  const handleEventForm = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setActivitiesData({
      ...activitiesData,
      [name]: value,
    });

    console.log(activitiesData);
  };

  const submitActivity = () => {
    editActivity.mutate({
      id: id as string,
      name: activitiesData.name,
      details: activitiesData.details,
      date: activitiesData.date,
      location: activitiesData.location,
      hasOrganizations: activitiesData.hasOrganizations,
      hasVolunteers: activitiesData.hasVolunteers,
      hasParticipants: activitiesData.hasParticipants,
      organizationId: orgId,
    });

    window.location.replace("/homepage/activities");
  };

  return (
    <div className="flex flex-col font-custom-lexend text-customBlack-100">
      <Navbar />
      <section className=" mt-6 flex flex-row items-center justify-center bg-primary p-4 ">
        <p className="font-custom-epilogue text-xl font-extrabold text-white">
          EDIT AN ACTIVITY
        </p>
      </section>
      <form
        // onSubmit={() => submitEvent(eventData)}
        id="myForm"
        className="mx-40 mb-5 mt-12 flex flex-col gap-4 text-sm"
      >
        <section className=" mt-6 flex flex-row items-center justify-center bg-secondary p-2 ">
          <p className="font-custom-epilogue text-xl font-extrabold text-white">
            Details
          </p>
        </section>

        <input
          type="text"
          value={activitiesData.name}
          name="name"
          onChange={handleEventForm}
          className="h-12 w-full rounded border  p-2 shadow"
          placeholder="Event Name"
        />

        {/* <input
          className=" w-full rounded border p-2 shadow "
          name="details"
          value={activitiesData.details}
          onChange={handleEventForm}
          // rows={10}
          placeholder="Details"
        /> */}

        <textarea
          className=" w-full rounded border p-2 shadow "
          name="details"
          value={activitiesData.details}
          onChange={handleEventForm}
          rows={10}
          placeholder="Details"
        />

        <div className="flex gap-2">
          <input
            type=""
            value={activitiesData.location}
            name="location"
            onChange={handleEventForm}
            className="mb-10 h-12 w-1/2 rounded border p-2 shadow"
            placeholder="Location"
          />
          <input
            type="datetime-local"
            value={activitiesData.date}
            name="date"
            onChange={handleEventForm}
            className="h-12 w-1/2 rounded border p-2 shadow"
            placeholder="Input Date"
          />
        </div>

        <section className=" mt-6 flex flex-row items-center justify-center bg-secondary p-2 ">
          <p className="font-custom-epilogue text-xl font-extrabold text-white">
            Type of Activity
          </p>
        </section>
        <div className="flex items-center  justify-center gap-10">
          {/* CALL FOR PARTICIPANTS */}
          <div className="flex items-center  justify-center gap-2">
            <input
              type="checkbox"
              name="participants"
              id="participants"
              checked={activitiesData.hasParticipants}
              onClick={() => {
                setActivitiesData((prevState) => ({
                  ...prevState,
                  hasParticipants: !prevState.hasParticipants,
                }));
                console.log(
                  "call for participants: ",
                  activitiesData.hasParticipants,
                );
              }}
            />
            <label htmlFor="participants">Call for Participants</label>
          </div>

          {/* CALL FOR VOLUNTEERS */}
          <div className="flex items-center  justify-center gap-2">
            <input
              type="checkbox"
              name="volunteers"
              id="volunteers"
              checked={activitiesData.hasVolunteers}
              onClick={() => {
                setActivitiesData((prevState) => ({
                  ...prevState,
                  hasVolunteers: !prevState.hasVolunteers,
                }));
                console.log(activitiesData.hasVolunteers);
              }}
            />
            <label htmlFor="volunteers">Call for Volunteers</label>
          </div>

          {/* Partnership */}
          <div className="flex items-center justify-center gap-2">
            <input
              type="checkbox"
              name="partnership"
              id="partnership"
              checked={activitiesData.hasOrganizations}
              onClick={() => {
                setActivitiesData((prevState) => ({
                  ...prevState,
                  hasOrganizations: !prevState.hasOrganizations,
                }));
                console.log(activitiesData.hasOrganizations);
              }}
            />
            <label htmlFor="partnership">Partnerships</label>
          </div>
        </div>
      </form>

      <div className="my-20 flex justify-center">
        <div className="flex gap-4">
          <button
            type="submit"
            className="btn-active px-20 py-3"
            onClick={() => {
              submitActivity();
            }}
          >
            Edit Activity
          </button>
          <button
            onClick={() => window.location.replace("/homepage/activities")}
            type="reset"
            className="btn-outline   px-20 py-3"
            style={{ color: "#ec4b42", borderColor: "#ec4b42" }}
          >
            Discard
          </button>
        </div>
      </div>

      {/* <button onClick={() }>dsd</button> */}
    </div>
  );
};

export default EditActivity;