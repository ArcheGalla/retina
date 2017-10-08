#!/bin/bash

echo " Deploy process is starting ... "

ssh -v -o StrictHostKeyChecking=no retina@46.101.168.249 << EOF
cd ~/retina/
sh restart.sh
EOF

echo " Deploy process is finished ... "
