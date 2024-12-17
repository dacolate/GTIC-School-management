import { Button } from "@/components/ui/button"
import { Printer } from 'lucide-react'
import Link from "next/link";

// Mock data for invoices
const mockInvoices = [
  { id: 1, title: "Tuition Fee", description: "Monthly tuition fee for John Doe", datetime: "2023-06-15 14:30", user: "Jane Smith", amount: "50000 FCFA" },
  { id: 2, title: "Registration Fee", description: "Annual registration fee for Alice Johnson", datetime: "2023-06-14 10:15", user: "John Brown", amount: "20000 FCFA" },
  { id: 3, title: "Book Fee", description: "Textbook fee for Bob Williams", datetime: "2023-06-13 16:45", user: "Emily Davis", amount: "15000 FCFA" },
  { id: 4, title: "Lab Fee", description: "Science lab fee for Charlie Brown", datetime: "2023-06-12 11:30", user: "Michael Wilson", amount: "10000 FCFA" },
  { id: 5, title: "Sports Fee", description: "Annual sports fee for Diana Davis", datetime: "2023-06-11 09:00", user: "Sarah Taylor", amount: "25000 FCFA" },
  { id: 6, title: "Exam Fee", description: "Final exam fee for Eva Wilson", datetime: "2023-06-10 13:20", user: "David Moore", amount: "7500 FCFA" },
  { id: 7, title: "Library Fee", description: "Annual library fee for Frank Thomas", datetime: "2023-06-09 15:10", user: "Lisa Anderson", amount: "5000 FCFA" },
  { id: 8, title: "Technology Fee", description: "Computer lab fee for Grace Lee", datetime: "2023-06-08 10:45", user: "Robert Johnson", amount: "12500 FCFA" },
  { id: 9, title: "Field Trip Fee", description: "Museum visit fee for Henry Taylor", datetime: "2023-06-07 14:00", user: "Karen White", amount: "3000 FCFA" },
  { id: 10, title: "Graduation Fee", description: "Graduation ceremony fee for Ivy Clark", datetime: "2023-06-06 11:15", user: "Thomas Brown", amount: "15000 FCFA" },
]
export function InvoicesList() {
  const handlePrint = (invoice: typeof mockInvoices[0]) => {
    // Create a new window with the invoice details
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Invoice - ${invoice.title}</title>
            <style>
              body { font-family: Arial, sans-serif; }
              .invoice { border: 1px solid #ccc; padding: 20px; max-width: 600px; margin: 0 auto; }
              .header { text-align: center; margin-bottom: 20px; }
              .details { margin-bottom: 20px; }
              .amount { font-size: 1.2em; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="invoice">
              <div class="header">
                <h1>Invoice</h1>
              </div>
              <div class="details">
                <p><strong>Title:</strong> ${invoice.title}</p>
                <p><strong>Description:</strong> ${invoice.description}</p>
                <p><strong>Date:</strong> ${invoice.datetime}</p>
                <p><strong>Processed by:</strong> ${invoice.user}</p>
              </div>
              <div class="amount">
                <p>Total Amount: ${invoice.amount}</p>
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="space-y-4">
      {mockInvoices.map((invoice) => (
        <div key={invoice.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{invoice.title}</h3>
            <p className="text-sm text-gray-600">{invoice.description}</p>
            <div className="flex items-center mt-2 text-xs text-gray-500">
              <span>{invoice.datetime}</span>
              <span className="mx-2">•</span>
              <span>Accepted by: {invoice.user}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-semibold">{invoice.amount}</span>
            <Button variant="outline" size="sm" onClick={() => handlePrint(invoice)}>
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
      ))}
      <div className="flex justify-center mt-6">
        <Link href="/invoices" passHref>
          <Button variant="secondary">More Invoices</Button>
        </Link>
      </div>
    </div>
  )
}

