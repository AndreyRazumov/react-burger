import { useRef, memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { ingredientDataTypes } from '../../../utils/types'
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import constructorElementsStyle from './constructorElements.module.css'

const ConstructorElements = memo(({ element, id, index, onDelete, onMove }) => {
    const { name, price, image } = element;

    const ref = useRef(null);

    const [{ isDragging }, dragRef] = useDrag({
        type: 'constructorElement',
        item: { id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [{ handlerId }, dropRef] = useDrop({
        accept: 'constructorElement',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        drop(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            onMove(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    dragRef(dropRef(ref));



    return (
        <li
            className={`${constructorElementsStyle.list} ${isDragging && constructorElementsStyle.isDragging} mr-2 mb-4`}
            ref={ref}
            data-handler-id={handlerId}
            draggable
        >
            <DragIcon type="primary" />
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
                handleClose={() => onDelete(element)}
            />
        </li>
    )
});


ConstructorElements.propTypes = {
    element: PropTypes.oneOfType([PropTypes.object, ingredientDataTypes]).isRequired,
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    onMove: PropTypes.func.isRequired,
};

export default ConstructorElements