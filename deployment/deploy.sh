#!/bin/bash
LANDING_PATH=/var/www/youcantodoit.com
LOCAL_PATH=./build
echo "Note: requires sudo"
echo "Using path: $LANDING_PATH"

rm -rf $LANDING_PATH
mkdir -p $LANDING_PATH
cp -r $LOCAL_PATH/* $LANDING_PATH
chown -R www-data:www-data $LANDING_PATH
chmod -R 570 $LANDING_PATH
chmod g+s $LANDING_PATH
echo "Finished copying."

apache2ctl graceful

echo "Done"

