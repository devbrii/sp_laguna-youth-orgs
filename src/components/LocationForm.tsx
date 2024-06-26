/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { UseFormRegister } from "react-hook-form";
import {
  type createEventSchema,
  type updateEventSchema,
} from "~/utils/schemaValidation";
import { z } from "zod";

// const createEventSchema = z.object({
//   name: z
//     .string()
//     .max(20, { message: "Event name must be at most 20 characters" })
//     .min(5, { message: "Event name must be at least 5 characters" }),
//   organizedBy: z.string().optional(),

//   details: z
//     .string()
//     .max(500, { message: "Event details must be at most 500 characters" })
//     .min(20, { message: "Event details must be at least 20 characters" }),
//   location: z.string(),
//   // organizationId: z.string(),
//   date: z.string(),
//   partners: z.array(z.string()).optional(),
//   images: z.array(z.string()).optional(),
// });

type CreateEventSchema = z.infer<typeof createEventSchema>;
type UpdateEventSchema = z.infer<typeof updateEventSchema>;

interface SearchPlacesProps {
  register: any;
  // | UseFormRegister<CreateEventSchema>
  // | UseFormRegister<UpdateEventSchema>;
}

const libraries = ["places"];

const SearchPlaces: React.FC<SearchPlacesProps> = ({ register }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <Autocomplete
      className="h-12 w-full rounded border p-2 shadow"
      onLoad={(autocomplete) => {
        console.log("Autocomplete loaded:", autocomplete);
      }}
      options={{
        componentRestrictions: { country: "PH" },
      }}
    >
      <input
        {...register("location")}
        className="h-full w-full p-2"
        id="autocomplete"
        type="text"
        placeholder="Search for places"
        // value={string}
      />
    </Autocomplete>
  );
};

export default SearchPlaces;
