# stock-trading-app
## Instuctions
1. run node server npm run dev
2. run migrations python trading/manage.py migrate
3. run the django server python trading/manage.py runserver

## Overview
We were aiming to make a chart with different (user selected) stocks, showing the historical data and a sidebar of news related to their chosen stocks. - We found that tradingview have a widget that basically does the charting in one simple script, so we decided maybe to focus on creating a virtual stock portfolio where a user can:  
* search for a company  
* add it to their “watchlist”  
* then buy and sell the stock based on the current price  
* users start with a £10,000 balance  
* Portfolio value is then tracked based on how much shares you own of particular companies at a given price  

## Project Tree


## Technologys


## Wireframe
sql/postgres database  
django backend  
react frontend  
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

## Database schemas
### Stocks
| Id | user_id (fk) | Stock | Amount |
|:--:|:------------:|:-----:|:------:|
|  1 |       1      |  APPL |   10   |
|  2 |       1      |  MSFT |    5   |

### Users
| id |        email       |     password    |   username  | balance |
|:--:|:------------------:|:---------------:|:-----------:|:-------:|
|  1 |    bob@gmail.com   |    ***    |  bob_smith  |   10000 |
|  2 |   kim@yahoo.co.uk  |    ***    |     Kim     |   500   |
|  3 | spam@microsoft.com | *** | test_user_1 |    0    |
