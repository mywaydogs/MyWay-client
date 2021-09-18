import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "../../components/utils/spinner.component";
import { TrainerDto } from "../../dto/trainer.dto";
import { useStores } from "../../stores";

export default function TrainerPage() {
  const [trainer, setTrainer] = useState<TrainerDto | null>(null);

  const router = useRouter();
  const trainerId = parseInt(router.query?.id as string, 10);

  const { trainersStore } = useStores();

  useEffect(() => {
    if (trainerId) {
      trainersStore
        .findOne(trainerId)
        .then((trainer: TrainerDto) => setTrainer(trainer));
    }
  }, [trainerId]);

  // const { data: trainerData, error: trainerError } = useSWR(
  //   trainerId ? `/api/trainers/${trainerId}` : null
  // );

  // const trainer: TrainerDto = trainerData?.data;

  if (trainer == null) {
    return <Spinner />;
  }

  return <>{trainer.name}</>;
}
