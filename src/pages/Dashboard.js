import React, { useState, useEffect } from "react";
import fetchDashboardApi from "../api/dashboard-api";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import SingleTableRow from "../components/SingleTableRow";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Button, TextField } from "@mui/material";

const Dashboard = () => {
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [pagesize, setPagesize] = useState(10); // Set the page size to 10 users per page

  const pageSize = 10;

  const fetchComment = async () => {
    setLoading(true);
    const comment = await fetchDashboardApi(currentPage, pagesize, searchQuery);
    return comment.status === 200
      ? (setComment(comment.data), setLoading(false))
      : alert("some thig went wrong...");
  };

  // Debounce function
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  const handleChange = (e) => {
    console.log("data target", e.target.value);
    setSearchQuery(e.target.value);
  };
  const magicFucn = debounce(handleChange, 1000);

  useEffect(() => {
    fetchComment();
    console.log("Fetching data for page:", currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchQuery]);

  const handleSort = (key) => {
    let direction = "asc";

    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else {
        direction = null;
        key = null;
      }
    }

    const sortedComments = [...comment];

    if (key) {
      sortedComments.sort((a, b) => {
        if (key === "email") {
          return direction === "asc"
            ? a.email.localeCompare(b.email)
            : b.email.localeCompare(a.email);
        }
        if (key === "name") {
          return direction === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }
        if (key === "id") {
          return direction === "asc" ? a.id - b.id : b.id - a.id;
        }
        return 0;
      });
    }

    setComment(sortedComments);
    setSortConfig({ key, direction });
  };

  // Function to handle page change
  //   const handlePageChange = (newPage) => {
  //      console.log("Changing page to:", newPage);
  //     setCurrentPage(newPage);
  //     setPagesize(newPage*10)
  //   };
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setPagesize(page * 10);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = comment.slice(startIndex, startIndex + pageSize);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "2rem" }}>
          <Button
            style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
            color="success"
            onClick={() => handleSort("id")}
            variant="outlined"
            size="small"
            startIcon={<ArrowDropDownIcon />}
            endIcon={<ArrowDropUpIcon />}
          >
            {sortConfig.key === "id"
              ? sortConfig.direction === "asc"
                ? "Sort by ID (ASC)"
                : "Sort by ID (DESC)"
              : "Sort by ID"}
          </Button>

          <Button
            style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
            onClick={() => handleSort("email")}
            variant="outlined"
            size="small"
            startIcon={<ArrowDropDownIcon />}
            endIcon={<ArrowDropUpIcon />}
          >
            {sortConfig.key === "email"
              ? sortConfig.direction === "asc"
                ? "Sort by Email (ASC)"
                : "Sort by Email (DESC)"
              : "Sort by Email"}
          </Button>

          <Button
            style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
            color="success"
            onClick={() => handleSort("name")}
            variant="outlined"
            size="small"
            startIcon={<ArrowDropDownIcon />}
            endIcon={<ArrowDropUpIcon />}
          >
            {sortConfig.key === "name"
              ? sortConfig.direction === "asc"
                ? "Sort by Name (ASC)"
                : "Sort by Name (DESC)"
              : "Sort by Name"}
          </Button>
        </div>
        <div>
          <TextField
            size="small"
            sx={{
              marginTop: "20px",
              width: "600px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
            fullWidth
            variant="outlined"
            label="Search by name,email,id..."
            onChange={magicFucn}
          />
        </div>
      </div>

      <div
        style={{
          width: "89%",
          margin: "auto",
          marginTop: "20px",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          padding: "5px",
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 550 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "hsl(240,10%,80%)" }}>
                <TableCell align="center">POST ID</TableCell>
                <TableCell align="center">NAME</TableCell>
                <TableCell align="center">EMAIL ID</TableCell>
                <TableCell align="center">COMMENTS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Loading.....
                  </TableCell>
                </TableRow>
              ) : paginatedData.length > 0 ? (
                <>
                  {paginatedData.map((elem) => (
                    <SingleTableRow key={elem.id} elem={elem} />
                  ))}
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* <div style={{ marginTop: 20, textAlign: "center" }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === 50}
        >
          {">"}
        </button>
        <div style={{ marginTop: 10 }}>Current Pages: {currentPage}</div>
      </div> */}
      <div
        style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            width: "25%",
            marginTop: "10px",
            marginRight: "5.5%",
            padding: "10px",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <Stack spacing={2} style={{ textAlign: "center" }}>
            <Pagination
              sx={{ textAlign: "center" }}
              count={50}
              page={currentPage}
              onChange={(event, page) => handlePageChange(page)}
            />
          </Stack>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
