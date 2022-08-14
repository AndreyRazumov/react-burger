import orderDetailStyles from './orderDetails.module.css';

const OrderDetails = () => {
  return (
    <div className={orderDetailStyles.container}>
      <p className={`${orderDetailStyles.number} text text_type_digits-large pt-5 mb-8`}>034536</p>
      <p className={`${orderDetailStyles.main_text} text text_type_main-medium mb-15`}>идентификатор заказа</p>
      <div className={`${orderDetailStyles.decorate} mb-15`}>
      </div>
      <p className={`${orderDetailStyles.main_text} text text_type_main-small mb-2`}>Ваш заказ начали готовить</p>
      <p className={`${orderDetailStyles.sub_text} text text_type_main-small mb-15`}>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}

export default OrderDetails;