import useSWR from "swr";
import { DogDto } from "../dto/dog.dto";
import { useUser } from "../services/auth-service";
import DogsTiles from "./dogs-tiles.component";

export default function Home() {
  const user = useUser();

  const { data: dogsData, error: dogsError } = useSWR("/api/dogs");

  const dogs: DogDto[] = dogsData?.data;

  if (!user) {
    return <>This is the home page for non-users</>;
  }

  return (
    <>
      <DogsTiles dogs={dogs} />
    </>
  );
}
