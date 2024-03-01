import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Image from "next/image";
import Navbar from "~/components/navbar";
import { useSession } from "next-auth/react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import vol1 from "public/images/vol1.png";
import React, { useState } from "react";
import DeleteModal from "~/components/DeleteModal";
import EventIcon from "@mui/icons-material/Event";
import PlaceIcon from "@mui/icons-material/Place";
import { CldImage } from "next-cloudinary";
import Carousel from "~/components/Carousel";
import vol2 from "~/../public/images/vol1.png";

const EventPage = () => {
  const { data: sessionData, status: sessionStatus } = useSession();

  const [toggleModal, setToggleModal] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const eventQuery = api.event.getOne.useQuery({
    id: id as string,
  });

  const event = eventQuery.data;

  const deleteEvent = api.event.deleteEvent.useMutation();

  if (!id) {
    return <div>No organization ID provided</div>;
  }

  if (eventQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (eventQuery.error ?? !eventQuery.data) {
    return <div>Error loading organization data</div>;
  }

  const handleToggleButton = () => {
    setToggleModal(!toggleModal);
  };

  const handleEditButton = () => {
    void router.push({
      pathname: `/homepage/event/[id]/edit`,
      query: {
        id: event?.id,
      },
    });
  };

  const handleDeleteButton = () => {
    deleteEvent.mutate({
      id: id as string,
    });

    void router.push("/homepage");
  };

  // const handleCancel = () => {
  //   // void router.back();
  // };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  return (
    <div className="flex flex-col flex-wrap">
      <Navbar />

      <div className="relative mx-16 my-10  flex justify-center  gap-12  font-custom-lexend text-customBlack-100 phone:m-5 phone:flex-col   phone:gap-10">
        <Carousel images={event?.images ?? [""]} />

        <div
          className="flex w-4/5 flex-col"
          style={{
            wordBreak: "break-word",
            whiteSpace: "pre-line",
            hyphens: "auto",
          }}
        >
          {/* EVENT NAME */}
          <section className="flex items-center justify-between">
            <h1 className="text-gradient font-custom-epilogue  text-4xl font-extrabold  phone:text-3xl ">
              {event?.name}
            </h1>
            {sessionData?.user.id === event?.organization.user.id && (
              <div className="flex gap-4">
                <IconButton onClick={handleEditButton}>
                  <EditTwoToneIcon />
                </IconButton>
                <IconButton onClick={() => handleToggleButton()}>
                  <DeleteIcon />
                </IconButton>
              </div>
            )}
          </section>

          <div className=" my-2 flex items-center gap-1">
            <EventIcon
              className="h-4 w-4 opacity-75"
              style={{ color: "var(--black100)" }}
            />

            <p className="text-md italic text-customBlack-50 phone:text-sm">
              {event?.date.toLocaleString()}
            </p>
          </div>

          <div className="flex items-stretch gap-1">
            <PlaceIcon
              className="h-4 w-4 opacity-75"
              style={{ color: "var(--black100)" }}
            />

            <p className=" text-md mb-6 italic text-customBlack-50 phone:text-sm">
              {event?.location}
            </p>
          </div>

          <p
            className="text-md text-customBlack-50 phone:text-sm"
            style={{ fontSize: "12px" }}
          >
            Organized By:
          </p>
          <p className="text-gradient text-sm">{event?.organizedBy}</p>
          {event && event?.partners?.length > 0 && (
            <>
              <p
                className="text-md mt-4 text-customBlack-50"
                style={{ fontSize: "12px" }}
              >
                In partnership with:
              </p>
              {event?.partners?.map((partner: string, index: number) => (
                <p key={index} className="text-gradient text-sm">
                  {partner}
                </p>
              ))}
            </>
          )}

          <p className="overflow-wrap break-word mt-16 whitespace-pre-wrap">
            {event?.details}
          </p>
        </div>
      </div>

      <DeleteModal
        toggleModal={toggleModal}
        handleToggleButton={handleToggleButton}
        handleDeleteButton={handleDeleteButton}
        string={"event"}
      />

      {/* {toggleModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-80">
          <div className="rounded-md bg-white p-12">
            <p className="mb-6 font-bold">Do you want to delete this event?</p>
            <div className=" flex justify-center">
              <button
                className="rounded-mdpx-4 btn-outline mr-3 px-5 py-2"
                style={{ color: "var(--red)", borderColor: "var(--red)" }}
                onClick={() => handleToggleButton()}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:border-blue-300 focus:outline-none focus:ring"
                onClick={handleDeleteButton}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )} */}

      {/* <handleDeleteButton /> */}
    </div>
  );
};

export default EventPage;
