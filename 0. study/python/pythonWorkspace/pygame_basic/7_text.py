import pygame

pygame.init() #초기화(반드시 필요)

#화면 크기 설정
screen_width = 480 #가로크기
screen_height = 640 #세로크기
screen = pygame.display.set_mode((screen_width, screen_height))

#화면 타이틀 설정
pygame.display.set_caption("girin game") #게임 이름

# FPS
clock = pygame.time.Clock()

#배경 이미지 불러오기
background = pygame.image.load("C:/Users/홍지연/Desktop/pythonWorkspace/pygame_basic/background.jpg")

#스프라이트(캐릭터) 불러오기
character = pygame.image.load("C:/Users/홍지연/Desktop/pythonWorkspace/pygame_basic/character.png")
character_size = character.get_rect().size #이미지의 크기를 구해옴
character_width = character_size[0] #캐릭터의 가로 크기
character_height = character_size[1] #캐릭터의 세로 크기
character_x_pos = (screen_width/2) - (character_width/2)  #화면 가로의 절반 크기 - 화면 중앙
character_y_pos = screen_height-character_height #화면 세로 크기 가장 아래에

#이동할 좌표
to_x = 0
to_y = 0

#이동 속도
character_speed = 0.6


# 적 캐릭터
enemy = pygame.image.load("C:/Users/홍지연/Desktop/pythonWorkspace/pygame_basic/enemy.png")
enemy_size = enemy.get_rect().size #이미지의 크기를 구해옴
enemy_width = enemy_size[0] #캐릭터의 가로 크기
enemy_height = enemy_size[1] #캐릭터의 세로 크기
enemy_x_pos = (screen_width/2) - (enemy_width/2)  #화면 가로의 절반 크기 - 화면 중앙
enemy_y_pos = (screen_height/2) - (enemy_height/2) #화면 세로 크기 가장 아래에


# 글자 폰트 정의
game_font = pygame.font.Font(None, 40) #폰트객체 생성하고, 폰트, 크기 명시



# 총 시간
total_time = 10


# 시작 시간
start_ticks = pygame.time.get_ticks() #시작 tick 을 받아옴



# 이벤트 루프 (게임이 계속 실행되게끔)
running = True #게임이 진행중인가? 확인하는 것
while running :
    dt = clock.tick(60) # 게임화면의 초당 프레임 수를 설정

# 캐릭터가 1초 동안 100만큼 이동을 해야 함
# 10fps: 1초 동안에 10번 동작 -> 1번에 10만큼
# 20fps: 1초 동안에 20번 동작 -> 1번에 20만큼

    print("fps: " + str(clock.get_fps()))

    for event in pygame.event.get():
        if event.type == pygame.QUIT: #창 끄는 X버튼 눌렀을 때
            running = False

        if event.type == pygame.KEYDOWN: #키가 눌러졌는지 확인
            if event.key == pygame.K_LEFT: #캐릭터를 왼쪽으로
                to_x -= character_speed
            elif event.key == pygame.K_RIGHT: #캐릭터를 오른쪽으로
                to_x += character_speed
            elif event.key == pygame.K_UP: #캐릭터를 위쪽으로
                to_y -= character_speed
            elif event.key == pygame.K_DOWN: #캐릭터를 아래쪽으로
                to_y += character_speed
        if event.type == pygame.KEYUP: #키보드에서 손을 떼면
            if event.key == pygame.K_LEFT or event.key == pygame.K_RIGHT:
                to_x = 0
            elif event.key == pygame.K_UP or event.key == pygame.K_DOWN:
                to_y = 0

    character_x_pos += to_x * dt
    character_y_pos += to_y * dt

    #가로경계값
    if character_x_pos < 0 :
        character_x_pos = 0
    elif character_x_pos > screen_width - character_width:
        character_x_pos = screen_width - character_width

    #세로경계값
    if character_y_pos < 0 :
        character_y_pos = 0
    elif character_y_pos > screen_height - character_height:
        character_y_pos = screen_height - character_height


    #충돌처리를 위한 rect 정보 업데이트
    character_rect = character.get_rect()
    character_rect.left = character_x_pos
    character_rect.top = character_y_pos

    enemy_rect = enemy.get_rect()
    enemy_rect.left = enemy_x_pos
    enemy_rect.top = enemy_y_pos


    #충돌 체크
    if character_rect.colliderect(enemy_rect):
        print("충돌했어요")
        running = False


    #screen.fill(0,0,255) # grb 값으로 화면 채우는 것
    screen.blit(background, (0,0)) #배경그리기
    screen.blit(character, (character_x_pos,character_y_pos)) #캐릭터 그리기
    screen.blit(enemy, (enemy_x_pos,enemy_y_pos)) #적 그리기

    #타이머 집어 넣기
    #경과 시간 계산
    elapsed_time = (pygame.time.get_ticks() - start_ticks) / 1000 #경과 시간을 1000으로 나누어서 초 단위로 표시 (원래는 ms 단위임.)
    timer = game_font.render(str(int(total_time - elapsed_time)), True, (255,255,255))
    screen.blit(timer, (10, 10))

    #만약 시간이 0 이하이면 게임 종료
    if total_time - elapsed_time <0 :
        print("타임아웃")
        running = False


    pygame.display.update() # 게임 화면을 계속 다시 그려주는 것

# 종료 전 잠시 대기
pygame.time.delay(2000) #2000ms(밀리세컨즈) = 2초

# pygame 종료
pygame.quit()
