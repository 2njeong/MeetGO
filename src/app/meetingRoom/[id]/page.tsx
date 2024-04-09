import AcceptanceRoomButtons from '(@/components/room/participants/AcceptanceRoomButtons)';
import InitParticipants from '(@/components/room/participants/InitParticipants)';
import Member from '(@/components/room/participants/Member)';
import RoomInformation from '(@/components/room/participants/RoomInformation)';
import { UUID } from 'crypto';
import { Suspense } from 'react';

const memberList = ({ params }: { params: { id: UUID } }) => {
  const roomId = params.id;

  return (
    <>
      <Suspense fallback="미팅룸...">
        <InitParticipants roomId={roomId} />
        <div className="flex flex-col justify-center w-full align-middle">
          <RoomInformation roomId={roomId} />
          <div className="m-12 h-100 flex flex-row justify-evenly">
            <Member params={params} />
            <AcceptanceRoomButtons roomId={roomId} />
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default memberList;
