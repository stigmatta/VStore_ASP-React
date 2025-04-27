import AddReqForm from "../components/AddReqForm";
import ReqList from "../components/ReqList";

export default function ReqsSection() {
  return (
    <div className="flex">
      <AddReqForm />
      <ReqList />
    </div>
  );
}
