import {
  ChattingRoomType,
  MeetingRoomType,
  NewRoomType,
  ParticipantsWithId,
  UpdateRoomType,
  UserType
} from '@/types/roomTypes';
import { ROOMSTATUS } from '@/utils/constant';
import { clientSupabase } from '@/utils/supabase/client';

export const fetchRecruitingRoom = async () => {
  const { data: meetingroom, error } = await clientSupabase
    .from('room')
    .select(`*`)
    .eq('room_status', ROOMSTATUS.RECRUITING)
    .order('created_at', { ascending: false });
  if (error) throw new Error('Error fetching recruiting room data');
  else {
    return meetingroom;
  }
};

export const fetchMyRoom = async (userId: string | undefined) => {
  const { data: myRoom, error } = await clientSupabase
    .from('participants')
    .select(`*`)
    .eq('isDeleted', false)
    .eq('user_id', String(userId))
    .select('user_id, room(*)')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('participating room data was not founded', error.message);
  } else {
    return myRoom;
  }
};

export const fetchMyPastAndNowRoom = async (userId: string | undefined) => {
  const { data: myPastAndNowRoom, error } = await clientSupabase
    .from('participants')
    .select(`*`)
    .eq('user_id', String(userId))
    .select('user_id, room(*)')
    .order('created_at', { ascending: false });
  if (error) throw new Error('Error participated and participating room data');
  return myPastAndNowRoom;
};

export const fetchRoomInfoWithRoomId = async (roomId: string): Promise<MeetingRoomType[]> => {
  const { data: room, error } = await clientSupabase.from('room').select(`*`).eq('room_id', roomId);
  if (error) {
    throw new Error('방이 존재하지 않습니다.');
  }
  return room;
};

export const fetchAlreadyChatRoom = async (roomId: string): Promise<ChattingRoomType[]> => {
  const { data: alreadyChat, error: alreadyChatError } = await clientSupabase
    .from('chatting_room')
    .select('*')
    .eq('room_id', roomId)
    .eq('isActive', true);
  if (alreadyChatError) {
    throw new Error('채팅방이 존재하지 않습니다.');
  } else {
    return alreadyChat;
  }
};

export const addRoom = async ({ nextMeetingRoom, userId }: { nextMeetingRoom: NewRoomType; userId: string }) => {
  const { data: insertMeetingRoom, error: insertMeetingRoomError } = await clientSupabase
    .from('room')
    .upsert([nextMeetingRoom])
    .select();

  if (insertMeetingRoomError) throw new Error('Error adding a member in the room data');
  else {
    await clientSupabase.from('participants').insert([{ room_id: insertMeetingRoom[0].room_id, user_id: userId }]);
    return insertMeetingRoom[0].room_id;
  }
};

export const updateRoomStatusClose = async (roomId: string) => {
  const { data, error } = await clientSupabase
    .from('room')
    .update({ room_status: ROOMSTATUS.CLOSED })
    .eq('room_id', roomId)
    .select();
  if (error) {
    throw new Error('Error updating the room status on close');
  } else return data;
};

export const updateRoomStatusOpen = async (roomId: string) => {
  const { data, error } = await clientSupabase
    .from('room')
    .update({ room_status: ROOMSTATUS.RECRUITING })
    .eq('room_id', roomId)
    .select();
  if (error) {
    throw new Error('Error updating the room status on open');
  }
  return data;
};

export const updateRoom = async (editedMeetingRoom: UpdateRoomType) => {
  const { data, error } = await clientSupabase
    .from('room')
    .update(editedMeetingRoom)
    .eq('room_id', editedMeetingRoom.room_id);
  if (error) {
    throw new Error('Error updating the room information');
  }
  return data;
};

export const deleteRoom = async (room_id: string) => {
  const { data: deleteRoomData, error: deleteRoomDataError } = await clientSupabase
    .from('room')
    .delete()
    .eq('room_id', room_id);
  if (deleteRoomDataError) {
    throw new Error('Error eliminating the room');
  }
  return deleteRoomData;
};

export const updateLeaderMember = async ({
  otherParticipants,
  roomId
}: {
  otherParticipants: (UserType | null)[] | undefined;
  roomId: string;
}) => {
  try {
    if (otherParticipants && otherParticipants.length) {
      const { data: leaderUpdate, error } = await clientSupabase
        .from('room')
        .update({ leader_id: otherParticipants[0]!.user_id })
        .eq('room_id', roomId);
      return leaderUpdate;
    }
  } catch (error) {
    console.error(error);
  }
};

export const addMember = async ({ userId, roomId }: { userId: string; roomId: string }) => {
  const { data: addMemeberData, error: addMemeberDataError } = await clientSupabase
    .from('participants')
    .insert([{ user_id: userId, room_id: roomId }]);
  if (addMemeberDataError) throw new Error('Error adding a member in the room data');
  else {
    return addMemeberData;
  }
};

export const deleteMember = async ({ userId, roomId }: { userId: string; roomId: string }) => {
  const { error: deleteMemberError } = await clientSupabase
    .from('participants')
    .update({ isDeleted: true })
    .eq('user_id', userId)
    .eq('room_id', roomId)
    .select();
  if (deleteMemberError) {
    throw new Error('Error eliminating a member in the room data');
  }
};

export const fetchRoomParticipants = async (roomId: string): Promise<ParticipantsWithId[]> => {
  const { data: userInformations, error: userInformatinsError } = await clientSupabase
    .from('participants')
    .select(`*`)
    .eq('room_id', roomId)
    .eq('isDeleted', false)
    .select('user_id, users(*)');
  if (userInformatinsError) {
    throw new Error('Error fetching room participants data');
  } else return userInformations;
};
