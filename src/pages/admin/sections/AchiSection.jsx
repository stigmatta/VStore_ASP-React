import AchiList from "../components/AchiList";
import AddAchiForm from "../components/AddAchiForm";

export default function AchiSection() {
  return (
    <div className="flex">
      <h2>Ачивки</h2>
      <AddAchiForm />
      <AchiList />
    </div>
  );
}
