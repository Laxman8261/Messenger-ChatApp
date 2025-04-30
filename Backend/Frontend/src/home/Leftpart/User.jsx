import React from 'react';
import useConversation from '../../statemanage/useConversation.js';
import { useSocketContext } from '../../context/SocketContext.jsx';

const User = ({ user }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${isSelected ? 'bg-slate-700' : ''}`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex space-x-4 py-6 px-7 hover:bg-slate-600 duration-300 cursor-pointer">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-14 rounded-full">
            <img
              src={
                user.avatar ||
                'https://www.pngmart.com/files/23/Profile-PNG-Photo.png'
              }
              alt={user.username}
            />
          </div>
        </div>
        <div>
          <h1 className="font-bold">{user.username}</h1>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
};

export default User;
