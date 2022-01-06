import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DogProfile from "../../components/dog/dog-profile.component";
import TrainingGoalsForm from "../../components/dog/training-goals.form.component";
import TrainingsChart from "../../components/trainings-chart/trainings-chart.component";
import Spinner from "../../components/utils/spinner.component";
import { DogDto } from "../../dto/dogs/dog.dto";
import { TrainingGoalDto } from "../../dto/training-goal.dto";
import { useStores } from "../../stores";

const DogPage = observer(function DogPage() {
  const [dog, setDog] = useState<DogDto | null>(null);
  const [trainingGoals, setTrainingGoals] = useState<TrainingGoalDto[] | null>(
    null
  );

  const router = useRouter();
  const dogId = parseInt(router.query?.id as string, 10);

  const { dogsStore } = useStores();

  useEffect(() => {
    if (dogId) {
      dogsStore
        .findOne(dogId)
        .then((dog: DogDto) => setDog(dog))
        .then(() => dogsStore.findAllTrainingGoals(dogId))
        .then((trainingGoals: TrainingGoalDto[]) =>
          setTrainingGoals(trainingGoals)
        );
    }
  }, [dogId, dogsStore]);

  if (dog == null) {
    return <Spinner />;
  }

  return (
    <>
      <h1>{dog.name}</h1>
      {!dog ? <Spinner /> : <DogProfile dog={dog} />}
      {/* {dogId && <TrainingGoalsForm dogId={dogId} />} */}
      <div className="w-3/4 h-72">
        {trainingGoals && <TrainingsChart trainingGoals={trainingGoals} />}
      </div>
    </>
  );
});

export default DogPage;
