# APSIM Sorghum modelling visualisation

PREVIEW - <https://ls40.pef.czu.cz/maps/>
## Technologies
**backend** - PHP and [Nette framework](https://nette.org)\
**frontend** - JavaScript and React (Create React App)\
**database** - MySQL

## Running the application
Clone the repo
###Frontend
Firstly, set up correct the base URL of the backend in `/src/globalFunctions/api.js`

#### Development version
`npm i` - to install dependencies\
`npm start` - run local build

**Google maps** 
Google maps API key is necessary to properly display the map.\
Update your API key in `/src/Map/index.js` into `google maps url`

#### Production version
`npm i` - to install dependencies\
`npm run build` - see the transpiled code in `build` folder

### Backend
Go to `api` directory. Install dependencies using composer `composer install`.\
Add `local.neon` including insert DB settings.\

### Database
Database dump is located in `DB_dump.sql`. Run or import the file in your database.

---
Created by [Department of Information Technologies](https://kit.pef.czu.cz/?do=ChangeToEnglish), CZU Prague 