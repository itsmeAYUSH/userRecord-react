import { useState } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModel from "../UI/ErrorModel";

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "invalid input",
        message: "Please enter a valid name and age(non empty values).",
      });
      return;
    }
    if (+enteredAge < 0) {
      setError({
        title: "invalid age",
        message: "Please enter a valid age(>0).",
      });
      return;
    }
    // console.log(enteredAge,enteredUsername);
    props.onAddUser(enteredUsername, enteredAge);
    setEnteredUsername("");
    setEnteredAge("");
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };
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
            onChange={usernameChangeHandler}
            value={enteredUsername}
          ></input>
          <br />
          <label>Age (Years)</label>
          <input
            type="number"
            onChange={ageChangeHandler}
            id="age"
            value={enteredAge}
          ></input>
          <Button type="sumbit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
