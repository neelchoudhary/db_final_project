# db_final_project
A Music Player

To set up & run: 
- Clone the repo.
- Import sql files from Data Dump folder into MySqlWorkbench. Schema is called 'db_final'.
- If needed, edit the application.properties file located in db-finalproject-orm/src/main/resources/application.properties.
- Default port for the Spring Server is 8080. 

- Run the react project located in db-final-project-ui. 
- If not running Spring Server on port 8080, change the port in the "server_name" variable on line 1 of api.js file located in db-finalproject-ui/src/utils.api.js.
- Default port for the React website is 3000. WEBSITE WILL BREAK IF NOT RUNNING ON PORT 3000.
