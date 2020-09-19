print ("a"+"b")
print("나는 %d살입니다." % 20)
print("나는 %s을 좋아해요" % "python")
print("Apple은 %c로 시작해요" % "A")
print("나는 %s살입니다." % 20)
print("나는 %s색과 %s색을 좋아해요." % ("파란","빨간"))

print("나는 {}살입니다.".format(20))
print("나는 {0}색과 {1}색을 좋아해요".format("파란","빨간"))

print("나는 {age}살이며, {color}색을 좋아해요.".format(age = 20, color ="빨간"))

age = 30
color = "빨간" 
print(f"나는 {age}살이며, {color}색을 좋아해요")


print("백문이 불여일견 \n백견이 불여일타")

print("저는 \"홍지연\"입니다")

print("C:\\Python38\\python.exe")
print("Red Apple\rPine")

print("Redd\bApple")

print("pine \t Apple")


url = "http://google.com"
my_str = url.replace("http://", "")
my_str = my_str[:my_str.index(".")]
print(my_str)

password = my_str[:3] + str(len(my_str)) + str(my_str.count("e")) + "!"
print("{0}의 비밀번호는 {1}입니다".format(url,password))