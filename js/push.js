var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BBnzOGSrov5SDeSlAxRsNk0YE2F3PEy0jO9JSRRguNWnLVQUxF6WS3audlXBD5UalLeT2XAV25ZlJTpsBRISy3A",
   "privateKey": "2_KJ2ZHws7OKYE59fF7gH7s1Vfc94c8IRPzLgN92DB0"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dA4DEqXoCus:APA91bGPOOCTfrBanHQDj818M0Cewl4QQ5FktUBZn6SygHarpGZiHfQY_bS7tspCH29ih4-ijiZE2r1BPS4JfR_Lu_MZEdLJzBurrnNN90gkKHLxlJ7C32TGx9wM-J5bCOkejjdb3Rzr",
   "keys": {
       "p256dh": "BJ4MbZCWK5SCnI4IF/SXUBpEbX3eJc6rPT0Fs8KZBJr5slJj3cMHvwwiym4O75YTy6qMMJEAeCCxYMfJyWDB15w=",
       "auth": "nBYoyvfy46tLveLMHhVrfA=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '585460981561',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);