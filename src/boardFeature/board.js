import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Add from "../images/add-file.png";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { createBoard, deleteBoard, moveItem } from "./boardSlice";
import CreationModal from "../creationModal";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import List from "./list";
const mapDispatch = { createBoard, deleteBoard, moveItem };

const mapState = (state) => {
  return {
    boardState: state.Board,
  };
};
const pButton = {
  background: "#9e579d",
};

function Board({ boardState, createBoard, deleteBoard, moveItem }) {
  const [currentBoard, setBoard] = useState("Default");
  const [BoardDialogue, setBoardDialogue] = useState(false);
  const [listDialogue, setListDialogue] = useState(false);
  const [more, showMore] = useState(false);

  const moreVis = React.createContext(more);
  const temp = {
    background: "pink",
    height: "200px",
    width: "200px",
  };
  const rColor = {
    background: "#086972",
  };
  useEffect(() => {});

  function changeList(item) {
    moveItem(item);
  }
  return (
    <div>
      <h1>{currentBoard}</h1>
      <IconButton aria-label="delete" onClick={() => deleteBoard(currentBoard)}>
        <DeleteIcon />
      </IconButton>
      <Button onClick={() => setBoardDialogue(true)}>
        <img src={Add} alt="Create New Board" height="50px" />
      </Button>
      <CreationModal
        open={BoardDialogue}
        close={() => setBoardDialogue(false)}
        modalTitle={"Create Board"}
        create={(title) => createBoard(title)}
        check={(title) => {
          if (boardState.some((board) => board.boardTitle === title)) {
            console.log("Already exist");
          }
        }}
      />
      <DragDropContext onDragEnd={(val) => changeList(val)}>
        <Grid container spacing={1}>
          {boardState
            .find((board) => board.boardTitle === currentBoard)
            .boardList.map((list, i) => (
              <Droppable droppableId={list.listTitle} key={list.listTitle} >
                {(provided) => {
                  return (
                    <Grid container item md={3}>
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="listContainer"
                        style={rColor}
                      >
                        <List title={list.listTitle} items={list.list} />
                        {provided.placeholder}
                      </div>
                    </Grid>
                  );
                }}
              </Droppable>
            ))}
        </Grid>
      </DragDropContext>
    </div>
  );
}

export default connect(mapState, mapDispatch)(Board);
