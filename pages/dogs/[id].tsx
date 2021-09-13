import { useRouter } from "next/router";
import useSWR from "swr";
import DogProfile from "../../components/dog/dog-profile.component";
import DogTrainingGoalsTimelineChart from "../../components/dog/dog-training-goals-timeline-chart.component";
import TrainingGoalsForm from "../../components/dog/training-goals.form.component";
import { TrainingGoalDto } from "../../dto/training-goal.dto";

// const goals: GoalDto[] = [
//   {
//     title: "Sit",
//     showOnChart: true,
//     tasks: [
//       { startTime: new Date("2021-08-08"), endTime: new Date("2021-08-09") },
//     ],
//   },
//   {
//     title: "Lie Down",
//     showOnChart: true,
//     tasks: [
//       {
//         startTime: new Date("2021-08-04"),
//         endTime: new Date("2021-08-08 12:00:00"),
//       },
//       {
//         startTime: new Date("2021-07-20"),
//         endTime: new Date("2021-08-03 12:00:00"),
//       },
//     ],
//   },
// ];

export default function DogPage() {
  const router = useRouter();
  const { id: dogId } = router.query;

  const { data: goalsData, error: goalsError } = useSWR(
    dogId ? `/api/dogs/${dogId}/training-goals` : null
  );

  const goals: TrainingGoalDto[] = goalsData?.data;

  return (
    <>
      <DogProfile dogId={parseInt(dogId as string, 10)} />
      <TrainingGoalsForm dogId={parseInt(dogId as string, 10)} />
      <div style={{ width: "900px" }}>
        <DogTrainingGoalsTimelineChart trainingGoals={goals} />
      </div>
    </>
  );
}
