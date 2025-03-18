import json
from tabulate import tabulate
import pandas as pd
import datetime

def start():
    name, days, hours = get_user_input()
    sessions = generate_sessions(hours)
    print_table(name, sessions, days)

def print_table(name, sessions, days):
    counter = 0
    lessons = []
    tableList = []
    headers = ["  "]
    week = 1
    
    for j in range(days):
        headers.append(f'Day {j+1}')
        
    for i in sessions:
        if counter == 0:
            lessons.append(f'Week {week}')
            week+=1
        lessons.append(f'{i[0]} -> \n{i[-1]}')
        counter+=1
        if counter == days:
            tableList.append(lessons)
            lessons = []
            counter=0
    table = tabulate(tableList,headers=headers, tablefmt="grid")
    with open(f'{name.replace(' ', '-')}-timetable-{datetime.datetime.now().date()}.txt', 'a') as file:
        file.write(f'{name}\'s timetable:\n')
        file.write(table)
    
    
def generate_sessions(hours):
    with open('times.json', 'r') as file:
        times = json.load(file)
    counter = 0
    totaltime= 0
    sessions = []
    placeholder = []
    for i in times:
        for j in times[i]:
            for k in times[i][j]:
                counter += times[i][j][k]
                totaltime +=times[i][j][k]
                placeholder.append(f'{i} Module {j} Lesson {k}')
                if (counter >= hours*60):
                    sessions.append(placeholder)
                    placeholder = []
                    counter = 0
    sessions.append(placeholder)
    print(totaltime/60)
    return sessions
                    
def get_user_input():
    valid = False
    while not valid:
        try:
            name = input("Student Name: ")
            days = int(input("How many days a week are you working?: "))
            if days>7 or days<1:
                print("Days invalid")
                continue
            hours = int(input("How many hours a day will you work?: "))
            if hours>24 or hours<1:
                print("Hours invalid")
                continue
            valid = True
        except:
            print("Please enter a whole number!")
    return name, days, hours

if __name__ == '__main__':
    start()