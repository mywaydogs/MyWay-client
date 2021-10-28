import { useStores } from "../stores";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TrainerDto } from "../dto/trainer.dto";
import { observer } from "mobx-react-lite";

const HomePage = observer(function HomePage() {
  const [trainers, setTrainers] = useState<TrainerDto[] | null>(null);

  const { trainersStore } = useStores();

  useEffect(() => {
    trainersStore.findAll().then((res: TrainerDto[]) => setTrainers(res));
  }, []);

  return (
    <>
      <h1>ברוכים הבאים ל - MyWay!</h1>
      <h3>MyWay עוזר לכם להפוך למאלפים טובים יותר, ולהתרכז במה שבאמת חשוב.</h3>
    </>
  );
});

export default HomePage;
