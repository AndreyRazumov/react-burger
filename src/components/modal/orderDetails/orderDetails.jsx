import orderDetailStyles from './orderDetails.module.css';

const OrderDetails = ({orderNumber}) => {
  return (
    <div className={`pl-20 pr-20 pt-10 pb-4 ml-5 mr-5`}>
      <p className={`${orderDetailStyles.number} text text_type_digits-large mt-5 mb-8`}>{orderNumber}</p>
      <p className={`${orderDetailStyles.main_text} text text_type_main-medium mb-15`}>идентификатор заказа</p>
      <div className={`${orderDetailStyles.decorate} mb-15 pt-5`}>
      </div>
      <p className={`${orderDetailStyles.main_text} text text_type_main-default mb-2`}>Ваш заказ начали готовить</p>
      <p className={`${orderDetailStyles.sub_text} text text_type_main-default mb-15`}>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}

export default OrderDetails;