import { STATUS } from '@/common/types/comon';
import ModalNotification from '../../Modal/ModalNotification';

interface Props {
  status: STATUS;
  show: boolean | undefined;
  toggle: () => void;
  setShow: (show: boolean) => void;
  message?: string;
}

const ModalVeNftNotication: React.FunctionComponent<Props> = ({ status, show, message, toggle, setShow }) => {
  if (status === STATUS.FAIL) {
    return (
      <ModalNotification
        type={'FAILED'}
        title={'Failed'}
        desc={message || 'Something went wrong'}
        isModalOpen={!!show}
        handleClose={() => setShow(false)}
      />
    );
  }
  if (status === STATUS.SUCCESS) {
    return (
      <ModalNotification
        width={448}
        type={'SUCCESS'}
        title={'Successfully'}
        desc={message || 'Thank you, you have successfully staked $MGPT. You can stake more at any time.'}
        isModalOpen={!!show}
        handleClose={() => {
          toggle();
          window.location.reload();
        }}
      />
    );
  }
  return (
    <ModalNotification
      type={'PENDING'}
      title={'Stake $MGPT'}
      desc={'Please confirm this transaction in your wallet to stake $MGPT'}
      isModalOpen={!!show}
      width={400}
    />
  );
};
export default ModalVeNftNotication;
