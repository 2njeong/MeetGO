'use client';

import { useAcceptKakaoIdMutation, useMetPeopleMutation } from '(@/hooks/useMutation/useMetPeopleMutation)';
import { useMetPeople } from '(@/hooks/useQueries/useMetPeople)';
import { KAKAOID_REQUEST_QUERY_KEY } from '(@/query/user/metPeopleQueryKeys)';
import { userStore } from '(@/store/userStore)';
import { useQueryClient } from '@tanstack/react-query';

/**
 * useMutation을 이용한 데이터 처리 사용 방법
 * 1. service 폴더에 적절한 supabase의 insert/update/delete를 다루는 함수를 만든다.
 * 2. hooks/useMutation 폴더에 적절한 use~~~~~Mutation 함수를 만든다.
 * 3. 적용하려고 하는 컴포넌트를 client components로 바꾼다 -> "use client";
 * 4. const { mutate: 바꿔줄이름 } = useMetPeopleMutation(); => mutation을 호출한다.2번에서 만든 mutation.
 * 5. 실제 click이 일어나서 데이터를 넣어야 하는 곳에 mutate 함수를 실행한다.
 * 6. 실행이 완료되면(onSuccess), 갱신해야하는 useQuery로 가져온 데이터를 invalidate 처리한다.
 */

const MetPeople = () => {
  const queryClient = useQueryClient();
  const { user, setUser } = userStore((state) => state);
  const userId = user?.[0]?.user_id ?? '';
  const userGender = user?.[0]?.gender ?? '';
  const metPeopleList = useMetPeople(userId, userGender);
  const { mutate: requestKakaoMutate } = useMetPeopleMutation();
  const { mutate: acceptKakaoIdMutate } = useAcceptKakaoIdMutation();

  /** 카카오ID요청하기 버튼 클릭시 실행될 로직(상태 업데이트 및 갱신) */
  const handleKakaoIdRequestClick = (responseId: string) => {
    requestKakaoMutate(
      {
        requestId: userId,
        responseId
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [KAKAOID_REQUEST_QUERY_KEY, userId, userGender]
          });
        }
      }
    );
  };

  const handleAcceptKakaoId = (responseId: string, newStatus: string) => {
    acceptKakaoIdMutate(
      {
        requestId: userId,
        responseId,
        newStatus: '수락'
      },
      {
        onSuccess: () => {
          alert('카톡ID 요청을 수락했습니다.');
          queryClient.invalidateQueries({
            queryKey: [KAKAOID_REQUEST_QUERY_KEY, userId, userGender]
          });
        }
      }
    );
  };

  const handleRejectKakaoId = (responseId: string, newStatus: string) => {
    acceptKakaoIdMutate(
      {
        requestId: userId,
        responseId,
        newStatus: '거절'
      },
      {
        onSuccess: () => {
          alert('카톡ID 요청을 거절했습니다.');
          queryClient.invalidateQueries({
            queryKey: [KAKAOID_REQUEST_QUERY_KEY, userId, userGender]
          });
        }
      }
    );
  };

  console.log('metPeopleList:', metPeopleList);

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">스쳐간 인연 리스트</h2>
      <div className="flex items-center gap-4 flex-wrap">
        {metPeopleList?.map((person: any, index: any) => (
          <div key={index} className="flex flex-col items-center p-2">
            <div className="w-24 h-24 rounded-full bg-gray-300 mb-2" />
            <p className="text-sm">{person.nickname}</p>
            {(!person.requestStatus || person.requestStatus === '요청전') && (
              <button className="text-xs" onClick={() => handleKakaoIdRequestClick(person.user_id)}>
                카톡ID 요청
              </button>
            )}
            {userId === person.request_Id && person.requestStatus === '요청중' && <p className="text-xs">요청중</p>}
            {userId === person.response_Id && person.requestStatus === '요청중' && (
              <>
                <button className="text-xs" onClick={() => handleAcceptKakaoId(person.user_id, '수락')}>
                  수락
                </button>
                <button className="text-xs" onClick={() => handleRejectKakaoId(person.user_id, '거절')}>
                  거절
                </button>
              </>
            )}
            {person.requestStatus === '수락' && <p className="text-xs">카톡ID : {person.kakaoId}</p>}
            {userId === person.request_Id && person.requestStatus === '거절' && <p className="text-xs">거절됨</p>}
            {userId === person.response_Id && person.requestStatus === '거절' && <p className="text-xs">거절</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetPeople;
