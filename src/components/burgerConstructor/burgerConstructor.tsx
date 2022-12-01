import { FC } from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import { useHistory } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorElements from './constructorElements/constructorElements'
import styles from './burgerConstructor.module.css';
import { IIngredient } from '../../utils/types'
import { ADD_INGREDIENT, SET_ORDER_ID_LIST } from '../../services/constants';
import { getOrder } from "../../services/actions/actions";
import Preloader from '../preloader/preloader';



const BurgerConstructor: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { order, orderIngredientsId, orderIngredientsIdRequest } = useSelector(store => store.orderReducer);
    const { isAuth } = useSelector(store => store.userReducer);


    const bun = order.bun;
    const main = order.main;
    const price = useSelector((store) => store.orderReducer.price);

    const handleOrderButton = () => {
        isAuth && dispatch(getOrder(orderIngredientsId));
        !isAuth &&
            history.replace({
                pathname: "/login",
                state: {
                    from: {
                        pathname: "/",
                    },
                },
            });
    };

    const [{ isHover }, dropTarget] = useDrop({
        accept: "ingredient",
        drop({ ingredient }: { ingredient: IIngredient }) {
            dispatch({
                type: ADD_INGREDIENT,
                ingredient: {
                    ...ingredient,
                    uuid: uuidv4(),
                },
            });
            dispatch({
                type: SET_ORDER_ID_LIST,
            });
        },
        collect: (monitor) => ({
            isHover: monitor.isOver(),
        }),
    });

    return (
        <section className={`${styles.section} pt-15 pl-4`}>
            <div className={`${styles.ingredient} ${isHover && styles.list_type_isHover}`} ref={dropTarget}>
                {bun && (
                    <div className={`ml-8`}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (верх)`}
                            price={bun.price}
                            thumbnail={bun.image_mobile}
                        />
                    </div>
                )}
                {main && (
                    <ul className={`${styles.items}`}>
                        {main.map((item, index) => (
                            <ConstructorElements key={item.uuid} item={item} index={index} />
                        ))}
                    </ul>
                )}
                {bun && (
                    <div className={`ml-8 mt-2`}>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${bun.name} (низ)`}
                            price={bun.price}
                            thumbnail={bun.image_mobile}
                        />
                    </div>
                )}
            </div>
            <div className={`${styles.submit} pt-10 pr-4`}>
                <div className={`${styles.price} mr-10`}>
                    <p className={`text text_type_digits-medium pr-1`}>{price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                {
                    orderIngredientsIdRequest !== "pending" && (
                        <Button
                            htmlType="submit"
                            type="primary"
                            size="medium"
                            onClick={handleOrderButton}
                            disabled={!bun || !main.length}
                        >Оформить заказ
                        </Button>
                    )
                }
                {
                    orderIngredientsIdRequest === "pending" && <Preloader />
                }
            </div>
        </section >
    );
}

export default BurgerConstructor