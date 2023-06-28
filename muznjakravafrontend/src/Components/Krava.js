import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container, Paper } from "@mui/material";
import Button from "@mui/material/Button";

export default function Krava() {
  const paperStyle = {
    padding: "50px 20px",
    widh: 600,
    margin: "20px auto",
  };
  const [ime, setIme] = React.useState("");
  const [datum, setDatum] = React.useState("");
  const [mlijeko, setMlijeko] = React.useState("");
  const [krave, setKrave] = React.useState([]);
  const [sortAscending, setSortAscending] = React.useState(true);

  const fetchKrave = React.useCallback(() => {
    fetch("http://localhost:8080/krava/getAll")
      .then((res) => res.json())
      .then((result) => {
        const sortedKrave = result.sort((a, b) => {
          const dateA = new Date(
            parseInt(a.datum.split(".")[2]), // godina
            parseInt(a.datum.split(".")[1]) - 1, // mjesec (0-based)
            parseInt(a.datum.split(".")[0]) // dan
          );
          const dateB = new Date(
            parseInt(b.datum.split(".")[2]), // godina
            parseInt(b.datum.split(".")[1]) - 1, // mjesec (0-based)
            parseInt(b.datum.split(".")[0]) // dan
          );
          return sortAscending ? dateA - dateB : dateB - dateA;
        });
        setKrave(sortedKrave);
      });
  }, [sortAscending]);

  const handleClick = (e) => {
    e.preventDefault();
    const krava = { ime, datum, mlijeko };
    console.log(krava);
    fetch("http://localhost:8080/krava/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(krava),
    }).then(() => {
      console.log("New krava added");
      fetchKrave();
    });
  };

  const handleUpdateClick = (id, updatedKrava) => {
    fetch(`http://localhost:8080/krava/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedKrava),
    }).then(() => {
      console.log("Krava updated");
      fetchKrave();
    });
  };

  const handleDeleteClick = (id) => {
    fetch(`http://localhost:8080/krava/delete/${id}`, {
      method: "DELETE",
    }).then(() => {
      console.log("Krava deleted");
      fetchKrave();
    });
  };

  const handleSortClick = () => {
    setSortAscending((prevSortAscending) => !prevSortAscending);
  };

  React.useEffect(() => {
    fetchKrave();
  }, [fetchKrave]);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1>
          <u>Dodaj kravu</u>
        </h1>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Krava Ime"
            variant="outlined"
            fullWidth
            value={ime}
            onChange={(e) => setIme(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Krava mlijeko"
            variant="outlined"
            fullWidth
            value={mlijeko}
            onChange={(e) => setMlijeko(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Krava Datum"
            variant="outlined"
            fullWidth
            value={datum}
            onChange={(e) => setDatum(e.target.value)}
          />
          <Button variant="contained" onClick={handleClick}>
            Submit
          </Button>
        </Box>
      </Paper>
      <h1>Mužnje krava</h1>

      <Paper elevation={3} style={paperStyle}>
        <Button variant="contained" onClick={handleSortClick}>
          Sortiraj {sortAscending ? "najstarije" : "najnovije"}
        </Button>

        {krave.map((krava) => (
          <Paper
            elevation={6}
            style={{ margin: "10px", padding: "15px", textAlign: "left" }}
            key={krava.id}
          >
            Id: {krava.id}
            <br />
            Ime: {krava.ime}
            <br />
            Datum: {krava.datum}
            <br />
            Mlijeko: {krava.mlijeko}
            <span>L</span>
            <br />
            <Button
              variant="contained"
              onClick={() => {
                const updatedKrava = {
                  ime: prompt("Unesite novo ime krave", krava.ime),
                  datum: prompt("Unesite novi datum", krava.datum),
                  mlijeko: prompt(
                    "Unesite novu količinu mlijeka",
                    krava.mlijeko
                  ),
                };
                handleUpdateClick(krava.id, updatedKrava);
              }}
            >
              Update
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDeleteClick(krava.id)}
            >
              Delete
            </Button>
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}
