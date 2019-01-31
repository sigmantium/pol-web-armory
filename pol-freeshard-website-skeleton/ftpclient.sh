#!/bin/sh
ftp -n <<EOF
open 127.0.0.1
user test test
put pcs.txt
put pcequip.txt
bye
EOF