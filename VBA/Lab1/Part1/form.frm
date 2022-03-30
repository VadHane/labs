VERSION 5.00
Begin {C62A69F0-16DC-11CE-9E98-00AA00574A4F} form 
   Caption         =   "UserForm1"
   ClientHeight    =   4065
   ClientLeft      =   120
   ClientTop       =   465
   ClientWidth     =   9660.001
   OleObjectBlob   =   "form.frx":0000
   StartUpPosition =   1  'CenterOwner
End
Attribute VB_Name = "form"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Dim choice As Integer
Dim inputString() As String
Dim BinaryOutStr, DecimalOutStr, OctalOutStr, HexOutStr As String
Dim i, k As Integer



Private Sub btnBinary_Click()
    choice = 2
End Sub

Private Sub btnDecimal_Click()
    choice = 10
End Sub

Private Sub btnHex_Click()
    choice = 16
End Sub

Private Sub btnOctal_Click()
    choice = 8
End Sub

Function ToDecimal(number, fromBase)
    Dim TmpStage, T, C
    SIM = Split("0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G", ",")
    TmpStage = 0
    
    For R = Len(number) To 1 Step -1
        T = Mid(number, R, 1)
            For C = 0 To 17
                If SIM(C) = T Then Exit For
            Next C
        TmpStage = TmpStage + C * fromBase ^ (Len(number) - R)
    Next R
    
    ToDecimal = TmpStage
    
End Function

Function Convert(number, base) As String
    Dim TmpStage, modNumber, copyNum
    SIM = Split("0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G", ",")
    copyNum = number
    Do While copyNum >= base
        TmpStage = copyNum \ base
        modNumber = copyNum Mod base
        Convert = SIM(modNumber) & Convert
        copyNum = TmpStage
    Loop
    
    Convert = SIM(copyNum) & Convert
End Function

Private Sub cmbCalc_Click()
    inputString = Split(form.tbInputForm.Text, " ")
    BinaryOutStr = ""
    DecimalOutStr = ""
    OctalOutStr = ""
    HexOutStr = ""
    
    For k = LBound(inputString) To UBound(inputString)
        inputString(k) = ToDecimal(inputString(k), choice)
    Next k
    
    
    For i = 0 To UBound(inputString)
        BinaryOutStr = BinaryOutStr & " " & Convert(inputString(i), 2)
        DecimalOutStr = DecimalOutStr & " " & inputString(i)
        OctalOutStr = OctalOutStr & " " & Convert(inputString(i), 8)
        HexOutStr = HexOutStr & " " & Convert(inputString(i), 16)
    Next i
    
    form.lBinary.Visible = True
    form.lBinary.Caption = "Binary: " & BinaryOutStr
    
    form.lOctal.Visible = True
    form.lOctal.Caption = "Octal: " & OctalOutStr
    
    form.lDecimal.Visible = True
    form.lDecimal.Caption = "Decimal: " & DecimalOutStr
    
    form.lHex.Visible = True
    form.lHex.Caption = "Hex: " & HexOutStr
    
End Sub


Private Sub tbInputForm_Change()
    form.lBinary.Visible = False
    form.lOctal.Visible = False
    form.lDecimal.Visible = False
    form.lHex.Visible = False
End Sub
