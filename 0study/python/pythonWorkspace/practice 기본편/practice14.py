
# for i in range(1,51) :
#     name = str(i+"주차.txt")
#     report = open(name, "w", encoding="utf8")
#     print("-"+i+"주차 주간보고", file=report)
#     print("부서 :", file=report)
#     print("이름 :", file=report)
#     print("업무 요약 :", file=report)
#     report.close()



for i in range(1, 51):
    with open(str(i)+"주차.txt", "w", encoding="utf8") as  report_file:
        report_file.write("- {0}주차 주간보고 -".format(i))
        report_file.write("\n부서: ")
        report_file.write("\n이름: ")
        report_file.write("\n업무 요약")
            