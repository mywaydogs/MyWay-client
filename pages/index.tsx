import { observer } from "mobx-react-lite";
import Link from "next/link";

const HomePage = observer(function HomePage() {
  return (
    <>
      <h1>ברוכים הבאים ל - MyWay!</h1>
      <h3>MyWay עוזר לכם להפוך למאלפים טובים יותר, ולהתרכז במה שבאמת חשוב.</h3>

      <Link href="/customers/add">הוספת לקוח</Link>
    </>
  );
});

export default HomePage;
