

export const getRoomData = (roomId,rooms) => {
    const roomData = rooms.filter(room => room.id===roomId)[0];
    return roomData; 
  }

  export const getInventory = (objects) => {
    const inventory = objects.filter(object => object.loc==='INV').map(object => object.obj);
    return inventory;
  }

