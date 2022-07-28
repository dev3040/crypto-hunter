import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  Button,
  Modal,
  Fade,
  Backdrop,
  TextField,
} from "@material-ui/core";
import "../App.css";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { CryptoState } from "../CryptoContext";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { setCoinss, setCurrency } from "../redux/actions/coinAction";
import { getAllCoin } from "../redux/services/coin.service";
const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: "#000",
  },
}));
function getModalStyle() {
  return {
    top: `${50}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${50}%)`,
    backgroundColor: `#424242`,
  };
}
const Header = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const currency = useSelector((state) => state.currency);
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  async function loadData() {
    const { data } = await getAllCoin(currency.Currency);
    dispatch(setCoinss(data));
  }
  useEffect(() => {
    // eslint-disable-next-line
    loadData();
    // eslint-disable-next-line
  }, []);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Login</h2>
      <form>
        <TextField
          id="outlined-secondary"
          label="Email"
          variant="outlined"
          color="secondary"
          style={{ width: "100%", height: "100px", marginTop: "50px" }}
        />
        <TextField
          id="outlined-secondary"
          label="Password"
          variant="outlined"
          color="secondary"
          style={{ width: "100%" }}
        />
        <Button
          variant="outlined"
          style={{
            backgroundColor: "gold",
            color: "black",
            width: "100%",
            height: 40,
            marginTop: 50,
          }}
        >
          Login
        </Button>
      </form>
    </div>
  );
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate("/")}
              className={classes.title}
              variant="h5"
            >
              Crypto Hunter
            </Typography>
            <Select
              variant="outlined"
              style={{ width: 100, height: 40, marginLeft: 15 }}
              value={currency.Currency}
              onChange={async (e) => {
                console.log(e.target.value, ".............");
                dispatch(setCurrency(e.target.value));
                const { data } = await getAllCoin(e.target.value);
                dispatch(setCoinss(data));
              }}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
            </Select>
            <Button
              variant="outlined"
              style={{
                backgroundColor: "gold",
                color: "black",
                width: 100,
                height: 40,
                marginLeft: 15,
              }}
              onClick={handleOpen}
            >
              Login
            </Button>
          </Toolbar>
        </Container>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>{body}</Fade>
        </Modal>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
