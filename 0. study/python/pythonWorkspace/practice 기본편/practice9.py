# def profile(name, age, main_lang):
#     print("이름: {0} \t나이 : {1} \t주 사용 언어: {2}"\
#         .format(name,age,main_lang))

# profile("유재석", 20, "파이썬")
# profile("김태호", 25, "자바")

# def profile(name, age=17, main_lang="파이썬"):
#     print("이름: {0} \t나이 : {1} \t주 사용 언어: {2}"\
#         .format(name,age,main_lang))

# profile("유재석")
# profile("김태호")


# def profile(name, age, lang1, lang2, lang3, lang4, lang5):
#     print("이름: {0} /t나이: {1}".format(name, age), end="  ")
#     print(lang1, lang2, lang3, lang4, lang5)


# profile("유재석", 20, "파이썬", "자바스크립트", "씨","씨뿔뿔", "자바")
# profile("김태호", 25, "코틀린", "스위프트","", "","")

def profile(name, age, *language):
    print("이름: {0} /t나이: {1}".format(name, age), end="  ")
    for lang in language: 
        print(lang, end="  ")
    print()

profile("유재석", 20, "파이썬", "자바스크립트", "씨","씨뿔뿔", "자바")
profile("김태호", 25, "코틀린", "스위프트","", "","")