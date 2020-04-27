db.createCollection("countries", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "country_name", "iso_code", "lat", "lng" ],
         properties: {
            country_name: {
               bsonType: "string"
            },
            iso_code: {
               bsonType: "string",
            },
            lat: {
               bsonType: "double",
            },
            lng: {
               bsonType: "double",
            },
         }
      }
   }
})

db.createCollection("regions", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "name", "country_id", "lat", "lng" ],
         properties: {
            name: {
               bsonType: "string"
            },
            country_id: {
               bsonType: "objectId",
            },
            lat: {
               bsonType: "double",
            },
            lng: {
               bsonType: "double",
            },
         }
      }
   }
})

db.createCollection("datasources", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "id", "name_en", "data_entities"],
         properties: {
            id: {
               bsonType: "string",
            },
            name_en: {
               bsonType: "string",
            },
            data_entities: {
               bsonType: "array",
			   uniqueItems: true,
			   minItems: 1,
			   items: {
				   bsonType: ["object"],
				   required: ["entity_id", "this_id", "name_en", "type"],
				   properties: {
					   entity_id: {
						   bsonType: "objectId",
					   },
             this_id: {
               bsonType: "string",
             },
					   name_en: {
						   bsonType: "string",
					   },
					   type: {
						   enum: ["int", "double", "string", "objectId"]
					   }
				   }
			   }

            },
         }
      }
   }
})

db.createCollection("data_entities", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "id", "name_en", "active" ],
         properties: {
            id: {
               bsonType: "string",
            },
            name_en: {
               bsonType: "string",
            },
            active: {
              bsonType: "bool",
            }
			   }
      }
   }
})

db.createCollection("intervention_icons", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "id", "path" ],
         properties: {
            id: {
               bsonType: "string",
            },
            iconpath: {
               bsonType: "string",
            }
			}
      }
   }
})
/*
db.createCollection("intervention_types", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "id", "alias" ],
         properties: {
            id: {
               bsonType: "string",
            },
            alias: {
               bsonType: "string",
            }
			}
      }
   }
})*/
/* https://github.com/amel-github/covid19-interventionmeasures/blob/master/List_measures_by_categoryL1-L2.csv */

db.createCollection("interventions", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "id", "country_id", "date", "measure_l1", "measure_l2", "measure_l3", "measure_l4", "comment", "source" ],
         properties: {
            id: {
               bsonType: "string"
            },
            country_id: {
               bsonType: "string",
            },
            date: {
               bsonType: "date",
            },
            measure_l1: {
               bsonType: "string",
            },
            measure_l2: {
               bsonType: "string",
            },
            measure_l3: {
               bsonType: "string",
            },
            measure_l4: {
               bsonType: "string",
            },
            comment: {
               bsonType: "string",
            },
            source: {
               bsonType: "string",
            },
         }
      }
   }
})

db.createCollection("cssedb", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "country_id", "date", "confirmed", "deaths", "recovered" ],
         properties: {
            country_id: {
               bsonType: "objectId"
            },
            date: {
 				       bsonType: "date"
 			      },
            confirmed: {
               bsonType: "int",
            },
            deaths: {
               bsonType: "int",
            },
            recovered: {
               bsonType: "int",
            },
         }
      }
   }
})


// iso_code,location,date,total_cases,new_cases,total_deaths,new_deaths,total_cases_per_million,new_cases_per_million,total_deaths_per_million,new_deaths_per_million,total_tests,new_tests,total_tests_per_thousand,new_tests_per_thousand,tests_units
db.createCollection("owid", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "country_id", "date", "total_cases", "new_cases", "total_deaths", "new_deaths", "total_cases_per_million", "new_cases_per_million", "total_deaths_per_million", "new_deaths_per_million", "total_tests", "new_tests", "total_tests_per_thousand","new_tests_per_thousand", "tests_units" ],
         properties: {
            country_id: {
               bsonType: "objectId"
            },
			     date: {
				       bsonType: "date"
			      },
            total_cases: {
               bsonType: "int",
            },
            new_cases: {
               bsonType: "int",
            },
            total_deaths: {
               bsonType: "int",
            },
			new_deaths: {
               bsonType: "int",
            },
			total_cases_per_million: {
               bsonType: "double",
            },
			new_cases_per_million: {
               bsonType: "double",
            },
			total_deaths_per_million: {
               bsonType: "double",
            },
			new_deaths_per_million: {
               bsonType: "double",
            },
			total_tests: {
               bsonType: "int",
            },
			new_tests: {
               bsonType: "int",
            },
			total_tests_per_thousand: {
               bsonType: "double",
            },
			new_tests_per_thousand: {
               bsonType: "double",
            },
			tests_units: {
               bsonType: "string",
            },
         }
      }
   }
})

// dateRep,day,month,year,cases,deaths,countriesAndTerritories,geoId,countryterritoryCode,popData2018
db.createCollection("ecdc", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "country_id", "date", "cases", "deaths", "popData2018" ],
         properties: {
            country_id: {
               bsonType: "objectId"
            },
            date: {
               bsonType: "date"
            },
            cases: {
               bsonType: "int",
            },
            deaths: {
               bsonType: "int",
            },
            popData2018: {
               bsonType: "int",
            },
         }
      }
   }
})


// static data
db.intervention_icons.insert({
   id: 'Travel restriction',
   iconpath: 'svg/no-travel.svg'
});
db.intervention_icons.insert({
   id: 'Social distancing',
   iconpath: 'svg/social-distancing.svg'
});
db.intervention_icons.insert({
   id: 'Risk communication',
   iconpath: 'svg/risk-communication.svg'
});
db.intervention_icons.insert({
   id: 'Healthcare and public health capacity',
   iconpath: 'svg/healthcare.svg'
});
db.intervention_icons.insert({
   id: 'Case identification, contact tracing and related measures',
   iconpath: 'svg/case-detection.svg'
});
db.intervention_icons.insert({
   id: 'Resource allocation',
   iconpath: 'svg/resource-allocation.svg'
});
db.intervention_icons.insert({
   id: 'Environmental measures',
   iconpath: 'svg/environmental.svg'
});
db.intervention_icons.insert({
   id: 'Returning to normal life',
   iconpath: 'svg/normal-life.svg'
});


db.data_entities.insert({
  id: 'total_cases',
  name_en: 'Total Cases'
});
db.data_entities.insert({
  id: 'total_deaths',
  name_en: 'Total Deaths'
});
db.data_entities.insert({
  id: 'total_recovered',
  name_en: 'Total Recovered',
});
db.data_entities.insert({
  id: 'total_tests',
  name_en: 'Total Tests',
  active: false
});
db.data_entities.insert({
  id: 'new_tests',
  name_en: 'New Tests',
  active: false
});
db.data_entities.insert({
  id: 'new_cases',
  name_en: 'New Cases',
  active: false
});
db.data_entities.insert({
  id: 'new_deaths',
  name_en: 'New Deaths',
  active: false
});

db.datasources.insert({
	id: 'cssedb',
	name_en: 'John Hopkins CSSE',
	data_entities: [
		{entity_id: ObjectId("5ea48ba8174b45b4e1cd87fa"), this_id: "confirmed", name_en: "Confirmed Cases", type: "int"},
		{entity_id: ObjectId("5ea48ba8174b45b4e1cd87fb"), this_id: "deaths", name_en: "Deaths", type: "int"},
		{entity_id: ObjectId("5ea48ba9174b45b4e1cd87fc"), this_id: "recovered", name_en: "Recovered", type: "int"},
	]
})
// total_cases,new_cases,total_deaths,new_deaths,total_cases_per_million,new_cases_per_million
// total_deaths_per_million,new_deaths_per_million,total_tests,new_tests,total_tests_per_thousand
// new_tests_per_thousand,tests_units
db.datasources.insert({
	id: 'owid',
	name_en: 'Our World in Data',
	data_entities: [
		{entity_id: ObjectId("5ea48ba8174b45b4e1cd87fa"), this_id: "total_cases", name_en: "Total Cases", type: "int"},
		{entity_id: ObjectId("5ea48ba8174b45b4e1cd87fb"), this_id: "total_deaths", name_en: "Total Deaths", type: "int"},
    {entity_id: ObjectId("5ea48c57174b45b4e1cd87fe"), this_id: "total_tests", name_en: "Total Tests", type: "int"},
	]
})

// dateRep,day,month,year,cases,deaths,countriesAndTerritories,geoId,countryterritoryCode,popData2018,continentExp
db.datasources.insert({
	id: 'ecdc',
	name_en: 'European CDC',
	data_entities: [
		{entity_id: ObjectId("5ea48ba8174b45b4e1cd87fa"), this_id: "cases", name_en: "Total Cases", type: "int"},
		{entity_id: ObjectId("5ea48ba8174b45b4e1cd87fb"), this_id: "deaths", name_en: "Total Deaths", type: "int"},
	]
})
