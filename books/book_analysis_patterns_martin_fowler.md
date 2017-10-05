	<url:file:///~/Dropbox/mynotes/content/books/book_analysis_patterns_martin_fowler.md>

# Analysis Patterns - Martin Fowler

## ch03 - Observations and Measurements

### Introduction

	3.1 quantity: number + unit
	3.2 conversion ration: convert quantities
	3.3 compound units: complex units in terms of their components
		all monetary values should use this
	3.4 measurement: measurements as objects
		not as attributes of objects
		when: 
			large number of attributes
			keep information about individual measurements
	3.5 observation: qualitative information id=g_10133
		3.5 observation: qualitative information <url:file:///~/Dropbox/mynotes/content/books/book_analysis_patterns_martin_fowler.md#r=g_10133>
		v1:
			/Users/mertnuhoglu/Dropbox/public/img/ss-167.png
		ex:
			gender: instance of PhenomenonType
			male and female: instances of Category
			a person is male:
				an Observation with a Category of male and PhenomenonType of gender
		ex:
			patient is suffering from weight loss
			change in weight: instance of PhenomenonType
				with linked Category instances:
					gain, loss, steady
		v2
			/Users/mertnuhoglu/Dropbox/public/img/ss-168.png
		changes:
			put Phenomenon (formerly Category) in the knowledge level
		benefits:
			allows to define business rules on Phenomenon
		ex
			a person is blood group A
			blood group A: Phenomenon
			CategoryObservation linked with this Phenomenon
			Phenomenon is linked to
				blood group: PhenomenonType 
	3.6 subtyping observation concepts
	3.7 protocol: in order clinicians to better interpret observation
	3.8 dual time record: time an observation occurred and recorded
	3.9 rejected observation
	3.10 subtyping of active observation, hypothesis and projection: to deal with certaintly
	3.11 associated observation: evidence observations and knowledge used for the diagnosis
	3.12 process of observation: to understand how our observations work

## ch04 - Observations for Corporate Finance

### Introduction

	4.1 enterprise segment: describes a part of enterprise defined along a series of dimensions
		dimension: some way of hierarchically breaking down the enterprise
			such as: location, product range, market
		enterprise segment: combination of these dimensions
	4.2 measurement protocol: how measurements are calculated from other measurements using formulas
		formulas: instances of model types
	4.2.1 causal measurement protocol: different phenomenon types are combined to calculate another
	4.2.2 comparative measurement protocol: a single phenomenon type can vary between status types (actual versus plan deviation of sales revenue)
	4.2.3 status type
	4.2.5 dimension combination: dimensions defined in enterprise segment pattern to calculate summary values
	4.3 range: range between two quantities
	4.4 phenomenon with range: 
	4.4.1 phenomenon with range attribute
	4.4.2 range function

### 4.1 enterprise segment

	comparison to medical model
		single patient vs. multiple actors
		object of care: generalization of patient and population
		object of care 
			subtypes
				patient
				population
				enterprise segment
		observation: done on object of care
			[Observation] n-1 [ObjectOfCare]
			[ObjectOfCare] ^- [Patient]
			[ObjectOfCare] ^- [Population]
			[ObjectOfCare] ^- [EnterpriseSegment]
	hierarchy of enterprise segment
		concepts
			dimension: separating concept in each level
				ex1
					ACM (company)
						USA
							Midwest
							West coast
						Europe
					dimension: geography
					dimension element:
						ex: Midwest, USA
				ex2
					ACM
						Coffee
						Tea
					dimension: product
				ex3
					ACM
						Finance
						Manufacturing
					dimension: functional unit
			star schema: multiple hierachies by different dimensions
				ex: ex1, ex2, ex3 are multiple hierarchies of the same company
			enterprise segment: combination of dimension elements from a star schema
				ex
					Midwest-Manufacturing-Coffee
		model1: ES by DE
			[DimensionElement] 1-n [DimensionElement] ; {multiple hierarchies}
			[DimensionElement] ^- [GeographicDimensionElement]
			[DimensionElement] ^- [FunctionalUnitDimensionElement]
			[DimensionElement] ^- [ProductDimensionElement]
			[EnterpriseSegment] n-1 [GeographicDimensionElement]
			[EnterpriseSegment] n-1 [FunctionalUnitDimensionElement]
			[EnterpriseSegment] n-1 [ProductDimensionElement]
		model2: ES by Dm and DE
			[EnterpriseSegment] n-1 [DimensionElement] ; {key: dimension}
			[DimensionElement] n-1 [Dimension] ; {hierarchy}
		model3:
			model2 +
			[DimensionLevel] n-1 [Dimension]  ; {list}
			notes
				each level is a DimensionLevel instance
	4.1.1 defining the dimensions
		how to define a dimension?
			comes from classification of 
				focal event
					fact table of a star schema
					ex
						which machine was sold
						which sales area sold it
						which industry it was sold into
					tilak chart: shows a set of dimensions and levels
						fig: 2782.png
						ex:
							dimension: channel
								levels:
									territory
										sales type
											channel
							dimension: location
								levels:
									territory
										area
											region
												market
		_mine: dimensions in teuis project?
			for areas:
				territory areas (administrative)
				human defined land areas
				geographically defined land areas
			for the following entities:
				territory
				land
			territory
		_mine: what is a dimension exactly?
	4.1.2 properties of dimensions and enterprise segments
		rule: measurements for dimensions at lower levels can be combined into the higher level
		measurement protocol

## Other: starschema

	Stars: A Pattern Language for Query Optimized Schema 
		http://c2.com/ppr/stars.html
	comparison oltp vs. dss
		oltp: transaction entry automation
		dss: analytical reporting/ data analysis
	star schema
		synonyms
			star-join schema
			data cube
			data list
			grid file
			multidimensional schema
		origin of the word
			geometrical pattern by entities and relationships in ERD
			typical pattern:
				business activity in the center
				surrounden by: people, places, things
					as if points of the star
	sections
		section 1: analysis section: finding and organizing relevant factors
		section 2: implementing those factors into a star schema
	analysis section
		patterns
			1 query optimized database
			2 whole business entities
			3 key business activities and influences
	pattern 1: query optimized database
		oltp database schema: 
			optimized for recording of transactions
			normalized = no redundancy
		develop a new database
			optimized for the purpose of easy query 
			rather than for inserting data
	pattern 2: whole business entities
		information are scattered into small tables in OLTP db
		list entities required in reports
	pattern 3: key business activities and influences
		find key business activities
		find people, places, things (dimensions) in these activities
		note: dimensions should only be related through key business activity
		each key business activity will become a fact table
		tables will represent:
			transaction history
			people, places, and things
			time
			dimension rollup
	pattern 4: transaction history
		example:
			fact table: sales table
			dimension tables:
				customer
				salesperson
				product
				time
			sales table attributes:
				customer_id
				salesperson_id
				product_id
				time_id
				quantity_sold
	pattern 5: people, places, and things
		analyzing trends/correlations
			drilling down: 
				keep a particular dimension free,
				others constant
		ex
			SELECT	c.Customer_ID, Customer_Name, Address, sum(Quantity_Sold)
			FROM		Sales s, Time t, Product p, Customer c
			WHERE		Month = 3
			AND		Year = 1993
			AND		UPC_Code = 12678754390				-- Gum Balls
			AND		s.Time_ID = t.Time_ID
			AND		s.Customer_ID = c.Customer_ID
			AND		s.Product_ID = p.Product_ID
			GROUP BY 	c.Customer_ID
			ORDER BY	c.Customer_ID;
	pattern 6: time
	pattern 7: dimension rollup
		ex
			salesperson table
			sales_office table
		ex
			SELECT	Sales_Office_Name, Product_Description, sum(Total_Amount)
			FROM		Sales s, Time t, Product p, Salesperson sp, Sales_Office so
			WHERE		Month = 3
			AND		Year = 1993
			AND		UPC_Code = 12678754390				-- Gum Balls
			AND		Sales_Office_Name = 'Portland'
			AND		s.Time_ID = t.Time_ID
			AND		s.Salesperson_ID = sp.Salesperson_ID
			AND		sp.Sales_Office_ID = so.Sales_Office_ID
			AND		s.Product_ID = p.Product_ID
			GROUP BY	Sales_Office_Name;
