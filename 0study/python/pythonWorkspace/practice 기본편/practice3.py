cabinet = { 3: "유재석", 100: "김태호"}
print(cabinet[3])
print(cabinet[100])
print(cabinet.get(3))
print(cabinet.get(6, "사용 가능"))
print(3 in cabinet)
print(5 in cabinet)


print(cabinet.keys())
print(cabinet.values())
print(cabinet.items())

cabinet.clear()
print(cabinet)


#튜플

menu = ("돈까스", "치즈까스")
print(menu[0])

name = "김종국"
age = 30
hobby = "코딩"


(name, age, hobby) = ("김종국", 20, "코딩")
print(name, age, hobby)