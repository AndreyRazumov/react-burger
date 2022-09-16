import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorElements from './constructorElements/constructorElements'
import burgerConstructorStyles from './burgerConstructor.module.css';

const BurgerConstructor = ({ openOrderModal, onDrop, onMove, onDelete }) => {
    const currentBurger = useSelector((store) => store.currentBurgerReducer.currentBurger);
    const orderRequest = useSelector((store) => store.orderReducer.orderRequest);
    const selectedBun = currentBurger && currentBurger.find((item) => item.type === 'bun');

    const price = useMemo(() => {
        return (currentBurger.length
            ? currentBurger.reduce((prev, cur) => (cur.type !== 'bun' ? prev + cur.price : prev + cur.price * 2), 0)
            : 0
        );
    }, [currentBurger]);

    const handleOrder = () => {
        openOrderModal(currentBurger);
    };

    const [{ isHover }, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item) {
            onDrop(item);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });
    const borderColor = isHover ? '#8585ad' : 'transparent';

    const constructorElement = useMemo(
        () => currentBurger
            .filter((item) => item.type !== 'bun')
            .map((element, index) => (
                <ConstructorElements
                    element={element}
                    id={element._id}
                    key={element._id}
                    index={index}
                    onDelete={onDelete}
                    onMove={onMove}
                    selectedBun={selectedBun}
                />
            )),
        [currentBurger],
    );    

    return (
        <section className={`${burgerConstructorStyles.section} pt-15 pl-4`}>
            <div className={`${burgerConstructorStyles.ingredient}`} style={{ borderColor }} ref={dropTarget}>
                {selectedBun && (
                    <div className={`ml-8`} key="top">
                        <ConstructorElement
                            type="top"
                            isLocked
                            text={`${selectedBun.name} (верх)`}
                            price={selectedBun.price}
                            thumbnail={selectedBun.image_mobile}
                        />
                    </div>
                )}
                <ul className={`${burgerConstructorStyles.items}`} key="middle">
                    {constructorElement}
                </ul>
                {selectedBun && (
                    <div className={`ml-8 mt-2`} key="bottom">
                        <ConstructorElement
                            type="bottom"
                            isLocked
                            text={`${selectedBun.name} (низ)`}
                            price={selectedBun.price}
                            thumbnail={selectedBun.image_mobile}
                        />
                    </div>
                )}
            </div>
            <div className={`${burgerConstructorStyles.submit} pt-10 pr-4`}>
                <div className={`${burgerConstructorStyles.price} mr-10`}>
                    <p className={`text text_type_digits-medium pr-1`}>{price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large" onClick={handleOrder} disabled={!currentBurger.length || orderRequest || !selectedBun}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    openOrderModal: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    onMove: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default BurgerConstructor