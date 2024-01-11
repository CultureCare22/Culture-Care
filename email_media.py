# Python program to convert
# text file to pdf file

from pprint import pprint
from fpdf import FPDF


# save FPDF() class into 
# a variable pdf

def create_pdf(content, name):
    """
    Returns a bytestring form of a pdf file

    Precond content: is list of strings, each string with length at most 100 characters
    Precond name: is the name of the pdf
    """
    pdf = FPDF() 

    # Add a page
    pdf.add_page()

    # set style and size of font 
    # that you want in the pdf
    pdf.set_font("Arial", size = 12)

    # insert the texts in pdf
    for x in content:
        pdf.cell(15, 10, txt = x, ln = 1, align = 'L')

    # save the pdf with name .pdf

    pdf_byte = pdf.output(name = name, dest="S")

    return pdf_byte

def split_string(string, num_of_chars):
    num_of_dividers = len(string)// num_of_chars
    rem = len(string) % num_of_chars
    splits = []
    for i in range(num_of_dividers):
        splits.append(string[i*num_of_chars: (i + 1) *num_of_chars])
    if rem:
        splits.append(string[-rem:])
    return splits


