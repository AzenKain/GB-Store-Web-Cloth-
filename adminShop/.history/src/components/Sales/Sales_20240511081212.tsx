
const InvoiceCard = () => {
    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
      documentTitle: "Print This Document",
      onBeforePrint: () => console.log("before printing..."),
      onAfterPrint: () => console.log("after printing..."),
      removeAfterPrint: true,
    });

    return (
        <div className="flex flex-col gap-10"></div>