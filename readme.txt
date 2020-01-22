API INIT

1. enable api download credentials.json
2. run email.js inside init_api to get token.json
3. copy token.json and credentials.json to the gmail folder
4. change email in createMail.js

DB INIT
1. update /route/db.js
 host: "localhost",
 user: "root",
 password: "<yourpassword>",
 database: "tiger"

2. Go to phpmyadmin and login
3. Click on SQL tab, copy and paste init.sql to the blank space
4. Click on go


--------------------------------------------------------------------------------

1/23/2020 --> Currently
1. Redirecting every admin pages to login if not authenticated
2. All pages are still copy of dashboard
3. "Manage" admin page already finished
4. Current database schema Finished with exported png on project files

---> QUESTIONS
1. Admin pages functionality
STOCKS MANAGEMENT???
ACCOUNTING MANAGEMENT???

Because functionality determines what data is needed for the Admin Database schema
- suggested:
1. Operating time:
2. Business License Number: