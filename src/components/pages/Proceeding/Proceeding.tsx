import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useObserver } from 'mobx-react-lite';
import useDate from 'hooks/useDate';
import useStore from 'hooks/useStore';
import usePermission from 'hooks/usePermission';
import FetchData, { OrderModal } from '../../../service/fetch';
import Expiration from './Expiration';
import PBtnBox from './PBtnBox';
import PLoginBox from './PLoginBox';
import PNoRequest from './PNoRequest';
import PNotice from './PNotice';
import PSubscribeBox from './PSubscribeBox';
import PWorkInformationBox from './PWorkInformationBox';
import PWorkStatusBox from './PWorkStatusBox';
import ModalForm from '../../modals/ModalForm';
import Portal from '../../modals/Portal';

interface userData {
  userId: string;
  name: string;
  onedriveLink: string;
  subscribeStart: string;
  subscribeEnd: string;
  remainingOrderCount: number;
  simpleNotify: string;
}

interface backgroundProps {
  isLong: boolean;
}

const initProcessing = {
  orderId: '',
  orderState: 0,
  orderStateContent: '',
  orderStateEmoji: '',
  orderedAt: '',
  remainingEditCount: 0,
};

const Proceeding = () => {
  const [processing, setProcessing] = useState<OrderModal>(initProcessing);

  const [isSpin, setSpin] = useState<boolean>(false);

  const [user, setUser] = useState<userData>({
    userId: '',
    name: '',
    subscribeStart: '',
    subscribeEnd: '',
    remainingOrderCount: 0,
    onedriveLink: '',
    simpleNotify: '',
  });

  const { modal } = useStore();

  const { handleDate, handleTime } = useDate();

  const { checkToken } = usePermission();

  const { requestData, requestUser, requestComplete, requestEdit } =
    new FetchData();

  const fetchData = async () => {
    await requestData().then((res) => {
      if (res && res.orderId) setProcessing(res as OrderModal);
    });
    await requestUser().then((res) => setUser(res));
  };

  const spinner = () => {
    setSpin(true);
    setTimeout(() => {
      setSpin(false);
    }, 2000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    checkToken();
  }, []);

  const renderSubscribeBox = (notify: string) => {
    switch (notify) {
      case 'NEED_BUY_ONE_EDIT':
      case 'NONE':
        return (
          <PSubscribeBox
            start={handleDate(user.subscribeStart)}
            end={handleDate(user.subscribeEnd)}
            orderedCnt={user.remainingOrderCount}
          />
        );
      default:
        return <Expiration />;
    }
  };

  async function clickRequestEdit() {
    await requestEdit();
    await fetchData();
    window.alert('수정요청이 되었습니다.');
  }

  const MODAL = {
    description: '해당 의뢰건을 완료할까요?',
    subDescription:
      '완료 결정 후\n 더이상 수정요청을 하실 수 없습니다. \n 한번 더 확인 후 결졍해주세요.',
    actionButton: async () => {
      await requestComplete();
      setProcessing(initProcessing);
      requestUser().then((res) => setUser(res));
      modal.closeModal();
    },
  };

  return (
    <Background isLong={processing.orderState > 3}>
      <Container>
        <Header>
          <img src="./images/Logo.png" alt="editfolio" />
        </Header>
        <Main>
          <PLoginBox name={user.name} />
          {renderSubscribeBox(user.simpleNotify)}
          {user.remainingOrderCount > 0 && processing.orderId === '' && (
            <PNoRequest oneDriveLink={user.onedriveLink} />
          )}
          {processing.orderState > 0 && user.simpleNotify === 'NONE' && (
            <>
              <PWorkInformationBox
                orderedDatetime={handleTime(processing.orderedAt)}
                dudate={handleDate(processing.dueDate)}
                assignee={processing.assigneeNickname ?? '-'}
                isSpin={isSpin}
                refresh={fetchData}
                spinner={spinner}
              />
              <PWorkStatusBox
                content={processing.orderStateContent}
                emoji={processing.orderStateEmoji}
              />
            </>
          )}
          {processing.orderState > 4 && (
            <EditSection>
              <PNotice />
              <PBtnBox
                remainingEditCount={processing.remainingEditCount}
                requestEdit={() => clickRequestEdit()}
                isEditing={processing.orderState === 7}
              />
            </EditSection>
          )}
        </Main>
      </Container>
      {useObserver(
        () =>
          modal.isShow && (
            <Portal>
              <ModalForm content={MODAL} />
            </Portal>
          ),
      )}
    </Background>
  );
};

const Background = styled.div<backgroundProps>`
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: #dee4ed;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 60px;
  padding: 15px 0 0 18px;
  background-color: ${({ theme }) => theme.color.white};
`;

const Main = styled.main`
  min-height: calc(100vh - 60px);
  padding-bottom: 60px;
  background-color: rgb(246, 248, 250);

  > div,
  > section {
    padding: 0 12px;
  }
`;

const EditSection = styled.section`
  margin-top: 24px;
  background-color: rgb(246, 248, 250);
`;

export default Proceeding;
