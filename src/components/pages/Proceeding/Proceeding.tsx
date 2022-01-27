import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useObserver } from 'mobx-react-lite';
import useDate from 'hooks/useDate';
import useStore from 'hooks/useStore';
import usePermission from 'hooks/usePermission';
import FetchData from '../../../service/fetch';
import Exhaustion from './Exhaustion';
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

interface processingData {
  assigneeNickname: string | null;
  dueDate: string | null;
  orderId: string;
  orderState: number;
  orderStateContent: string;
  orderStateEmoji: string;
  orderedAt: string;
  remainingEditCount: number;
}

interface userData {
  userId: string;
  name: string;
  onedriveLink: string;
  subscribeStart: string;
  subscribeEnd: string;
  remainingOrderCount: number;
  simpleNotify: '';
}

interface backgroundProps {
  isLong: boolean;
}

const initProcessing = {
  assigneeNickname: null,
  dueDate: null,
  orderId: '',
  orderState: 0,
  orderStateContent: '',
  orderStateEmoji: '',
  orderedAt: '',
  remainingEditCount: 0,
};

const Proceeding = () => {
  const [processing, setProcessing] = useState<processingData>(initProcessing);

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

  const fetch = new FetchData();

  const fetchData = () => {
    fetch.requestData().then((res) => setProcessing(res));
    fetch.requestUser().then((res) => setUser(res));
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
      case 'NEED_BUY_SUBSCRIBE':
        return <Expiration />;
      case 'NEED_BUY_ONE_EDIT':
      case 'NONE':
        return processing.orderState > 0 ? (
          <PSubscribeBox
            start={handleDate(user.subscribeStart)}
            end={handleDate(user.subscribeEnd)}
            orderedCnt={user.remainingOrderCount}
          />
        ) : (
          <Exhaustion />
        );
      default:
        return <Expiration />;
    }
  };

  const MODAL = {
    description: '해당 의뢰건을 완료할까요?',
    subDescription:
      '완료 결정 후\n 더이상 수정요청을 하실 수 없습니다. \n 한번 더 확인 후 결졍해주세요.',
    actionButton: () => {
      fetch.requestComplete().then((res) => res);
      setProcessing(initProcessing);
      fetch.requestUser().then((res) => setUser(res));
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
          {user.remainingOrderCount > 0 && processing.orderState === 0 && (
            <PNoRequest />
          )}
          {processing.orderState > 0 && (
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
        </Main>
        {processing.orderState > 3 && (
          <Footer>
            <FooterLine />
            <PNotice />
            <PBtnBox
              remainingEditCount={processing.remainingEditCount}
              requestEdit={() => fetch.requestEdit()}
            />
          </Footer>
        )}
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
  position: relative;
  width: 100%;
  height: ${({ isLong }) => (isLong ? '100%' : '100vh')};
  background-color: #dee4ed;
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 360px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 60px;
  padding: 15px 0 0 18px;
  background-color: ${({ theme }) => theme.color.white};

  & img {
    cursor: pointer;
  }
`;

const Main = styled.main`
  background-color: rgb(246, 248, 250);
`;

const Footer = styled.footer`
  background-color: rgb(246, 248, 250);
`;

const FooterLine = styled.div`
  width: 336px;
  height: 1px;
  margin-left: 12px;
  border-top: 1px solid #becbd8;
`;

export default Proceeding;
