import { observer } from "mobx-react-lite";
import Link from "next/link";
import Button from "../components/buttons/button.component";
import { useStores } from "../stores";
import DogsPage from "./dogs";

const HomePage = observer(function HomePage() {
  const { userStore } = useStores();
  const { user } = userStore;

  if (user == null) {
    return (
      <>
        <h1>ברוכים הבאים ל - MyWay!</h1>
        <h3>
          MyWay עוזר לכם להפוך למאלפים טובים יותר, ולהתרכז במה שבאמת חשוב.
        </h3>
      </>
    );
  }

  return (
    <>
      <Button>
        <Link href="/customers/add">הוספת לקוח</Link>
      </Button>

      <h2>הכלבים שלי</h2>
      <DogsPage />
    </>
  );
});

export default HomePage;
