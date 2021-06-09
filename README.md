# Bank-search-application
This is a mini bank search application.You can choose any bank from the api and can mark it as favourite in database.

# Working
1)The app takes data from mock api approx data ( 3600 records).  

2)It than caches the api data to save the time.

3)There is dynamic searching to select any bank.

4)You can mark any bank as favourite and it will get stored in my favourite section in backened(Mysql server).

5)In favourite section you can delete or update any bank data.

6)CRUD operation is performed .

7)You can also dynamically search favourite banks in favourite section.

# Key features
1)Dynamic searching .

2)Created all the major components from scratch.

3)Use of localstorage to cache the api.

4)You can go to any page by entering its number if it exist!!.

5)Proper validation done wherever needed.

6)Router used.

# How to run
1)Create a new schema with the name 'bank ' and table with the name 'favourite' in Mysql workbench.

2)Create column name Id(It should be unique),Name,Ifsc,branch,state,address(all the quantity should be not null).

3)Enter your password and username in db.js file inside server folder.

4)And then run app following conventional steps which you alreadyknow.

