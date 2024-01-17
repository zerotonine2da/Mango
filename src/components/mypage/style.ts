import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import theme from '../../styles/theme';

const Wrapper = styled.div`
  max-width: 1440px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  row-gap: 80px;
`;

const ProfileEditWrapper = styled.div`
  display: flex;
  align-items: center; // ashley 추가 24.01.16
  column-gap: 30px;
  width: 100%;
  height: 230px;
  padding: 40px 60px;
  /* background-color: ${theme.color.gray}; */
  /* background-color: lightgray; */
  border-radius: 10px;
  border: 1px solid lightgray;
  margin-top: 30px;
`;

const ProfileImageContainer = styled.div`
  display: flex;
  position: relative;
`;

const PenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 40px;
  height: 40px;
  right: 5px;
  bottom: 5px;
  border-radius: 50%;
  border: 0.5px solid ${theme.color.lightgray};
  background-color: white;
  font-size: larger;
  cursor: pointer;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  gap: 10px;
  align-items: baseline;
`;

const UserPostInfoContainer = styled.div`
  display: flex;
  column-gap: 20px;
  font-size: 15px;
  /* margin-left: 80px; */

  /* justify-content: center; */
  /* margin-left: 10px; */
`;

const PostInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 140px;
  height: 100px;
  padding: 20px;
  border-radius: 20px;
  background-color: #fbfbfb;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 20px;
  gap: 20px;
`;

const profileImg = styled.div`
  /* width: 150px;
  height: 150px; */
  /* border-radius: 50%; */
  object-fit: cover;
  img {
    border-radius: 50%;
    width: 150px;
    height: 150px;
  }
`;

const ModifyButton = styled.button`
  width: 80px;
  height: 30px;
  border-radius: 30px;
  border: none;
  font-size: 12px;
  color: white;
  margin-top: 15px;
  margin-left: 5px;
  background-color: ${theme.color.mangoMain};
  font-weight: 600;
`;

const UserInfoModify = styled.div`
  /* background-color: red; */
  /* width: 180px; */
  display: flex;
  justify-content: left;
  margin-right: 50px;
  width: 170px;
`;
const FileInput = styled.input`
  display: none;
  /* border: 1px solid black; */
`;

const DisplayNameModify = styled.input`
  border-radius: 30px;
  height: 25px;
  border: 1px solid lightgray;
  padding-left: 10px;
  font-size: 13px;
  width: 150px;
  font-size: 12px;
`;

const MyImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const MyNickname = styled.h1`
  font-size: 20px;
  font-weight: 600;
`;

const MyEmail = styled.h4`
  font-size: 15px;
  color: ${theme.color.mangoNavy};
`;

const EmailAndName = styled.div`
  display: flex;
  flex-direction: column;
`;

const Tabs = styled.div`
  width: 100%;
  height: 100%;
  margin: 20px;
  padding: 20px;
`;

const TabButtonContainer = styled.div`
  display: flex;
  column-gap: 20px;
  font-size: 20px;
`;

const TabButton = styled.button`
  background-color: transparent;
  border-color: transparent;

  & div {
    display: flex;
    color: lightgray;
    column-gap: 7px;

    &:hover {
      color: black;
    }
  }
`;

//--------------------------------------------
// Calendar

const CalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyleCalendar = styled.div`
  .react-calendar {
    width: 800px;
    border-radius: 0px 0px 30px 30px;
    /* background-color: ${theme.color.lightgray}; */
    background-color: #ffffff;
    border: ${theme.color.lightgray};
    box-shadow: 3px 3px 3px 3px ${theme.color.gray};
  }

  .react-calendar__tile--active {
    background-color: ${theme.color.mangoLight};
  }

  .react-calendar__navigation button {
    display: flex;
    justify-content: center;
    align-content: center;
    padding-bottom: 30px;
  }

  .react-calendar button {
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .habitImage {
    margin-top: 5px;
    width: 50px;
    height: 50px;
  }
`;

const CalendarTitle = styled.div`
  width: 800px;
  height: 70px;
  border: 0.5px solid lightgray;
  background-color: ${theme.color.mangoYellow};
  border-radius: 30px 30px 0px 0px;
  box-shadow: 3px 3px 3px 3px ${theme.color.gray};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.color.mangoMain};
  font-size: 25px;
  font-family: ${theme.font.mango};
`;

const PostCount = styled.div`
  background-color: ${theme.color.mangoMain};
  border-radius: 50%;
  font-size: 13px;
`;

const CurrentDate = styled.div`
  margin-top: 30px;
`;
//--------------------------------------------
// MyPosts

const MySectionWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  /* height: 600px; */
  border: 1px solid #d9d9d9;
  margin-bottom: 300px;
`;

const PostsWrapper = styled.div`
  /* justify-content: center;
  align-items: center; */
  gap: 20px;
`;

const PostTitle = styled.div`
  margin-bottom: 20px;
`;

const Contents = styled.p`
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const PostsBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  gap: 20px;
`;

const PostImg = styled.img`
  width: 300px;
  height: 200px;
  object-fit: cover;
  border: 0.5px solid ${theme.color.gray};
  border-radius: 30px;
  margin-bottom: 20px;
`;

const TextBox = styled.div`
  width: 290px;
  height: 300px;
`;

export default {
  ProfileEditWrapper,
  MySectionWrapper,
  // MyImage,
  EmailAndName,
  MyNickname,
  MyEmail,
  Wrapper,
  UserInfo,
  Tabs,
  CalendarTitle,
  TabButtonContainer,
  CalendarWrapper,
  StyleCalendar,
  PostsWrapper,
  PostTitle,
  Contents,
  PostsBox,
  profileImg,
  FileInput,
  DisplayNameModify,
  UserInfoModify,
  ProfileInfo,
  UserPostInfoContainer,
  PostInfoBox,
  TabButton,
  TextBox,
  PostImg,
  ModifyButton,
  CurrentDate,
  PostCount,
  PenWrapper,
  ProfileImageContainer,
  MyImage
};
