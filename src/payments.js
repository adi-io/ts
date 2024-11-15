import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactHover, { Trigger, Hover } from "react-hover";

const hoverOptions = {
  followCursor: false,
  shiftX: 20,
  shiftY: 0,
};

const HoverContent = ({ imageUrl }) => (
  <div
    className="hover-content"
    style={{
      backgroundColor: "white",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
    }}
  >
    <img
      src={imageUrl}
      alt="Document preview"
      style={{ width: "600px", height: "auto" }}
    />
  </div>
);

export function PaymentsDashboard() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const userResponse = await axios.get("http://app.swayhire.com:4242/get_user");
        const user_id = userResponse.data.user_id;
        console.log(user_id);
        const response = await axios.get("http://app.swayhire.com:4242/bills");
        setDocuments(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch payments data");
        setDocuments([
          {
            document_name: "Dummy Invoice #1",
            beneficiary_name: "Sample Beneficiary 1",
            account_number: "123456789",
            bank_code: "000",
            currency_code: "USD",
            tax_inclusive_amount: "100.00",
            prepayment: "20.00",
            due_date: "2023-12-31",
            payment_state: "Pending",
            image: "https://via.placeholder.com/50",
            preview_image_url: "https://via.placeholder.com/200x150?text=Invoice+1",
            payment_link: "#",
          },
          {
            document_name: "Dummy Invoice #2",
            beneficiary_name: "Sample Beneficiary 2",
            account_number: "987654321",
            bank_code: "111",
            currency_code: "USD",
            tax_inclusive_amount: "200.00",
            prepayment: "50.00",
            due_date: "2023-12-15",
            payment_state: "Paid",
            image: "https://via.placeholder.com/50",
            preview_image_url: "https://via.placeholder.com/200x150?text=Invoice+2",
            payment_link: "#",
          },
        ]);
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Invoice</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Bank Details</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Pre-paid</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Due Amount</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Due Date</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Payments</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {documents.map((doc) => (
                  <tr key={doc.document_name}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="h-11 w-11 flex-shrink-0">
                          <img
                            src={doc.image}
                            alt=""
                            className="h-11 w-11 rounded-full"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {doc.beneficiary_name}
                          </div>
                          <ReactHover options={hoverOptions}>
                            <Trigger type="trigger">
                              <div className="mt-1 text-gray-500">
                                {doc.document_name}
                              </div>
                            </Trigger>
                            <Hover type="hover">
                              <HoverContent
                                imageUrl={
                                  doc.preview_image_url ||
                                  `https://via.placeholder.com/200x150?text=${doc.document_name}`
                                }
                              />
                            </Hover>
                          </ReactHover>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 w-1/8">
                      <div className="text-gray-900">{doc.account_number}</div>
                      <div className="mt-1 text-gray-500">{doc.bank_code}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {doc.currency_code} {doc.tax_inclusive_amount}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {doc.prepayment}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {doc.currency_code} {doc.tax_inclusive_amount}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {doc.due_date}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
                        {doc.payment_state}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm font-medium text-center">
                      <a
                        href={doc.payment_link}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Pay
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
