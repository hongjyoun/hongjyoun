class Unit:
    def __init__(self):
        print("unit 생성자")

class Flyable:
    def __init__(self):
        print("Flyable 생성자")


# class FlyableUnit(Unit, Flyable):
#     def __init__(self):
#         super().__init__()

class FlyableUnit(Flyable, Unit):
    def __init__(self):
        # super().__init__() #super를 쓰면 첫번째 상속받는 클래스만 적용됨
        Unit.__init__(self)
        Flyable.__init__(self)
        

dropship = FlyableUnit()