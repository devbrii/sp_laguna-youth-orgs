/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Navbar from "~/components/navbar";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import VolunteersCall from "~/components/VolunteersCall";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton } from "@mui/material";

const Partnership = () => {
  const { data: sessionData, status: sessionStatus } = useSession();

  const router = useRouter();
  const { id } = router.query;

  const user = api.user.getUser.useQuery({
    userId: sessionData?.user.id ?? "",
  });

  const organization = user.data?.organization;

  const getPendingOrgOrVol = api.activityCall.getOrgOrVol.useQuery({
    activityId: id as string,
    label: "partnership",
    // orgId: organization?.id,
    status: "PENDING",
  });

  const updateStatus = api.activityCall.updateActivityCall.useMutation();

  const handleAccept = (orgId: string) => {
    updateStatus.mutate({
      activityId: id as string,
      orgId: orgId,
    });
  };

  return (
    <div className="flex flex-col font-custom-lexend text-customBlack-100">
      <Navbar />
      <section className=" mt-6 flex flex-row items-center justify-center bg-primary p-4 ">
        <p className="font-custom-epilogue text-xl font-extrabold text-white">
          Partnership
        </p>
      </section>

      <div className="mx-24 my-12">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Organization Name</TableCell>
                <TableCell align="center">Email Address</TableCell>
                <TableCell align="center">Phone Number</TableCell>
                <TableCell align="center">Add</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getPendingOrgOrVol?.data?.map((data, index) => {
                // Declare a constant to simplify access to nested properties
                const organization = data.organization;

                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {organization?.orgName}
                    </TableCell>
                    <TableCell align="center">
                      {organization?.user?.email}
                    </TableCell>
                    <TableCell align="center">
                      {organization?.phoneNumber}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleAccept(organization?.id ?? "")}
                      >
                        <AddCircleIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Partnership;
