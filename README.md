# stock-trading-app
## Instuctions


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
Option 1:  
| Id | Stock | Amount |
|:--:|:-----:|:------:|
|  1 |  APPL |   10   |
|  2 |  MSFT |    5   |  

Option 2:
| Id | user_id (fk) | Stock | Amount |
|:--:|:------------:|:-----:|:------:|
|  1 |       1      |  APPL |   10   |
|  2 |       1      |  MSFT |    5   |

### Users
| id | email              | password        | username    |
|----|--------------------|-----------------|-------------|
| 1  | bob@gmail.com      | Bobert123       | bob_smith   |   
| 2  | kim@yahoo.co.uk    | kImKiMkIm       | Kim         |   
| 3  | spam@microsoft.com | saseESDSA129023 | test_user_1 |
