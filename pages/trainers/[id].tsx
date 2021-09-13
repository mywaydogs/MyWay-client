import { useRouter } from "next/router";
import useSWR from "swr";
import { TrainerDto } from "../../dto/trainer.dto";

export default function TrainerPage() {
  const router = useRouter();
  const { id: trainerId } = router.query;

  const { data: trainerData, error: trainerError } = useSWR(
    trainerId ? `/api/trainers/${trainerId}` : null
  );

  const trainer: TrainerDto = trainerData?.data;

  if (!trainerData) {
    return <>Loading ... </>;
  }

  return (
    <>
      {trainer.firstName} {trainer.lastName}
    </>
  );
}
