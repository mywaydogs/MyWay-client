import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import useSWR from "swr";
import { DogDto } from "../../dto/dog.dto";
import { TrainingGoalDto } from "../../dto/training-goal.dto";
import AddTrainingGoalTaskForm from "./add-training-goal-task.form.component";
import AddTrainingGoalForm from "./add-training-goal.form.component";
import TrainingGoalTaskForm from "./training-goal-task.form.component";

export default function TrainingGoalsForm({ dogId }: { dogId: number }) {
  const { data: trainingGoalsData, error: trainingGoalsError } = useSWR(
    dogId ? `/api/dogs/${dogId}/training-goals` : null
  );

  const trainingGoals: TrainingGoalDto[] = trainingGoalsData?.data;

  if (!trainingGoals) {
    return <>Loading...</>;
  }

  if (!trainingGoals.length) {
    return (
      <>
        <p>No goals have been set.</p>
        <AddTrainingGoalForm dogId={dogId} />
      </>
    );
  }

  return (
    <>
      <AddTrainingGoalForm dogId={dogId} />
      <ul>
        {trainingGoals.map((goal) => (
          <li key={goal.id}>
            <Formik
              initialValues={{ title: goal.title }}
              onSubmit={(values, actions) => {
                axios.patch(`/api/dogs/${dogId}/training-goals/${goal.id}`, {
                  ...values,
                });
              }}
            >
              <>
                <Form>
                  <Field name="title" />
                  <ErrorMessage name="title" />
                  <button type="submit">Save</button>
                </Form>
                <AddTrainingGoalTaskForm dogId={dogId} goalId={goal.id} />
                <ul>
                  {goal.tasks.map((task) => (
                    <li key={task.id}>
                      <TrainingGoalTaskForm
                        dogId={dogId}
                        goalId={goal.id}
                        taskId={task.id}
                      />
                    </li>
                  ))}
                </ul>
              </>
            </Formik>
          </li>
        ))}
      </ul>
    </>
  );
}
