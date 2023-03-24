import { Box, ListItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import boardApi from "../../api/boardApi";
import { setFavouriteList } from "../../features/board/favouriteSlice";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const FavouriteBoardsList = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onDragEnd = () => {};

  const dispatch = useDispatch();
  const list = useSelector((state) => state.favourites.value);
  const { boardId } = useParams();

  useEffect(() => {
    const getBoards = async () => {
      try {
        const res = await boardApi.getFavouriteBoards();
        dispatch(setFavouriteList(res));
      } catch (err) {
        toast.error(err.message);
      }
    };
    getBoards();
  }, []);

  return (
    <>
      <ListItem>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body" fontWeight="700">
            Favourites
          </Typography>
        </Box>
      </ListItem>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          key={"list-board-droppable"}
          droppableId={"list-board-droppable"}
        >
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {boards.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <ListItemButton
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      selected={index === activeIndex}
                      component={Link}
                      to={`/boards/${item.id}`}
                      sx={{
                        pl: "20px",
                        cursor: snapshot.isDragging
                          ? "grab"
                          : "pointer!important",
                      }}
                    >
                      <Typography
                        fontWeight="700"
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        variant="body2"
                      >
                        {item?.icon} {item?.title}
                      </Typography>
                    </ListItemButton>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default FavouriteBoardsList;
