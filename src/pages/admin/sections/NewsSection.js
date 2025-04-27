import AddNewsForm from "../components/AddNewsForm";
import NewsList from "../components/NewsList";

export default function NewsSection() {
  return (
    <div className="flex">
      <AddNewsForm />
      <NewsList />
    </div>
  );
}
