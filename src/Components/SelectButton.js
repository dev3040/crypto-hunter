import { makeStyles } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles({
  selectbutton: {
    border: "1px solid gold",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Montserrat",
    cursor: "pointer",
    backgroundColor: selected2 ? "gold" : "",
    color: selected2 ? "black" : "",
    fontWeight: selected2 ? 700 : 500,
    "&:hover": {
      backgroundColor: "gold",
      color: "black",
    },
    width: "22%",
    //   margin: 5,
  },
});
var selected2
const SelectButton = ({ children, selected, onClick }) => {
  selected2=selected
  const classes = useStyles();
  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;
