import { useRouter } from "next/router";
import useSWR from "swr";
import { DogDto } from "../../dto/dog.dto";

export default function DogPage() {
  const router = useRouter();
  const { id: dogId } = router.query;
  const { data: dogData, error: dogError } = useSWR(
    dogId ? `/api/dogs/${dogId}` : null
  );

  const dog: DogDto = dogData?.data;

  if (!dog) {
    return <>Loading...</>;
  }

  return <>{dog.name}</>;
}
