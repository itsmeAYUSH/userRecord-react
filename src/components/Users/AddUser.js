import { useState, useRef } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModel from "../UI/ErrorModel";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const collegeInputRef = useRef();
  // const [enteredUsername, setEnteredUsername] = useState("");
  // const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;
    const enteredCollege = collegeInputRef.current.value;

    if (
      enteredName.trim().length === 0 ||
      enteredUserAge.trim().length === 0 ||
      enteredCollege.trim().length === 0
    ) {
      setError({
        title: "invalid input",
        message: "Please enter a valid name and age(non empty values).",
      });
      return;
    }
    if (+enteredUserAge < 0) {
      setError({
        title: "invalid age",
        message: "Please enter a valid age(>0).",
      });
      return;
    }
    // console.log(enteredAge,enteredUsername);
    props.onAddUser(enteredName, enteredUserAge, enteredCollege);
    // setEnteredUsername("");
    // setEnteredAge("");
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
    collegeInputRef.current.value = "";
  };

  // const usernameChangeHandler = (event) => {
  //   setEnteredUsername(event.target.value);
  // };

  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };
  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModel
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="userName"
            type="text"
            // onChange={usernameChangeHandler}
            // value={enteredUsername}
            ref={nameInputRef}
          ></input>
          <br />
          <label>Age (Years)</label>
          <input
            type="number"
            // onChange={ageChangeHandler}
            id="age"
            // value={enteredAge}
            ref={ageInputRef}
          ></input>
          <label>College Name</label>
          <input type="text" id="collegeName" ref={collegeInputRef}></input>
          <Button type="sumbit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
