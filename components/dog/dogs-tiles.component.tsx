import Link from "next/link";
import Image from "next/image";
import { DogDto } from "../../dto/dogs/dog.dto";

export default function DogsTiles({ dogs }: { dogs: DogDto[] }) {
  if (dogs.length === 0) {
    return <>You have no dogs yet. Create one.</>;
  }

  return (
    <div className="flex flex-wrap justify-around">
      {dogs.map((dog) => (
        <Link href={`/dogs/${dog.id}`} key={dog.id}>
          <a>
            <div className="py-8 px-8 max-w-sm bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 m-5 cursor-pointer">
              {/* <img
                    className="block mx-auto h-24 rounded-full sm:mx-0 sm:flex-shrink-0"
                    src="/img/erin-lindford.jpg"
                    alt="Woman's Face"
                  /> */}
              <div className="block mx-auto h-24 w-24 rounded-full sm:mx-0 sm:flex-shrink-0">
                <Image
                  src="/dog-pic-filler.png"
                  alt="An illustration of a Pug"
                  layout="responsive"
                  width={50}
                  height={50}
                />
              </div>
              <div className="text-center space-y-2 sm:text-left">
                <div className="space-y-0.5">
                  <p className="text-lg text-black font-semibold">{dog.name}</p>
                  <p className="text-gray-500 font-medium">
                    בבעלות {dog.customer.firstName} {dog.customer.lastName}
                  </p>
                </div>
                <button className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
                  View Dog Profile
                </button>
              </div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
}
