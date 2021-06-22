import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

/*
const fetchBoards = createAsyncThunk(  'Board',
async (userId, thunkAPI) => {
  let savedBoards = await JSON.parse(localStorage.getItem("boards"));
  if (savedBoards) {
    return { ...savedBoards };
  }
  return state;
  
})*/
const boardSlice = createSlice({
  name: "Board",
  initialState: {/*
    Defaults: {
      boardTitle: "Default",
      id: uuidv4(),
      boardList: {
        "Generic Placeholder": {
          title: "Generic Placeholder",
          id: uuidv4(),
          list: [
            { title: "I like to draw", id: uuidv4() },
            { title: "Crocodiles will mess you up", id: uuidv4() },
            { title: "It aint easy being cheesy", id: uuidv4() },
          ],
        },
        "Generic Things": {
          title: "Generic Things",
          id: uuidv4(),
          list: [
            { title: "I like coffee", id: uuidv4() },
            { title: "Interior crocodile alligator", id: uuidv4() },
            { title: "boom stick", id: uuidv4() },
          ],
        },
      },
    },
    Anonymous: {
      boardTitle: "Anonymous",
      id: uuidv4(),
      boardList: {
        "Generic Placeholder": {
          title: "Generic Placeholder",
          id: uuidv4(),
          list: [
            { title: "I like pancakes", id: uuidv4() },
            { title: "Crocodiles > Alligators", id: uuidv4() },
            { title: "Kraft > Velveta", id: uuidv4() },
          ],
        },
      },
    },*/
  },
  reducers: {
    createBoard: {
      reducer: (state, action) => {
        const { boardTitle } = action.payload;
        let createdBoard = {
          ...state,
          [boardTitle]: {
            boardTitle: boardTitle,
            id: uuidv4(),
            boardList: {},
          },
        };
        localStorage.setItem("boards", JSON.stringify(createdBoard));
        return createdBoard;
      },
      prepare: (boardTitle) => {
        return { payload: { boardTitle } };
      },
    },
    fetchBoards(state, action) {
      let savedBoards = JSON.parse(localStorage.getItem("boards"));
      if (savedBoards) {
        return { ...savedBoards };
      }
      return state;
    },
    deleteBoard: {
      reducer: (state, action) => {
        const { boardTitle } = action.payload;
        delete state[boardTitle];
        localStorage.setItem("boards", JSON.stringify(state));
        return state;
      },
      prepare: (boardTitle) => {
        return { payload: { boardTitle } };
      },
    },
    moveItem: {
      reducer: (state, action) => {
        let { board } = action.payload;
        let { destination, source, draggableId } = action.payload.val;

        if (destination === null) {
          return state;
        }

        if (source.droppableId !== destination.droppableId) {
          state[board].boardList[destination.droppableId].list.splice(
            destination.index,
            0,
            state[board].boardList[source.droppableId].list.filter(
              (item) => item.id === draggableId
            )[0]
          );
          state[board].boardList[source.droppableId].list.splice(
            source.index,
            1
          );
          localStorage.setItem("boards", JSON.stringify(state));
          return state;
        }

        if (source.droppableId === destination.droppableId) {
          let temp =
            state[board].boardList[source.droppableId].list[destination.index];

          state[board].boardList[source.droppableId].list[destination.index] =
            state[board].boardList[source.droppableId].list[source.index];
          state[board].boardList[source.droppableId].list[source.index] = temp;
          localStorage.setItem("boards", JSON.stringify(state));
          return state;
        }
      },
      prepare: (board, val) => {
        return { payload: { board, val } };
      },
    },

    createNewList: {
      reducer: (state, action) => {
        let { board, title } = action.payload;
        state[board].boardList[title] = {
          title,
          id: uuidv4(),
          list: [],
        };
        localStorage.setItem("boards", JSON.stringify(state));
        return state;
      },
      prepare: (board, title) => {
        return { payload: { title, board } };
      },
    },
    deleteList: {
      reducer: (state, action) => {
        let { title, board } = action.payload;
        delete state[board].boardList[title];
        localStorage.setItem("boards", JSON.stringify(state));
        return state;
      },
      prepare: (board, title) => {
        return { payload: { board, title } };
      },
    },
    deleteListItem: {
      reducer: (state, action) => {
        let { board, title, index } = action.payload;
        state[board].boardList[title].list.splice(index, 1);
        localStorage.setItem("boards", JSON.stringify(state));
        return state;
      },
      prepare: (board, title, index) => {
        return { payload: { board, title, index } };
      },
    },
    editBoard: {
      reducer: (state, action) => {
        return state;
      },
      prepare: () => {
        return { payload: {} };
      },
    },
    editItem: {
      reducer: (state, action) => {
        return state;
      },
      prepare: () => {
        return { payload: {} };
      },
    },
    addNewListItem: {
      reducer: (state, action) => {
        let { board, lists, title } = action.payload;
        state[board].boardList[lists].list.push({ title, id: uuidv4() });
        localStorage.setItem("boards", JSON.stringify(state));
        return state;
      },
      prepare: (board, lists, title) => {
        return { payload: { board, lists, title } };
      },
    },
  },
});

export const {
  createBoard,
  moveItem,
  deleteBoard,
  createNewList,
  deleteList,
  addNewListItem,
  deleteListItem,
  fetchBoards,
} = boardSlice.actions;
export default boardSlice.reducer;
