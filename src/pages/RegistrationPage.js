import BackArrow from "../components/BackArrow";
import RegForm from "../components/RegForm";
import CreatedForm from "../components/CreatedForm";
import { useState } from "react";

export default function RegistrationPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(true);

  return (
    <div className="w-full relative">
      <BackArrow />

      <div className="w-full h-screen  flex justify-center items-center">
        {formVisible && (
          <RegForm
            setModalVisible={setModalVisible}
            setFormVisible={setFormVisible}
          />
        )}
      </div>

      {modalVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <CreatedForm initial={0.9} final={1} />
        </div>
      )}
    </div>
  );
}
