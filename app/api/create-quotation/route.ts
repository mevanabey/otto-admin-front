import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
// @ts-ignore
import pdfMake from 'pdfmake/build/pdfmake'
// @ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts'

import { pdfQuotationTemplate } from '@/utils/pdfgen/quotation-template'
import { generateQuoteNumber } from '@/lib/utils'

pdfMake.vfs = pdfFonts.pdfMake.vfs

export async function POST(req: Request): Promise<Response> {
  const supabase = createClient();
  const order = await req.json();
  const quoteNo = generateQuoteNumber(order.id);

  const template = pdfQuotationTemplate(order, quoteNo);

  const pdfDocGenerator = pdfMake.createPdf(template);

  return new Promise((resolve, reject) => { // Add reject to handle errors
    pdfDocGenerator.getBuffer(async (buffer: Buffer) => {
      try {
        const filename = `quote_${Date.now()}.pdf`;

        const { data, error } = await supabase
          .storage
          .from('documents')
          .upload(`quotes/${filename}`, buffer, {
            contentType: 'application/pdf',
          });

        if (error) {
          console.error('Error uploading to Supabase:', error);
          reject(NextResponse.json({ error: 'Failed to upload PDF' }, { status: 500 })); // Use reject for error handling
        } else {
          resolve(NextResponse.json({ message: 'PDF generated and uploaded successfully', path: data.path, docid: quoteNo }, { status: 200 }));
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        reject(NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 })); // Use reject for error handling
      }
    });
  });
}