import styles from './orderDetails.module.css';
import { FC } from "react";

const OrderDetails: FC<{ orderNumber: number }> = ({ orderNumber }) => {

  return (
    <div className={`pl-20 pr-20 pt-10 pb-4 ml-5 mr-5`}>
      <p className={styles.number}>{orderNumber}</p>
      <p className={`${styles.main_text} text text_type_main-medium mb-15`}>идентификатор заказа</p>
      <div className={styles.decorate}>
      </div>
      <p className={`${styles.main_text} text text_type_main-default mb-2`}>Ваш заказ начали готовить</p>
      <p className={`${styles.sub_text} text text_type_main-default mb-15`}>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}

export default OrderDetails;