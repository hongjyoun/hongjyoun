#빈 자리는 빈 공간으로 두고, 오른쪽 정렬을 하되, 총 10자리 공간을 확보
print("{0: >10}".format(500))

#양수일 땐, +로 표시, 음수일 땐 -로 표시
print("{0: >+10}".format(500))
print("{0: >+10}".format(-500))

#왼쪽정렬, 빈칸을 _로 채우기
print("{0:_<+10}".format(500))

#오른쪽정렬,
print("{0:_>+10}".format(500))

#3자리마다 콤마
print("{0:,}".format(1000000000))
print("{0:+,}".format(1000000000))
print("{0:+,}".format(-1000000000))

print("{0:^<+30,}".format(1000000000))

#소수점 출력
print("{0:f}".format(5/3))

#특정 자리수까지
print("{0:.2f}".format(5/3))



#파일 생성
score_file = open("score.txt", "w", encoding="utf8") #w는 쓰기용도
print("수학:0", file=score_file)
print("영어: 50", file=score_file)
score_file.close()

score_file = open("score.txt", "a", encoding="utf8") #a는 더 쓰기
score_file.write("과학:80")
score_file.write("\n수학:100")
score_file.close()

score_file = open("score.txt", "r", encoding="utf8") #r은 읽는것
print(score_file.read())
score_file.close()

#한줄만 읽어오는 것, 한 줄 읽고 커서는 다음 줄로 이동
score_file = open("score.txt", "r", encoding="utf8")
print(score_file.readline())
print(score_file.readline())
print(score_file.readline())
print(score_file.readline())
score_file.close()


# score_file = open("score.txt", "r", encoding="utf8")
# while True :
#     line = score_file.readline()
#     if not line:
#         break
#     print(line)
# score_file.close()


score_file = open("score.txt", "r", encoding="utf8")
lines = score_file.readlines() #리스트 형태로 저장
for line in lines :
    print(line, end="")
score_file.close()


