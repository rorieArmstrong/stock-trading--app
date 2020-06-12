# stock-trading-app

## Team Portfol.io: Igor, Keir, Huseyin, Rorie

## Instructions
* You will need 2 terminal sessions, make sure you're in the project folder

* To install all required packages:
1. Run ``` pipenv install  ``` in terminal 1
2. Run ``` npm install ``` in terminal 2

* To create the database
3. Activate virtual environment by running ``` pipenv shell ``` in terminal 1
4. Go into project folder by doing ``` cd trading ``` then ```python manage.py migrate``` in terminal 1

* Running the servers
5. Run ``` python manage.py runserver``` in terminal 1 to run the backend django server
6. Run ``` npm run dev``` in terminal 2 to tun the react server
7. Finished. You should now be able to access the site from [http://http://127.0.0.1:8000/]

## Overview
We were aiming to make a chart with different (user selected) stocks, showing the historical data and a sidebar of news related to their chosen stocks. - We found that tradingview have a widget that basically does the charting in one simple script, so we decided maybe to focus on creating a virtual stock portfolio where a user can:  
* search for a company  
* add it to their “watchlist”  
* then buy and sell the stock based on the current price  
* users start with a £10,000 balance  
* Portfolio value is then tracked based on how much shares you own of particular companies at a given price  

## Project Tree
├───trading  
│   ├───accounts  
│   ├───frontend  
│   │   ├───migrations  
│   │   ├───src  
│   │   │   ├───components  
│   │   │   │   ├───containers  
│   │   │   │   └───pages  
│   │   │   ├───public  
│   │   │   └───tests  
│   │   ├───static  
│   │   │   └───frontend  
│   │   └───templates  
│   │       └───frontend  
│   ├───static  
│   ├───templates  
│   │   └───registration  
│   ├───trader  
│   │   └───migrations  
│   └───trading  
└───__mocks__  

## Technologys
* React  
* NPM  
* Webpack  
* Babel  
* Axios  
* Tradingview Widget  
* Bootstrap  
* Pipenv  
* Django  
* Django REST Framework  
* SQLite  
* Unittest  
* Jest  
* Enzyme  
## Database schemas
### Stocks
| ID | stock_symbol | stocks_bought_numer | bought_at_price | bought_at_time | userID_id (FK) |
|----|--------------|---------------------|-----------------|----------------|----------------|

### Users
We extended the standard Django user table by including the balance column

| ID | password | last_login | is_superuser | username | first_name | last_name | email | is_staff | is_active | date_joined | balance |
|----|----------|------------|--------------|----------|------------|-----------|-------|----------|-----------|-------------|---------|

## User journeys
As a User, I want to be able to create an account so I can login.  

As a User, I want to be choose what stocks I want to monitor.  

As a User, I want to be able to see a graph to compare my stocks.  

When I login I want to see my dashboard showing my balance / portfolio value and the stocks I’m watching.  

I can choose to go to charts or add stocks to watch (on different pages) using buttons.  

I can search for stocks to add to my potfolio.  

I can add to the stocks I want to watch on your dashboard and charting system.  

Once done you can go back to your dashboard and view the price for the stocks on your watchlist.  

I can buy or sell based on the current market price (provided by API).  

When I buy or sell it updates my balance and stock amount.  

I can pick to view the chart (provided by TradingView widget) which has my watchlist of stocks charted historically and relatively current. (This widget is very customisable and interactive).  

On logout the balance and watchlist is persistent so when user logs back in they are able to see everything as it were. The only variable would be the portfolio value which is dictated by the current pricing of stocks they hold.  

