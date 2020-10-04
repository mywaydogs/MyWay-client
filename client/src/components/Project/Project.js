import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Collapsible from "react-collapsible";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import PreliminaryDiagnosis from "./PreliminaryDiagnosis";
import update from "immutability-helper";
import WorkPlan from "./WorkPlan";

function Project(props) {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  const fetchProject = useCallback(() => {
    axios.get(`/api/projects/${id}`).then((res) => {
      setProject(res.data);
    });
  }, [id]);

  useEffect(() => {
    fetchProject();
  }, [id, fetchProject]);

  const updateProject = (project) => {
    axios.put(`/api/projects/${id}`, project).then(fetchProject);
  };

  const onPrelminaryDiagnosisChange = (val) => {
    setProject(update(project, { preliminaryDiagnosis: { $set: val } }));
  };

  const onPrelminaryDiagnosisSubmit = (e) => {
    e.preventDefault();
    updateProject(project);
  };

  const onWorkPlanSubmit = (val) => {
    updateProject(update(project, { goals: { $set: val } }));
  };

  if (!project) {
    return <Loading />;
  }
  return (
    <>
      <h1>תיק אילוף - {project.name}</h1>
      <h2>
        לקוח - {project.customer.firstName} {project.customer.lastName}
      </h2>
      <Collapsible trigger={<h2>אבחון ראשוני</h2>}>
        <PreliminaryDiagnosis
          data={project.preliminaryDiagnosis}
          onChange={onPrelminaryDiagnosisChange}
          onSubmit={onPrelminaryDiagnosisSubmit}
        />
      </Collapsible>
      <Collapsible trigger={<h2>תכנית עבודה</h2>} open={true}>
        <WorkPlan data={project.goals} onSubmit={onWorkPlanSubmit} />
      </Collapsible>
    </>
  );
}

export default Project;
