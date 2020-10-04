import React from "react";
import Modal from "../utils/Modal";
import update from "immutability-helper";
import { Link } from "react-router-dom";
import TextInput from "../utils/TextInput";
import Button from "../utils/Button";
import Axios from "axios";

function ProjectsModal({ data, onChange, onSubmit }) {
  const projects = data.projects;
  const onRequestClose = () => {
    onChange(update(data, { isOpen: { $set: false } }));
  };

  const onProjectNameChange = (e) => {
    onChange(update(data, { projectName: { $set: e.target.value } }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("/api/projects", {
      customer: data.customer._id,
      name: data.projectName,
    })
      .then((res) => res.headers.location)
      .then((location) => location.split("/").slice(-1)[0])
      .then((projectId) =>
        onChange(
          update(data, {
            projectName: { $set: "" },
            projects: {
              $push: [
                {
                  customer: data.customer._id,
                  name: data.projectName,
                  _id: projectId,
                },
              ],
            },
          })
        )
      )
      .then(onSubmit);
  };

  return (
    <Modal isOpen={data.isOpen} onRequestClose={onRequestClose}>
      <ul>
        {projects.map((project, i) => (
          <li key={i}>
            <Link to={`/project/${project._id}`}>{project.name}</Link>
          </li>
        ))}
      </ul>
      {projects.length === 0 && <div>לא נמצאו פרוייקטים</div>}
      <form onSubmit={handleSubmit} style={{ width: "50%" }}>
        <h2>יצירת פרויקט</h2>
        <TextInput
          //   label="שם פרויקט"
          placeholder="שם פרויקט"
          value={data.projectName}
          onChange={onProjectNameChange}
        />
        <Button type="submit" value="יצירת פרויקט" />
      </form>
    </Modal>
  );
}

export default ProjectsModal;
