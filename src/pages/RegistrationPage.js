import BackArrow from '../components/BackArrow';
import RegForm from '../components/RegForm';
import CreatedForm from '../components/CreatedForm';
import useWindowWidth from '../hooks/useWindowWidth';
import { useState } from "react";

export default function RegistrationPage() {
  const windowWidth = useWindowWidth();
  const [modalVisible, setModalVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(true);

  return (
    <div className="h-screen w-full relative">
      <BackArrow />

      <div className="w-full h-full flex justify-center items-center">
        {formVisible && (
          <RegForm
            initial={windowWidth > 1250 ? 0.8 : 1}
            final={1}
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
