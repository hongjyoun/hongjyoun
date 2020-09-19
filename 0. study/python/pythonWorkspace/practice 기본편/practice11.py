# print("python", "java", sep=" ,", end="?")


import sys
print("Python", "Java", file=sys.stdout)
print("Python", "Java", file=sys.stderr)


scores = {"수학":0, "영어":50, "코딩":100}
for a, b in scores.items():
    print(a.ljust(4), str(b).rjust(4), sep=":")


for number in range(1,21):
    print("대기번호: "+ str(number).zfill(3))


answer = input("아무 값이나 입력하세요:") #인풋은 무조건 str, 즉 문자열로 받음
print("입력하신 값은 "+answer+"입니다")

