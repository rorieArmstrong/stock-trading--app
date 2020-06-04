# stock-trading-app
## Instuctions


## Overview
We were aiming to make a chart with different (user selected) stocks, showing the historical data and a sidebar of news related to their chosen stocks. - We found that tradingview have a widget that basically does the charting in one simple script, so we decided maybe to focus on creating a virtual stock portfolio where a user can:  
* search for a company  
..* add it to their “watchlist”  
..* then buy and sell the stock based on the current price  
..* users start with a £10,000 balance  
..* Portfolio value is then tracked based on how much shares you own of particular companies at a given price  

## Technologys


## Wireframe
sql/postgres database  
django backend  
react frontend  
## User journeys
As a User, I want to be able to create an account so I can login.  
As a User, I want to be choose what stocks I want to monitor.  
As a User, I want to be able to see a graph to compare my stocks.
## Database schemas
### Stocks
| Id | user_id (fk) | Stock | Amount |
|:--:|:------------:|:-----:|:------:|
|  1 |       1      |  APPL |   10   |
|  2 |       1      |  MSFT |    5   |

### Users
| id |        email       |     password    |   username  | balance |
|:--:|:------------------:|:---------------:|:-----------:|:-------:|
|  1 |    bob@gmail.com   |    Bobert123    |  bob_smith  |   10000 |
|  2 |   kim@yahoo.co.uk  |    kImKiMkIm    |     Kim     |   500   |
|  3 | spam@microsoft.com | saseESDSA129023 | test_user_1 |    0    |
