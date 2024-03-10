[Video for getting Started on React](https://youtu.be/nTeuhbP7wdE)
[Video 2 for getting Started on React](https://www.youtube.com/watch?v=1_Cu-yMQru8)
[Video 3, has link to git repo too and form](https://www.youtube.com/watch?v=QwarZBtFoFA)
[Link to git repo in Vid 3](https://github.com/machadop1407/react-website-tutorial/tree/main)

Make sure to install node.js and npm first so you can run stuff (see video 3 @ 4:20). Then type in npm start in terminal (vscode terminal)

components are reusable parts like the nav bar and footer etc.

put images displayed in assets folder under src.

use npm install react-router-dom in vsc terminal

App.css is for styling that applies to everything. styles folder css is for specific files styling

Video: Intro To React Database Connections - https://www.youtube.com/watch?v=HVdMhKN2ng4

Use jsonbox.io (uses Mongo.DB) for storage
Axios.get
Sandbox Product Start To Do List: https://codesandbox.io/p/sandbox/react-databases-no-db-19flw

Sandbox Using Axios: https://codesandbox.io/s/react-databases-axios-4jlzo

Sandbox Refactored API.js End Result https://codesandbox.io/s/react-databa...

Reddit: https://www.reddit.com/r/reactjs/comments/z2s0is/keeping_react_app_in_sync_with_backenddatabase/

testing push

# DATA BASE
DUE FEB 13
// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs
LINK TO DATABASE PROTOTYPE: https://dbdiagram.io/d/Culture-Care-65c94778ac844320aee9449d

Table practitioner {  #Jephthah
  id integer [primary key]
  name text
  email_address text
  specialization text
  gender text
  language text
  location text

}
Table specialization { #Ambrose
  id integer [primary key]
  name text 
}


Table language { #Ambrose
  id integer [primary key]
  name text
}

Table location { #Jae
  id integer [primary key]
  name text
}


Ref: practitioner.id <> specialization.id // many-to-one
Ref: practitioner.id <> language.id // many-to-one
Ref: practitioner.id <> location.id // many-to-one



#ENDPOINTS FOR PRACTITIONER

- CRUD practitioner # Jephthah
- CRUD for specialization, location, language # each person for their corresponding database tables
- get_practitioners # Ambrosse Blay
- get_all_practitioners #Jae


#Working on soft passes and hard passes

#soft passes location and specialization match. gender doesn't match
- location
- specialization
- out of network
- gender

#hard passes
- location doesn't match 
- out of network doesn't match

#create table for out of network
#link to the practitioners table
#create new end point for hard and soft passes /practitioner/get/match/



