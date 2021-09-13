import Link from "next/link";
import useSWR from "swr";
import { DogDto } from "../dto/dog.dto";
import { TrainerDto } from "../dto/trainer.dto";
import { useUser } from "../services/auth.service";
import DogsTiles from "./dog/dogs-tiles.component";

export default function Home() {
  const { user } = useUser();

  const { data: dogsData, error: dogsError } = useSWR("/api/dogs");

  const { data: trainersData, error: trainersError } = useSWR(
    !user ? "/api/trainers" : null
  );

  const trainers: TrainerDto[] = trainersData?.data;

  const dogs: DogDto[] = dogsData?.data;

  if (!user) {
    return (
      <>
        <h1>Welcome to MyWay!</h1>
        <h3>
          MyWay helps you, dog trainers, to manage your customers and keep track
          of their progress with an easy interactive interface.
        </h3>
        <hr />
        <h2>Looking for a dog trainer? Meet some of our trainers</h2>

        <div className='flex justify-items-start flex-wrap'>
          {trainers &&
            trainers.map((trainer) => (
              <Link href={`/trainers/${trainer.id}`} key={trainer.id}>
                <div className="py-8 px-8 w-md bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 m-5 cursor-pointer">
                  {/* <img
                    className="block mx-auto h-24 rounded-full sm:mx-0 sm:flex-shrink-0"
                    src="/img/erin-lindford.jpg"
                    alt="Woman's Face"
                  /> */}
                  <span className="block mx-auto h-24 w-24 rounded-full sm:mx-0 sm:flex-shrink-0 bg-black" />
                  <div className="text-center space-y-2 sm:text-left">
                    <div className="space-y-0.5">
                      <p className="text-lg text-black font-semibold">
                        {trainer.firstName} {trainer.lastName}
                      </p>
                      <p className="text-gray-500 font-medium">
                        {trainer.aboutMe}
                      </p>
                    </div>
                    <button className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
                      View Profile
                    </button>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </>
    );
  }

  return (
    <>
      <DogsTiles dogs={dogs} />
    </>
  );
}
