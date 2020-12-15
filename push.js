var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BE4CmpjK_2hFM7uW6FI6KRV8udpo6SSte06U80yMolV0gvopYPGKQ1Tj-pdQHYQfznIBe6y-Q_bM_3A_HTO1UVU",
   "privateKey": "OxhXyoyUp6U0WLY-BixtmTnioMnh5jAKYiYem5c5q10"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/edZLzw1OgOI:APA91bHALxCE68Ysjn2Qva1FcAyamAtqAWtra5pj0Qcw11CbyUEMcCdc8MHpPHrhDjEb1uhqEqKWK7w5IQfzyW6AaqkpZe0vDlv98j6uor41xt-AvbOEmO0m4mrO0xfzn_whHI67LcId",
    "keys": {
        "p256dh": "BGsSasp2aiQJR3ygAA8C9AH5+KzscCcXwfzPb+L+sbWzIbXsdycRCwCBCdPO9uIlSa342TQV4b6hC5tNkaalVqw=",
        "auth": "FCLdriPD5r29j6lNqOychQ=="
    }
};
var payload = 'Dapatkan Informasi Terupdate tentang EPL sekarang juga!';
 
var options = {
   gcmAPIKey: '662797872598',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);