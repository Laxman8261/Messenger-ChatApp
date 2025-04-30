import React from 'react';
import useConversation from '../../statemanage/useConversation.js';
import { useSocketContext } from '../../context/SocketContext.jsx';

const ChatUser = () => {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const getOnlineUserStatus = (userId) => {
    return onlineUsers.includes(userId) ? 'Online' : 'Offline';
  };

  return (
    <div className="pl-5 pt-5 flex space-x-4 bg-gray-900 hover:bg-gray-600 duration-300 cursor-pointer h-[12vh]">
      <div>
        <div className={`avatar ${getOnlineUserStatus ? "avatar-online" : ""} `}>
          <div className="w-14 h-14 rounded-full overflow-hidden">
            <img
              src="https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
              width={56}
              height={56}
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-xl text-white">{selectedConversation?.username}</h1>
        <span className="text-sm text-gray-300">
          {getOnlineUserStatus(selectedConversation?._id)}
        </span>
      </div>
    </div>
  );
};

export default ChatUser;
