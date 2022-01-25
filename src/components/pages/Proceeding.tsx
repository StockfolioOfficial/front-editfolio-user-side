import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useObserver } from 'mobx-react-lite';
import useDate from 'hooks/useDate';
import useStore from 'hooks/useStore';
import usePermission from 'hooks/usePermission';
import { useHistory } from 'react-router-dom';
import FetchData, { OrderModal, UserData } from '../../service/fetch';
import Expiration from './Proceeding/Expiration';
import PBtnBox from './Proceeding/PBtnBox';
import PLoginBox from './Proceeding/PLoginBox';
import PNoRequest from './Proceeding/PNoRequest';
import PNotice from './Proceeding/PNotice';
import PSubscribeBox from './Proceeding/PSubscribeBox';
import PWorkInformationBox from './Proceeding/PWorkInformationBox';
import PWorkStatusBox from './Proceeding/PWorkStatusBox';
import ModalForm from '../modals/ModalForm';
import Portal from '../modals/Portal';

const initProcessing = {
  orderId: '',
  orderState: 0,
  orderStateContent: '',
  orderStateEmoji: '',
  orderedAt: '',
  remainingEditCount: 0,
  linkList: [],
};

const initUserData = {
  userId: '',
  name: '',
  subscribeStart: '',
  subscribeEnd: '',
  remainingOrderCount: 0,
  onedriveLink: '',
  simpleNotify: '',
};

const Proceeding = () => {
  const history = useHistory();

  const init = useRef(true);

  const [processing, setProcessing] = useState<OrderModal>(initProcessing);

  const [user, setUser] = useState<UserData>(initUserData);

  const { modal } = useStore();

  const { handleDate, handleTime } = useDate();

  const { checkToken } = usePermission();

  const { requestData, requestUser, requestComplete, requestEdit } =
    new FetchData();

  const fetchData = async () => {
    const processData = await requestData();
    if (processData && processData.orderId) setProcessing(processData);
    const userData = await requestUser();
    if (userData) setUser(userData);
  };

  const checkLogin = () => {
    if (!checkToken()) {
      history.push('/');
      return;
    }
    if (init.current) fetchData();
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', checkLogin);
    checkLogin();
    init.current = false;
    return () => {
      document.removeEventListener('visibilitychange', checkLogin);
    };
  }, []);

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
      const userData = await requestUser();
      if (userData) setUser(userData);
      modal.closeModal();
    },
  };

  const SubcribeBox = () => {
    return (
      <SubcribeBoxMain>
        <PSubscribeBox
          start={handleDate(user.subscribeStart)}
          end={handleDate(user.subscribeEnd)}
          orderedCnt={user.remainingOrderCount}
        />
        {processing.orderId ? (
          <>
            <PWorkInformationBox
              orderedDatetime={handleTime(processing.orderedAt)}
              dudate={handleDate(processing.dueDate)}
              assignee={
                processing.assigneeNickname ??
                (processing.linkList && processing.linkList.length > 0)
                  ? '편집자를 배정 중입니다.'
                  : '대기 중'
              }
              refresh={fetchData}
            />
            <PWorkStatusBox
              content={processing.orderStateContent}
              emoji={processing.orderStateEmoji}
              links={processing.linkList}
            />
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
          </>
        ) : (
          <PNoRequest
            cloudLink={user.onedriveLink}
            orderedCnt={user.remainingOrderCount}
          />
        )}
      </SubcribeBoxMain>
    );
  };

  useEffect(() => {
    if (localStorage.getItem('editfolio-token')) return;
    history.push('/');
  }, []);

  return (
    <>
      <Container>
        <Header>
          <img src="./images/Logo.png" alt="editfolio" />
        </Header>
        <Main>
          <PLoginBox name={user.name} />
          {user.subscribeStart ? <SubcribeBox /> : <Expiration />}
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
    </>
  );
};

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
`;

const SubcribeBoxMain = styled.section`
  padding: 16px 12px 0;
`;

const EditSection = styled.section`
  margin-top: 24px;
  background-color: rgb(246, 248, 250);
`;

export default Proceeding;
