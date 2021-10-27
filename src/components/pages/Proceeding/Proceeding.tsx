import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useDate from 'hooks/useDate';
import FetchData from '../../../service/fetch';
import Exhaustion from './Exhaustion';
import PBtnBox from './PBtnBox';
import PLoginBox from './PLoginBox';
import PNoRequest from './PNoRequest';
import PNotice from './PNotice';
import PSubscribeBox from './PSubscribeBox';
import PWorkInformationBox from './PWorkInformationBox';
import PWorkStatusBox from './PWorkStatusBox';

interface processingData {
  assigneeNickname: string;
  dueDate: string;
  orderId: string;
  orderState: number;
  orderStateContent: string;
  orderedAt: string;
  remainingEditCount: number;
}

interface userData {
  name: string;
  subscribeStart: string;
  subscribeEnd: string;
  orderableCount: number;
}

const Proceeding = () => {
  const [processing, setProcessing] = useState<processingData>({
    assigneeNickname: '',
    dueDate: '',
    orderId: '',
    orderState: 0,
    orderStateContent: '',
    orderedAt: '',
    remainingEditCount: 0,
  });

  const [isSpin, setSpin] = useState<boolean>(false);

  const [user, setUser] = useState<userData>({
    name: '',
    subscribeStart: '',
    subscribeEnd: '',
    orderableCount: 0,
  });

  const { handleDate, handleTime } = useDate();

  const fetch = new FetchData();

  const fetchData = () => {
    fetch.RequestData().then((res) => setProcessing(res));
    fetch.RequestUser().then((res) => setUser(res));
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

  return (
    <Background>
      <Container>
        <Header>
          <img src="./images/Logo.png" alt="editfolio" />
        </Header>
        <Main>
          <PLoginBox name={user.name} />
          {processing.remainingEditCount > 0 ? (
            <PSubscribeBox
              start={handleDate(user.subscribeStart)}
              end={handleDate(user.subscribeEnd)}
              orderedCnt={processing.remainingEditCount}
            />
          ) : (
            <Exhaustion />
          )}
          {processing.orderState === 0 && processing.remainingEditCount > 0 && (
            <PNoRequest />
          )}
          {processing.orderState > 0 && (
            <>
              <PWorkInformationBox
                orderedDatetime={handleTime(processing.orderedAt)}
                dudate={handleDate(processing.dueDate)}
                assignee={processing.assigneeNickname}
                isSpin={isSpin}
                refresh={fetchData}
                spinner={spinner}
              />
              <PWorkStatusBox
                status={processing.orderState && processing.orderState}
              />
            </>
          )}
        </Main>
        {processing.orderState > 4 && (
          <Footer>
            <FooterLine />
            <PNotice />
            <PBtnBox />
          </Footer>
        )}
      </Container>
    </Background>
  );
};

const Background = styled.div`
  width: 100%;
  height: 100vh;
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
  border: 1px solid #becbd8;
`;

export default Proceeding;
