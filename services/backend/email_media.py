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

    pdf.add_page()


    pdf.set_font("Arial", size = 12)

    for x in content:
        pdf.cell(15, 10, txt = x, ln = 1, align = 'L')

    pdf_byte = pdf.output(name = name, dest="S")

    return pdf_byte

def split_string(string, num_of_chars):
    """
    Splits the string into substrings with length num_of_chars

    Precond string: is the string to be splitted
    Precond num_of_chars: is the number of chars for each split
    """
    num_of_dividers = len(string)// num_of_chars
    rem = len(string) % num_of_chars
    splits = []
    for i in range(num_of_dividers):
        splits.append(string[i*num_of_chars: (i + 1) *num_of_chars])
    if rem:
        splits.append(string[-rem:])
    return splits


