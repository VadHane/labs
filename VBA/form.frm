VERSION 5.00
Begin {C62A69F0-16DC-11CE-9E98-00AA00574A4F} form 
   Caption         =   "UserForm1"
   ClientHeight    =   4125
   ClientLeft      =   120
   ClientTop       =   465
   ClientWidth     =   8295.001
   OleObjectBlob   =   "form.frx":0000
   StartUpPosition =   1  'CenterOwner
End
Attribute VB_Name = "form"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Dim WithEvents tr As Triangle
Attribute tr.VB_VarHelpID = -1
Dim lbl1, lbl2 As MSForms.Label
Dim colection As New Collection
Dim created As Boolean

Private Sub create_labels(sq1, sq2)
    Set lbl1 = form.Controls.Add("Forms.Label.1", "lbl1", True)
    
    lbl1.Caption = "Трикутник 1: S = " + CStr(sq1)
    lbl1.Height = 12
    lbl1.Width = 210
    lbl1.Left = 84
    lbl1.Top = 118
    colection.Add lbl1
    
    Set lbl2 = form.Controls.Add("Forms.Label.1", "lbl2", True)
    
    lbl2.Caption = "Трикутник 2: S = " + CStr(sq2)
    lbl2.Height = 12
    lbl2.Width = 210
    lbl2.Left = 84
    lbl2.Top = 104
    colection.Add lbl2
    
    created = True
End Sub

Private Sub delete_lbl()
    If created Then
        For Each Label In colection
            Me.Controls.Remove (Label.Name)
        Next
        
        created = False
    End If
End Sub

Private Sub cmb_check_Click()
    Dim x1, x2, x3, y1, y2, y3
    Set tr = New Triangle
    

    tr1 = Split(Me.txt_input_first_tr, " ")
    tr2 = Split(Me.txt_input_second_tr, " ")
    
    If UBound(tr1) - LBound(tr1) + 1 <> 6 Or UBound(tr2) - LBound(tr2) + 1 <> 6 Then
        Me.lbl_isnt_tr.Visible = True
        Exit Sub
    Else
        Me.lbl_isnt_tr.Visible = False
    End If
    
    sq1 = tr.square(tr1(0), tr1(1), tr1(2), tr1(3), tr1(4), tr1(5))
    sq2 = tr.square(tr2(0), tr2(1), tr2(2), tr2(3), tr2(4), tr2(5))
    
    If sq1 < 0.01 Then
        Me.lbl_isnt_tr.Caption = "Трикутник 1: " + "точки не утворюють трикутник!"
        Me.lbl_isnt_tr.Visible = True
        Exit Sub
    ElseIf sq2 < 0.01 Then
        Me.lbl_isnt_tr.Caption = "Трикутник 2: " + "точки не утворюють трикутник!"
        Me.lbl_isnt_tr.Visible = True
        Exit Sub
    Else
        Me.lbl_isnt_tr.Visible = False
    End If
    
    If sq1 > sq2 Then
        Me.lbl_isnt_tr.Caption = "Трикутник 1 більший!"
        Me.lbl_isnt_tr.Visible = True
        x1 = tr1(0)
        y1 = tr1(1)
        x2 = tr1(2)
        y2 = tr1(3)
        x3 = tr1(4)
        y3 = tr1(5)
    Else
        Me.lbl_isnt_tr.Caption = "Трикутник 2 більший!"
        Me.lbl_isnt_tr.Visible = True
        x1 = tr2(0)
        y1 = tr2(1)
        x2 = tr2(2)
        y2 = tr2(3)
        x3 = tr2(4)
        y3 = tr2(5)
    End If
    
    delete_lbl
    Call create_labels(sq1, sq2)
    Call tr.check(x1, y1, x2, y2, x3, y3)
    
End Sub

Private Sub tr_showSquare(is_rest, is_isosceles, is_acute, is_obtuse)
    Me.ckb_rect.Value = is_rest
    Me.ckb_isosceles.Value = is_isosceles
    Me.ckb_acute.Value = is_acute
    Me.ckb_obtuse.Value = is_obtuse
End Sub

Private Sub txt_input_first_tr_Change()
    delete_lbl
    Me.ckb_rect.Value = False
    Me.ckb_isosceles.Value = False
    Me.ckb_acute.Value = False
    Me.ckb_obtuse.Value = False
    Me.lbl_isnt_tr.Visible = False
End Sub

Private Sub txt_input_second_tr_Change()
    delete_lbl
    Me.ckb_rect.Value = False
    Me.ckb_isosceles.Value = False
    Me.ckb_acute.Value = False
    Me.ckb_obtuse.Value = False
    Me.lbl_isnt_tr.Visible = False
End Sub
