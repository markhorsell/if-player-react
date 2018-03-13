

export const getRoomData = (roomId,rooms) => {
    const roomData = rooms.filter(room => room.id===roomId)[0];
    return roomData; 
  }

