**PROTOTYPE of an internal development/design studio tool serving two major goals:**
<br>
* enabling sales to log current and upcoming project/opportunities 
* see actual and probable studio staff utilization per department (= fin health)

This sample relates to backend code for department dashboard (landing page of the app) that I worked on. 
<br>
<br>
![Department Dashboard](https://github.com/hanhaechi/code-samples/blob/master/Dept.Dashboard.png)
<br>
Project ERD
![ERD](https://github.com/hanhaechi/code-samples/blob/master/Forest_ERD.png)

**BACKGROUNDER**
<br>
* If a project / opportunity has dedicated resources (= number of people from department x assigned to the project within project's start/end date), these resources should be reflected in dept.dashboard page. Resources are assigned for a weekly basis, always starting on Monday.
* User should be able to see staff utilization data for 8 weeks (from Monday of this week) by default
* User should be able to change the start date and see 8 weeks from the chosen date (8 weeks from Monday of the chosen week)
* User should be able to see staff utilization for both projects/opportunities (default) or either of them. 

**DATA TO BE SERVED**
<br>
Front end would be expecting an array of department data and a weeklyTotals object with total percentages for that week (= sum of staff utilized that week in each department / total staff in departments * 100)

```{
    "chargeByDept": [
        {
            "deptName": "iOS",
            "deptTotalResources": 20,
            "chargeability": {
                "2018-09-10": {
                    "resourceCount": 16,
                    "percent": "80.00"
                },
                "2018-09-17": {
                    "resourceCount": 16,
                    "percent": "80.00"
                }
            }
        },
        {
            "deptName": "QA",
            "deptTotalResources": 7,
            "chargeability": {
                "2018-09-10": {
                    "resourceCount": 8,
                    "percent": "114.29"
                },
                "2018-09-17": {
                    "resourceCount": 0,
                    "percent": "0.00"
                },
         }
      ],
    "weeklyTotals": {
        "2018-09-10": "40.77",
        "2018-09-17": "52.31",
    }
}
```

**CHALLENGES**
1. Date management: the only requirement for the front end was to send date string in format 'YYYY-MM-DD'. Backend should determine the Monday of that week, calculate the end date (Sunday of the W8), and the Mondays in between. For simplicity, chose to work with Moment.js library
2. Gathering data by querying 3 tables (as I've never worked with databases and had no idea what can I get from Sequelize :)
3. Process: deciding what should be done in controller and what should 'live' in a service function. 
4. Testing: writing Jest tests and remembering to run them every time I've changed something. Eventually learned that reading through tests before I even get into somebody's code is such a great way to understand what code does (and shouldn't do). 

**OUTCOME**
<br>
The flow
1. Take date string from req.query, create dates object (startDate, endDate, array of Mondays). If no string provided or it's not a date (or is otherwise corrupted) - revert to today's date and figure out the Monday
2. By default get all the departments with resources active during the specified dates.
3. Map through departments to select all the resources, place them under the correct week bracket, calculate utilization percentage
4. Calculate WeeklyTotals
5. Celebrate once all the pieces came to work :tada: :clinking_glasses: :100:
