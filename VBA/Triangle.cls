VERSION 1.0 CLASS
BEGIN
  MultiUse = -1  'True
END
Attribute VB_Name = "Triangle"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = False
Attribute VB_Exposed = False
Public Event showSquare(is_rest, is_isosceles, is_acute, is_obtuse)


Private Function is_rest(x1, y1, x2, y2, x3, y3)
    a = ((x2 - x1) ^ 2 + (y2 - y1) ^ 2) ^ 0.5
    b = ((x3 - x2) ^ 2 + (y3 - y2) ^ 2) ^ 0.5
    c = ((x3 - x1) ^ 2 + (y3 - y1) ^ 2) ^ 0.5
    
    If a > b Then
        If a > c Then
            If Abs(a ^ 2 - (b ^ 2 + c ^ 2)) < 0.001 Then
                is_rest = 1
                
            Else
                is_rest = 0
                
            End If
        Else
            If Abs(c ^ 2 - (b ^ 2 + a ^ 2)) < 0.001 Then
                is_rest = 1
                
            Else
                is_rest = 0
                
            End If
        End If
    Else
        If b > c Then
            If Abs(b ^ 2 - (a ^ 2 + c ^ 2)) < 0.001 Then
                
                is_rest = 1
                
            Else
                is_rest = 0
            End If
        Else
            If Abs(c ^ 2 - (b ^ 2 + a ^ 2)) < 0.001 Then
                is_rest = 1
                
            Else
                is_rest = 0
            End If
        End If
    End If
End Function

Private Function is_isosceles(x1, y1, x2, y2, x3, y3)
    a = ((x2 - x1) ^ 2 + (y2 - y1) ^ 2) ^ 0.5
    b = ((x3 - x2) ^ 2 + (y3 - y2) ^ 2) ^ 0.5
    c = ((x3 - x1) ^ 2 + (y3 - y1) ^ 2) ^ 0.5
    
    If a = b Or a = c Or c = b Then
        is_isosceles = 1
    Else
        is_isosceles = 0
    End If
End Function

Private Function is_acute(x1, y1, x2, y2, x3, y3)
    a = ((x2 - x1) ^ 2 + (y2 - y1) ^ 2) ^ 0.5
    b = ((x3 - x2) ^ 2 + (y3 - y2) ^ 2) ^ 0.5
    c = ((x3 - x1) ^ 2 + (y3 - y1) ^ 2) ^ 0.5
    
    If a > b Then
        If a > c Then
            If a ^ 2 < (b ^ 2 + c ^ 2) Then
                is_acute = 1
                
            Else
                is_acute = 0
                
            End If
        Else
            If c ^ 2 < (b ^ 2 + a ^ 2) Then
                is_acute = 1
                
            Else
                is_acute = 0
                
            End If
        End If
    Else
        If b > c Then
            If b ^ 2 < (a ^ 2 + a ^ 2) Then
                
                is_acute = 1
                
            Else
                is_acute = 0
            End If
        Else
            If c ^ 2 < (b ^ 2 + a ^ 2) Then
                is_acute = 1
                
            Else
                is_acute = 0
            End If
        End If
    End If
End Function

Private Function is_obtuse(x1, y1, x2, y2, x3, y3)
    a = ((x2 - x1) ^ 2 + (y2 - y1) ^ 2) ^ 0.5
    b = ((x3 - x2) ^ 2 + (y3 - y2) ^ 2) ^ 0.5
    c = ((x3 - x1) ^ 2 + (y3 - y1) ^ 2) ^ 0.5
    
    If a > b Then
        If a > c Then
            If a ^ 2 > (b ^ 2 + c ^ 2) + 0.1 Then
                is_obtuse = 1
                
            Else
                is_obtuse = 0
                
            End If
        Else
            If c ^ 2 > (b ^ 2 + a ^ 2) + 0.1 Then
                is_obtuse = 1
                
            Else
                is_obtuse = 0
                
            End If
        End If
    Else
        If b > c Then
            If b ^ 2 > (a ^ 2 + c ^ 2) + 0.1 Then
                
                is_obtuse = 1
                
            Else
                is_obtuse = 0
            End If
        Else
            If c ^ 2 > (b ^ 2 + a ^ 2) + 0.1 Then
                is_obtuse = 1
                
            Else
                is_obtuse = 0
            End If
        End If
    End If
End Function

Public Function square(x1, y1, x2, y2, x3, y3)
    a = ((x2 - x1) ^ 2 + (y2 - y1) ^ 2) ^ 0.5
    b = ((x3 - x2) ^ 2 + (y3 - y2) ^ 2) ^ 0.5
    c = ((x3 - x1) ^ 2 + (y3 - y1) ^ 2) ^ 0.5
    
    p = (a + b + c) / 2
    
    square = (p * (p - a) * (p - b) * (p - c)) ^ 0.5
End Function

Public Sub check(x1, y1, x2, y2, x3, y3)
    Dim rest, isosceles, acute, obtuse As Boolean
    

    rest = CBool(is_rest(x1, y1, x2, y2, x3, y3))
    isosceles = CBool(is_isosceles(x1, y1, x2, y2, x3, y3))
    acute = CBool(is_acute(x1, y1, x2, y2, x3, y3))
    obtuse = CBool(is_obtuse(x1, y1, x2, y2, x3, y3))

    RaiseEvent showSquare(rest, isosceles, acute, obtuse)
End Sub
