import { useRef, memo, FC } from 'react';
import { useDispatch } from '../../../services/hooks'
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier } from "dnd-core";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  DELETE_INGREDIENT,
  SORT_ORDER,
  SET_ORDER_ID_LIST
} from '../../../services/constants';
import style from './constructorElements.module.css'
import { IIngredient } from '../../../utils/types'

interface IConstructorElements {
  item: IIngredient;
  index: number;
};


const ConstructorElements: FC<IConstructorElements> = ({ item, index }) => {
  const { name, price, image } = item;
  const dispatch = useDispatch();
  const elementRef = useRef(null);

  const [{ isDrag }, dragRef] = useDrag({
    type: "constructorElement",
    item: { index },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
    end: () => {
      dispatch({
        type: SET_ORDER_ID_LIST,
      });
    },
  });

  const [{ handlerId }, dropRef] = useDrop<
    { index: number },
    void,
    { handlerId: Identifier | null }
  >({
    accept: "constructorElement",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item) {
      if (!elementRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      dispatch({
        type: SORT_ORDER,
        hoverIndex,
        dragIndex,
      });
    },
  });
  dragRef(dropRef(elementRef));

  return isDrag ? (
    <div style={{ height: "80px" }} />
  ) : (
    <li
      className={`${style.list} mr-2 mb-4`}
      ref={elementRef}
      data-handler-id={handlerId}
    draggable
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() =>
          dispatch({
            type: DELETE_INGREDIENT,
            index,
          })
        }
      />
    </li>
  )
};




export default ConstructorElements