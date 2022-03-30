VERSION 5.00
Begin {C62A69F0-16DC-11CE-9E98-00AA00574A4F} form 
   Caption         =   "Розрахунок оцінки студента"
   ClientHeight    =   4680
   ClientLeft      =   120
   ClientTop       =   465
   ClientWidth     =   7575
   OleObjectBlob   =   "form.frx":0000
   StartUpPosition =   1  'CenterOwner
End
Attribute VB_Name = "form"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Private Sub ResultAction()
        MsgBox "Розрахунок успішно завершено!"
        Unload Me
End Sub

Private Sub cmd_calc_Click()
    START_POSITION = 2
    SYMBOL_OF_NAME = "A"
    SYMBOL_OF_DATE = "B"
    SYMBOL_OF_RESULT = "C"
    
    number_of_weeks = CInt(Me.txb_number_of_week)

    Dim position As Integer
    position = START_POSITION
    
    
    Do While Len(Trim(Range(SYMBOL_OF_NAME & position).Value)) > 1
        Date_field = SYMBOL_OF_DATE & position
        weeks = DateDiff("w", CDate(Me.txb_Date_the_first_meeting), CDate(Range(Date_field).Value))
        
        If weeks <= number_of_weeks Then
            Range(SYMBOL_OF_RESULT & position).Value = CInt(Me.txb_Max_Rating)
        Else
            diff = weeks - number_of_weeks
            mult = CInt(Me.txb_Max_Rating) * 0.2
            
            res = CInt(Me.txb_Max_Rating) - diff * mult
            
            If res >= CInt(Me.txb_Min_Rating) Then
                Range(SYMBOL_OF_RESULT & position).Value = res
            Else
                Range(SYMBOL_OF_RESULT & position).Value = CInt(Me.txb_Min_Rating)
            End If
        End If
 
        position = position + 1
        
    Loop

    ResultAction
End Sub
