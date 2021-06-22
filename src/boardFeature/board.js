import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import DeletionModal from "../deletionModal";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Fab from "@material-ui/core/Fab";
import CardActions from "@material-ui/core/CardActions";
import Box from "@material-ui/core/Box";

import {
  createBoard,
  addNewListItem,
  deleteList,
  createNewList,
  deleteBoard,
  moveItem,
  fetchBoards,
  deleteListItem,
} from "./boardSlice";
import CreationModal from "../creationModal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core/styles";

const mapDispatch = {
  createBoard,
  createNewList,
  deleteList,
  deleteBoard,
  moveItem,
  addNewListItem,
  fetchBoards,
  deleteListItem,
};

const mapState = (state) => {
  return {
    boardState: state.Board,
  };
};

const noData = "No Boards to Display";
function Board({
  boardState,
  createBoard,
  deleteBoard,
  moveItem,
  fetchBoards,
  createNewList,
  deleteList,
  addNewListItem,
  deleteListItem,
}) {
  const [currentBoard, setBoard] = useState(
    Object.keys(boardState)[0] || noData
  );
  const [boardSelection, setBoardSelection] = useState(Object.keys(boardState));
  const [boardDialog, setBoardDialog] = useState(false);
  const [listDialog, setListDialog] = useState(false);
  const [showListI, setListI] = useState(false);
  const [menu, showMenu] = useState(false);
  const [showBoardDeletion, setShowBoardDeletion] = useState(false);
  const [activeList, setActiveList] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const useStyles = makeStyles({
    root: {
      marginBottom: "15px",
      backgroundColor: "#fdfdfd",
    },
    h2: {
      color: "#9e579d",
    },
    itemDiv: {
      backgroundColor: "#ffcef3",
      padding: "10px",
    },
    item: {},
  });
  const classes = useStyles();
  useEffect(() => fetchBoards(), []);
  useEffect(() => {
    let boards = Object.keys(boardState);
    setBoardSelection(boards);
    if (boards.length === 0) {
      setBoard("No Boards to Display");
    }
    if (boards.length > 0) {
      if (currentBoard === noData) {
        setBoard(boards[0]);
      }
    }
  }, [boardState, currentBoard]);

  function boardMenuClose() {
    showMenu(false);
    setAnchorEl(null);
  }

  function boardListStructure(currentBoard) {
    if (boardState[currentBoard]) {
      if (Object.keys(boardState[currentBoard].boardList).length === 0) {
        return <div>No Lists to Display</div>;
      }
    }
    if (currentBoard === noData) {
      return <div>No Lists to Display</div>;
    } else
      return (
        <Grid
          container
          spacing={1}
          direction="row"
          justify="center"
          alignContent="center"
        >
          {Object.keys(boardState)[0] ? (
            <DragDropContext onDragEnd={(val) => moveItem(currentBoard, val)}>
              {Object.keys(boardState[currentBoard].boardList).map(
                (lists, index) => {
                  return (
                    <Droppable
                      className={classes.item}
                      key={index}
                      droppableId={
                        boardState[currentBoard].boardList[lists].title
                      }
                    >
                      {(provided) => {
                        return (
                          <Grid item xs={9} sm={9} md={4} lg={2}>
                            <Box
                              className={classes.itemDiv}
                              key={lists.id}
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >
                              <h2 className={classes.h2}>{lists}</h2>
                              <IconButton
                                onClick={() => deleteList(currentBoard, lists)}
                              >
                                <DeleteIcon />
                              </IconButton>

                              <Fab
                                size="small"
                                aria-label="add"
                                onClick={() => {
                                  setListI(true);
                                  setActiveList(lists);
                                }}
                              >
                                <AddIcon style={{ color: "#9e579d" }} />
                              </Fab>
                              {showListI ? (
                                <CreationModal
                                  open={showListI}
                                  close={() => setListI(false)}
                                  modalTitle={`Add new item`}
                                  create={(title) => {
                                    addNewListItem(
                                      currentBoard,
                                      activeList,
                                      title
                                    );
                                  }}
                                  check={(title) => {
                                    if (
                                      boardState[currentBoard].boardList[
                                        lists
                                      ].list.filter(
                                        (list) => list.title === title
                                      ).length === 0
                                    ) {
                                      return false;
                                    }
                                    return true;
                                  }}
                                />
                              ) : null}

                              {boardState[currentBoard].boardList[
                                lists
                              ].list.map((listItem, index) => (
                                <Draggable
                                  key={listItem.id}
                                  index={index}
                                  draggableId={listItem.id}
                                >
                                  {(provided) => (
                                    <Box
                                      key={listItem.id}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <Card className={classes.root}>
                                        <CardContent
                                          style={{
                                            paddingBottom: 0,
                                            paddingTop: "40px",
                                          }}
                                        >
                                          {listItem.title}
                                        </CardContent>
                                        <CardActions>
                                          <IconButton
                                            style={{ padding: 0 }}
                                            onClick={() =>
                                              deleteListItem(
                                                currentBoard,
                                                lists,
                                                index
                                              )
                                            }
                                          >
                                            <DeleteIcon />
                                          </IconButton>
                                        </CardActions>
                                      </Card>
                                    </Box>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </Box>
                          </Grid>
                        );
                      }}
                    </Droppable>
                  );
                }
              )}
            </DragDropContext>
          ) : null}
        </Grid>
      );
    //}
  }

  function boardDeletion() {
    setShowBoardDeletion(false);
    let tempBoards = boardSelection.filter((board) => board !== currentBoard);
    setBoard(tempBoards[0]);
    deleteBoard(currentBoard);
    if (tempBoards.length === 0) {
      setBoard(noData);
    }
    return;
  }

  return (
    <Box className={classes.item}>
      <Button
        variant="contained"
        style={{ color: "#9e579d", background: "#fcefee", marginRight: "15px" }}
        onClick={(e) => {
          showMenu(true);
          setAnchorEl(e.currentTarget);
        }}
      >
        {currentBoard}
      </Button>
      <Fab size="small" color="secondary" aria-label="add">
        <AddIcon onClick={() => setBoardDialog(true)} />
      </Fab>
      {boardSelection.length > 1 ? (
        <Menu
          id="board-Menu"
          anchorEl={anchorEl}
          keepMounted
          open={menu}
          onClose={boardMenuClose}
        >
          {boardSelection
            ? boardSelection.map((item) => (
                <MenuItem
                  key={item}
                  onClick={() => {
                    setBoard(item);

                    boardMenuClose();
                  }}
                >
                  {item}
                </MenuItem>
              ))
            : null}
        </Menu>
      ) : null}
      {currentBoard === noData ? null : (
        <IconButton onClick={() => setShowBoardDeletion(true)}>
          <DeleteIcon>Delete</DeleteIcon>
        </IconButton>
      )}
      {listDialog ? (
        <CreationModal
          open={listDialog}
          close={() => setListDialog(false)}
          modalTitle={"Create New List"}
          create={(listTitle) => createNewList(currentBoard, listTitle)}
          check={(listTitle) => {
            if (boardState[currentBoard].boardList[listTitle]) {
              setListDialog(false);
              return true;
            }
            return false;
          }}
        />
      ) : null}
      {boardDialog ? (
        <CreationModal
          open={boardDialog}
          close={() => setBoardDialog(false)}
          modalTitle={"Create New Board"}
          create={(title) => {
            createBoard(title);
            setBoard(title);
          }}
          check={(title) => {
            if (boardState[title]) {
              setBoardDialog(false);
              return true;
            }
            return false;
          }}
        />
      ) : null}
      {showBoardDeletion ? (
        <DeletionModal
          close={() => setShowBoardDeletion(false)}
          open={showBoardDeletion}
          deleteBoard={boardDeletion}
          modalTitle={currentBoard}
        />
      ) : null}
      {currentBoard !== noData ? (
        <Button
          variant="contained"
          style={{ backgroundColor: "#f4fa9c", color: "#f469a9" }}
          onClick={() => setListDialog(true)}
        >
          {" "}
          Create List
        </Button>
      ) : null}
      {boardListStructure(currentBoard)}
    </Box>
  );
}

export default connect(mapState, mapDispatch)(Board);
