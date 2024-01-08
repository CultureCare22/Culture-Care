# Python program to convert
# text file to pdf file


from fpdf import FPDF
from io import BytesIO
import canvas


# save FPDF() class into 
# a variable pdf

def create_pdf(content, name):
    pdf = FPDF() 

    # Add a page
    pdf.add_page()

    # set style and size of font 
    # that you want in the pdf
    pdf.set_font("Arial", size = 15)

    # open the text file in read mode

    # insert the texts in pdf
    for x in content:
        pdf.cell(200, 10, txt = x, ln = 1, align = 'L')

    # save the pdf with name .pdf

    pdf_byte = pdf.output(name = name, dest="S")

    return pdf_byte



