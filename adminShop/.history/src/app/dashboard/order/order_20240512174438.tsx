
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import InvoiceCard from "@/components/Invoices/InvoiceBox";

const InvoicePage = () => {
  return (
    <DefaultLayout>
      <InvoiceCard />
    </DefaultLayout>
  );
};

export default InvoicePage;
