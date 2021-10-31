import { useEffect, useState } from "react";
import DogsTiles from "../../components/dog/dogs-tiles.component";
import Spinner from "../../components/utils/spinner.component";
import { DogDto } from "../../dto/dogs/dog.dto";
import { useStores } from "../../stores";

export default function DogsPage() {
  const [dogs, setDogs] = useState<DogDto[] | null>(null);
  const { dogsStore } = useStores();

  useEffect(() => {
    dogsStore.findAll({}).then((dogs: DogDto[]) => setDogs(dogs));
  }, [dogsStore]);

  if (dogs == null) {
    return <Spinner />;
  }

  return (
    <>
      <DogsTiles dogs={dogs} />
    </>
  );
}
