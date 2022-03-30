VERSION 1.0 CLASS
BEGIN
  MultiUse = -1  'True
END
Attribute VB_Name = "Class1"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = False
Attribute VB_Exposed = False
Public Event Calc(B, D, O, H)


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

Public Sub Calculate(str, base)
    Dim inputString() As String
    Dim BinaryOutStr, DecimalOutStr, OctalOutStr, HexOutStr As String

    inputString = Split(str, " ")
    BinaryOutStr = ""
    DecimalOutStr = ""
    OctalOutStr = ""
    HexOutStr = ""
    
    For k = LBound(inputString) To UBound(inputString)
        inputString(k) = ToDecimal(inputString(k), base)
    Next k
    
    
    For i = 0 To UBound(inputString)
        BinaryOutStr = BinaryOutStr & " " & Convert(inputString(i), 2)
        DecimalOutStr = DecimalOutStr & " " & inputString(i)
        OctalOutStr = OctalOutStr & " " & Convert(inputString(i), 8)
        HexOutStr = HexOutStr & " " & Convert(inputString(i), 16)
    Next i
    
    RaiseEvent Calc(BinaryOutStr, DecimalOutStr, OctalOutStr, HexOutStr)
End Sub


