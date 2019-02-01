#!/bin/sh
awk '{print}' pcs.txt pcequip.txt > pcs_pcequip.txt
ftp -n <<EOF
open 127.0.0.1
user test test
put pcs_pcequip.txt
bye
EOF
rm -f pcs_pcequip.txt