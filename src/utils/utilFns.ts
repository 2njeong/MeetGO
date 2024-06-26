import { Message } from '@/types/chatTypes';
import { UsersType } from '@/types/userTypes';

export const getformattedDate = (date: string) =>
  new Date(date).toLocaleString('ko', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

export const showingDate = (date: string) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1; // 월은 0부터 시작하기 때문에 1을 더하기
  const day = d.getDate();
  const week = d.getDay();
  const weekKor = ['일', '월', '화', '수', '목', '금', '토'][week];

  return `${year}. ${month.toString().padStart(2, '0')}. ${day} ${weekKor}`;
};

export const getFromTo = (loadCount: number, idx: number) => {
  const from = loadCount * (idx + 1);
  const to = from + idx;

  return { from, to };
};

export const isNextDay = (idx: number, messages: Message[] | undefined) => {
  return (
    idx > 0 &&
    messages &&
    new Date(messages[idx].created_at).getDate() > new Date(messages[idx - 1].created_at).getDate()
  );
};

export const isItMe = (idx: number, messages: Message[] | undefined) => {
  return idx > 0 && messages && messages[idx].send_from === messages[idx - 1].send_from;
};

export const debounce = <T extends (...args: any) => Promise<void>>(callback: T, delay: number) => {
  let timerId: any = null;
  return (...args: Parameters<T>) => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
  timeZone: 'Asia/Seoul'
};

export const genderMemberNumber = (memberNumber: string) => {
  if (memberNumber === '1:1') {
    return 1;
  } else if (memberNumber === '2:2') {
    return 2;
  } else if (memberNumber === '3:3') {
    return 3;
  } else if (memberNumber === '4:4') {
    return 4;
  }
};

export const handleGenderList = (genderMaxNumber: number | undefined, participants: UsersType[], gender: string) => {
  const theGenderList = participants.filter((p) => p.gender === gender);
  const arr = new Array(genderMaxNumber).fill(null).map((_, idx) => {
    return idx < theGenderList.length ? theGenderList[idx] : null;
  });
  return arr;
};
