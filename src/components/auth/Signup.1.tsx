import { createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import mangofavicon from '../../assets/mango-favicon.png';
import usePrintError from '../../hooks/usePrintError';
import { isSignUpState } from '../../recoil/users';
import { auth, db } from '../../shared/firebase';
import { Data } from './Signup';
import St from './style';

export function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [passwordCheck, SetPasswordCheck] = useState('');
  const storage = getStorage();
  const [imageUpload, setImageUpload] = useState<any>('');
  const [image, setImage] = useState('');
  const [isSignUp, setIsSignUp] = useRecoilState(isSignUpState);
  const [errorMsg, setErrorMsg] = usePrintError('');
  const [isFormValid, setIsFormValid] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  // const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const navigate = useNavigate();
  // const emailInputRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<Data>({ mode: 'onChange' });
  // 유효성 검사
  // 정규식
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordRegex = /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/;
  const nicknameRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/;
  // 파일이 업로드되면 스토리지에 업로드하고 다운 즉시 이미지가 보여짐
  // 폴더/파일
  useEffect(() => {
    const imageRef = ref(storage, 'userProfile/' + `${auth.currentUser?.uid}`);
    if (!imageUpload) return;
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImage(url);
      });
    });
  }, [imageUpload]);

  const signUp: SubmitHandler<Data> = async ({ email, password, nickname, passwordCheck }: Data) => {
    try {
      if (!isChecked) {
        alert('중복확인해주세요');
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      console.log('userCredential', userCredential);
      const user = userCredential.user;
      if (user !== null) {
        await updateProfile(user, {
          displayName: nickname
        });
      } else return;
      setValue('email', '');
      setValue('password', '');
      setValue('nickname', '');
      setValue('passwordCheck', '');
      alert('가입 성공');
      // 회원가입 시, user 컬렉션에 값이 저장됨
      const userId = auth.currentUser?.uid;
      // 컬렉션에 있는 users 필드 정보 수정
      if (userId) {
        await setDoc(doc(db, 'users', userId), {
          userEmail: auth.currentUser?.email,
          displayName: auth.currentUser?.displayName,
          profileImg: auth.currentUser?.photoURL,
          uid: auth.currentUser?.uid,
          role: 'user'
        });
      }
    } catch (error) {
      setErrorMsg(error);
      return;
    }

    // 회원가입 state 업데이트 (Ashley)
    setIsSignUp(false);
    signOut(auth);
  };

  // 이메일 중복체크 (firestore)
  const emailCheck = async (email: string) => {
    const userRef = collection(db, 'users');
    const q = query(userRef, where('userEmail', '==', email));
    const querySnapshot = await getDocs(q);
    setIsChecked(true);

    if (querySnapshot.docs.length > 0) {
      alert('이미 존재하는 이메일입니다.');
      setIsFormValid(false);
      setValue('email', '');

      return;
    } else if (email === '') {
      alert('이메일을 입력해주세요');
      return;
    } else if (querySnapshot.docs.length === 0) {
      alert('사용 가능한 메일입니다');
      setIsFormValid(true);
    }
  };

  // 닉네임 중복체크
  const nicknameCheck = async (nickname: string) => {
    const userRef = collection(db, 'users');
    const q = query(userRef, where('displayName', '==', nickname));
    const querySnapshot = await getDocs(q);
    // setIsNicknameChecked(true);
    setIsChecked(true);

    if (querySnapshot.docs.length > 0) {
      alert('이미 존재하는 닉네임입니다.');
      setValue('nickname', '');
      setIsFormValid(false);
      return;
    } else if (nickname === '') {
      alert('닉네임을 입력해주세요');
      return;
    } else if (querySnapshot.docs.length === 0) {
      alert('사용 가능한 닉네임입니다.');
      setIsFormValid(true);
    }
  };

  return (
    <St.AuthWrapper>
      <St.LogoContainer>
        <St.SubTitle>건강한 친환경 습관 만들기</St.SubTitle>
        <St.LogoBox>
          <St.MangoLogo src={mangofavicon} />
          <St.Logo>MANGO</St.Logo>
        </St.LogoBox>
        <St.SignUpTitle>회원가입</St.SignUpTitle>
      </St.LogoContainer>
      <form style={{ width: '280px' }} onSubmit={handleSubmit(signUp)}>
        <St.InputContainer>
          <label htmlFor="email"></label>
          <St.AuthInput
            type="text"
            placeholder="Email"
            {...register('email', {
              required: true,
              pattern: emailRegex
            })}
          />
          <St.AuthBtn onClick={() => emailCheck(getValues('email'))}>중복확인</St.AuthBtn>
          {errors?.email?.type === 'required' && <St.WarningMsg>이메일을 입력해주세요</St.WarningMsg>}
          {errors?.email?.type === 'pattern' && <St.WarningMsg>이메일 양식에 맞게 입력해주세요</St.WarningMsg>}
        </St.InputContainer>
        <St.InputContainer>
          <label htmlFor="password"></label>
          <St.Input
            type="password"
            id="password"
            placeholder="Password (문자, 숫자 8자리 이상)"
            {...register('password', {
              required: true,
              pattern: passwordRegex
            })}
            disabled={!isChecked}
          />

          {errors?.password?.type === 'required' && <St.WarningMsg>비밀번호를 입력해주세요</St.WarningMsg>}
          {errors?.password?.type === 'pattern' && (
            <St.WarningMsg>비밀번호는 문자, 숫자 1개이상 포함, 8자리 이상입니다</St.WarningMsg>
          )}
        </St.InputContainer>
        <St.InputContainer>
          <St.Input
            type="password"
            placeholder="Confirm Password"
            {...register('passwordCheck', {
              required: true,
              validate: {
                check: (val) => {
                  if (getValues('password') !== val) {
                    return '비밀번호 불일치';
                  }
                }
              }
            })}
            disabled={!isChecked}
          />

          {errors?.passwordCheck?.type === 'required' && <St.WarningMsg>비밀번호를 입력해주세요</St.WarningMsg>}
          {errors?.passwordCheck && <St.WarningMsg>비밀번호가 일치하지 않습니다</St.WarningMsg>}
        </St.InputContainer>
        <St.InputContainer>
          <label htmlFor="nickname"></label>
          <St.AuthInput
            type="text"
            id="nickname"
            placeholder="Nickname"
            {...register('nickname', {
              required: true,
              pattern: nicknameRegex
            })}
            disabled={!isChecked}
          />
          <St.AuthBtn type="button" onClick={() => nicknameCheck(getValues('nickname'))}>
            중복확인
          </St.AuthBtn>

          {errors?.nickname?.type === 'required' && <St.WarningMsg>닉네임을 입력해주세요</St.WarningMsg>}
          {errors?.nickname?.type === 'pattern' && (
            <St.WarningMsg>닉네임은 2자 이상 8자 이하, 영어 또는 숫자 또는 한글로 입력해주세요</St.WarningMsg>
          )}
        </St.InputContainer>

        <St.SignUpAndLoginBtn
          type="submit"
          disabled={
            !isFormValid &&
            nickname === '' &&
            email === '' &&
            password === '' &&
            passwordCheck === '' &&
            password !== passwordCheck
          }
        >
          가입하기
        </St.SignUpAndLoginBtn>
        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      </form>
      <St.ToggleLoginAndSignUp onClick={() => setIsSignUp(false)}>로그인으로 돌아가기</St.ToggleLoginAndSignUp>
    </St.AuthWrapper>
  );
}
