import pygame

pygame.init() #초기화(반드시 필요)

#화면 크기 설정
screen_width = 480 #가로크기
screen_height = 640 #세로크기
screen = pygame.display.set_mode((screen_width, screen_height))

#화면 타이틀 설정
pygame.display.set_caption("girin game") #게임 이름

# 이벤트 루프 (게임이 계속 실행되게끔)
running = True #게임이 진행중인가? 확인하는 것
while running :
    for event in pygame.event.get():
        if event.type == pygame.QUIT: #창 끄는 X버튼 눌렀을 때
            running = False


# pygame 종료
pygame.quit()
