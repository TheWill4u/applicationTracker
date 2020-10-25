import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import { Draggable } from "react-beautiful-dnd";
function List({ title, items, more }) {
  const cardAdj = {
    marginBottom: "10px",
  };
  return (
    <>
      <h3>{title}</h3>
      <Button>add</Button>
      {items.map((item, index) => (
        <Draggable draggableId={item.id} index={index} key={item.id}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Card style={cardAdj}>
                <CardContent>
                  <h3>{item.title}</h3>
                  <CardActions>
                    <Button onClick={() => more()}>more</Button>
                    <IconButton aria-label="delete">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </CardActions>
                </CardContent>
              </Card>
            </div>
          )}
        </Draggable>
      ))}
    </>
  );
}

export default List;

/*{items.map((item) => (
        <div key={item.title}>{item.title}</div>
      ))}
*/
