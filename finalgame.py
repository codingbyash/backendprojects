import random
a='Rock'
b='Paper'
c='Scissor'
print('Rock is mighter than Scissor\n Paper is mighter than Rock\nScissor is mighter than paper\n')
print(" LET'S PLAY MY DEAR FRIEND ")
play=True
while play==True:
    co_choice=random.randint(1,3)
    print('Choose one from the following:\n 1 - Rock\n 2 - Paper\n 3 - Scissor')
    choice=int(input('Enter Your Choice: '))
    while choice>3 or choice<1:
        choice=int(input('Enter Valid Number: '))
    if choice==co_choice:
        print("your choice was same as Computer's choice")
        print('Draw')
    elif co_choice==1:
        if choice==2:
            print('your choice was:',b,"\nComputer's choice is:",a)

            print('Congratulations you won')
        else:
            print('your choice was:',c,"\nComputer's choice is:",a)
            print('Oops! Computer won,Better luck next time')
    elif co_choice==2:
        if choice==3:
            print('your choice was:',c,"\nComputer's choice is:",b)
            print('Congratulations you won')
        else:
            print('your choice was:',a,"\nComputer's choice is:",b)
            print('Oops! Computer won,Better luck next time')
    elif co_choice==3:
        if choice==1:
            print('your choice was:',a,"\nComputer's choice is:",c)
            print('Congratulations you won')
        else:
            print('your choice was:',b,"\nComputer's choice is:",c)
            print('Oops! Computer won,Better luck next time')
    p=input('press Yes/No')
    if p=='y' or p=='yes' or p=='Y':
        print("You are enjoying")
        play=True
    else:
        print('Thanks for playing.You are amazing person')
        play=False