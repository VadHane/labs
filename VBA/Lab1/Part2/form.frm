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
Dim WithEvents logic As Class1
Attribute logic.VB_VarHelpID = -1
Dim lblB, lblD, lblO, lblH As MSForms.Label
Dim colect As New Collection
Dim wasUpd As Integer

Private Sub Labels_Init(B, D, O, H)
    Set lblB = form.Controls.Add("Forms.Label.1", "lblB", True)
    lblB.Top = 6
    lblB.Left = 30
    lblB.Width = 414
    lblB.Caption = "Binary: " + B
    Call colect.Add(lblB)
    
    Set lblD = form.Controls.Add("Forms.Label.1", "lblD", True)
    lblD.Top = 24
    lblD.Left = 30
    lblD.Width = 414
    lblD.Caption = "Decimal: " + D
    colect.Add lblD
    
    Set lblO = form.Controls.Add("Forms.Label.1", "lblO", True)
    lblO.Top = 42
    lblO.Left = 30
    lblO.Width = 414
    lblO.Caption = "Octal: " + O
    colect.Add lblO
    
    Set lblH = form.Controls.Add("Forms.Label.1", "lblH", True)
    lblH.Top = 60
    lblH.Left = 30
    lblH.Width = 414
    lblH.Caption = "Hexadecimal: " + H
    colect.Add lblH
End Sub

Private Sub Labels_Terminate()

    For Each Item In colect
        form.Controls.Remove (Item.Name)
    Next


    wasUpd = 0
End Sub

Private Sub btnBinary_Click()
    choice = 2
    If wasUpd = 1 Then
        Labels_Terminate
    End If
End Sub

Private Sub btnDecimal_Click()
    choice = 10
    If wasUpd = 1 Then
        Labels_Terminate
    End If
End Sub

Private Sub btnHex_Click()
    choice = 16
    If wasUpd = 1 Then
        Labels_Terminate
    End If
End Sub

Private Sub btnOctal_Click()
    choice = 8
    If wasUpd = 1 Then
        Labels_Terminate
    End If
End Sub

Private Sub cmbCalc_Click()
    
    Set logic = New Class1
    Call logic.Calculate(form.tbInputForm.Text, choice)
End Sub


Private Sub lOctal_Click()

End Sub

Private Sub logic_Calc(B As Variant, D As Variant, O As Variant, H As Variant)
    Call Labels_Init(B, D, O, H)
    wasUpd = 1
End Sub

Private Sub tbInputForm_Change()
    If wasUpd = 1 Then
        Labels_Terminate
    End If
End Sub
