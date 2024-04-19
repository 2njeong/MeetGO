'use client';

import { useDeleteRoom } from '@/hooks/useMutation/useMeetingMutation';
import { useGetUserDataQuery } from '@/hooks/useQueries/useUserQuery';

// import type { UUID } from 'crypto';
function DeleteMeetingRoom({ room_id }: { room_id: string }) {
  const { data: user, isPending, isError } = useGetUserDataQuery();
  const user_id = user?.user_id!;
  const deleteRoomMutation = useDeleteRoom({ room_id, user_id });
  const DeleteMeetingRoomHandler = async () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      await deleteRoomMutation.mutateAsync();
    }
  };

  return (
    <button
      className="gap-0 p-0 m-0 h-[31px] w-[76px] rounded-xl text-black text-[16px] bg-white hover:bg-mainColor hover:text-white "
      onClick={DeleteMeetingRoomHandler}
    >
      삭제
    </button>
  );
}

export default DeleteMeetingRoom;