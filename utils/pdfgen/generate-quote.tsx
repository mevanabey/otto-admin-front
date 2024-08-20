import React from 'react';
import { generate } from "@pdfme/generator";
import { schemaTemplate } from "./quote-schema";

const template = {
    basePdf: '/pdf-templates/quote.pdf',
    schemas: schemaTemplate,
  };

const inputs = [
  {
    "customer_name": " Type Something...",
    "customer_address": " Type Something...\njghvhxabxah\njababjdbajdabdj",
    "customer_phone": " Type Something...",
    "customer_email": " Type Something...",
    "quote_date": " Type Something...",
    "quote_number": " Type Something...",
    "quote_valid_date": " Type Something...",
    "quote_prepared_by": " Type Something...",
    "item1_qty": " Qty",
    "item1_description": " Description",
    "item1_unit_price": "Description",
    "item1_total": " Item Total",
    "quote_total": "Quote Total..",
    "item2_qty": " Qty",
    "item2_description": " Description",
    "item2_unit_price": "Description",
    "item2_total": " Item Total",
    "item3_qty": " Qty",
    "item3_description": " Description",
    "item3_unit_price": "Description",
    "item3_total": " Item Total",
    "item4_qty": " Qty",
    "item4_description": " Description",
    "item4_unit_price": "Description",
    "item4_total": " Item Total",
    "item5_qty": " Qty",
    "item5_description": " Description",
    "item5_unit_price": "Description",
    "item5_total": " Item Total",
    "item6_qty": " Qty",
    "item6_description": " Description",
    "item6_unit_price": "Description",
    "item6_total": " Item Total",
    "item7_qty": " Qty",
    "item7_description": " Description",
    "item7_unit_price": "Description",
    "item7_total": " Item Total",
    "item8_qty": " Qty",
    "item8_description": " Description",
    "item8_unit_price": "Description",
    "item8_total": " Item Total",
    "item9_qty": " Qty",
    "item9_description": " Description",
    "item9_unit_price": "Description",
    "item9_total": " Item Total"
  }
];


function QuoteGenerator() {
  const generateQuote = () => {
    generate({ template, inputs }).then((pdf) => {
      const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
      window.open(URL.createObjectURL(blob));
    });
  };
  
  return (
      <div>
        <button onClick={generateQuote}>Generate Quote</button>
      </div>
  );
};
  
export default QuoteGenerator;