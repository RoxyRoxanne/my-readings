
	r programming
		http://daattali.com/shiny/timevis-demo/
		http://www.rdocumentation.org/domains/ExperimentalDesign
		https://briatte.github.io/ggnetwork/
		http://lenkiefer.com/archive.html
		http://istc-bigdata.org/index.php/modeldb-a-system-for-managing-machine-learning-models/
		https://www.rforexcelusers.com/make-pivottable-in-r/
		Equivalent of SQL CASE - mutate if
			https://github.com/hadley/dplyr/issues/631
			ex: if not smoker, then comsumption of cigarettes <- 0
				#standard R way
				smoke$cigarrettes[!smoke$is_smoker & is.na(smoke$cigarrettes)] <- 0
				opt1: filter + rbind
					#dplyr option 1: split the data set, fix one part and combine the two
					smoker_true <- smoke %>% filter(!is_smoker, is.na(smoke$cigarettes))
					# complement
					smoker_false <- smoke %>% filter(is_smoker | !is.na(smoke$cigarettes))
					smoke2 <- rbind( smoker_true %>% mutate(cigarrettes=0)
												 , smoker_false
					)
				opt2: mutate if
					# dplyr option 2: replace the whole variable and do the filtering in the assignment
					smoke2 <- smoke %>%
						mutate(cigarrettes=ifelse(!is_smoker & is.na(cigarrettes), 0, cigarrettes))
				opt3: coalesce
					mutate(smoke, cigarettes = if_else(is_smoker, cigarettes, 0L, 0L))
				opt4: case_when
					mtcars %>% tbl_df %>%  transmute(size = case_when(.$cyl > 6 ~ "big", TRUE ~ "small"))
				opt5: if_else
					mutate(smoke, cigarettes = if_else(is_smoker, cigarettes, 0L, 0L))
		https://blog.exploratory.io/working-with-json-data-in-very-simple-way-ad7ebcc0bb89#.pq3age4hf
		https://rawgit.com/jennybc/googlesheets/master/vignettes/managing-auth-tokens.html
		https://www.gitbook.com/book/towcenter/curious-journalist-s-guide-to-data/details
		https://github.com/hadley/dplyr/blob/master/NEWS.md
		add_row
			library(tibble)
			df <- data_frame(x = 1:3, y = 3:1)
			add_row(df, x = 4, y = 0)
		https://blog.exploratory.io/filter-with-text-data-952df792c2ba#.jxz21ms7j
		iris %>% filter( column("Sepal.Length") < 5 )
			var <- "Sepal.Length"
			iris %>% filter( column(var) < 5 )
		debugging dplyr
			https://github.com/gaborcsardi/tamper
			devtools::install_github("gaborcsardi/tamper")
			options(error = tamper::tamper)
			ex
				1:10 %>%
					multiply_by(10) %>%
					add(10) %>%
					add("oh no!") %>%
					subtract(5) %>%
					divide_by(5)
		why sapply is bad
			https://blog.rstudio.org/2016/01/06/purrr-0-2-0/
			ex
				df[1:4] %>% map_chr(class)
				# error
				df[1:4] %>% map_chr(~ paste(class(.), collapse = "/"))
			ex2
				x <- list(1, 3, 5)
				y <- list(2, 4, 6)
				map2(x, y, c)
				#> [[1]]
				#> [1] 1 2
				#> 
				#> [[2]]
				#> [1] 3 4
				#> 
				#> [[3]]
				#> [1] 5 6
			ex3
				map2_dbl(x, y, `+`)
				#> [1]  3  7 11
			ex4
				spread <- list(sd = sd, iqr = IQR, mad = mad)
				x <- rnorm(100)
				invoke_map_dbl(spread, x = x)
				#>        sd       iqr       mad 
				#> 0.9121309 1.2515807 0.9774154
			ex5: flatten
				x <- list(1L, 2:3, 4L)
				x %>% str()
				#> List of 3
				#>  $ : int 1
				#>  $ : int [1:2] 2 3
				#>  $ : int 4
				x %>% flatten() %>% str()
				#> List of 4
				#>  $ : int 1
				#>  $ : int 2
				#>  $ : int 3
				#>  $ : int 4
				x %>% flatten_int() %>% str()
				#>  int [1:4] 1 2 3 4
		http://r4ds.had.co.nz/functions.html
		http://sebastianbarfort.github.io/sds/syllabus/
		http://www.rforexcelusers.com/book/data-frames/working-data-frame-rows/dplyr-sqldf/
		https://blog.exploratory.io/
		http://rmarkdown.rstudio.com/gallery.html
	dplyr
		http://juliasilge.com/blog/Mapping-Utah-Caucus/
		library(jsonlite)
		utahRJSON <- fromJSON("http://data.cnn.com/ELECTION/2016primary/UT/county/S.json", flatten=TRUE)
		cruz <- mutate(map_df(utahRJSON$counties$race.candidates, function(x) {
				x %>% filter(lname == "Cruz")
			}), FIPS=utahRJSON$counties$countycode)
	https://libraries.io/cran
		open source libraries in cran
	https://github.com/dgrtwo/fuzzyjoin
		https://jangorecki.github.io/blog/2015-12-11/Solve-common-R-problems-efficiently-with-data.table.html
	spark
		http://spark.rstudio.com/index.html
	gis
		https://blog.exploratory.io/creating-geojson-out-of-shapefile-in-r-40bc0005857d#.sogw29n1e
	tools
		fstrings - python style strings 
			f('My name is {name}, my age next year is {age + 1}, my anniversary is {format(anniversary, "%A, %B %d, %Y")}.')
		https://radiant-rstats.github.io/docs/
			analytics using r and shiny on web platform like exploratory.io
		https://github.com/yihui/xaringan
			presentation library
		https://github.com/MangoTheCat/rematch2
			tidy regex 
		https://github.com/ropensci/stplanr
			functions and data access for transport research
		tidyquant: tidyverse to financial analysis
			http://www.mattdancho.com/code-tools/2017/01/01/tidyquant-introduction.html
		DiagrammeR: graph network visualization 
		igraph tutorial
			http://kateto.net/network-visualization
		datapasta: RStudio Addins for Data Copy-Pasta
			RStudio addins to make copy-pasting vectors and tables into source painless.
	Shiny developer conference
		https://www.rstudio.com/resources/webinars/shiny-developer-conference/
  Renjin: R on JVM
    http://www.renjin.org/

