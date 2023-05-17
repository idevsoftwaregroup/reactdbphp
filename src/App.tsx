import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import $ from "jquery";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // getting state values of the interface :
  const [taskDesc, setTaskDesc] = useState("");
  const [result, setResult] = useState("");
  const [resultOnLoad, setResultOnLoad] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskDesc(event.target.value);
    setResult("");
    setResultOnLoad("");
  };

  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = $(e.target);
    $.ajax({
      type: "POST",
      url: form.attr("action"),
      data: form.serialize(),
      dataType: "html",
      success(data) {
        // setResult(data);
        $(".table").html(data);
        // window.location.reload();
        $("#taskDesc").val("");
      },
    });
  };

  useEffect(() => {
    // const handleOnLoad = (e: SyntheticEvent<HTMLDivElement>) => {
    // const pageLoad = $(event.target);
    $.ajax({
      type: "POST",
      url: "https://i-dev.group/projects/reactdbphp/crud/read.php",
      data: $(".table").serialize(),
      dataType: "html",
      success(data) {
        $(".table").html(data);
      },
    });
    // };
  });

  return (
    <>
      <div className="App">
        <h2 className="h2 text-start">To-do List</h2>
        <form
          className="form-floating"
          action="https://i-dev.group/projects/reactdbphp/crud/create.php"
          method="post"
          onSubmit={(event) => handleSumbit(event)}
        >
          <input
            className="form-control input-lg"
            type="text"
            id="taskDesc"
            name="taskDesc"
            value={taskDesc}
            onChange={(event) => handleChange(event)}
          />

          <label htmlFor="name">Task Description </label>
          <div className="d-grid gap-2 pt-2">
            <button className="btn btn-dark btn-sm roundedButton" type="submit">
              Submit List
            </button>
          </div>
        </form>
        <hr />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Description</th>
              <th scope="col">Date&Time</th>
              <th scope="col">Methods</th>
            </tr>
          </thead>
          {result}
          {resultOnLoad}
        </table>
      </div>
    </>
  );
}

export default App;
