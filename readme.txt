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
5. All Time variable stored in database are in Standard UTC Timezone.

--------------------------------------------------------------------------------