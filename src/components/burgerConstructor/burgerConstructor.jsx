import { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { v4 as uuidv4 } from 'uuid';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorElements from './constructorElements/constructorElements'
import styles from './burgerConstructor.module.css';
import {
    ADD_INGREDIENT,
    MOVE_CONSTRUCTOR_ELEMENT,
    DELETE_INGREDIENT
} from '../../services/actions/actions';

const BurgerConstructor = ({ openOrderModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentBurger = useSelector(store => store.currentBurgerReducer.currentBurger);
    const orderRequest = useSelector(store => store.orderReducer.orderRequest);
    const { isAuth } = useSelector(store => store.userReducer.data);
    const selectedBun = currentBurger && currentBurger.find(item => item.type === 'bun');

    const price = useMemo(() => {
        return (currentBurger.length
            ? currentBurger.reduce((prev, cur) => (cur.type !== 'bun' ? prev + cur.price : prev + cur.price * 2), 0)
            : 0
        );
    }, [currentBurger]);

    const handleDrop = (item) => {
        if (item.type === 'bun') {
            const bun = currentBurger.find(element => element.type === 'bun');
            const index = currentBurger.indexOf(bun);
            if (index !== -1) {
                dispatch({ type: DELETE_INGREDIENT, index });
            }
        }
        dispatch({
            type: ADD_INGREDIENT, item: {
                ...item,
                uuid: uuidv4()
            }
        });
    };
    const handleOrder = () => {
        if (isAuth) {
            openOrderModal(currentBurger);
        } else {
            history.replace({
                pathname: '/login',
                state: {
                    from: {
                        pathname: '/'
                    }
                }
            });
        }
    };

    const currentBurgerIngredients = [...currentBurger].filter((item) => item.type !== 'bun');

    const handleMove = useCallback((dragIndex, hoverIndex) => {
        const bun = [...currentBurger].find(item => item.type === 'bun');
        const dragElement = currentBurgerIngredients[dragIndex];
        const payload = bun
            ? [bun, ...update(currentBurgerIngredients, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragElement],
                ],
            })]
            : update(currentBurgerIngredients, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragElement],
                ],
            });
        dispatch({ type: MOVE_CONSTRUCTOR_ELEMENT, payload });
    }, [currentBurgerIngredients]);

    const handleDeleteIngredient = (item) => {
        const index = currentBurger.indexOf(item);
        dispatch({ type: DELETE_INGREDIENT, index });
    };


    const [{ isHover }, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item) {
            handleDrop(item);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });
    const borderColor = isHover ? '#8585ad' : 'transparent';

    const constructorElement = useMemo(
        () => currentBurger
            .filter(item => item.type !== 'bun')
            .map((element, index) => (
                <ConstructorElements
                    element={element}
                    key={element.uuid}
                    index={index}
                    onMove={handleMove}
                    onDelete={handleDeleteIngredient}
                />
            )),
        [currentBurger],
    );

    return (
        <section className={`${styles.section} pt-15 pl-4`}>
            <div className={`${styles.ingredient}`} style={{ borderColor }} ref={dropTarget}>
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
                <ul className={`${styles.items}`} key="middle">
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
            <div className={`${styles.submit} pt-10 pr-4`}>
                <div className={`${styles.price} mr-10`}>
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
    openOrderModal: PropTypes.func.isRequired
};

export default BurgerConstructor