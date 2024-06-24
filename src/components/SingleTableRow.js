import { TableCell, TableRow } from "@mui/material";

const SingleTableRow = ({ elem }) => {
  const { postId, name, email, body } = elem;
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell align="center" component="th" scope="row">
        {postId}
      </TableCell>
      <TableCell
        sx={{ width: "250px" }}
        align="left"
        component="th"
        scope="row"
      >
        {name}
      </TableCell>
      <TableCell align="center">{email}</TableCell>
      <TableCell
        align="right"
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "350px", // Adjust as needed
        }}
      >
        {body}
      </TableCell>
    </TableRow>
  );
};

export default SingleTableRow;
