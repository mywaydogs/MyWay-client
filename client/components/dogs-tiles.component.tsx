import Link from "next/link";
import { DogDto } from "../dto/dog.dto";
import styles from "../styles/DogsTiles.module.css";

interface DogsTilesProps {
  dogs: DogDto[];
}

export default function DogsTiles(props: DogsTilesProps) {
  const dogs = props.dogs;

  return (
    <div className={styles.container}>
      {!dogs ? (
        <>Loading...</>
      ) : (
        dogs.map((dog) => (
          <Link href={`/dogs/${dog.id}`} key={dog.id}>
            <a>
              <div className={styles.tile}>{dog.name}</div>
            </a>
          </Link>
        ))
      )}
    </div>
  );
}
