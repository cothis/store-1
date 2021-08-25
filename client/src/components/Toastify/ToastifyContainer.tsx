import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Portal from './Portal';

const ToastifyContainer = () => {
  return (
    <Portal>
      <ToastContainer
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Portal>
  );
};

export default ToastifyContainer;
