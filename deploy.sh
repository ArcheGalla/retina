#!/bin/bash

echo " Hello from bash script! "
echo " Hello from bash script! "
echo " Hello from bash script! "

ssh -v retina@46.101.168.249 << EOF

cd ~/retina/
touch test.txt

# echo '1. Updating sources'
# cd /patch/to/your/repository/
# git checkout --force master
# git pull

# echo "2. Restart apache"
# sudo apache2ctl graceful

EOF
