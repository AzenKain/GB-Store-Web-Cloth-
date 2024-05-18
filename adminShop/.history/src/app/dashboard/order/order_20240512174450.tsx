
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import InvoiceCard from "@/components/Invoices/InvoiceBox";
import OrderBox from "@/components/Orders/OrderBox";

const OrderPage = () => {
  return (
    <DefaultLayout>
      <OrderBox />
    </DefaultLayout>
  );
};

export default OrderPage;
