import pygame

pygame.init() #초기화(반드시 필요)

#화면 크기 설정
screen_width = 480 #가로크기
screen_height = 640 #세로크기
screen = pygame.display.set_mode((screen_width, screen_height))

#화면 타이틀 설정
pygame.display.set_caption("girin game") #게임 이름

#배경 이미지 불러오기
background = pygame.image.load("C:/Users/홍지연/Desktop/pythonWorkspace/pygame_basic/background.jpg")

#스프라이트(캐릭터) 불러오기
character = pygame.image.load("C:/Users/홍지연/Desktop/pythonWorkspace/pygame_basic/character.png")
character_size = character.get_rect().size #이미지의 크기를 구해옴
character_width = character_size[0] #캐릭터의 가로 크기
character_height = character_size[1] #캐릭터의 세로 크기
character_x_pos = (screen_width/2) - (character_width/2)  #화면 가로의 절반 크기 - 화면 중앙
character_y_pos = screen_height-character_height #화면 세로 크기 가장 아래에


# 이벤트 루프 (게임이 계속 실행되게끔)
running = True #게임이 진행중인가? 확인하는 것
while running :
    for event in pygame.event.get():
        if event.type == pygame.QUIT: #창 끄는 X버튼 눌렀을 때
            running = False
    #screen.fill(0,0,255) # grb 값으로 화면 채우는 것
    screen.blit(background, (0,0))
    screen.blit(character, (character_x_pos,character_y_pos))


    pygame.display.update() # 게임 화면을 계속 다시 그려주는 것

# pygame 종료
pygame.quit()
