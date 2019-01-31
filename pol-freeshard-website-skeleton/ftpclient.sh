ftp -n '127.0.0.1' >> END_SCRIPT
quote USER test
quote PASS test
put pcs.txt
put pcequip.txt
bye
END_SCRIPT
exit 0