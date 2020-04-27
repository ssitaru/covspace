#!/usr/bin/python

import csv
import pymongo
import datetime

myclient = pymongo.MongoClient("mongodb://admin:covid19season@localhost:27017")
mydb = myclient["covspace"]
icu_tub = mydb["icu_tub"]
countriesdb = mydb["countries"]


with open('icudata.csv') as csvfile:
	reader = csv.DictReader(csvfile, delimiter=";")
	for row in reader:
		print row
		for k,v in enumerate(row):
			if not row[v]:
				row[v] = -1
			else:
				row[v] = row[v].replace(',','')
		# Country;date;cumulative_incidence_per_tthousand;num_cases;new_cases;new_cases_per_thousand;
		# current_hospitalized;num_hospital_days_per_case;add_num_curr_hosp;currrent_hosp_per_tthousand;
		# perc_current_hospitalized_of_cases;perc_cumulative_hosp_of_cases;num_current_icu;num_cumulative_icu;
		# num_icu_days_per_case;change_num_current_icu;current_icu_per_tthousand;perc_current_icu_of_cases;
		# perc_current_icu_of_current_hosp_cases;perc_current_icu_of_cumulative_hosp_cases;num_current_resp;resp_days_per_case
		country = countriesdb.find_one({'country_name': row['Country']})
		if country:
			# required: [ "country_id", "confirmed", "deaths", "recovered" ]
			dict = { "country_id": country['_id'], "date": datetime.datetime.strptime(row['date'], '%d.%m.%Y'),
				'cumulative_incidence_per_tthousand': float(row['cumulative_incidence_per_tthousand']),
				'num_cases': int(row['num_cases']),
				'new_cases': int(row['new_cases']),
				'new_cases_per_thousand': float(row['new_cases_per_thousand']),
				'current_hospitalized': int(row['current_hospitalized']),
				'num_hospital_days_per_case':float(row['num_hospital_days_per_case']),
				'new_num_curr_hosp': int(row['new_num_curr_hosp']),
				'current_hosp_per_tthousand':float(row['current_hosp_per_tthousand']),
				'perc_current_hospitalized_of_cases':float(row['perc_current_hospitalized_of_cases']),
				'perc_cumulative_hosp_of_cases':float(row['perc_cumulative_hosp_of_cases']),
				'num_current_icu': int(row['num_current_icu']),
				'num_cumulative_icu': int(row['num_cumulative_icu']),
				'num_icu_days_per_case':float(row['num_icu_days_per_case']),
				'change_num_current_icu': int(row['change_num_current_icu']),
				'current_icu_per_tthousand':float(row['current_icu_per_tthousand']),
				'perc_current_icu_of_cases':float(row['perc_current_icu_of_cases']),
				'perc_current_icu_of_current_hosp_cases':float(row['perc_current_icu_of_current_hosp_cases']),
				'perc_current_icu_of_cumulative_hosp_cases':float(row['perc_current_icu_of_cumulative_hosp_cases']),
				'num_current_resp': int(row['num_current_resp']),
				'resp_days_per_case':float(row['resp_days_per_case']),
			 }
			print dict
			x = icu_tub.insert_one(dict)
			#print x
