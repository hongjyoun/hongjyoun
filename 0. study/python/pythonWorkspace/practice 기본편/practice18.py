#일반유닛
class Unit:
    def __init__(self, name, hp, speed):
        self.name = name 
        self.hp = hp
        self.speed = speed

    def move(self, location) :
        print("[지상 유닛 이동]")
        print("{0}:{1} 방향으로 이동합니다. [속도: {2}".format(self.name, location, self.speed))
      

#상속 -> 일반유닛을 상속받아서 공격유닛을 만듬
#공격유닛
class AttackUnit(Unit):
     def __init__(self, name, hp, speed, damage):
        Unit.__init__(self, name, hp, speed) #위에 일반유닛 하목을 상속받음
        self.damage = damage
     
     def attack(self, location):
        print("{0} : {1} 방향으로 적군을 공격합니다. [공격력 {2}]".format(self.name, location, self.damage))

     def damaged(self, damaged):
        print("{0} : {1} 데미지를 입었습니다.".format(self.name, damaged))
        self.hp -= damaged
        print("{0} : 현재 체력은 {1} 입니다.".format(self.name, self.hp))
        if self.hp <=0 :
            print("{0} : 파괴되었습니다".format(self.name))

# firebat1 = AttackUnit("파이어뱃", 50, 16)
# firebat1.attack("5시")
# firebat1.damaged(25)
# firebat1.damaged(25)

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
        print("[공중 유닛 이동]")
        self.fly(self.name, location)


vulture = AttackUnit("벌쳐", 80, 10, 20)
battlecruiser = FlyableAttackUnit("배틀크루저", 500, 25, 3)

vulture.move("11시")
# battlecruiser.fly(battlecruiser.name, "9시")
battlecruiser.move("9시")



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


class BuildingUnit(Unit):
    def __init__(self, name, hp, location):
        # Unit.__init__(self, name, hp, 0)
        super().__init__(name, hp, 0)
        self.location = location
