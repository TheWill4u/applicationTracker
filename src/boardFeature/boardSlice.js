import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const boardSlice = createSlice({
  name: "Board",
  initialState: [
    {
      boardTitle: "Default",
      id: uuidv4(),
      boardList: [
        {
          listTitle: "Generic Placeholder",
          list: [
            { title: "I like to draw", id: uuidv4() },
            { title: "Crocodiles wll mess you up", id: uuidv4() },
            { title: "It aint easy being cheesy", id: uuidv4() },
          ],
        },
        {
          listTitle: "Generic Things",
          list: [
            { title: "I like coffee", id: uuidv4() },
            { title: "Interior crocodile alligator", id: uuidv4() },
            { title: "boom stick", id: uuidv4() },
          ],
        },
      ],
    },
    {
      boardTitle: "Anonymous",
      id: uuidv4(),
      boardList: [
        {
          listTitle: "Generic Placeholder",
          list: [
            { title: "I like pancakes", id: uuidv4() },
            { tilte: "Crocodiles > Alligators", id: uuidv4() },
            { tilte: "Kraft > Velveta", id: uuidv4() },
          ],
        },
      ],
    },
  ],
  reducers: {
    createBoard: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (title) => {
        return { payload: { boardTitle: title, id: uuidv4(), boardList: [] } };
      },
    },
    fetchBoards(state, action) {
      /*Thunk*/
    },
    deleteBoard(state, action) {
      //Thunk
      return state.filter((board) => board.boardTitle === action.payload.title);
    },
    moveItem(state, action) {
      const { type, source, destination } = action.payload;
      return locateAndReplace(state, type, source, destination);
    },
  },
  deleteListItem(state, action){ //same data as the one below. improve
    const { type, source, destination } = action.payload;
    let boardIndex = state.findIndex(
      (board) => board.boardTitle.toUpperCase() === type
    );
    let listIndex = state[boardIndex].boardList.findIndex(
      (list) => list.listTitle === source.droppableId
    );
    console.log(`boardIndex: ${boardIndex}, listIndex: ${listIndex}`);
    let targetItem = source.index;
    let copy = state[boardIndex].boardList[listIndex].list[targetItem]; //copies from source
    let destinationList = state[boardIndex].boardList.findIndex(
      (list) => list.listTitle === destination.droppableId
    );
    /*console.log(
      `boardIndex: ${boardIndex}, listIndex: ${listIndex}, destinationList: ${destinationList}, copy: ${copy}`
    );*/
    state[boardIndex].boardList[listIndex].list.splice(targetItem, 1);
  }
});

const locateAndReplace = (state, type, source, destination) => {
  let boardIndex = state.findIndex(
    (board) => board.boardTitle.toUpperCase() === type
  );
  let listIndex = state[boardIndex].boardList.findIndex(
    (list) => list.listTitle === source.droppableId
  );
  console.log(`boardIndex: ${boardIndex}, listIndex: ${listIndex}`);
  let targetItem = source.index;
  let copy = state[boardIndex].boardList[listIndex].list[targetItem]; //copies from source
  let destinationList = state[boardIndex].boardList.findIndex(
    (list) => list.listTitle === destination.droppableId
  );
  /*console.log(
    `boardIndex: ${boardIndex}, listIndex: ${listIndex}, destinationList: ${destinationList}, copy: ${copy}`
  );*/
  state[boardIndex].boardList[listIndex].list.splice(targetItem, 1); //removes from source

  state[boardIndex].boardList[destinationList].list.splice(
    destination.index,
    0,
    copy
  ); //add to destination list
  //console.log(state[boardIndex].boardList[destinationList].list.length);
  return state;

  // );
};
export const { createBoard, moveItem, deleteBoard } = boardSlice.actions;
export default boardSlice.reducer;
