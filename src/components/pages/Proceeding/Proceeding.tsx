import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PBtnBox from './PBtnBox';
import PLoginBox from './PLoginBox';
import PNoRequest from './PNoRequest';
import PNotice from './PNotice';
import PSubscribeBox from './PSubscribeBox';
import PWorkInformationBox from './PWorkInformationBox';
import PWorkStatusBox from './PWorkStatusBox';

interface userData {
  name: string;
  orderable_cnt: string;
  ordered_at_datetime: string;
  due_data: string;
  assignee: string;
  state: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  start: string;
  end: string;
}

interface emogiData {
  0: [string, string];
  1: [string, string];
  2: [string, string];
  3: [string, string];
  4: [string, string];
  5: [string, string];
  6: [string, string];
}

const Proceeding = () => {
  const [users, setUsers] = useState<userData>({
    name: '',
    orderable_cnt: '',
    ordered_at_datetime: '',
    due_data: '',
    assignee: '',
    state: 1,
    start: '',
    end: '',
  });
  const [number, setUsernumber] = useState<number>(1);
  const [isSpin, setSpin] = useState<boolean>(false);

  const EMOGIDATA: emogiData = {
    0: ['', ''],
    1: ['🤔', '영상에 알맞는 편집자를 배정 중입니다.'],
    2: ['👀', '배정된 편집자가 영상을 열심히 확인하고 있어요'],
    3: ['😍️', '영상을 이쁘게 자르고 붙이는 중'],
    4: ['🎇️', '아주 환상적인 이펙트를 입히는 중입니다.'],
    5: ['😘️', '영상편집이 완료되었습니다'],
    6: ['🛠️', '요청하신 수정사항을 작업중입니다.'],
  };

  const fetchData = () => {
    fetch(`/data/proceeding${number}.json`)
      .then((res) => res.json())
      .then((users) => {
        setUsers(users);
      });
    setUsernumber(number + 1);
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
    <Container>
      <Header>
        <img src="./images/Logo.png" alt="editfolio" />
      </Header>
      <Main>
        <PLoginBox name={users.name} />
        <PSubscribeBox
          start={users.start}
          end={users.end}
          orderedCnt={users.orderable_cnt}
        />
        {users.state === 0 && <PNoRequest />}
        {users.state > 0 && (
          <>
            <PWorkInformationBox
              orderedDatetime={users.ordered_at_datetime}
              dudate={users.due_data}
              assignee={users.assignee}
              isSpin={isSpin}
              refresh={fetchData}
              spinner={spinner}
            />
            <PWorkStatusBox
              stateEmogi={EMOGIDATA[users.state][0]}
              stateText={EMOGIDATA[users.state][1]}
            />
          </>
        )}
      </Main>
      {users.state > 4 && (
        <Footer>
          <FooterLine />
          <PNotice />
          <PBtnBox />
        </Footer>
      )}
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 360px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 60px;
  padding: 15px 0 0 18px;
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
