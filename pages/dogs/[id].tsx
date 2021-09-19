import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DogProfile from "../../components/dog/dog-profile.component";
import Spinner from "../../components/utils/spinner.component";
import { DogDto } from "../../dto/dogs/dog.dto";
import { useStores } from "../../stores";

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

const DogPage = observer(function DogPage() {
  const [dog, setDog] = useState<DogDto | null>(null);

  const router = useRouter();
  const dogId = parseInt(router.query?.id as string, 10);

  const { dogsStore } = useStores();

  useEffect(() => {
    if (dogId) {
      dogsStore.findOne(dogId).then((dog: DogDto) => setDog(dog));
    }
  }, []);

  // const { data: goalsData, error: goalsError } = useSWR(
  //   dogId ? `/api/dogs/${dogId}/training-goals` : null
  // );

  // const goals: TrainingGoalDto[] = goalsData?.data;

  return (
    <>
      {!dog ? <Spinner /> : <DogProfile dog={dog} />}
      {/* {dogId && <TrainingGoalsForm dogId={dogId} />} */}
      {/* <div style={{ width: "900px" }}>
        <DogTrainingGoalsTimelineChart trainingGoals={goals} />
      </div> */}
    </>
  );
});

export default DogPage;
