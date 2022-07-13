# calendarapp/utils.py
from calendar import HTMLCalendar
from .models import Event
from .serializers import EventSerializer
import datetime
from datetime import date
# from django.utils

class MyCalendar(HTMLCalendar):
    def __init__(self):
        self.date = date.today() 
        # self.year = year
        # self.month = month
        super(MyCalendar, self).__init__()
    # def set_week(self):
    # def next_week(self):

    # formats a day as a td
    # filter events by day
    def formatday(self, day, events):
        events_per_day = events.filter(data_wizyty__day=day)
        d = ""
        for event in events_per_day:
            d += f"<li> {event.id} </li>"
        if day != 0:
            return f"<td><span class='date'>{day}</span><ul> {d} </ul></td>"
        return "<td></td>"
        # return events_per_day

    # formats a week as a tr
    def formatweek(self, servisant):
        # day = self.week*7
        wk = self.date.isocalendar()
        # fd = self.date.firsweekday()
        events = Event.objects.filter(servisant_id = servisant, data_wizyty__week = (wk[1]), data_wizyty__year=wk[0])
            # week += self.formatday(d, events)
        return {
            "mon":{
            #     "events":EventSerializer(events.filter(data_wizyty__iso_week_day = 1), many=True).data,
            #     "day":wk
                },

            "tue":EventSerializer(events.filter(data_wizyty__iso_week_day = 2), many=True).data,
            "wed":EventSerializer(events.filter(data_wizyty__iso_week_day = 3), many=True).data,
            "thu":EventSerializer(events.filter(data_wizyty__iso_week_day = 4), many=True).data,
            "fri":EventSerializer(events.filter(data_wizyty__iso_week_day = 5), many=True).data,
            "sat":EventSerializer(events.filter(data_wizyty__iso_week_day = 6), many=True).data,
            "sun":EventSerializer(events.filter(data_wizyty__iso_week_day = 7), many=True).data,
            # "links":{
            #     "next_week":
            # }

        }

    # formats a month as a table
    # filter events by year and month
    # def formatmonth(self, withyear=True):
    #     events = Event.objects.filter(
    #         data_wizyty__year=self.year, data_wizyty__month=self.month
    #     )
    #     cal = (
    #         '<table border="0" cellpadding="0" cellspacing="0" class="calendar">\n'
    #     )  # noqa
    #     cal += (
    #         f"{self.formatmonthname(self.year, self.month, withyear=withyear)}"
    #     )  # noqa
    #     cal += f"{self.formatweekheader()}"
    #     for week in self.monthdays2calendar(self.year, self.month):
    #         cal += f"{self.formatweek(week, events)}"
    #     return cal
