import { addNewLastMsg, updateMyLastMsg } from '(@/query/chat/chatQueryFns)';
import { MY_LAST_MSGS } from '(@/query/chat/chatQueryKeys)';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddLastMsg = (chatRoomId: string, user_id: string, last_msg_id: string | undefined) => {
  const queryClient = useQueryClient();
  const { mutate: mutateToAdd } = useMutation({
    mutationFn: async () => await addNewLastMsg(chatRoomId, user_id, last_msg_id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [MY_LAST_MSGS, user_id, chatRoomId] });
    }
  });
  return { mutate: mutateToAdd };
};

export const useUpdateLastMsg = (user_id: string, chatRoomId: string, msg_id: string | undefined) => {
  const queryClient = useQueryClient();
  const { mutate: mutateToUpdate } = useMutation({
    mutationFn: async () => await updateMyLastMsg(user_id, chatRoomId, msg_id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [MY_LAST_MSGS, user_id, chatRoomId] });
      console.log('마지막 아이디 업데이트 성공!');
    }
  });
  return { mutate: mutateToUpdate };
};
