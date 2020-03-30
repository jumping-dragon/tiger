const sio = require('socket.io');
const db = require('./db')
const _ = require('lodash');


module.exports = function(server) {

  let io = sio.listen(server);

  //Chat Feature websockets initialization
  io.on('connection', function (client) {

    client.on('load_chat', function (data) {
    
       const query = 'SELECT m.message_id,m.restaurant_id,m.sender_user,m.timestamp,m.messages,r.full_name,r.picture\
       FROM messages m\
       INNER JOIN restaurant_accounts r\
       ON m.`restaurant_id` = r.`restaurant_id` \
       WHERE m.`user_id`='+data.user_id+' ORDER BY timestamp'
      
       db.query(query, function(error, results, fields) {
          let grouped =  _.groupBy(results, function(car) {
                          return car.restaurant_id;
                        });
          let zhenglihao = Object.keys(grouped).map(i => grouped[i])
          console.log(zhenglihao);
          client.emit('fillContact', zhenglihao);
       });
    })

     client.on('admin_load_chat', function (data) {

       const query = 'SELECT m.message_id,m.user_id,m.sender_user,m.timestamp,m.messages,u.name\
       FROM messages m\
       INNER JOIN user_accounts u\
       ON m.`user_id` = u.`user_id` \
       WHERE m.`restaurant_id`='+data.restaurant_id+ ' ORDER BY timestamp;';
      
       db.query(query, function(error, results, fields) {
          let grouped =  _.groupBy(results, function(car) {
                          return car.restaurant_id;
                        });
          let zhenglihao = Object.keys(grouped).map(i => grouped[i])
          console.log(zhenglihao);
          client.emit('fillContactAdmin', zhenglihao);
       });
    })

    client.on('send_chat', function (data) {
       console.log(data);
       let message = {
          restaurant_id : data.restaurant_id,
          user_id : data.user_id,
          sender_user : data.sender_user,
          messages : data.message
        }
        //succeed! registering to database!
          db.query('INSERT INTO `messages` SET ?', message, (err, result) => {
            if (err) throw err;
             let checkQuery = 'SELECT m.message_id,m.restaurant_id,m.sender_user,m.timestamp,m.messages,r.full_name,r.picture\
                               FROM messages m\
                               INNER JOIN restaurant_accounts r\
                               ON m.`restaurant_id` = r.`restaurant_id` \
                               WHERE m.`message_id`='+result.insertId;
             db.query(checkQuery, function(error, results, fields) {
             client.emit('new_message',results)
             })
          })

    })

    client.on('disconnect', function () {
      console.log('client disconnect...', client.id)
    })

    client.on('error', function (err) {
      console.log('received error from client:', client.id)
      console.log(err)
    })
  })

  return io;
};