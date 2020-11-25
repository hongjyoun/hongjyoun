from bs4 import BeautifulSoup
soup = BeautifulSoup("<p>Some<b>bad<i>HTML")
print(soup.prettify())

#터미널 창에서 쓸 수 있는 명령문들
# pip list --> 깔려있는 패키지 리스트 볼 수 있음
# pip show beautifulsoup4 --> beautifulsoup4이라는 패키지 설명 자세히 보기
# pip install --upgrade beautifulsoup4 --> beautifulsoup4 업그레이드
# pip uninstall beautifulsoup4
