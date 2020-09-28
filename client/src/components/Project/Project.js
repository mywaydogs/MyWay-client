import React, { useReducer, useEffect } from "react";
import axios from "axios";
import Collapsible from "react-collapsible";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import PreliminaryDiagnosis from "./PreliminaryDiagnosis";
import update from "immutability-helper";
import CustomerDetails from "./CustomerDetails";
import WorkPlan from "./WorkPlan";

function Project(props) {
  const projectReducer = (state, { type, data }) => {
    switch (type) {
      case "INIT_PROJECT":
        return data;
      case "CHANGE_PRELIMINARY_DIAGNOSIS":
        return update(state, {
          preliminaryDiagnosis: {
            [data.name]: { $set: data.value },
          },
        });
      default:
        return state;
    }
  };
  const [project, dispatch] = useReducer(projectReducer, null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/projects/${id}`).then((res) => {
      dispatch({ type: "INIT_PROJECT", data: res.data });
    });
  }, [id]);

  const handleProjectUpdate = (e) => {
    axios.put(`/api/projects/${id}`, project);
  };

  const handlePreliminaryDiagnosisInputChange = (e) => {
    dispatch({
      type: "CHANGE_PRELIMINARY_DIAGNOSIS",
      data: {
        name: e.target.name,
        value: e.target.value,
      },
    });
  };

  if (!project) {
    return <Loading />;
  }
  return (
    <>
      <div>
        <h1>תיק אילוף - {project.name}</h1>
        <Collapsible
          trigger={
            <h2>
              פרטי לקוח - {project.customer.firstName}{" "}
              {project.customer.lastName}
            </h2>
          }
        >
          <CustomerDetails customer={project.customer} />
        </Collapsible>
      </div>
      <div>
        <Collapsible trigger={<h2>אבחון ראשוני</h2>}>
          <PreliminaryDiagnosis
            data={project.preliminaryDiagnosis}
            handleInputChange={handlePreliminaryDiagnosisInputChange}
            handleSubmit={handleProjectUpdate}
          />
        </Collapsible>
      </div>
      <Collapsible trigger={<h2>תכנית עבודה</h2>} open={true}>
        <WorkPlan goals={project.goals} />
      </Collapsible>
    </>
  );
}

export default Project;
