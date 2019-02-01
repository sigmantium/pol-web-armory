copy data\pcs.txt+data\pcequip.txt data\pcs_pcequip.txt
@echo off
echo open 127.0.0.1>ftp.txt
echo test>>ftp.txt
echo test>>ftp.txt
echo put data\pcs_pcequip.txt>>ftp.txt
echo bye>>ftp.txt
ftp -s:ftp.txt
del /f /q ftp.txt
del /f /q data\pcs_pcequip.txt