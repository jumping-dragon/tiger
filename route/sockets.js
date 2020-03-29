let socket = (io) => {
SELECT r.full_name,r.picture
FROM restaurant_accounts r
INNER JOIN (
	SELECT m.message_id,m.restaurant_id,m.sender_user,m.timestamp,m.messages
	FROM messages m
	ORDER BY timestamp DESC
	WHERE m.`user_id`= 1 
	)
}


module.exports = socket;