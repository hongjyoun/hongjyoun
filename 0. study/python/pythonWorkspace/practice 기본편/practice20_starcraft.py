#일반유닛
from random import *

class Unit:
    def __init__(self, name, hp, speed):
        self.name = name 
        self.hp = hp
        self.speed = speed
        print("{0} 유닛이 생성되었습니다".format(name))

    def move(self, location) :
        print("{0}:{1} 방향으로 이동합니다. [속도: {2}".format(self.name, location, self.speed))
      
    def damaged(self, damaged):
        print("{0} : {1} 데미지를 입었습니다.".format(self.name, damaged))
        self.hp -= damaged
        print("{0} : 현재 체력은 {1} 입니다.".format(self.name, self.hp))
        if self.hp <=0 :
            print("{0} : 파괴되었습니다".format(self.name))

#공격유닛
class AttackUnit(Unit):
     def __init__(self, name, hp, speed, damage):
        Unit.__init__(self, name, hp, speed) #위에 일반유닛 하목을 상속받음
        self.damage = damage
     
     def attack(self, location):
        print("{0} : {1} 방향으로 적군을 공격합니다. [공격력 {2}]".format(self.name, location, self.damage))

#마린
class Marine(AttackUnit):
    def __init__(self):
        AttackUnit.__init__(self, "마린", 40, 1, 5)

    def stimpack(self):
        if self.hp>10:
            self.hp -= 10
            print("{0} : 스팀팩을 사용합니다. (HP 10 감소)".format(self.name))
        else:
            print("{0} : 체력이 부족하여 스팀팩을 사용하지 않습니다.".format(self.name))


#탱크
class Tank(AttackUnit):
    seize_developed = False

    def __init__(self):
        AttackUnit.__init__(self, "탱크", 150, 1, 35)
        self.seize_mode = False

    def set_seize_mode(self):
        if Tank.seize_developed == False:
            return
        
        if self.seize_mode == False:
            print("{0} : 시즈 모드로 전환합니다.".format(self.name))
            self.damage *= 2
            self.seize_mode = True
        else:
            print("{0} : 시즈 모드를 해제합니다.".format(self.name))
            self.damage /= 2
            self.seize_mode = False
        

#공중유닛 /
class Flyable:
    def __init__(self, flying_speed):
        self.flying_speed = flying_speed

    def fly(self, name, location):
        print("{0} : {1} 방향으로 날아갑니다. [속도 {2}]".format(name, location, self.flying_speed))


#공중 공격 유닛
class FlyableAttackUnit(AttackUnit, Flyable) :
    def __init__(self, name, hp, damage, flying_speed):
        AttackUnit.__init__(self, name, hp, 0, damage)
        Flyable.__init__(self, flying_speed)

    def move(self, location):
        self.fly(self.name, location)


class Wraith(FlyableAttackUnit):
        def __init__(self):
            FlyableAttackUnit.__init__(self, "레이스", 80, 20, 5)
            self.cloaked = False
        
        def cloacking(self):
            if self.cloaked == True:
                print("{0} : 클로킹 모드 해제합니다.".format(self.name))
                self.cloaked = False
            else:
                print("{0} : 클로킹 모드 설정합니다.".format(self.name))
                self.cloaked = True


def game_start():
    print("[알림]새로운 게임을 시작합니다.")

def game_over():
    print("Player : gg")
    print("[player] 님이 게임에서 퇴장하셨습니다")


#실제 게임

game_start()

m1 = Marine()
m2 = Marine()
m3 = Marine()

t1 = Tank()
t2 = Tank()

w1 = Wraith()

#유닛 일괄 관리
attack_units = []
attack_units.append(m1)
attack_units.append(m2)
attack_units.append(m3)
attack_units.append(t1)
attack_units.append(t2)
attack_units.append(w1)

# 전군 이동
for unit in attack_units:
    unit.move("1시")

# 탱크 시즈모드 개발
Tank.seize_developed = True
print("[알림] 탱크 시즈 모드 개발이 완료되었습니다.")

# 공격 모드 준비 (마린: 스팀팩, 탱크:시즈모드, 레이스는 클로킹)
for unit in attack_units:
    if isinstance(unit, Marine):
        unit.stimpack()
    elif isinstance(unit, Tank):
        unit.set_seize_mode()
    elif isinstance(unit, Wraith):
        unit.cloacking()

# 전군 공격
for unit in attack_units:
    unit.attack("1시")

# 전군피해
for unit in attack_units:
    unit.damaged(randint(5,21)) #공격은 랜덤으로 받음 (5~20)

# 게임 종료

game_over()



# vulture = AttackUnit("벌쳐", 80, 10, 20)
# battlecruiser = FlyableAttackUnit("배틀크루저", 500, 25, 3)

# vulture.move("11시")
# # battlecruiser.fly(battlecruiser.name, "9시")
# battlecruiser.move("9시")



# class BuildingUnit(Unit):
#     def __init__(self, name, hp, location):
#         pass

# supply_depot = BuildingUnit("서플라이 디폿", 500, "7시")


# def game_start():
#     print("[알림] 새로운 게임을 시작합니다.")

# def game_over():
#     pass

# game_start()
# game_over()


# class BuildingUnit(Unit):
#     def __init__(self, name, hp, location):
#         # Unit.__init__(self, name, hp, 0)
#         super().__init__(name, hp, 0)
#         self.location = location
