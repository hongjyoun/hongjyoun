# gun = 10

# def checkpoint(soldiers):
#     global gun #바깥에(전역공간)에 있는 gun을 사용하겠다는 뜻
#     gun = gun - soldiers
#     print("남은 총 : {0}".format(gun))


# def checkpoint_ret(gun, soldiers):
#     gun = gun - soldiers
#     print("[함수 내] 남은 총 : {0}".format(gun))
#     return gun

# print("전체 총:{0}".format(gun))
# checkpoint(2)
# gun = checkpoint_ret(gun, 2)
# print("남은 총:{0}".format(gun))




# gun = 10

# def war(gun, man):
#     gun = gun - man
#     print("남은 총의 개수는 {0}개".format(gun))
#     return gun
# print("전체 총: {0}개".format(gun))
# gun = war(gun, 7)
# # print("남은 총: {0}개".format(gun))


def std_weight (height, gender):
    if gender == "여자":
        return (0.01*height)*(0.01*height)*21
    else :
        return (0.01*height)*(0.01*height)*22
   

height = 175
gender = "여자"
weight = round(std_weight (height, gender),2)
print("키 {0}cm {1}의 표준 체중은 {2} 입니다.".format(height, gender, weight))
std_weight(170, "여")
