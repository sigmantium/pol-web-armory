@echo off
echo open 127.0.0.1>ftp.txt
echo test>>ftp.txt
echo test>>ftp.txt
echo put ./data/pcs.txt>>ftp.txt
echo put ./data/pcequip.txt>>ftp.txt
echo bye>>ftp.txt
ftp -s:ftp.txt
del /f /q ftp.txt