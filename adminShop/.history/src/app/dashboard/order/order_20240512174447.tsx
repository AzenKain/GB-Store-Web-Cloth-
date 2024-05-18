
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import InvoiceCard from "@/components/Invoices/InvoiceBox";

const OrderPage = () => {
  return (
    <DefaultLayout>
      <OrderBox />
    </DefaultLayout>
  );
};

export default OrderPage;
